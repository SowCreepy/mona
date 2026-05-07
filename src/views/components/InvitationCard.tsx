import { Card, CardContent, Typography, Box, IconButton, Chip } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import ChatIcon from '@mui/icons-material/Chat';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined';
import type { Invitation } from '../../models/Invitation';
import PlayerAvatar from './PlayerAvatar';
import RankBadge from './RankBadge';

interface InvitationCardProps {
  invitation: Invitation;
  type: 'sent' | 'received';
  onAccept?: (id: string) => void;
  onReject?: (id: string) => void;
  onCancel?: (id: string) => void;
  onChat?: (chatId: string) => void;
}

export default function InvitationCard({ invitation, type, onAccept, onReject, onCancel, onChat }: InvitationCardProps) {
  const player = type === 'sent' ? invitation.receiver : invitation.sender;
  if (!player) return null;

  const statusColor = {
    PENDING: '#FFA726',
    ACCEPTED: '#4CAF50',
    REJECTED: '#FF5252',
  }[invitation.status];

  return (
    <Card sx={{ bgcolor: '#1A1A2E', borderRadius: 3, mb: 1.5 }}>
      <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 1.5, '&:last-child': { pb: 1.5 } }}>
        <PlayerAvatar username={player.username} rank={player.rank} size={44} avatarUrl={(player as any).avatarUrl} />
        <Box sx={{ flex: 1 }}>
          <Typography sx={{ fontWeight: 600, color: 'white' }}>{player.username}</Typography>
          <RankBadge rank={player.rank} />
        </Box>

        {type === 'sent' && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Chip label={invitation.status} size="small" sx={{ color: statusColor, borderColor: statusColor, fontWeight: 600 }} variant="outlined" />
            {invitation.status === 'ACCEPTED' && invitation.chatId && (
              <IconButton size="small" onClick={() => onChat?.(invitation.chatId!)} sx={{ color: '#7C6FFF' }}>
                <ChatIcon />
              </IconButton>
            )}
            {invitation.status === 'PENDING' && (
              <IconButton size="small" onClick={() => onCancel?.(invitation.id)} sx={{ color: '#FF5252' }}>
                <DeleteOutlineIcon />
              </IconButton>
            )}
          </Box>
        )}

        {type === 'received' && (
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            <IconButton size="small" onClick={() => onAccept?.(invitation.id)} sx={{ color: '#4CAF50' }}>
              <CheckIcon />
            </IconButton>
            <IconButton size="small" onClick={() => onReject?.(invitation.id)} sx={{ color: '#FF5252' }}>
              <CloseIcon />
            </IconButton>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
