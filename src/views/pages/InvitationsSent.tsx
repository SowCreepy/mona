import { Box, Typography, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useInvitationViewModel } from '../../viewmodels/useInvitationViewModel';
import InvitationCard from '../components/InvitationCard';

export default function InvitationsSent() {
  const navigate = useNavigate();
  const { sent, loading } = useInvitationViewModel();

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', pt: 8 }}><CircularProgress sx={{ color: '#7C6FFF' }} /></Box>;
  }

  return (
    <Box sx={{ p: { xs: 2, md: 0 }, pb: { xs: 10, md: 2 } }}>
      <Typography variant="h5" sx={{ fontWeight: 700, color: 'white', mb: 3 }}>
        Invitations envoyées
      </Typography>

      {sent.length === 0 ? (
        <Box sx={{ textAlign: 'center', pt: 8 }}>
          <Typography color="text.secondary" variant="h6">
            Aucune invitation envoyée
          </Typography>
        </Box>
      ) : (
        sent.map((inv) => (
          <InvitationCard
            key={inv.id}
            invitation={inv}
            type="sent"
            onChat={(chatId) => navigate(`/app/chat/${chatId}`)}
          />
        ))
      )}
    </Box>
  );
}
