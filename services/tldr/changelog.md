## version=1.0.0

**Initial Release**

- Introduced the TLDR Library class
- Llama 3.2-1B Instruct to generate the TLDR
- Exposed generate api route

## version=1.1.0

**Quality Improvements**

- TLDR Library

  - Updated `generate_response` method to be asynchronous, yielding chunks for streaming output.
  - Simplified the system prompt into a global variable (`sys_prompt`) for easier management.
  - Removed unnecessary CUDA setup as it's not essential to the current implementation.
  - Cleaned up initialization and removed redundant debug prints to improve readability.

- FastAPI

  - Moved LLM model initialization to a background startup event to avoid blocking API requests.
  - Added streaming support for response generation to enhance performance with large outputs.
  - Reduced model parameters for better performance: reduced context window and batch size.
  - Improved error handling and response formatting for more consistent error messages.

## version=1.1.1

**Reliability Improvements**

- Improved sys prompt to be more concise and focused on the task.
- Added a new prompt template for the LLM to improve the quality of the generated TLDR.
- Add schema validation for the input and output data to ensure it meets the required format.
- Add retry mechanism for LLM calls to handle transient errors.
- Added a new endpoint to check the health of the service.
- Improved error handling and logging for better debugging and monitoring.
- Improved project structure and organization for better maintainability.

## **version=2.0.0**

**Major Refactor & New Features**

- **SummarizerService Class**:

  - Introduced a new `SummarizerService` class to manage the model loading, RabbitMQ connection, and message consumption.
  - Added asynchronous `load_model()` method for model initialization.
  - Integrated a `setup_consumer()` method to manage RabbitMQ message consumption with retry and backoff logic.
  - Implemented graceful shutdown for RabbitMQ connections and consumer tasks.

- **RabbitMQ Connection & Consumer Management**:

  - Integrated exponential backoff mechanism for RabbitMQ connections to handle transient failures and retry logic.
  - Created robust connection management with `_connect_with_backoff()` method to ensure successful connection.
  - Improved message acknowledgment and handling to ensure reliable processing and response generation.

- **Message Processing & Retry Logic**:

  - Introduced a `generate_with_retry()` method for retrying message processing in case of transient failures.
  - Enhanced input validation by introducing JSON schema validation for incoming messages to ensure proper format.

- **Exponential Backoff & Rate Limiting**:

  - Added configurable exponential backoff for RabbitMQ connection retries with `MAX_RETRIES`, `RETRY_DELAY`, and `BACKOFF_FACTOR`.
  - Introduced rate limiting via `asyncio.Semaphore` to control concurrent message processing and prevent overloading.

- **Logging Enhancements**:

  - Enhanced logging throughout the system to track RabbitMQ connection attempts, message processing, and system shutdown events.
  - Integrated detailed error logging to improve debugging and system monitoring.

- **Graceful Shutdown**:

  - Introduced event-driven shutdown mechanism using `stop_event` to ensure that services are properly shut down when interrupted (`SIGINT`, `SIGTERM` signals).

- **Project Structure & Maintainability**:

  - Refined system structure for better maintainability, focusing on modularizing RabbitMQ connection handling and message processing.
  - Consolidated configuration options for retries, backoff, and model initialization into central areas to allow easy customization.

- **Performance & Scalability**:
  - Optimized for better performance in handling large message loads with asynchronous and concurrent task processing.
  - Introduced rate-limiting and retry strategies for scaling to large user bases while maintaining reliable performance.

---
