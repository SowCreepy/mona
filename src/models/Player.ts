export interface Player {
  id: string;
  email?: string;
  username: string;
  rank: string;
  level: number;
  elo: number;
  steamUrl?: string | null;
  avatarUrl?: string | null;
  isAvailable: boolean;
  createdAt?: string;
  recentMatches?: MatchResult[];
}

export interface MatchResult {
  id?: string;
  isWin: boolean;
  map: string;
  kills: number;
  deaths: number;
  playedAt?: string;
}
