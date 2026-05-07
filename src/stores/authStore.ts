import { create } from 'zustand';
import type { Player } from '../models/Player';
import { authService } from '../services/auth.service';
import { playerService } from '../services/player.service';
import { socketService } from '../services/socket.service';

interface AuthState {
  user: Player | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<void>;
  fetchUser: () => Promise<void>;
  updateUser: (data: Partial<Player>) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  login: async (email, password) => {
    await authService.login({ email, password });
    const user = await playerService.getMe();
    set({ user, isAuthenticated: true, isLoading: false });
    socketService.connect();
  },

  register: async (email, username, password) => {
    await authService.register({ email, username, password });
    const user = await playerService.getMe();
    set({ user, isAuthenticated: true, isLoading: false });
    socketService.connect();
  },

  logout: async () => {
    socketService.disconnect();
    await authService.logout();
    set({ user: null, isAuthenticated: false });
  },

  refreshAuth: async () => {
    try {
      await authService.refresh();
      const user = await playerService.getMe();
      set({ user, isAuthenticated: true, isLoading: false });
      socketService.connect();
    } catch {
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },

  fetchUser: async () => {
    const user = await playerService.getMe();
    set({ user });
  },

  updateUser: (data) => {
    set((state) => ({
      user: state.user ? { ...state.user, ...data } : null,
    }));
  },
}));
