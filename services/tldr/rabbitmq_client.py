import pika
import logging
import asyncio
from pika.adapters.asyncio_connection import AsyncioConnection

# Configure logging
logging.basicConfig(level=logging.INFO)


class RabbitMQAsyncClient:
    def __init__(self, host: str, max_concurrent_tasks: int = 1):
        self.host = host
        self.connection = None
        self.channel = None
        self._closing = False
        self.rate_limiter = asyncio.Semaphore(max_concurrent_tasks)  # Rate limit tasks

    async def create_connection(self):
        """Create a new connection to RabbitMQ."""
        if self.connection is None or self.channel is None:
            parameters = pika.ConnectionParameters(host=self.host)
            self.connection = AsyncioConnection(
                parameters=parameters,
                on_open_callback=self.on_connection_open,
                on_open_error_callback=self.on_connection_open_error,
                on_close_callback=self.on_connection_closed,
            )
            logging.info(f"Attempting to connect to RabbitMQ at {self.host}...")

    def on_connection_open(self, connection):
        """Callback when the connection is opened."""
        logging.info("Connection opened successfully.")
        self.connection = connection
        self.open_channel()

    def on_connection_open_error(self, _, error):
        """Callback when the connection fails to open."""
        logging.error(f"Connection error: {error}. Retrying...")
        asyncio.create_task(self.reconnect())  # Attempt to reconnect

    def on_connection_closed(self, _, reason):
        """Callback when the connection is closed."""
        logging.error(f"Connection closed: {reason}. Attempting to reconnect...")
        self.connection = None
        if not self._closing:
            asyncio.create_task(self.reconnect())  # Attempt to reconnect

    def open_channel(self):
        """Open a new channel."""
        if self.connection and self.channel is None:
            self.connection.channel(on_open_callback=self.on_channel_open)

    def on_channel_open(self, channel):
        """Callback when the channel is opened."""
        logging.info("Channel opened successfully.")
        self.channel = channel
        self.channel.add_on_close_callback(self.on_channel_closed)

    def on_channel_closed(self, _, reason):
        """Callback when the channel is closed."""
        logging.error(f"Channel closed: {reason}. Reopening channel...")
        self.channel = None
        if not self._closing:
            self.open_channel()  # Attempt to reopen the channel

    async def publish_message(self, exchange, routing_key, message, properties=None):
        """Publish a message to RabbitMQ."""
        if self.channel is None:
            logging.error("Cannot publish message - channel not open")
            return False

        async with self.rate_limiter:  # Apply rate limiting
            try:
                self.channel.basic_publish(
                    exchange=exchange,
                    routing_key=routing_key,
                    body=message,
                    properties=properties
                    or pika.BasicProperties(
                        delivery_mode=2
                    ),  # persistent delivery mode
                )
                logging.info(
                    f"Message published to {exchange} with routing_key {routing_key}"
                )
                return True
            except Exception as e:
                logging.error(f"Failed to publish message: {e}")
                return False

    async def process_message(self, channel, method, _, body, callback):
        """Process a message with rate limiting."""
        async with self.rate_limiter:  # Enforce rate limit
            logging.info(f"Processing message: {str(body)[:25]}...")
            try:
                # Call the provided callback with the message
                await callback(body)
                channel.basic_ack(
                    delivery_tag=method.delivery_tag
                )  # Acknowledge message
                logging.info("Message processed successfully")
            except Exception as e:
                logging.error(f"Error processing message: {e}")

    async def setup_consumer(self, queue, callback):
        """Set up a consumer to listen to messages from a queue with rate limiting."""
        if self.channel is None:
            logging.error("Cannot set up consumer - channel not open")
            return

        try:
            self.channel.basic_consume(
                queue=queue,
                on_message_callback=lambda ch, method, props, body: asyncio.create_task(
                    self.process_message(ch, method, props, body, callback)
                ),
                auto_ack=False,  # Manual acknowledgment after processing
            )
            logging.info(f"Consuming messages from {queue}")
        except Exception as e:
            logging.error(f"Failed to set up consumer: {e}")

    def close(self):
        """Close the connection and channel."""
        if self.connection and not self._closing:
            logging.info("Closing connection...")
            self._closing = True
            self.connection.close()

    async def reconnect(self):
        """Attempt to reconnect to RabbitMQ after a failure."""
        logging.info(f"Attempting reconnection to {self.host}...")
        await asyncio.sleep(5)  # Wait before retrying
        await self.create_connection()
