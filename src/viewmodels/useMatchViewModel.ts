import { useState, useCallback } from 'react';
import type { MatchResult } from '../models/Player';
import { matchService } from '../services/match.service';
import type { CreateMatchPayload } from '../services/match.service';

export function useMatchViewModel() {
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMatches = useCallback(async () => {
    setLoading(true);
    try {
      const data = await matchService.getMyMatches();
      setMatches(data);
    } catch {
      setError('Impossible de charger les matchs');
    } finally {
      setLoading(false);
    }
  }, []);

  const addMatch = useCallback(async (payload: CreateMatchPayload) => {
    setLoading(true);
    setError(null);
    try {
      const created = await matchService.create(payload);
      setMatches((prev) => [created, ...prev]);
      return created;
    } catch {
      setError('Erreur lors de l\'ajout du match');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { matches, loading, error, fetchMatches, addMatch };
}
