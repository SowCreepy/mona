import { useEffect, useState } from 'react';
import { Box, CircularProgress, IconButton, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from 'react-router-dom';
import { playerService } from '../../services/player.service';
import type { Player, MatchResult } from '../../models/Player';
import PlayerAvatar from '../components/PlayerAvatar';
import RankBadge from '../components/RankBadge';
import StatBox from '../components/StatBox';
import MatchTile from '../components/MatchTile';

export default function PlayerProfile() {
  const { playerId } = useParams<{ playerId: string }>();
  const navigate = useNavigate();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const [player, setPlayer] = useState<Player | null>(null);
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!playerId) return;
    playerService.getById(playerId).then((data) => {
      setPlayer(data);
      // Handle both field names: new backend returns recentMatches, old returns matches
      const m = data.recentMatches ?? (data as any).matches ?? [];
      setMatches(m);
      setLoading(false);
    });
  }, [playerId]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', pt: 8 }}>
        <CircularProgress sx={{ color: '#7C6FFF' }} />
      </Box>
    );
  }

  if (!player) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography sx={{ color: 'text.secondary' }}>Joueur introuvable.</Typography>
      </Box>
    );
  }

  const wins = matches.filter((m) => m.isWin).length;
  const total = matches.length;
  const winrate = total > 0 ? Math.round((wins / total) * 100) : 0;

  return (
    <Box sx={{ p: { xs: 2, md: 0 }, pb: { xs: 10, md: 2 } }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
        <IconButton onClick={() => navigate(-1)} sx={{ color: '#7C6FFF' }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" sx={{ fontWeight: 700, color: 'white' }}>Profil</Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: isDesktop ? 'row' : 'column', gap: 3 }}>
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
          <PlayerAvatar username={player.username} rank={player.rank} size={isDesktop ? 100 : 80} avatarUrl={player.avatarUrl} />
          <Typography variant="h5" sx={{ fontWeight: 700, color: 'white' }}>{player.username}</Typography>
          <RankBadge rank={player.rank} />
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Niveau {player.level} · ELO {player.elo}
          </Typography>
          {player.steamUrl && (
            <Typography variant="caption" sx={{ color: 'text.secondary', textAlign: 'center' }}>
              Steam : {player.steamUrl}
            </Typography>
          )}
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
            {matches.length === 0 ? (
              <Typography sx={{ color: 'text.secondary', textAlign: 'center', py: 3 }}>
                Aucun match enregistré
              </Typography>
            ) : (
              matches.map((m, i) => <MatchTile key={m.id ?? i} match={m} />)
            )}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
