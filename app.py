from fastapi import FastAPI
from search import search
from fastapi.middleware.cors import CORSMiddleware
from chat import ask_llm
import os

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/chat")
def chat(req: dict):
    question = req["message"]
    verses = search(question)
    context = "\n".join(verses)
    answer = ask_llm(context, question)
    return { "answer": answer }
