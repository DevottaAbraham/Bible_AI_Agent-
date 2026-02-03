import os
import requests
from dotenv import load_dotenv
load_dotenv()

API_KEY = os.getenv("OPENAI_API_KEY")
BASE_URL = os.getenv("OPENAI_BASE_URL")


def ask_llm(context: str, question: str):

    if not API_KEY:
        raise Exception("OPENAI_API_KEY not found in .env")

    url = BASE_URL + "/chat/completions"

    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "model": "llama-3.1-8b-instant",   # SAFE model
        "messages": [
            {
                "role": "system",
                "content": "You are a Bible assistant. Answer only using the provided context."
            },
            {
                "role": "user",
                "content": f"Context:\n{context}\n\nQuestion:\n{question}"
            }
        ],
        "temperature": 0.3
    }

    response = requests.post(url, headers=headers, json=payload)

    data = response.json()

    # print("🔵 OpenAI Response:", data)

    if "choices" not in data:
        raise Exception(f"OpenAI Error: {data}")

    return data["choices"][0]["message"]["content"]
