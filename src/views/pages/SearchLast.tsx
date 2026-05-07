import { useState, useCallback, useRef } from 'react';
import { Box, Typography, IconButton, CircularProgress, Snackbar, Alert, useMediaQuery, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useSearchViewModel } from '../../viewmodels/useSearchViewModel';
import PlayerCard from '../components/PlayerCard';
import SwipeOverlay from '../components/SwipeOverlay';

export default function SearchLast() {
  const { currentPlayer, nextPlayer, hasMore, loading, error, lastAction, invite, skip, refresh } = useSearchViewModel();

  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [snack, setSnack] = useState<string | null>(null);
  const startX = useRef(0);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    startX.current = e.clientX;
    setIsDragging(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return;
    setDragX(e.clientX - startX.current);
  }, [isDragging]);

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
    if (dragX > 120) {
      invite();
      setSnack('Invitation envoyée !');
    } else if (dragX < -120) {
      skip();
    }
    setDragX(0);
  }, [dragX, invite, skip]);

  const swipeDirection = dragX > 30 ? 'right' : dragX < -30 ? 'left' : null;
  const overlayOpacity = Math.min(Math.abs(dragX) / 150, 1);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', pt: 8 }}>
        <CircularProgress sx={{ color: '#7C6FFF' }} />
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, md: 0 }, pb: { xs: 10, md: 2 } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: 'white' }}>Recherche</Typography>
        <IconButton onClick={refresh} sx={{ color: '#7C6FFF' }}>
          <RefreshIcon />
        </IconButton>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {!hasMore ? (
        <Box sx={{ textAlign: 'center', pt: 8 }}>
          <Typography color="text.secondary" variant="h6">
            Plus de joueurs disponibles
          </Typography>
          <Typography color="text.secondary" variant="body2" sx={{ mt: 1 }}>
            Reviens plus tard ou rafraîchis
          </Typography>
        </Box>
      ) : (
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <Box
            sx={{
              position: 'relative',
              height: isDesktop ? 520 : 480,
              width: '100%',
              maxWidth: isDesktop ? 440 : 380,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {nextPlayer && (
              <Box sx={{ position: 'absolute', opacity: 0.4, transform: 'scale(0.95)' }}>
                <PlayerCard player={nextPlayer} />
              </Box>
            )}

            {currentPlayer && (
              <Box
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                sx={{
                  position: 'absolute',
                  cursor: 'grab',
                  touchAction: 'none',
                  transform: `translateX(${dragX}px) rotate(${dragX / 20}deg)`,
                  transition: isDragging ? 'none' : 'transform 0.3s ease',
                  zIndex: 2,
                }}
              >
                <SwipeOverlay direction={swipeDirection} opacity={overlayOpacity} />
                <PlayerCard player={currentPlayer} />
              </Box>
            )}
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 3 }}>
            <IconButton
              onClick={skip}
              sx={{
                bgcolor: '#FF525222',
                color: '#FF5252',
                width: 56,
                height: 56,
                '&:hover': { bgcolor: '#FF525244' },
              }}
            >
              <CloseIcon fontSize="large" />
            </IconButton>
            <IconButton
              onClick={() => { invite(); setSnack('Invitation envoyée !'); }}
              sx={{
                bgcolor: '#7C6FFF22',
                color: '#7C6FFF',
                width: 64,
                height: 64,
                '&:hover': { bgcolor: '#7C6FFF44' },
              }}
            >
              <FavoriteIcon fontSize="large" />
            </IconButton>
            <IconButton
              onClick={() => { invite(); setSnack('Invitation envoyée !'); }}
              sx={{
                bgcolor: '#4CAF5022',
                color: '#4CAF50',
                width: 56,
                height: 56,
                '&:hover': { bgcolor: '#4CAF5044' },
              }}
            >
              <PersonAddIcon fontSize="large" />
            </IconButton>
          </Box>
        </Box>
      )}

      <Snackbar
        open={!!snack}
        autoHideDuration={2000}
        onClose={() => setSnack(null)}
        message={snack}
      />
      <Snackbar
        open={lastAction === 'skip'}
        autoHideDuration={1000}
        onClose={() => {}}
      />
    </Box>
  );
}
