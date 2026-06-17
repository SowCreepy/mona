import { useState, useRef, useEffect } from 'react';
import type { FormEvent } from 'react';
import { Box, Typography, TextField, IconButton, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useParams, useNavigate } from 'react-router-dom';
import { useChatRoomViewModel } from '../../viewmodels/useChatViewModel';
import { useAuthStore } from '../../stores/authStore';
import PlayerAvatar from '../components/PlayerAvatar';

export default function ChatRoom() {
  const { chatId } = useParams<{ chatId: string }>();
  const navigate = useNavigate();
  const { messages, loading, sendMessage, otherParticipant } = useChatRoomViewModel(chatId!);
  const userId = useAuthStore((s) => s.user?.id);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e: FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    sendMessage(text);
    setInput('');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 2, borderBottom: '1px solid #1A1A2E' }}>
        <IconButton onClick={() => navigate('/app/messages')} sx={{ color: '#7C6FFF' }}>
          <ArrowBackIcon />
        </IconButton>
        {otherParticipant ? (
          <Box
            onClick={() => navigate(`/app/player/${otherParticipant.id}`)}
            sx={{ display: 'flex', alignItems: 'center', gap: 1.5, cursor: 'pointer', flex: 1 }}
          >
            <PlayerAvatar username={otherParticipant.username} rank={otherParticipant.rank} size={36} avatarUrl={otherParticipant.avatarUrl} />
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'white', lineHeight: 1.2 }}>
                {otherParticipant.username}
              </Typography>
              <Typography variant="caption" sx={{ color: '#7C6FFF' }}>
                Voir le profil
              </Typography>
            </Box>
          </Box>
        ) : (
          <Typography variant="h6" sx={{ fontWeight: 600, color: 'white' }}>Chat</Typography>
        )}
      </Box>

      <Box sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress size={24} sx={{ color: '#7C6FFF' }} />
          </Box>
        )}
        {messages.map((msg) => {
          const isMine = msg.senderId === userId;
          return (
            <Box
              key={msg.id}
              sx={{
                display: 'flex',
                justifyContent: isMine ? 'flex-end' : 'flex-start',
                mb: 1,
              }}
            >
              <Box
                sx={{
                  bgcolor: isMine ? '#7C6FFF' : '#1A1A2E',
                  color: 'white',
                  borderRadius: 3,
                  px: 2,
                  py: 1,
                  maxWidth: { xs: '75%', md: '55%' },
                }}
              >
                <Typography variant="body2">{msg.content}</Typography>
                <Typography variant="caption" sx={{ opacity: 0.6, display: 'block', textAlign: 'right', mt: 0.5 }}>
                  {new Date(msg.createdAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                </Typography>
              </Box>
            </Box>
          );
        })}
        <div ref={bottomRef} />
      </Box>

      <Box
        component="form"
        onSubmit={handleSend}
        sx={{
          display: 'flex',
          gap: 1,
          p: 2,
          borderTop: '1px solid #1A1A2E',
        }}
      >
        <TextField
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Message..."
          fullWidth
          size="small"
          autoComplete="off"
        />
        <IconButton type="submit" sx={{ color: '#7C6FFF' }}>
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
