# LLM-Based Text Summarization API

This project provides a FastAPI-based API for generating concise summaries of text using a custom fine-tuned Llama model. The model and associated tools are set up using the provided setup script.

---

## Features

- **Custom Model**: Utilizes the Llama-3.2-1B-Instruct model for text summarization.
- **RESTful API**: Easy-to-use endpoints for interacting with the summarization model.
- **JSON Response**: Generates summaries in a structured JSON format.

---

## Requirements

- Python 3.8 or higher
- Internet connection for downloading the model

---

## Setup

- Run the setup script to install the required packages and download the model:

```bash
python setup.py
```

---

## Usage

### Run the API Server

Start the FastAPI server with the following command:

```bash
uvicorn main:app --reload
```

This will start the server on `http://127.0.0.1:8000`.

### API Endpoints

#### 1. Root Endpoint

- **URL**: `/`
- **Method**: GET
- **Response**: `{ "Hello": "World" }`

#### 2. Summarization Endpoint

- **URL**: `/generate`
- **Method**: POST
- **Request Body**:

  ```json
  {
  	"prompt": "Your input text here"
  }
  ```

- **Response**:

  ```json
  {
  	"summary": {
  		"heading": "Summarized Title",
  		"content": "A brief and concise summary under 100 words."
  	}
  }
  ```

---

## Project Structure

- **main.py**: Contains the FastAPI application and endpoints.
- **llm.py**: Defines the LLM class for interacting with the Llama model.
- **setup.py**: Automates the environment and model setup.
- **requirements.txt**: Specifies Python dependencies.

---

## Troubleshooting

- **CUDA Error**: Ensure you have the correct GPU drivers installed. The setup script attempts to enable CUDA but may require manual intervention.
- **Model Download Issues**: Verify your internet connection and Hugging Face CLI credentials.

---

## License

This project is open-source and available under the MIT License. See the `LICENSE` file for details.

---

## Acknowledgments

- [Hugging Face](https://huggingface.co/) for model hosting and tools.
- The developers of `llama_cpp_agent` for providing the foundational libraries for this project.
