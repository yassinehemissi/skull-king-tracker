"use client";

import { useRouter } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { ParchmentButton } from "@/components/ParchmentButton";
import { RouteGuard } from "@/components/RouteGuard";
import { useGameStore } from "@/components/GameStoreProvider";
import { getLeaderboard } from "@/lib/game";

export default function FinishedPage() {
  return (
    <RouteGuard finishedOnly requiresRound>
      <FinishedView />
    </RouteGuard>
  );
}

function FinishedView() {
  const router = useRouter();
  const { currentGame } = useGameStore();
  if (!currentGame) {
    return null;
  }

  const leaderboard = getLeaderboard(currentGame);
  const winner = leaderboard[0];

  return (
    <AppShell
      eyebrow="Finish"
      title="Game Over"
      actions={
        <div className="space-y-3">
          <ParchmentButton icon="NEW" onClick={() => router.push("/setup")}>
            New Game
          </ParchmentButton>
          <ParchmentButton icon="TAB" onClick={() => router.push("/scores")} variant="secondary">
            View Full Table
          </ParchmentButton>
        </div>
      }
    >
      <div className="rounded-[1.8rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(243,200,94,0.22),transparent_36%),linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] p-5 text-center">
        <div className="mb-4 text-5xl font-black text-[#f3c85e]">END</div>
        <p className="font-display text-4xl text-[#fff0be]">{winner?.name ?? "Winner"} Wins!</p>
        <p className="mt-2 text-xs font-black uppercase tracking-[0.28em] text-[#f3c85e]">
          fireworks and pirate music hook here
        </p>
        <div className="mt-5 space-y-3">
          {leaderboard.slice(0, 3).map((player, index) => (
            <div
              key={player.id}
              className="flex items-center justify-between rounded-[1.35rem] border border-white/10 bg-[#0c2133]/70 px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-[#f3c85e]/10 text-sm font-black text-[#f3c85e]">
                  {index + 1}
                </span>
                <p className="text-sm font-black uppercase tracking-[0.12em] text-[#fff4d1]">
                  {player.name}
                </p>
              </div>
              <p className="text-lg font-black text-[#f3c85e]">{player.score} pts</p>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
