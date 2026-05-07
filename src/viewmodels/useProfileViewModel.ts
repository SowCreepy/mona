import { useState, useCallback } from 'react';
import { playerService } from '../services/player.service';
import { useAuthStore } from '../stores/authStore';

export function useProfileViewModel() {
  const { user, fetchUser, updateUser } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const editProfile = useCallback(async (data: { username?: string; elo?: number; steamUrl?: string }) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await playerService.updateMe(data);
      updateUser(updated);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Erreur lors de la mise à jour';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [updateUser]);

  const toggleAvailability = useCallback(async () => {
    if (!user) return;
    const prev = user.isAvailable;
    updateUser({ isAvailable: !prev }); 
    try {
      const { isAvailable } = await playerService.toggleAvailability(!prev);
      updateUser({ isAvailable });
    } catch (e: unknown) {
      updateUser({ isAvailable: prev }); 
      const msg = e instanceof Error ? e.message : 'Erreur lors du changement de disponibilité';
      setError(msg);
    }
  }, [updateUser, user]);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      await fetchUser();
    } finally {
      setLoading(false);
    }
  }, [fetchUser]);

  const uploadAvatar = useCallback(async (file: File) => {
    setLoading(true);
    setError(null);
    try {
      const { avatarUrl } = await playerService.uploadAvatar(file);
      updateUser({ avatarUrl });
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Erreur lors de l\'upload';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [updateUser]);

  return { user, loading, error, editProfile, toggleAvailability, refresh, uploadAvatar };
}
