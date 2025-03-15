import faiss
from transformers import BertModel, BertTokenizer
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import torch
import logging


app = FastAPI()

@app.get("/")
async def read_root():
    return {"message": "Welcome to the Vectorstore API"}

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load BERT Model and Tokenizer
try:
    tokenizer = BertTokenizer.from_pretrained("bert-base-uncased")
    model = BertModel.from_pretrained("bert-base-uncased")
    logger.info("BERT model and tokenizer loaded successfully.")
except Exception as e:
    logger.error(f"Error loading BERT model or tokenizer: {e}")
    raise HTTPException(status_code=500, detail="Error loading BERT model or tokenizer")

# BERT embedding dimension
embedd_dim = 768
index = faiss.IndexFlatL2(embedd_dim)

class EmbeddingRequest(BaseModel):
    embedding: list[float]  # List of floats for JSON compatibility
    top_k: int = 5   # Default value of top_k

class NewsItem(BaseModel):
    NewsID: int
    NewsTitle: str
    NewsTLDR: str
    ReadingTime: int
    Liked: str

# Function to get sentence embedding
def get_embedding(text: str) -> torch.Tensor:
    inputs = tokenizer(text, return_tensors="pt", truncation=True, padding="max_length", max_length=128)
    with torch.no_grad():
        outputs = model(**inputs)
    cls_embedding = outputs.pooler_output  # CLS token embedding (768-d vector)
    return cls_embedding.squeeze(0)

@app.post("/news/")
def add_to_vectorstore(news: list[NewsItem]):
    """
    Adds the given embeddings to the vector store.

    Args:
        news (list[dict]): The news articles to add to the vector store.
    """
    try:
        embeddings = torch.stack([get_embedding(item.NewsTitle + " " + item.NewsTLDR) for item in news])
        index.add(embeddings.numpy())  # Convert to numpy array before adding to FAISS
        logger.info("Embeddings added to vector store.")
        return {"status": "success"}
    except Exception as e:
        logger.error(f"Error adding embeddings to vector store: {e}")
        raise HTTPException(status_code=500, detail="Error adding embeddings to vector store")

@app.post("/search/")
def similarity_search(request: EmbeddingRequest):
    """
    Searches for the most similar embeddings to the given embedding.

    Args:
        request (EmbeddingRequest): The embedding to search for and the number of top results.

    Returns:
        dict: The indices of the most similar embeddings.
    """
    try:
        embedding_tensor = torch.tensor(request.embedding).unsqueeze(0)  # Convert list to tensor and add batch dimension
        _, indices = index.search(embedding_tensor.numpy(), request.top_k)
        return {"result": indices.tolist()}
    except Exception as e:
        logger.error(f"Error performing similarity search: {e}")
        raise HTTPException(status_code=500, detail="Error performing similarity search")