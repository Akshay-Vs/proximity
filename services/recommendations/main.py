import torch
from .rec_1.rec_1 import recommendationModel
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import httpx
import logging
import os

app = FastAPI()
@app.get("/")
async def read_root():
    return {"message": "Welcome to the Recommendation API"}

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Hyperparameters
batch = 1
timesteps = 5
head_dim = 64
num_heads = 12
hidden_dim = 128
num_layers = 2
embedding_dim = 768  # Dimension of BERT embeddings

# Load the recommendation model
try:
    rec_model = recommendationModel(batch=batch,
                                    timesteps=timesteps,
                                    head_dim=head_dim,
                                    num_heads=num_heads,
                                    hidden_dim=hidden_dim,
                                    num_layers=num_layers,
                                    output_dim=embedding_dim)
    logger.info("Recommendation model loaded successfully.")
except Exception as e:
    logger.error(f"Error loading recommendation model: {e}")
    raise HTTPException(status_code=500, detail="Error loading recommendation model")

# To validate the JSON
class JSONData(BaseModel):
    NewsTitle: str
    NewsTLDR: str
    Liked: str

def apply_prompt(d):
    return [f"Head line: {data.NewsTitle}\nSummery: {data.NewsTLDR}\nLiked: {data.Liked}" for data in d]

@app.post("/history/")
async def recommend(data: list[JSONData]):
    try:
        with torch.no_grad():
            # Generate embeddings
            embed = rec_model(apply_prompt(data))

        url = os.getenv("VECTORSTORE_URL", "http://127.0.0.1:8000/search")

        # NOTE: number of news recommending, k = timeseries
        payload = {
            "embedding": embed.squeeze(0).tolist(),  # Convert tensor to list for JSON serialization
            "top_k": timesteps
        }

        async with httpx.AsyncClient() as client:
            response = await client.post(url, json=payload)
            response.raise_for_status()
            result = response.json()

        logger.info("Received response from vector store.")
        return result

    except httpx.HTTPStatusError as e:
        logger.error(f"HTTP error from vector store: {e}")
        raise HTTPException(status_code=500, detail="Error communicating with vector store")
    except Exception as e:
        logger.error(f"Error in recommendation process: {e}")
        raise HTTPException(status_code=500, detail="Error in recommendation process")