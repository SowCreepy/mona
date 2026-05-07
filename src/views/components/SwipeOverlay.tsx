import { Box, Typography } from '@mui/material';

interface SwipeOverlayProps {
  direction: 'left' | 'right' | null;
  opacity: number;
}

export default function SwipeOverlay({ direction, opacity }: SwipeOverlayProps) {
  if (!direction || opacity <= 0) return null;

  const isRight = direction === 'right';
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 40,
        left: isRight ? 20 : 'auto',
        right: isRight ? 'auto' : 20,
        zIndex: 10,
        opacity,
        transform: `rotate(${isRight ? -15 : 15}deg)`,
        border: `3px solid ${isRight ? '#4CAF50' : '#FF5252'}`,
        borderRadius: 2,
        px: 3,
        py: 1,
      }}
    >
      <Typography
        variant="h5"
        sx={{ fontWeight: 800, color: isRight ? '#4CAF50' : '#FF5252' }}
      >
        {isRight ? 'INVITER' : 'PASSER'}
      </Typography>
    </Box>
  );
}
