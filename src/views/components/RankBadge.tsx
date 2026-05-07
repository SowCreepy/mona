import { Chip } from '@mui/material';
import { getRankColor } from '../../utils/rank';

interface RankBadgeProps {
  rank: string;
}

export default function RankBadge({ rank }: RankBadgeProps) {
  return (
    <Chip
      label={rank}
      size="small"
      sx={{
        bgcolor: getRankColor(rank) + '22',
        color: getRankColor(rank),
        fontWeight: 600,
        border: `1px solid ${getRankColor(rank)}44`,
      }}
    />
  );
}
