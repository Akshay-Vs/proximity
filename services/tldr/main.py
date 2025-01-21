from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import llm
import os

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize the LLM model
model = llm.LLM(
    context_window=8000,
    max_tokens=1024,
    n_gpu_layers=-1,
    n_batch=1024,
    temperature=0.3,
    model_path="./models/Llama-3.2-1B-Instruct-Q4_K_M.gguf",
    system_prompt="""
    You are an excellent text summarizer. Your task is to create a TL;DR news summary that encapsulates the essential details from a web-scraped article. The summary should be informative, clear, and concise, fitting into a single paragraph.
    Only respond with valid JSON, nothing else. Use this structure:
    {
    "headline": "<headline>",
    "summary": "<summary>"
    }

    News Article:
    """,
)


@app.get("/")
def read_root():
    return {"message": "Welcome to the Summarization API"}


@app.post("/generate")
async def generate(req: Request):
    try:
        # Parse the incoming JSON request body
        body = await req.json()

        # Validate that 'prompt' exists in the parsed body
        if "prompt" not in body:
            return JSONResponse(
                status_code=400,
                content={"error": "Missing 'prompt' in the request body."},
            )

        # Generate response using the model
        prompt = body["prompt"]
        response = model.generate_response(prompt)

        # Format the response (if necessary)
        formatted_response = model.format_response(response)

        return JSONResponse(content={"summary": formatted_response})
    except Exception as e:
        # Catch and return any errors during processing
        print(e)
        return JSONResponse(
            status_code=500,
            content={
                "error": "An error occurred while processing the request.",
            },
        )
