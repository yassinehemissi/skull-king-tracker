"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";
import { createGame, submitRound } from "@/lib/game";
import type { Game, RoundEntry, SetupPlayer } from "@/lib/types";

type StoreShape = {
  games: Game[];
  currentGame: Game | null;
  hydrated: boolean;
  startGame: (players: SetupPlayer[], totalRounds: number) => Game;
  submitCurrentRound: (entries: Omit<RoundEntry, "score">[]) => Game | null;
  continueGame: (gameId: string) => void;
  deleteGame: (gameId: string) => void;
  abandonCurrentGame: () => void;
};

const STORAGE_KEY = "skull-king-store";
const GameStoreContext = createContext<StoreShape | null>(null);

export function GameStoreProvider({ children }: { children: ReactNode }) {
  const [games, setGames] = useState<Game[]>([]);
  const [currentGameId, setCurrentGameId] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { games: Game[]; currentGameId: string | null };
        setGames(parsed.games ?? []);
        setCurrentGameId(parsed.currentGameId ?? null);
      }
    } catch {
      setGames([]);
      setCurrentGameId(null);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ games, currentGameId }),
    );
  }, [games, currentGameId, hydrated]);

  const currentGame = useMemo(
    () => games.find((game) => game.id === currentGameId) ?? null,
    [games, currentGameId],
  );

  function startGame(players: SetupPlayer[], totalRounds: number) {
    const game = createGame(players, totalRounds);
    setGames((prev) => [game, ...prev.filter((item) => item.id !== game.id)]);
    setCurrentGameId(game.id);
    return game;
  }

  function submitCurrentRound(entries: Omit<RoundEntry, "score">[]) {
    if (!currentGame) {
      return null;
    }

    const nextGame = submitRound(currentGame, entries);
    setGames((prev) => prev.map((item) => (item.id === nextGame.id ? nextGame : item)));
    setCurrentGameId(nextGame.id);
    return nextGame;
  }

  function continueGame(gameId: string) {
    setCurrentGameId(gameId);
  }

  function deleteGame(gameId: string) {
    setGames((prev) => prev.filter((item) => item.id !== gameId));
    setCurrentGameId((prev) => (prev === gameId ? null : prev));
  }

  function abandonCurrentGame() {
    setCurrentGameId(null);
  }

  return (
    <GameStoreContext.Provider
      value={{
        games,
        currentGame,
        hydrated,
        startGame,
        submitCurrentRound,
        continueGame,
        deleteGame,
        abandonCurrentGame,
      }}
    >
      {children}
    </GameStoreContext.Provider>
  );
}

export function useGameStore() {
  const context = useContext(GameStoreContext);
  if (!context) {
    throw new Error("useGameStore must be used within GameStoreProvider");
  }

  return context;
}
