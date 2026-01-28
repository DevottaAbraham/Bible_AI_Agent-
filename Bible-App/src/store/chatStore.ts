import { create } from "zustand";

interface Message {
  from: string;
  text: string;
}

interface Chat {
  id: number;
  title: string;
  messages: Message[];
}

type ChatStore = {
  chats: Chat[];
  activeChat: number | null;
  newChat: () => void;
  sendMessage: (text: string) => void;
  setActive: (id: number) => void;
  deleteChat: (id: number) => void;
  renameChat: (id: number, title: string) => void;
};

export const useChat = create<ChatStore>((set) => ({
  chats: [],
  activeChat: null,

  newChat: () =>
    set((state) => {
      const chat: Chat = {
        id: Date.now(),
        title: "New Chat",
        messages: [],
      };
      return {
        chats: [chat, ...state.chats],
        activeChat: chat.id,
      };
    }),

  sendMessage: (text) =>
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.id === state.activeChat
          ? {
              ...chat,
              messages: [...chat.messages, { from: "user", text }],
            }
          : chat
      ),
    })),

  setActive: (id) => set({ activeChat: id }),

  deleteChat: (id) =>
    set((state) => ({
      chats: state.chats.filter((c) => c.id !== id),
      activeChat: null,
    })),

  renameChat: (id, title) =>
    set((state) => ({
      chats: state.chats.map((c) =>
        c.id === id ? { ...c, title } : c
      ),
    })),
}));
