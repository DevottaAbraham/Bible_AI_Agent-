import faiss
import pickle
import numpy as np
from sentence_transformers import SentenceTransformer

# Load embedding model
model = SentenceTransformer("all-MiniLM-L6-v2")

# Load FAISS index
index = faiss.read_index("vector_db/faiss.index")

# Load verse texts
with open("vector_db/texts.pkl", "rb") as f:
    texts = pickle.load(f)


def search(query: str, k: int = 5):
    # Convert query to embedding
    query_vector = model.encode([query])
    
    # Search similar vectors
    distances, indices = index.search(
        np.array(query_vector).astype("float32"),
        k
    )

    # Get matching verses
    results = [texts[i] for i in indices[0]]
    
    return "\n".join(results)
