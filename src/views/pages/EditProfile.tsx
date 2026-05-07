import { useState, useRef } from 'react';
import type { FormEvent } from 'react';
import {
  Box, TextField, Button, Typography, Alert, IconButton, Badge,
  Card, CardContent, Divider, Snackbar,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import SaveIcon from '@mui/icons-material/Save';
import { useNavigate } from 'react-router-dom';
import { useProfileViewModel } from '../../viewmodels/useProfileViewModel';
import PlayerAvatar from '../components/PlayerAvatar';
import RankBadge from '../components/RankBadge';
import { getRankFromElo } from '../../utils/rank';

export default function EditProfile() {
  const navigate = useNavigate();
  const { user, editProfile, uploadAvatar, loading, error } = useProfileViewModel();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [username, setUsername] = useState(user?.username ?? '');
  const [elo, setElo] = useState(String(user?.elo ?? 0));
  const [steamUrl, setSteamUrl] = useState(user?.steamUrl ?? '');
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [saved, setSaved] = useState(false);

  const previewRank = getRankFromElo(Number(elo) || 0);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (avatarFile) {
      await uploadAvatar(avatarFile);
    }
    await editProfile({ username, elo: Number(elo), steamUrl: steamUrl || undefined });
    setSaved(true);
    setTimeout(() => navigate('/app/profile'), 600);
  };

  return (
    <Box sx={{ p: { xs: 2, md: 0 }, maxWidth: 600, mx: 'auto' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
        <IconButton onClick={() => navigate('/app/profile')} sx={{ color: '#7C6FFF' }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" sx={{ fontWeight: 700, color: 'white' }}>
          Modifier le profil
        </Typography>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        {/* Avatar section */}
        <Card sx={{ bgcolor: '#1A1A2E', borderRadius: 3 }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, py: 3 }}>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              badgeContent={
                <IconButton
                  size="small"
                  onClick={() => fileInputRef.current?.click()}
                  sx={{
                    bgcolor: '#7C6FFF',
                    color: 'white',
                    width: 36,
                    height: 36,
                    border: '3px solid #1A1A2E',
                    '&:hover': { bgcolor: '#6B5EEE' },
                  }}
                >
                  <CameraAltIcon fontSize="small" />
                </IconButton>
              }
            >
              {avatarPreview ? (
                <Box
                  component="img"
                  src={avatarPreview}
                  alt="Aperçu avatar"
                  sx={{ width: 110, height: 110, borderRadius: '50%', objectFit: 'cover', border: '3px solid #7C6FFF' }}
                />
              ) : (
                <Box sx={{ border: '3px solid #7C6FFF', borderRadius: '50%' }}>
                  <PlayerAvatar
                    username={user?.username ?? '??'}
                    rank={user?.rank ?? 'Silver I'}
                    size={110}
                    avatarUrl={user?.avatarUrl}
                  />
                </Box>
              )}
            </Badge>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              hidden
              onChange={handleAvatarChange}
            />
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Clique sur l'icône pour changer ta photo
            </Typography>
          </CardContent>
        </Card>

        {/* Info section */}
        <Card sx={{ bgcolor: '#1A1A2E', borderRadius: 3 }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#7C6FFF' }}>
              Informations
            </Typography>

            <TextField
              label="Pseudo"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              fullWidth
            />

            <Divider sx={{ borderColor: '#ffffff10' }} />

            <Box>
              <TextField
                label="ELO"
                type="number"
                value={elo}
                onChange={(e) => setElo(e.target.value)}
                slotProps={{ htmlInput: { min: 0, max: 30000 } }}
                fullWidth
              />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  Rang estimé :
                </Typography>
                <RankBadge rank={previewRank} />
              </Box>
            </Box>

            <Divider sx={{ borderColor: '#ffffff10' }} />

            <TextField
              label="Profil Steam (URL)"
              value={steamUrl}
              onChange={(e) => setSteamUrl(e.target.value)}
              fullWidth
              placeholder="https://steamcommunity.com/id/..."
            />
          </CardContent>
        </Card>

        {/* Actions */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            onClick={() => navigate('/app/profile')}
            sx={{ flex: 1, borderColor: '#333', color: '#aaa', '&:hover': { borderColor: '#555' } }}
          >
            Annuler
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            startIcon={<SaveIcon />}
            sx={{ flex: 1, bgcolor: '#7C6FFF', '&:hover': { bgcolor: '#6B5EEE' } }}
          >
            {loading ? 'Sauvegarde...' : 'Sauvegarder'}
          </Button>
        </Box>
      </Box>

      <Snackbar
        open={saved}
        autoHideDuration={1500}
        onClose={() => setSaved(false)}
        message="Profil mis à jour !"
      />
    </Box>
  );
}
