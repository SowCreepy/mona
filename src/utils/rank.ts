const RANKS = [
  'Silver I', 'Silver II', 'Silver III', 'Silver IV',
  'Silver Elite', 'Silver Elite Master',
  'Gold Nova I', 'Gold Nova II', 'Gold Nova III', 'Gold Nova Master',
  'Master Guardian I', 'Master Guardian II', 'Master Guardian Elite',
  'Distinguished Master Guardian',
  'Legendary Eagle', 'Legendary Eagle Master',
  'Supreme Master First Class',
  'The Global Elite',
];

export function getRankFromElo(elo: number): string {
  if (elo < 1000) return RANKS[0];
  if (elo < 2000) return RANKS[1];
  if (elo < 3000) return RANKS[2];
  if (elo < 4000) return RANKS[3];
  if (elo < 5000) return RANKS[4];
  if (elo < 6000) return RANKS[5];
  if (elo < 7500) return RANKS[6];
  if (elo < 9000) return RANKS[7];
  if (elo < 10500) return RANKS[8];
  if (elo < 12000) return RANKS[9];
  if (elo < 14000) return RANKS[10];
  if (elo < 16000) return RANKS[11];
  if (elo < 18000) return RANKS[12];
  if (elo < 20000) return RANKS[13];
  if (elo < 23000) return RANKS[14];
  if (elo < 26000) return RANKS[15];
  if (elo < 29000) return RANKS[16];
  return RANKS[17];
}

export function getRankColor(rank: string): string {
  if (rank.startsWith('Silver')) return '#C0C0C0';
  if (rank.startsWith('Gold Nova')) return '#FFD700';
  if (rank.startsWith('Master Guardian') || rank === 'Distinguished Master Guardian') return '#1E90FF';
  if (rank.startsWith('Legendary Eagle')) return '#9370DB';
  if (rank === 'Supreme Master First Class') return '#FF6347';
  if (rank === 'The Global Elite') return '#FF4500';
  return '#C0C0C0';
}

export const CS2_MAPS = [
  'de_dust2',
  'de_mirage',
  'de_inferno',
  'de_nuke',
  'de_overpass',
  'de_ancient',
  'de_vertigo',
  'de_anubis',
];

export function formatMapName(map: string): string {
  return map.replace('de_', '').charAt(0).toUpperCase() + map.replace('de_', '').slice(1);
}
