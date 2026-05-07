import { useState } from 'react';
import type { FormEvent } from 'react';
import { Box, TextField, Button, Typography, Container, Alert, Link } from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

export default function Register() {
  const navigate = useNavigate();
  const register = useAuthStore((s) => s.register);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(email, username, password);
      navigate('/app/profile');
    } catch {
      setError('Erreur lors de l\'inscription');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 3,
        }}
      >
        <SportsEsportsIcon sx={{ fontSize: 48, color: '#7C6FFF' }} />
        <Typography variant="h4" sx={{ fontWeight: 700, color: 'white' }}>
          Inscription
        </Typography>

        {error && <Alert severity="error" sx={{ width: '100%' }}>{error}</Alert>}

        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Pseudo"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Mot de passe"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            slotProps={{ htmlInput: { minLength: 6 } }}
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={loading}
            sx={{ bgcolor: '#7C6FFF', '&:hover': { bgcolor: '#6B5EEE' }, mt: 1 }}
          >
            {loading ? 'Inscription...' : 'Créer un compte'}
          </Button>
        </Box>

        <Typography variant="body2" color="text.secondary">
          Déjà un compte ?{' '}
          <Link component={RouterLink} to="/login" sx={{ color: '#7C6FFF' }}>
            Se connecter
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}
