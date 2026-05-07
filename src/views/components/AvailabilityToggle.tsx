import { Switch, Box, Typography } from '@mui/material';

interface AvailabilityToggleProps {
  isAvailable: boolean;
  onToggle: () => void;
}

export default function AvailabilityToggle({ isAvailable, onToggle }: AvailabilityToggleProps) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Typography variant="body2" color="text.secondary">
        {isAvailable ? 'Disponible' : 'Indisponible'}
      </Typography>
      <Switch
        checked={isAvailable}
        onChange={onToggle}
        sx={{
          '& .MuiSwitch-switchBase.Mui-checked': { color: '#4CAF50' },
          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: '#4CAF5088' },
        }}
      />
    </Box>
  );
}
