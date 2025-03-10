# TLDR Generation Service V 2.0

A microservice that generates concise summaries from news articles using LLM technology.

## Code Structure

```
services/tldr/
├── main.py               # Service entry point and core logic
├── scripts/              # Service scripts
├── requirements.txt      # Python dependencies
├── requirements-dev.txt  # Python development dependencies
├── schema/               # JSON validation schemas
├── errors/               # Error handling classes
├── tests/                # Test suite directory
```

### Core Components

1. **TLDRService Class**

   - Handles RabbitMQ connection management
   - Implements message processing pipeline
   - Manages LLM generation with retry logic

2. **Message Processing Flow**

   - Connection establishment with retries
   - Message validation
   - Content generation
   - Response validation
   - Result publishing

3. **Error Handling Layer**
   - Comprehensive exception catching
   - Structured logging
   - Automatic reconnection logic
   - Validation error reporting

### Design Patterns

1. **Retry Pattern**

   - Exponential backoff for external services
   - Maximum retry limits
   - Configurable delay intervals

2. **Factory Pattern**

   - Model initialization
   - Connection management
   - Service configuration

3. **Observer Pattern**
   - Event handling for connections
   - Shutdown signal management
   - Status monitoring

### Logging Standards

- Structured logging with contextual information
- Log levels for different severity
- Performance metrics inclusion
- Traceable error reporting

## Features

- Asynchronous message processing via RabbitMQ
- JSON schema validation for input/output
- Robust error handling and retry mechanisms
- LLM-based text generation with configurable parameters
- Automatic reconnection to RabbitMQ on connection failures

## Prerequisites

- Python 3.11+
- RabbitMQ server (AMQP-compatible).
- g++, cmake, git (llama.cpp build tools)
- 2GB of Free memory

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Active-Matrix/proximity.git
```

2. Navigate to the service directory:

```bash
cd proximity/services/tldr
```

3. Create a virtual environment and install dependencies:

```bash
python -m venv venv
```

4. Activate the virtual environment:

```bash
source venv/bin/activate  # On Unix
# or
.\venv\Scripts\activate  # On Windows
```

5. Install the required packages:

```bash
pip install -r requirements.txt
```

6. Download the LLM model:

```bash
python3 .scripts/setup.py # setup huggingface cli and download model
```

## Configuration

The service can be configured through environment variables:

- `RABBITMQ_HOST`: RabbitMQ server host
- `MODEL_PATH`: Path to the LLM model file
- `LOG_LEVEL`: Logging level (default: INFO)

## Usage

Start the service:

```bash
python main.py
```

### Input Schema

The service expects messages in the following JSON format:

```json
{
	"title": "Article title",
	"content": "Article content",
	"url": "Article URL",
	"source": "Article source"
}
```

### Output

The service generates a concise summary of the input article, maintaining key information while reducing length.

## Error Handling

- Input validation using JSON Schema
- Automatic retry mechanism for failed generations
- Comprehensive logging for debugging
- Graceful shutdown handling

## Architecture

The service follows a message-driven architecture:

1. Receives messages from RabbitMQ queue
2. Validates input against schema
3. Generates summary using LLama 3.2 1B Instruct
4. Validates output
5. Publishes result to output queue

## Development

To run tests:

```bash
pytest tests/
```

## License

This project is part of Proximity, licensed under the **MIT License**.

---
