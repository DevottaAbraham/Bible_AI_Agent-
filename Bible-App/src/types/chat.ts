export type Message = {
  from: "user" | "bot";
  text: string;
};

export type Chat = {
  id: number;
  title: string;
  messages: Message[];
};
