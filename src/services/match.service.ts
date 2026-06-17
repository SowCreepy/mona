import api from './api';
import type { MatchResult } from '../models/Player';

export interface CreateMatchPayload {
  isWin: boolean;
  map: string;
  kills: number;
  deaths: number;
}

export const matchService = {
  async create(payload: CreateMatchPayload): Promise<MatchResult> {
    const { data } = await api.post('/matches', payload);
    return data;
  },

  async getMyMatches(): Promise<MatchResult[]> {
    const { data } = await api.get('/matches/me');
    return data;
  },

  async getByPlayerId(playerId: string): Promise<MatchResult[]> {
    const { data } = await api.get(`/players/${playerId}/matches`);
    return data;
  },
};
