import { Box, Typography } from '@mui/material';

interface StatBoxProps {
  label: string;
  value: string | number;
  color?: string;
}

export default function StatBox({ label, value, color }: StatBoxProps) {
  return (
    <Box
      sx={{
        bgcolor: '#1A1A2E',
        borderRadius: 2,
        p: 2,
        textAlign: 'center',
        flex: 1,
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: 700, color: color || 'white' }}>
        {value}
      </Typography>
      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
        {label}
      </Typography>
    </Box>
  );
}
