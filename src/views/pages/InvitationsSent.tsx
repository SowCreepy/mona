import { Box, Typography, CircularProgress, IconButton, Snackbar, Alert } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { useInvitationViewModel } from '../../viewmodels/useInvitationViewModel';
import InvitationCard from '../components/InvitationCard';

export default function InvitationsSent() {
  const navigate = useNavigate();
  const { sent, loading, cancel, error } = useInvitationViewModel();

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', pt: 8 }}><CircularProgress sx={{ color: '#7C6FFF' }} /></Box>;
  }

  return (
    <Box sx={{ p: { xs: 2, md: 0 }, pb: { xs: 10, md: 2 } }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
        <IconButton onClick={() => navigate('/app/profile')} sx={{ color: '#7C6FFF', ml: -1 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" sx={{ fontWeight: 700, color: 'white' }}>
          Invitations envoyées
        </Typography>
      </Box>

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
            onCancel={cancel}
            onChat={(chatId) => navigate(`/app/chat/${chatId}`)}
          />
        ))
      )}

      <Snackbar open={!!error} autoHideDuration={4000} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    </Box>
  );
}
