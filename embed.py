import json
import faiss
import pickle
import numpy as np
from sentence_transformers import SentenceTransformer # pyright: ignore[reportMissingImports]

# load model
model = SentenceTransformer("all-MiniLM-L6-v2")

# load bible json
with open("data/Bible.json", "r", encoding="utf-8") as f:
    bible = json.load(f)

texts = []

for book, chapters in bible.items():
    for ch, verses in chapters.items():
        for v, text in verses.items():
            texts.append(f"{book} {ch}:{v} - {text}")

print("Total verses:", len(texts))

# create embeddings
embeddings = model.encode(
    texts,
    show_progress_bar=True,
    convert_to_numpy=True
)

dimension = embeddings.shape[1]

# create FAISS index
index = faiss.IndexFlatL2(dimension)
index.add(embeddings)

# save index
faiss.write_index(index, "vector_Db/faiss.index")

# save texts
with open("vector_Db/texts.pkl", "wb") as f:
    pickle.dump(texts, f)

print("✅ Embedding complete")
