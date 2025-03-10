import asyncio
import json
import signal
import logging
from jsonschema import Draft7Validator

from schema.input_schema import input_schema
from libs.generate_with_retry import generate_with_retry
from libs.model import load_llm
from libs.mq import ScrapedNewsQueue, host
from libs.rabbitmq_client import RabbitMQAsyncClient


class SummarizerService:
    def __init__(self, model_path):
        self.model_path = model_path
        self.model = None
        self.stop_event = asyncio.Event()
        self.client = None

        self.MAX_RETRIES = 3
        self.RETRY_DELAY = 5  # seconds
        self.BACKOFF_FACTOR = 2  # exponential backoff factor

        # Set up signal handlers for graceful shutdown
        for sig in (signal.SIGINT, signal.SIGTERM):
            signal.signal(sig, self._handle_shutdown_signal)

    def _handle_shutdown_signal(self, sig, frame):
        """Handle signals for graceful shutdown"""
        logging.info(f"Received signal {sig}. Initiating graceful shutdown...")
        self.stop_event.set()

    async def load_model(self):
        self.model = load_llm(self.model_path)
        logging.info("LLM Model Loaded Successfully")

    async def _connect_with_backoff(self, host):
        """Connect to RabbitMQ with exponential backoff"""
        max_retries = 5
        retry_count = 0

        while retry_count < max_retries:
            try:
                logging.info(f"Attempting to connect to RabbitMQ at {host}...")
                self.client = RabbitMQAsyncClient(host)
                await self.client.create_connection()

                # Ensure channel is open and ready before returning
                # Wait for the channel to be ready (could be async in the RabbitMQAsyncClient)
                retry_channel = 0
                while retry_channel < self.MAX_RETRIES:
                    if (
                        hasattr(self.client, "channel")
                        and self.client.channel
                        and self.client.channel.is_open
                    ):
                        logging.info(
                            "Connected to RabbitMQ successfully with open channel"
                        )
                        return True
                    logging.info("Waiting for channel to open...")
                    await asyncio.sleep(1)  # Wait for channel to be ready
                    retry_channel += 1

                if not (
                    hasattr(self.client, "channel")
                    and self.client.channel
                    and self.client.channel.is_open
                ):
                    logging.error("Channel not open after connection")
                    # Close and retry
                    await self.client.close()
                    raise Exception("Channel failed to open")

                return True
            except Exception as e:
                retry_count += 1
                backoff_time = min(
                    self.BACKOFF_FACTOR**retry_count, self.RETRY_DELAY
                )  # Exponential backoff capped at 60 seconds

                logging.error(
                    f"Connection error (attempt {retry_count}/{max_retries}): {str(e)}. "
                    f"Retrying in {backoff_time} seconds..."
                )

                if retry_count < max_retries:
                    await asyncio.sleep(backoff_time)
                else:
                    logging.critical("Max retry attempts reached. Giving up.")
                    return False

    async def setup_consumer(self, host, queue_name):
        # Connect with exponential backoff instead of hardcoded wait
        connection_success = await self._connect_with_backoff(host)
        if not connection_success:
            logging.error("Failed to connect to RabbitMQ. Exiting.")
            return

        # Ensure we have an open channel before setting up consumer
        if not (
            hasattr(self.client, "channel")
            and self.client.channel
            and self.client.channel.is_open
        ):
            logging.error("Cannot set up consumer - channel not open")
            return

        # Set up consumer
        try:
            await self.client.setup_consumer(queue_name, self.generate)
            logging.info(f"Consumer set up for queue: {queue_name}")

            # Verify consumer was set up correctly
            # This might need to be adjusted based on your RabbitMQAsyncClient implementation
            if not hasattr(self.client, "consumer_tag"):
                logging.warning(
                    "Consumer might not be properly registered - no consumer tag found"
                )

            # Run until stop event is set
            while not self.stop_event.is_set():
                await asyncio.sleep(1)  # Check for stop event periodically

            logging.info("Stop event detected, shutting down...")
        except Exception as e:
            logging.error(f"Error setting up consumer: {str(e)}")
        finally:
            if self.client:
                await self.client.close()
                logging.info("RabbitMQ connection closed")

    async def generate(self, body):
        logging.info(f"Received message: {body}...")
        try:
            # Parse the body if it's bytes
            if isinstance(body, bytes):
                body_decoded = json.loads(body.decode("utf-8"))
            else:
                body_decoded = body

            # Initialize the validators
            input_validator = Draft7Validator(input_schema)

            # Validate the input
            logging.info("Validating input...")
            schema_errors = list(input_validator.iter_errors(body_decoded))
            if schema_errors:
                error_messages = [
                    {"path": list(error.path), "message": error.message}
                    for error in schema_errors
                ]
                logging.error(f"Input validation failed: {error_messages}")
                return None

            # Generate the response
            json_input = json.dumps(body_decoded)
            logging.info(f"Generating response for input: {json_input[:100]}...")
            generated_response = await generate_with_retry(self.model, json_input)

            # Check if the response is valid
            if (generated_response is None) or (generated_response == ""):
                logging.error("Error generating response: empty response")
                return None

            logging.info(f"Generated valid response: {generated_response[:100]}...")
            return generated_response

        except json.JSONDecodeError as e:
            logging.error(f"JSON decode error: {str(e)}")
            return None
        except Exception as e:
            logging.error(f"Error in generate: {str(e)}")
            return None

    async def shutdown(self):
        """Gracefully shutdown the service"""
        logging.info("Shutting down service...")
        self.stop_event.set()


if __name__ == "__main__":
    # Configure logging
    logging.basicConfig(
        level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s"
    )

    async def main():
        service = SummarizerService("./models/Llama-3.2-1B-Instruct-Q4_K_M.gguf")

        try:
            # First load the model
            await service.load_model()

            # Then set up the consumer
            await service.setup_consumer(host, ScrapedNewsQueue)
        except KeyboardInterrupt:
            logging.info("Keyboard interrupt received")
            await service.shutdown()
        except Exception as e:
            logging.error(f"Unhandled exception: {str(e)}")
            await service.shutdown()

    asyncio.run(main())
