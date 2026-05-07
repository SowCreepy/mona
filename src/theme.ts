import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#7C6FFF' },
    secondary: { main: '#4CAF50' },
    error: { main: '#FF5252' },
    background: {
      default: '#0F0F1A',
      paper: '#1A1A2E',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#AAAAAA',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  shape: { borderRadius: 12 },
  components: {
    MuiTextField: {
      defaultProps: { variant: 'outlined' },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: '#333' },
            '&:hover fieldset': { borderColor: '#7C6FFF' },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', fontWeight: 600 },
      },
    },
  },
});

export default theme;
