import api from './api';
import type { Invitation } from '../models/Invitation';

export const invitationService = {
  async send(receiverId: string): Promise<Invitation> {
    const { data } = await api.post('/invitations', { receiverId });
    return data;
  },

  async getSent(): Promise<Invitation[]> {
    const { data } = await api.get('/invitations/sent');
    return data;
  },

  async getReceived(): Promise<Invitation[]> {
    const { data } = await api.get('/invitations/received');
    return data;
  },

  async accept(id: string): Promise<{ chatId: string }> {
    const { data } = await api.patch(`/invitations/${id}/accept`);
    return data;
  },

  async reject(id: string): Promise<void> {
    await api.patch(`/invitations/${id}/reject`);
  },
};
