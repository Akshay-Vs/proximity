from fastapi import FastAPI, Request
from fastapi.responses import StreamingResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware

import asyncio
import json
from jsonschema import Draft7Validator

from schema.input_schema import input_schema
from libs.generate_with_retry import generate_with_retry
from libs.model import load_llm

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize LLM in the background to avoid blocking the API
model = None


@app.on_event("startup")
async def load_model():
    global model
    model = load_llm("./models/Llama-3.2-1B-Instruct-Q4_K_M.gguf")
    print("LLM Model Loaded Successfully")


# Welcome message
@app.get("/")
async def root():
    return {"message": "Welcome to the Proximity API!"}


# Define the route for generating summaries
@app.post("/generate")
async def generate(req: Request):
    print("Received request")
    try:
        body = await req.json()
        # initialize the validators
        input_validator = Draft7Validator(input_schema)

        # validate the input
        print("Validating input...")
        input_errors = list(input_validator.iter_errors(body))
        if input_errors:
            print(input_errors)
            error_messages = [
                {"path": list(input_errors.path), "message": input_errors.message}
                for input_errors in input_errors
            ]
            return JSONResponse(
                status_code=400,
                content={"error": "Validation failed", "errors": error_messages},
            )

        # generate the response
        generated_response = await generate_with_retry(model, json.dumps(body))

        if (generated_response is None) or (generated_response == ""):
            return JSONResponse(
                status_code=500,
                content={"error": "An error occurred while processing."},
            )

        return JSONResponse(status_code=200, content=generated_response)

    except Exception as e:
        print(e)
        return JSONResponse(
            status_code=500, content={"error": "An error occurred while processing."}
        )
