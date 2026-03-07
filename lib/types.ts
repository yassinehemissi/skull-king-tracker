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
  { role: "Skull King", icon: "/2.png", accent: "#f1c45b" },
  { role: "Pirate Captain", icon: "/3.png", accent: "#ff8f70" },
  { role: "Mermaid", icon: "/5.png", accent: "#73d8ff" },
  { role: "Skeleton Pirate", icon: "/2.png", accent: "#d3d8df" },
  { role: "Parrot Pirate", icon: "/1.png", accent: "#7ef0a3" },
  { role: "Sea Witch", icon: "/4.png", accent: "#a789ff" },
  { role: "Monkey Pirate", icon: "/1.png", accent: "#f5a65a" },
  { role: "Deckhand", icon: "/3.png", accent: "#8fb7d2" },
];
