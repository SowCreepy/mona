import { useState } from 'react';
import type { FormEvent } from 'react';
import {
  Box, Typography, Button, TextField, Alert, Stack,
} from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useMatchViewModel } from '../../viewmodels/useMatchViewModel';
import { useAuthStore } from '../../stores/authStore';
import { CS2_MAPS, formatMapName } from '../../utils/rank';

const MAP_COLORS: Record<string, string> = {
  de_dust2:    '#C8A96E',
  de_mirage:   '#E8C97A',
  de_inferno:  '#E07B39',
  de_nuke:     '#7AB8D4',
  de_overpass: '#8BC34A',
  de_ancient:  '#A87C5A',
  de_vertigo:  '#78909C',
  de_anubis:   '#B8986A',
};

export default function AddMatch() {
  const navigate = useNavigate();
  const { addMatch, loading, error } = useMatchViewModel();
  const fetchUser = useAuthStore((s) => s.fetchUser);

  const [isWin, setIsWin] = useState(true);
  const [map, setMap] = useState(CS2_MAPS[0]);
  const [kills, setKills] = useState('');
  const [deaths, setDeaths] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const result = await addMatch({
      isWin,
      map,
      kills: Number(kills),
      deaths: Number(deaths),
    });
    if (result) {
      await fetchUser();
      navigate('/app/profile');
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 0 }, maxWidth: 560 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
        <IconButton onClick={() => navigate('/app/profile')} sx={{ color: '#7C6FFF', ml: -1 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" sx={{ fontWeight: 700, color: 'white' }}>
          Ajouter un match
        </Typography>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>

        {/* Résultat */}
        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>
            Résultat
          </Typography>
          <Stack direction="row" spacing={1.5}>
            {[true, false].map((win) => (
              <Box
                key={String(win)}
                onClick={() => setIsWin(win)}
                sx={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1,
                  py: 1.5,
                  borderRadius: 2,
                  cursor: 'pointer',
                  border: '2px solid',
                  borderColor: isWin === win
                    ? (win ? '#4CAF50' : '#FF5252')
                    : '#2A2A3E',
                  bgcolor: isWin === win
                    ? (win ? '#4CAF5018' : '#FF525218')
                    : '#1A1A2E',
                  color: isWin === win
                    ? (win ? '#4CAF50' : '#FF5252')
                    : '#666',
                  transition: 'all .15s',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                }}
              >
                {win
                  ? <EmojiEventsIcon fontSize="small" />
                  : <CloseIcon fontSize="small" />}
                {win ? 'Victoire' : 'Défaite'}
              </Box>
            ))}
          </Stack>
        </Box>

        {/* Map */}
        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>
            Map
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1 }}>
            {CS2_MAPS.map((m) => {
              const selected = map === m;
              const color = MAP_COLORS[m] ?? '#7C6FFF';
              return (
                <Box
                  key={m}
                  onClick={() => setMap(m)}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    py: 1.25,
                    px: 0.5,
                    borderRadius: 2,
                    cursor: 'pointer',
                    border: '2px solid',
                    borderColor: selected ? color : '#2A2A3E',
                    bgcolor: selected ? `${color}18` : '#1A1A2E',
                    transition: 'all .15s',
                  }}
                >
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      bgcolor: selected ? color : '#444',
                      mb: 0.75,
                      transition: 'all .15s',
                    }}
                  />
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 700,
                      color: selected ? color : '#666',
                      textTransform: 'uppercase',
                      letterSpacing: 0.5,
                      lineHeight: 1,
                    }}
                  >
                    {formatMapName(m)}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </Box>

        {/* Stats */}
        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>
            Stats
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              label="Kills"
              type="number"
              value={kills}
              onChange={(e) => setKills(e.target.value)}
              required
              fullWidth
              slotProps={{ htmlInput: { min: 0 } }}
            />
            <TextField
              label="Deaths"
              type="number"
              value={deaths}
              onChange={(e) => setDeaths(e.target.value)}
              required
              fullWidth
              slotProps={{ htmlInput: { min: 0 } }}
            />
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            onClick={() => navigate('/app/profile')}
            sx={{ flex: 1, borderColor: '#333', color: '#aaa' }}
          >
            Annuler
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{ flex: 1, bgcolor: '#7C6FFF', '&:hover': { bgcolor: '#6B5EEE' } }}
          >
            Enregistrer
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
