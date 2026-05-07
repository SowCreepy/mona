import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';
import { useAuthStore } from './stores/authStore';

import Home from './views/pages/Home';
import Login from './views/pages/Login';
import Register from './views/pages/Register';
import Profile from './views/pages/Profile';
import EditProfile from './views/pages/EditProfile';
import AddMatch from './views/pages/AddMatch';
import SearchLast from './views/pages/SearchLast';
import Matchmaking from './views/pages/Matchmaking';
import Messages from './views/pages/Messages';
import ChatRoom from './views/pages/ChatRoom';
import InvitationsSent from './views/pages/InvitationsSent';

import AuthGuard from './views/layouts/AuthGuard';
import MainLayout from './views/layouts/MainLayout';

export default function App() {
  const refreshAuth = useAuthStore((s) => s.refreshAuth);

  useEffect(() => {
    refreshAuth();
  }, [refreshAuth]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/app" element={<AuthGuard />}>
            <Route element={<MainLayout />}>
              <Route path="profile" element={<Profile />} />
              <Route path="search" element={<SearchLast />} />
              <Route path="messages" element={<Messages />} />
              <Route path="matchmaking" element={<Matchmaking />} />
              <Route path="chat/:chatId" element={<ChatRoom />} />
              <Route path="add-match" element={<AddMatch />} />
              <Route path="invitations" element={<InvitationsSent />} />
            </Route>
            <Route path="edit-profile" element={<EditProfile />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
