import { useState, useCallback, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import type { Chat, Message } from '../models/Chat';
import { chatService } from '../services/chat.service';
import { socketService } from '../services/socket.service';
import { useAuthStore } from '../stores/authStore';

export function useChatListViewModel() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchChats = useCallback(async () => {
    setLoading(true);
    const data = await chatService.getAll();
    setChats(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  return { chats, loading, fetchChats };
}

export function useChatRoomViewModel(chatId: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const stateParticipant = (location.state as { otherParticipant?: { id: string; username: string; rank: string; avatarUrl?: string | null } } | null)?.otherParticipant ?? null;
  const [otherParticipant, setOtherParticipant] = useState<{ id: string; username: string; rank: string; avatarUrl?: string | null } | null>(stateParticipant);
  const pageRef = useRef(1);
  const userId = useAuthStore((s) => s.user?.id);

  const fetchMessages = useCallback(async (page = 1) => {
    setLoading(true);
    const data = await chatService.getMessages(chatId, page);
    if (page === 1) {
      setMessages(data);
    } else {
      setMessages((prev) => [...prev, ...data]);
    }
    pageRef.current = page;
    setLoading(false);
  }, [chatId]);

  const sendMessage = useCallback((content: string) => {
    socketService.sendMessage(chatId, content);
  }, [chatId]);

  useEffect(() => {
    if (!stateParticipant) {
      chatService.getById(chatId).then((chat) => {
        const other = chat.participants.find((p) => p.id !== userId) ?? null;
        setOtherParticipant(other);
      }).catch(() => {/* endpoint non disponible, otherParticipant reste null */});
    }

    socketService.joinChat(chatId);
    fetchMessages();

    socketService.on<{ chatId: string; message: Message }>('chat:message', (data) => {
      if (data.chatId === chatId) {
        setMessages((prev) => [...prev, data.message]);
      }
    });

    return () => {
      socketService.off('chat:message');
    };
  }, [chatId, fetchMessages, userId]);

  const loadMore = useCallback(() => {
    fetchMessages(pageRef.current + 1);
  }, [fetchMessages]);

  return { messages, loading, sendMessage, loadMore, otherParticipant };
}
