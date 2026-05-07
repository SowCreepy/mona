import { useState, useCallback, useEffect } from 'react';
import type { Player } from '../models/Player';
import { playerService } from '../services/player.service';
import { invitationService } from '../services/invitation.service';

export function useSearchViewModel() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastAction, setLastAction] = useState<'invite' | 'skip' | null>(null);

  const fetchPlayers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await playerService.getAvailable();
      setPlayers(data);
      setCurrentIndex(0);
    } catch {
      setError('Impossible de charger les joueurs');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPlayers();
  }, [fetchPlayers]);

  const currentPlayer = players[currentIndex] ?? null;
  const nextPlayer = players[currentIndex + 1] ?? null;
  const hasMore = currentIndex < players.length;

  const invite = useCallback(async () => {
    if (!currentPlayer) return;
    try {
      await invitationService.send(currentPlayer.id);
      setLastAction('invite');
    } catch {
      setError('Erreur lors de l\'envoi de l\'invitation');
    }
    setCurrentIndex((i) => i + 1);
  }, [currentPlayer]);

  const skip = useCallback(() => {
    setLastAction('skip');
    setCurrentIndex((i) => i + 1);
  }, []);

  return {
    currentPlayer,
    nextPlayer,
    hasMore,
    loading,
    error,
    lastAction,
    invite,
    skip,
    refresh: fetchPlayers,
  };
}
