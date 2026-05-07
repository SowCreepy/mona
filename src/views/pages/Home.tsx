import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

export default function Home() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          gap: 3,
        }}
      >
        <SportsEsportsIcon sx={{ fontSize: 80, color: '#7C6FFF' }} />
        <Typography variant="h2" sx={{ fontWeight: 800, color: 'white' }}>
          MONA
        </Typography>
        <Typography variant="h6" sx={{ color: 'text.secondary', maxWidth: 320 }}>
          Trouve ton dernier coéquipier CS2. Swipe, match, joue.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/login')}
            sx={{ bgcolor: '#7C6FFF', '&:hover': { bgcolor: '#6B5EEE' }, px: 4 }}
          >
            Connexion
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate('/register')}
            sx={{ borderColor: '#7C6FFF', color: '#7C6FFF', px: 4 }}
          >
            Inscription
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
