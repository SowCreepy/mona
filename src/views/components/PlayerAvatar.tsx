import { Avatar } from '@mui/material';
import { getRankColor } from '../../utils/rank';

const API_BASE = import.meta.env.VITE_API_URL?.replace('/api', '') ?? 'http://localhost:3000';

interface PlayerAvatarProps {
  username: string;
  rank: string;
  size?: number;
  avatarUrl?: string | null;
}

export default function PlayerAvatar({ username, rank, size = 48, avatarUrl }: PlayerAvatarProps) {
  const initials = username.slice(0, 2).toUpperCase();
  const color = getRankColor(rank);

  const src = avatarUrl ? `${API_BASE}${avatarUrl}` : undefined;

  return (
    <Avatar
      src={src}
      sx={{
        width: size,
        height: size,
        bgcolor: color,
        fontSize: size * 0.4,
        fontWeight: 700,
      }}
    >
      {initials}
    </Avatar>
  );
}
