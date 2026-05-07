import { io, Socket } from 'socket.io-client';
import { getAccessToken } from './api';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3000';

let socket: Socket | null = null;

export const socketService = {
  connect() {
    const token = getAccessToken();
    if (!token || socket?.connected) return;

    socket = io(SOCKET_URL, {
      auth: { token },
      transports: ['websocket'],
    });

    socket.on('connect', () => {
      console.log('[Socket] Connected');
    });

    socket.on('disconnect', () => {
      console.log('[Socket] Disconnected');
    });
  },

  disconnect() {
    socket?.disconnect();
    socket = null;
  },

  getSocket(): Socket | null {
    return socket;
  },

  joinChat(chatId: string) {
    socket?.emit('chat:join', { chatId });
  },

  sendMessage(chatId: string, content: string) {
    socket?.emit('chat:send', { chatId, content });
  },

  on<T = unknown>(event: string, handler: (data: T) => void) {
    socket?.on(event, handler as (...args: unknown[]) => void);
  },

  off(event: string) {
    socket?.off(event);
  },
};
