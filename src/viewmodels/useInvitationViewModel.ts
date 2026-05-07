import { useState, useCallback, useEffect } from 'react';
import type { Invitation } from '../models/Invitation';
import { invitationService } from '../services/invitation.service';
import { socketService } from '../services/socket.service';

export function useInvitationViewModel() {
  const [sent, setSent] = useState<Invitation[]>([]);
  const [received, setReceived] = useState<Invitation[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSent = useCallback(async () => {
    const data = await invitationService.getSent();
    setSent(data);
  }, []);

  const fetchReceived = useCallback(async () => {
    const data = await invitationService.getReceived();
    setReceived(data);
  }, []);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    await Promise.all([fetchSent(), fetchReceived()]);
    setLoading(false);
  }, [fetchSent, fetchReceived]);

  const accept = useCallback(async (id: string) => {
    const result = await invitationService.accept(id);
    setReceived((prev) => prev.filter((inv) => inv.id !== id));
    return result.chatId;
  }, []);

  const reject = useCallback(async (id: string) => {
    await invitationService.reject(id);
    setReceived((prev) => prev.filter((inv) => inv.id !== id));
  }, []);

  useEffect(() => {
    fetchAll();

    socketService.on<Invitation>('invitation:received', (inv) => {
      setReceived((prev) => [inv, ...prev]);
    });

    socketService.on<{ invitationId: string }>('invitation:accepted', () => {
      fetchSent();
    });

    socketService.on<{ invitationId: string }>('invitation:rejected', () => {
      fetchSent();
    });

    return () => {
      socketService.off('invitation:received');
      socketService.off('invitation:accepted');
      socketService.off('invitation:rejected');
    };
  }, [fetchAll, fetchSent]);

  return { sent, received, loading, accept, reject, fetchAll };
}
