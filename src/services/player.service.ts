import api from './api';
import type { Player } from '../models/Player';

export const playerService = {
  async getMe(): Promise<Player> {
    const { data } = await api.get('/players/me');
    return data;
  },

  async updateMe(payload: Partial<Pick<Player, 'username' | 'elo' | 'steamUrl'>>): Promise<Player> {
    const { data } = await api.patch('/players/me', payload);
    return data;
  },

  async toggleAvailability(): Promise<{ isAvailable: boolean }> {
    const { data } = await api.patch('/players/me/availability');
    return data;
  },

  async getAvailable(): Promise<Player[]> {
    const { data } = await api.get('/players/available');
    return data;
  },

  async getById(id: string): Promise<Player> {
    const { data } = await api.get(`/players/${id}`);
    return data;
  },

  async uploadAvatar(file: File): Promise<{ id: string; avatarUrl: string }> {
    const formData = new FormData();
    formData.append('file', file);
    const { data } = await api.post('/players/me/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },
};
