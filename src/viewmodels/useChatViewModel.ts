import { useState, useCallback, useEffect, useRef } from 'react';
import type { Chat, Message } from '../models/Chat';
import { chatService } from '../services/chat.service';
import { socketService } from '../services/socket.service';

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
  const pageRef = useRef(1);

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
  }, [chatId, fetchMessages]);

  const loadMore = useCallback(() => {
    fetchMessages(pageRef.current + 1);
  }, [fetchMessages]);

  return { messages, loading, sendMessage, loadMore };
}
