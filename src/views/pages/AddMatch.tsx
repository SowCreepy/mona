import { useState } from 'react';
import type { FormEvent } from 'react';
import {
  Box, Typography, Button, TextField, Alert,
  ToggleButtonGroup, ToggleButton, Switch, FormControlLabel,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useMatchViewModel } from '../../viewmodels/useMatchViewModel';
import { useAuthStore } from '../../stores/authStore';
import { CS2_MAPS, formatMapName } from '../../utils/rank';

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
    <Box sx={{ p: { xs: 2, md: 0 }, maxWidth: 600 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, color: 'white', mb: 3 }}>
        Ajouter un match
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        <FormControlLabel
          control={
            <Switch
              checked={isWin}
              onChange={(e) => setIsWin(e.target.checked)}
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': { color: '#4CAF50' },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: '#4CAF5088' },
              }}
            />
          }
          label={isWin ? 'Victoire' : 'Défaite'}
          sx={{ color: isWin ? '#4CAF50' : '#FF5252' }}
        />

        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>Map</Typography>
          <ToggleButtonGroup
            value={map}
            exclusive
            onChange={(_, v) => v && setMap(v)}
            sx={{ flexWrap: 'wrap', gap: 0.5 }}
          >
            {CS2_MAPS.map((m) => (
              <ToggleButton
                key={m}
                value={m}
                sx={{
                  color: '#aaa',
                  borderColor: '#333',
                  '&.Mui-selected': { bgcolor: '#7C6FFF22', color: '#7C6FFF', borderColor: '#7C6FFF' },
                }}
              >
                {formatMapName(m)}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>

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

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            onClick={() => navigate('/app/profile')}
            sx={{ flex: 1, borderColor: '#666', color: '#aaa' }}
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
