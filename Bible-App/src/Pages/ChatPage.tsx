import { useState } from "react";
import {ChatWindow }from "../Components/ChatWindow";
import {ChatInput} from "../Components/ChatInput";
import { sendMessage } from "../api/chatApi";

export default function ChatPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async (text: string) => {
    setMessages((prev) => [
      ...prev,
      { role: "user", content: text }
    ]);

    setLoading(true);

    try {
      const data = await sendMessage(text);

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.answer }
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Server error" }
      ]);
    }

    setLoading(false);
  };

  return (
    <>
      <ChatWindow messages={messages} loading={loading} />
      <ChatInput onSend={handleSend} />
    </>
  );
}
