import { useState } from 'react';
import type { FormEvent } from 'react';
import { Box, TextField, Button, Typography, Container, Alert, Link } from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

export default function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/app/profile');
    } catch {
      setError('Email ou mot de passe incorrect');
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
          Connexion
        </Typography>

        {error && <Alert severity="error" sx={{ width: '100%' }}>{error}</Alert>}

        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
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
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={loading}
            sx={{ bgcolor: '#7C6FFF', '&:hover': { bgcolor: '#6B5EEE' }, mt: 1 }}
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </Button>
        </Box>

        <Typography variant="body2" color="text.secondary">
          Pas de compte ?{' '}
          <Link component={RouterLink} to="/register" sx={{ color: '#7C6FFF' }}>
            S'inscrire
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}
