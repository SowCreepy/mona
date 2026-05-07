export interface Chat {
  id: string;
  createdAt: string;
  participants: { id: string; username: string; rank: string }[];
  messages: Message[];
  lastMessage?: Message | null;
}

export interface Message {
  id: string;
  content: string;
  senderId: string;
  chatId: string;
  createdAt: string;
  sender?: { id: string; username: string };
}
