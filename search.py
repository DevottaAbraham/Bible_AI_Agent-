import faiss
import pickle
from sentence_transformers import SentenceTransformer
model=SentenceTransformer("all-MiniLM-l6-v2")
index=faiss.read_index("vector_Db/faiss.index")
with open("vector_Db/texts.pkl","rb") as f:
    text=pickle.load(f)
    def search(query,k=5):
        query_vector=model.encode([query])
        distances,indices=index.search(query_vector,k)
        results=[]
        for idk in indices[0]:
            results.append(text[idk])
        return results
        
