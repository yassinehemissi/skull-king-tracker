export type PlayerRole = {
  role: string;
  icon: string;
  accent: string;
};

export type Player = PlayerRole & {
  id: string;
  name: string;
};

export type RoundEntry = {
  playerId: string;
  bid: number;
  won: number;
  bonus: number;
  score: number;
};

export type RoundRecord = {
  roundNumber: number;
  cards: number;
  entries: RoundEntry[];
};

export type GameStatus = "setup" | "in_progress" | "finished";

export type Game = {
  id: string;
  status: GameStatus;
  totalRounds: number;
  currentRound: number;
  players: Player[];
  rounds: RoundRecord[];
  createdAt: string;
  updatedAt: string;
};

export type SetupPlayer = {
  id: string;
  name: string;
  role: string;
  icon: string;
  accent: string;
};

export const PLAYER_ROLES: PlayerRole[] = [
  { role: "Skull King", icon: "SK", accent: "#f1c45b" },
  { role: "Pirate Captain", icon: "PC", accent: "#ff8f70" },
  { role: "Mermaid", icon: "ME", accent: "#73d8ff" },
  { role: "Skeleton Pirate", icon: "SP", accent: "#d3d8df" },
  { role: "Parrot Pirate", icon: "PR", accent: "#7ef0a3" },
  { role: "Sea Witch", icon: "SW", accent: "#a789ff" },
  { role: "Monkey Pirate", icon: "MP", accent: "#f5a65a" },
  { role: "Deckhand", icon: "DK", accent: "#8fb7d2" },
];
