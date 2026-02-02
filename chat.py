import requests
import json

API_KEY="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"

BASE_URL = "https://api.groq.com/openai/v1"
MODEL = "llama-3.1-8b-instant"


def ask_llm(context, question):

    payload = {
        "model": MODEL,
        "messages": [
            {
                "role": "system",
                "content": "Answer only using the Bible verses provided."
            },
            {
                "role": "user",
                "content": f"{context}\n\nQuestion: {question}"
            }
        ],
        "temperature": 0.2
    }

    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }

    response = requests.post(
        BASE_URL + "/chat/completions",
        headers=headers,
        json=payload,
        timeout=60
    )

    #  DEBUG OUTPUT
    data = response.json()

    print("🔵 GROQ RESPONSE:")
    print(json.dumps(data, indent=2))

    #  ERROR FROM GROQ
    if "error" in data:
        return f"GROQ ERROR: {data['error']['message']}"

    #  SUCCESS
    return data["choices"][0]["message"]["content"]
