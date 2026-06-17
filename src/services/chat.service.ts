import api from './api';
import type { Chat, Message } from '../models/Chat';

export const chatService = {
  async getAll(): Promise<Chat[]> {
    const { data } = await api.get('/chats');
    return data;
  },

  async getById(chatId: string): Promise<Chat> {
    const { data } = await api.get(`/chats/${chatId}`);
    return data;
  },

  async getMessages(chatId: string, page = 1, limit = 50): Promise<Message[]> {
    const { data } = await api.get(`/chats/${chatId}/messages`, {
      params: { page, limit },
    });
    return data;
  },
};
