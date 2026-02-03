import json
import os
import pickle
import faiss
import numpy as np
from sentence_transformers import SentenceTransformer

# Load Bible JSON
with open("data/Bible.json", "r", encoding="utf-8") as f:
    bible = json.load(f)

texts = []

for book, chapters in bible.items():
    for ch, verses in chapters.items():
        for v, text in verses.items():
            texts.append(f"{book} {ch}:{v} {text}")

print("Total verses:", len(texts))

model = SentenceTransformer("all-MiniLM-L6-v2")
embeddings = model.encode(texts, show_progress_bar=True)
embeddings = np.array(embeddings).astype("float32")

dim = embeddings.shape[1]
index = faiss.IndexFlatL2(dim)
index.add(embeddings)

os.makedirs("vector_db", exist_ok=True)

faiss.write_index(index, "vector_db/faiss.index")

with open("vector_db/texts.pkl", "wb") as f:
    pickle.dump(texts, f)

print("✅ FAISS vector DB created")
