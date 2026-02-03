// src/api/chatApi.ts

export interface ChatResponse {
  answer: string;
}

export const sendMessage = async (
  text: string
): Promise<ChatResponse> => {
  try {
    const response = await fetch("http://127.0.0.1:8000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: text,
      }),
    });

    // Check if backend responded correctly
    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Backend Error:", errorText);
      throw new Error("Backend error");
    }

    const data = await response.json();

    // Backend must return { answer: "..." }
    return {
      answer: data.answer,
    };
  } catch (error) {
    console.error("❌ API Error:", error);
    throw error;
  }
};
