import { Button, Card, CardContent, Typography, Box, Stack } from '@mui/material';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import type { Player } from '../../models/Player';
import PlayerAvatar from './PlayerAvatar';
import RankBadge from './RankBadge';
import StatBox from './StatBox';

interface PlayerCardProps {
  player: Player;
}

export default function PlayerCard({ player }: PlayerCardProps) {
  const wins = player.recentMatches?.filter((m) => m.isWin).length ?? 0;
  const total = player.recentMatches?.length ?? 0;
  const winrate = total > 0 ? Math.round((wins / total) * 100) : 0;

  return (
    <Card
      sx={{
        bgcolor: '#1A1A2E',
        borderRadius: 4,
        width: '100%',
        maxWidth: { xs: 380, md: 440 },
        mx: 'auto',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        overflow: 'visible',
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <PlayerAvatar username={player.username} rank={player.rank} size={80} avatarUrl={player.avatarUrl} />
          <Typography variant="h5" sx={{ fontWeight: 700, color: 'white' }}>
            {player.username}
          </Typography>
          <RankBadge rank={player.rank} />
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Niveau {player.level} · ELO {player.elo}
          </Typography>
        </Box>

        <Stack direction="row" spacing={1} sx={{ mt: 3 }}>
          <StatBox label="Victoires" value={wins} color="#4CAF50" />
          <StatBox label="Défaites" value={total - wins} color="#FF5252" />
          <StatBox label="Winrate" value={`${winrate}%`} color="#7C6FFF" />
        </Stack>

        {player.steamUrl && (
          <Button
            variant="outlined"
            startIcon={<SportsEsportsIcon />}
            href={player.steamUrl}
            target="_blank"
            rel="noopener noreferrer"
            fullWidth
            sx={{ mt: 2, borderColor: '#4a90d9', color: '#4a90d9' }}
          >
            Profil Steam
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
