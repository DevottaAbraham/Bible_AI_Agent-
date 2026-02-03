import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Chat, Message } from '../types';
import { sendMessage as apiSendMessage } from '../api/chatApi';

interface ChatState {
  chats: Chat[];
  activeChat: string | null;
  setActive: (id: string) => void;
  newChat: () => void;
  deleteChat: (id: string) => void;
  renameChat: (id: string, title: string) => void;
  sendMessage: (text: string) => Promise<void>;
}

export const useChat = create<ChatState>()(
  persist(
    (set, get) => ({
      chats: [],
      activeChat: null,

      setActive: (id) => set({ activeChat: id }),

      newChat: () => {
        const newChat: Chat = {
          id: Date.now().toString(),
          title: 'New Chat',
          messages: [],
          createdAt: Date.now(),
        };
        set((state) => ({
          chats: [newChat, ...state.chats],
          activeChat: newChat.id,
        }));
      },

      deleteChat: (id) =>
        set((state) => {
          const newChats = state.chats.filter((c) => c.id !== id);
          // If we deleted the active chat, switch to the first available one or null
          const newActive = state.activeChat === id 
            ? (newChats.length > 0 ? newChats[0].id : null) 
            : state.activeChat;
            
          return {
            chats: newChats,
            activeChat: newActive,
          };
        }),

      renameChat: (id, title) =>
        set((state) => ({
          chats: state.chats.map((c) =>
            c.id === id ? { ...c, title } : c
          ),
        })),

      sendMessage: async (text) => {
        const { activeChat } = get();
        if (!activeChat) return;

        const userMsg: Message = { from: 'user', text };

        // Optimistic update: Add user message immediately
        set((state) => ({
          chats: state.chats.map((c) =>
            c.id === activeChat
              ? { ...c, messages: [...c.messages, userMsg] }
              : c
          ),
        }));

        try {
          const response = await apiSendMessage(text);
          const aiMsg: Message = { from: 'ai', text: response.answer };

          set((state) => ({
            chats: state.chats.map((c) =>
              c.id === activeChat
                ? { ...c, messages: [...c.messages, aiMsg] }
                : c
            ),
          }));
        } catch (error) {
          console.error('Failed to send message', error);
        }
      },
    }),
    {
      name: 'bible-chat-storage', // unique name for local storage
    }
  )
);