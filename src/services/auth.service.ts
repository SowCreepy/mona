import api, { setAccessToken } from './api';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  username: string;
  password: string;
}

export const authService = {
  async login(payload: LoginPayload) {
    const { data } = await api.post('/auth/login', payload);
    setAccessToken(data.accessToken);
    return data;
  },

  async register(payload: RegisterPayload) {
    const { data } = await api.post('/auth/register', payload);
    setAccessToken(data.accessToken);
    return data;
  },

  async refresh() {
    const { data } = await api.post('/auth/refresh');
    setAccessToken(data.accessToken);
    return data;
  },

  async logout() {
    try {
      await api.post('/auth/logout');
    } finally {
      setAccessToken(null);
    }
  },
};
