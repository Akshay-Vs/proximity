from fastapi import FastAPI, Request
from fastapi.responses import StreamingResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import asyncio
from llm import LLM  # Import the LLM class

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
    model = LLM(
        model_path="./models/Llama-3.2-1B-Instruct-Q4_K_M.gguf",
        temperature=0.3,
        max_tokens=512,
        context_window=4096,  # Reduced for better performance
        n_gpu_layers=-1,
        n_batch=512,
    )
    print("LLM Model Loaded Successfully")


@app.get("/")
async def root():
    return {"message": "Welcome to the Proximity API!"}


@app.post("/generate")
async def generate(req: Request):
    try:
        body = await req.json()
        if "prompt" not in body:
            return JSONResponse(
                status_code=400, content={"error": "Missing 'prompt' in request."}
            )

        prompt = body["prompt"]

        # Stream response properly
        async def stream():
            async for chunk in model.generate_response(prompt).__aiter__():
                yield chunk.encode("utf-8")

        return StreamingResponse(stream(), media_type="text/plain")

    except Exception as e:
        print(e)
        return JSONResponse(
            status_code=500, content={"error": "An error occurred while processing."}
        )
