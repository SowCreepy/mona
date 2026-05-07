import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  Box, BottomNavigation, BottomNavigationAction, Paper,
  Drawer, List, ListItemButton, ListItemIcon, ListItemText, Typography, useMediaQuery, useTheme,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import ChatIcon from '@mui/icons-material/Chat';
import GroupIcon from '@mui/icons-material/Group';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

const SIDEBAR_WIDTH = 240;

const tabs = [
  { label: 'Profil', icon: <PersonIcon />, path: '/app/profile' },
  { label: 'Recherche', icon: <SearchIcon />, path: '/app/search' },
  { label: 'Messages', icon: <ChatIcon />, path: '/app/messages' },
  { label: 'Invitations', icon: <GroupIcon />, path: '/app/matchmaking' },
];

export default function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const currentTab = tabs.findIndex((t) => location.pathname.startsWith(t.path));

  if (isDesktop) {
    return (
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <Drawer
          variant="permanent"
          sx={{
            width: SIDEBAR_WIDTH,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: SIDEBAR_WIDTH,
              bgcolor: '#0F0F1A',
              borderRight: '1px solid #1A1A2E',
              boxSizing: 'border-box',
            },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 2.5, py: 3 }}>
            <SportsEsportsIcon sx={{ color: '#7C6FFF', fontSize: 32 }} />
            <Typography variant="h6" sx={{ fontWeight: 700, color: 'white' }}>Mona</Typography>
          </Box>

          <List sx={{ px: 1 }}>
            {tabs.map((tab, idx) => (
              <ListItemButton
                key={tab.label}
                selected={currentTab === idx}
                onClick={() => navigate(tab.path)}
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                  '&.Mui-selected': { bgcolor: '#7C6FFF22', color: '#7C6FFF' },
                  '&.Mui-selected .MuiListItemIcon-root': { color: '#7C6FFF' },
                  color: '#888',
                }}
              >
                <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>{tab.icon}</ListItemIcon>
                <ListItemText primary={tab.label} slotProps={{ primary: { sx: { fontWeight: 600 } } }} />
              </ListItemButton>
            ))}
          </List>
        </Drawer>

        <Box sx={{ flex: 1, minHeight: '100vh', overflow: 'auto' }}>
          <Box sx={{ maxWidth: 1200, mx: 'auto', p: { md: 3, lg: 4 } }}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', position: 'relative' }}>
      <Box sx={{ pb: 8 }}>
        <Outlet />
      </Box>

      <Paper
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100 }}
        elevation={8}
      >
        <BottomNavigation
          value={currentTab >= 0 ? currentTab : 0}
          onChange={(_, idx) => navigate(tabs[idx].path)}
          sx={{
            bgcolor: '#0F0F1A',
            borderTop: '1px solid #1A1A2E',
            '& .Mui-selected': { color: '#7C6FFF !important' },
            '& .MuiBottomNavigationAction-root': { color: '#666' },
          }}
        >
          {tabs.map((tab) => (
            <BottomNavigationAction key={tab.label} label={tab.label} icon={tab.icon} />
          ))}
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
