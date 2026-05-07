import { Box, Typography, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useInvitationViewModel } from '../../viewmodels/useInvitationViewModel';
import InvitationCard from '../components/InvitationCard';

export default function Matchmaking() {
  const navigate = useNavigate();
  const { received, loading, accept, reject } = useInvitationViewModel();

  const handleAccept = async (id: string) => {
    const chatId = await accept(id);
    if (chatId) {
      navigate(`/app/chat/${chatId}`);
    }
  };

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', pt: 8 }}><CircularProgress sx={{ color: '#7C6FFF' }} /></Box>;
  }

  return (
    <Box sx={{ p: { xs: 2, md: 0 }, pb: { xs: 10, md: 2 } }}>
      <Typography variant="h5" sx={{ fontWeight: 700, color: 'white', mb: 3 }}>
        Invitations reçues
      </Typography>

      {received.length === 0 ? (
        <Box sx={{ textAlign: 'center', pt: 8 }}>
          <Typography color="text.secondary" variant="h6">
            Aucune invitation
          </Typography>
          <Typography color="text.secondary" variant="body2" sx={{ mt: 1 }}>
            Active ta disponibilité dans ton profil pour recevoir des invitations
          </Typography>
        </Box>
      ) : (
        received.map((inv) => (
          <InvitationCard
            key={inv.id}
            invitation={inv}
            type="received"
            onAccept={handleAccept}
            onReject={reject}
          />
        ))
      )}
    </Box>
  );
}
