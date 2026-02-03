from fastapi import FastAPI
from pydantic import BaseModel
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

import faiss
import pickle
from sentence_transformers import SentenceTransformer

from chat import ask_llm

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load FAISS + texts
index = faiss.read_index("vector_db/faiss.index")

with open("vector_db/texts.pkl", "rb") as f:
    texts = pickle.load(f)

model = SentenceTransformer("all-MiniLM-L6-v2")

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
def chat(req: ChatRequest):
    query_embedding = model.encode([req.message])
    D, I = index.search(query_embedding, k=5)

    context = "\n".join([texts[i] for i in I[0]])
    answer = ask_llm(context, req.message)

    return {"answer": answer}
