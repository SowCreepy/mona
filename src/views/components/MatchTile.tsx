import { Box, Chip } from '@mui/material';
import type { MatchResult } from '../../models/Player';
import { formatMapName } from '../../utils/rank';

interface MatchTileProps {
  match: MatchResult;
}

export default function MatchTile({ match }: MatchTileProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        bgcolor: '#1A1A2E',
        borderRadius: 2,
        px: 2,
        py: 1.5,
        borderLeft: `4px solid ${match.isWin ? '#4CAF50' : '#FF5252'}`,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Chip
          label={match.isWin ? 'W' : 'L'}
          size="small"
          sx={{
            fontWeight: 700,
            bgcolor: match.isWin ? '#4CAF5022' : '#FF525222',
            color: match.isWin ? '#4CAF50' : '#FF5252',
          }}
        />
        <span style={{ color: '#fff', fontWeight: 500 }}>{formatMapName(match.map)}</span>
      </Box>
      <Box sx={{ color: '#aaa', fontSize: 14 }}>
        {match.kills}K / {match.deaths}D
      </Box>
    </Box>
  );
}
