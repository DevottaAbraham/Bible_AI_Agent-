export interface Message {
  from: 'user' | 'ai';
  text: string;
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
}