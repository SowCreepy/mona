import { useEffect } from 'react';
import { Box, Typography, Button, Stack, IconButton, CircularProgress, useMediaQuery, useTheme, Snackbar, Alert } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';
import LogoutIcon from '@mui/icons-material/Logout';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import { useNavigate } from 'react-router-dom';
import { useProfileViewModel } from '../../viewmodels/useProfileViewModel';
import { useMatchViewModel } from '../../viewmodels/useMatchViewModel';
import { useAuthStore } from '../../stores/authStore';
import PlayerAvatar from '../components/PlayerAvatar';
import RankBadge from '../components/RankBadge';
import StatBox from '../components/StatBox';
import MatchTile from '../components/MatchTile';
import AvailabilityToggle from '../components/AvailabilityToggle';

export default function Profile() {
  const navigate = useNavigate();
  const { user, toggleAvailability, error } = useProfileViewModel();
  const { matches, fetchMatches } = useMatchViewModel();
  const logout = useAuthStore((s) => s.logout);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  useEffect(() => {
    fetchMatches();
  }, [fetchMatches]);

  if (!user) return <Box sx={{ display: 'flex', justifyContent: 'center', pt: 8 }}><CircularProgress /></Box>;

  const wins = matches.filter((m) => m.isWin).length;
  const total = matches.length;
  const winrate = total > 0 ? Math.round((wins / total) * 100) : 0;

  return (
    <Box sx={{ p: { xs: 2, md: 0 }, pb: { xs: 10, md: 2 } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: 'white' }}>Profil</Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton onClick={() => navigate('/app/invitations')} sx={{ color: '#7C6FFF' }}>
            <SendIcon />
          </IconButton>
          <IconButton onClick={async () => { await logout(); navigate('/'); }} sx={{ color: '#FF5252' }}>
            <LogoutIcon />
          </IconButton>
        </Box>
      </Box>

      <Box sx={{
        display: 'flex',
        flexDirection: isDesktop ? 'row' : 'column',
        gap: 3,
      }}>
        {/* Left column: avatar + info */}
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          ...(isDesktop && {
            bgcolor: '#1A1A2E',
            borderRadius: 4,
            p: 4,
            minWidth: 280,
            alignSelf: 'flex-start',
          }),
        }}>
          <PlayerAvatar username={user.username} rank={user.rank} size={isDesktop ? 100 : 80} avatarUrl={user.avatarUrl} />
          <Typography variant="h5" sx={{ fontWeight: 700, color: 'white' }}>{user.username}</Typography>
          <RankBadge rank={user.rank} />
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Niveau {user.level} · ELO {user.elo}
          </Typography>
          <AvailabilityToggle isAvailable={user.isAvailable} onToggle={toggleAvailability} />
          {user.steamUrl && (
            <Button
              variant="outlined"
              startIcon={<SportsEsportsIcon />}
              href={user.steamUrl}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ borderColor: '#4a90d9', color: '#4a90d9', width: '100%' }}
            >
              Profil Steam
            </Button>
          )}

          <Box sx={{ display: 'flex', gap: 1, width: '100%', mt: 1 }}>
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              onClick={() => navigate('/app/edit-profile')}
              sx={{ flex: 1, borderColor: '#7C6FFF', color: '#7C6FFF' }}
            >
              Modifier
            </Button>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={() => navigate('/app/add-match')}
              sx={{ flex: 1, borderColor: '#4CAF50', color: '#4CAF50' }}
            >
              Match
            </Button>
          </Box>
        </Box>

        {/* Right column: stats + matches */}
        <Box sx={{ flex: 1 }}>
          <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
            <StatBox label="Victoires" value={wins} color="#4CAF50" />
            <StatBox label="Défaites" value={total - wins} color="#FF5252" />
            <StatBox label="Winrate" value={`${winrate}%`} color="#7C6FFF" />
          </Stack>

          <Typography variant="h6" sx={{ fontWeight: 600, color: 'white', mb: 1.5 }}>
            Matchs récents
          </Typography>
          <Stack spacing={1}>
            {matches.length === 0 && (
              <Typography sx={{ color: 'text.secondary', textAlign: 'center', py: 3 }}>
                Aucun match enregistré
              </Typography>
            )}
            {matches.map((m) => (
              <MatchTile key={m.id} match={m} />
            ))}
          </Stack>
        </Box>
      </Box>

      <Snackbar open={!!error} autoHideDuration={4000} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    </Box>
  );
}
