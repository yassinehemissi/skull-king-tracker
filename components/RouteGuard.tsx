"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useGameStore } from "./GameStoreProvider";

export function RouteGuard({
  children,
  requiresRound = false,
  finishedOnly = false,
}: {
  children: ReactNode;
  requiresRound?: boolean;
  finishedOnly?: boolean;
}) {
  const router = useRouter();
  const { currentGame, hydrated } = useGameStore();

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    if (!currentGame) {
      router.replace("/");
      return;
    }

    if (requiresRound && currentGame.rounds.length === 0) {
      router.replace("/round");
      return;
    }

    if (finishedOnly && currentGame.status !== "finished") {
      router.replace("/leaderboard");
    }
  }, [currentGame, finishedOnly, hydrated, requiresRound, router]);

  if (!hydrated || !currentGame) {
    return null;
  }

  if (requiresRound && currentGame.rounds.length === 0) {
    return null;
  }

  if (finishedOnly && currentGame.status !== "finished") {
    return null;
  }

  return <>{children}</>;
}
