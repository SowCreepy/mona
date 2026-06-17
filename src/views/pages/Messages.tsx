import { useState } from 'react';
import { Box, Typography, Card, CardActionArea, CardContent, CircularProgress, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useNavigate } from 'react-router-dom';
import { useChatListViewModel } from '../../viewmodels/useChatViewModel';
import { useAuthStore } from '../../stores/authStore';
import PlayerAvatar from '../components/PlayerAvatar';
import { chatService } from '../../services/chat.service';

function formatTime(dateStr: string): string {
  const date = new Date(dateStr);
  const diff = Date.now() - date.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'à l\'instant';
  if (mins < 60) return `il y a ${mins}min`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `il y a ${hours}h`;
  const days = Math.floor(hours / 24);
  return `il y a ${days}j`;
}

export default function Messages() {
  const navigate = useNavigate();
  const { chats, loading, fetchChats } = useChatListViewModel();
  const userId = useAuthStore((s) => s.user?.id);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirmId) return;
    setDeleting(true);
    try {
      await chatService.deleteChat(confirmId);
      await fetchChats();
    } finally {
      setDeleting(false);
      setConfirmId(null);
    }
  };

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', pt: 8 }}><CircularProgress sx={{ color: '#7C6FFF' }} /></Box>;
  }

  return (
    <Box sx={{ p: { xs: 2, md: 0 }, pb: { xs: 10, md: 2 } }}>
      <Typography variant="h5" sx={{ fontWeight: 700, color: 'white', mb: 3 }}>
        Messages
      </Typography>

      {chats.length === 0 ? (
        <Box sx={{ textAlign: 'center', pt: 8 }}>
          <Typography color="text.secondary" variant="h6">
            Aucune conversation
          </Typography>
          <Typography color="text.secondary" variant="body2" sx={{ mt: 1 }}>
            Accepte ou envoie une invitation pour démarrer une conversation
          </Typography>
        </Box>
      ) : (
        chats.map((chat) => {
          const other = chat.participants.find((p) => p.id !== userId);
          const last = chat.lastMessage ?? chat.messages?.[chat.messages.length - 1];

          return (
            <Card key={chat.id} sx={{ bgcolor: '#1A1A2E', borderRadius: 3, mb: 1.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CardActionArea
                  onClick={() => navigate(`/app/chat/${chat.id}`, { state: { otherParticipant: other } })}
                  sx={{ flex: 1 }}
                >
                  <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 1.5, '&:last-child': { pb: 1.5 } }}>
                    <PlayerAvatar
                      username={other?.username ?? '??'}
                      rank={other?.rank ?? 'Silver I'}
                      size={48}
                      avatarUrl={(other as any)?.avatarUrl}
                    />
                    <Box sx={{ flex: 1, overflow: 'hidden' }}>
                      <Typography sx={{ fontWeight: 600, color: 'white' }}>
                        {other?.username ?? 'Inconnu'}
                      </Typography>
                      {last && (
                        <Typography variant="body2" color="text.secondary" noWrap>
                          {last.content}
                        </Typography>
                      )}
                    </Box>
                    {last && (
                      <Typography variant="caption" color="text.secondary">
                        {formatTime(last.createdAt)}
                      </Typography>
                    )}
                  </CardContent>
                </CardActionArea>
                <IconButton
                  onClick={(e) => { e.stopPropagation(); setConfirmId(chat.id); }}
                  sx={{ color: '#FF5252', px: 2 }}
                >
                  <DeleteOutlinedIcon />
                </IconButton>
              </Box>
            </Card>
          );
        })
      )}

      <Dialog
        open={!!confirmId}
        onClose={() => setConfirmId(null)}
        PaperProps={{ sx: { bgcolor: '#1A1A2E', color: 'white', borderRadius: 3 } }}
      >
        <DialogTitle sx={{ fontWeight: 700 }}>Supprimer la conversation ?</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: 'text.secondary' }}>
            Cette action supprimera tous les messages. Le joueur pourra réapparaître dans la recherche.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ pb: 2, px: 3, gap: 1 }}>
          <Button onClick={() => setConfirmId(null)} sx={{ color: 'text.secondary' }}>
            Annuler
          </Button>
          <Button
            onClick={handleDelete}
            disabled={deleting}
            variant="contained"
            sx={{ bgcolor: '#FF5252', '&:hover': { bgcolor: '#d32f2f' } }}
          >
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
