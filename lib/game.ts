import { PLAYER_ROLES } from "./types";
import type { Game, Player, RoundEntry, RoundRecord, SetupPlayer } from "./types";

export function makeId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

export function createDefaultPlayers(): SetupPlayer[] {
  return [
    makeSetupPlayer(0, "Jack"),
    makeSetupPlayer(1, "Lila"),
    makeSetupPlayer(2, "Peter"),
    makeSetupPlayer(3, "Olivia"),
  ];
}

export function makeSetupPlayer(index: number, name = ""): SetupPlayer {
  const role = PLAYER_ROLES[index % PLAYER_ROLES.length];

  return {
    id: makeId("player"),
    name,
    role: role.role,
    icon: role.icon,
    accent: role.accent,
  };
}

export function createGame(players: SetupPlayer[], totalRounds: number): Game {
  const now = new Date().toISOString();

  return {
    id: makeId("game"),
    status: "in_progress",
    totalRounds,
    currentRound: 1,
    players: players.map((player) => ({ ...player })),
    rounds: [],
    createdAt: now,
    updatedAt: now,
  };
}

export function scoreRoundEntry(entry: Pick<RoundEntry, "bid" | "won" | "bonus">, cards:number) {
  const base = entry.bid === entry.won ? entry.bid * 20 : -Math.abs(entry.bid - entry.won) * 10;
  const zeroBid = entry.bid === 0 ? (entry.won === 0 ? 10 * cards : -10 * cards) : 0;

  return (entry.bid === 0 ? zeroBid : base) + entry.bonus;
}

export function validateRound(entries: Array<Pick<RoundEntry, "won">>, cards: number) {
  const totalWon = entries.reduce((sum, entry) => sum + entry.won, 0);
  return {
    valid: true,
    totalWon,
  };
}

export function submitRound(game: Game, inputs: Omit<RoundEntry, "score">[]): Game {
  const roundNumber = game.currentRound;
  const cards = roundNumber;
  const entries = inputs.map((entry) => ({
    ...entry,
    score: scoreRoundEntry(entry, cards),
  }));

  const round: RoundRecord = {
    roundNumber,
    cards,
    entries,
  };

  const nextRound = roundNumber + 1;
  const finished = nextRound > game.totalRounds;

  return {
    ...game,
    status: finished ? "finished" : "in_progress",
    currentRound: finished ? game.totalRounds : nextRound,
    rounds: [...game.rounds, round],
    updatedAt: new Date().toISOString(),
  };
}

export function getPlayerTotal(game: Game, playerId: string) {
  return game.rounds.reduce((sum, round) => {
    const entry = round.entries.find((item) => item.playerId === playerId);
    return sum + (entry?.score ?? 0);
  }, 0);
}

export function getLeaderboard(game: Game) {
  return [...game.players]
    .map((player) => ({
      ...player,
      score: getPlayerTotal(game, player.id),
    }))
    .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));
}

export function getLastRound(game: Game) {
  return game.rounds[game.rounds.length - 1] ?? null;
}

export function getScoreTable(game: Game) {
  return game.players.map((player) => {
    const values = game.rounds.map((round) => {
      const entry = round.entries.find((item) => item.playerId === player.id);
      return entry?.score ?? 0;
    });

    return {
      name: player.name,
      values,
      total: values.reduce((sum, value) => sum + value, 0),
    };
  });
}

export function getGameSubtitle(game: Game) {
  return game.status === "finished"
    ? "Finished"
    : `Round ${Math.min(game.currentRound, game.totalRounds)} / ${game.totalRounds}`;
}

export function cloneRoundInputs(players: Player[]) {
  return players.map((player) => ({
    playerId: player.id,
    bid: 0,
    won: 0,
    bonus: 0,
  }));
}
