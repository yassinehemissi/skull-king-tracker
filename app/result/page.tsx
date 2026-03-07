"use client";

import { useRouter } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { Avatar } from "@/components/Avatar";
import { ParchmentButton } from "@/components/ParchmentButton";
import { RouteGuard } from "@/components/RouteGuard";
import { useGameStore } from "@/components/GameStoreProvider";
import { getLastRound } from "@/lib/game";

export default function ResultPage() {
  return (
    <RouteGuard requiresRound>
      <ResultView />
    </RouteGuard>
  );
}

function ResultView() {
  const router = useRouter();
  const { currentGame } = useGameStore();
  if (!currentGame) {
    return null;
  }

  const round = getLastRound(currentGame);
  if (!round) {
    return null;
  }

  return (
    <AppShell
      eyebrow="Results"
      title={`Round ${round.roundNumber} Results`}
      actions={
        <div className="space-y-3">
          <ParchmentButton icon="TOP" onClick={() => router.push("/leaderboard")}>
            View Leaderboard
          </ParchmentButton>
          <ParchmentButton icon="TAB" onClick={() => router.push("/scores")} variant="secondary">
            Score Table
          </ParchmentButton>
        </div>
      }
    >
      <div className="space-y-3">
        {currentGame.players.map((player) => {
          const entry = round.entries.find((item) => item.playerId === player.id);
          if (!entry) {
            return null;
          }

          const positive = entry.score >= 0;

          return (
            <div
              key={player.id}
              className="result-glow flex items-center justify-between rounded-[1.45rem] border border-white/10 bg-white/5 px-4 py-4"
            >
              <div className="flex items-center gap-3">
                <Avatar accent={player.accent} icon={player.icon} label={player.name} size="sm" />
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.12em] text-[#fff4cc]">
                    {player.name}
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-[#76b8db]">
                    bid {entry.bid} / won {entry.won} / bonus {entry.bonus}
                  </p>
                </div>
              </div>
              <p className={`text-xl font-black ${positive ? "text-[#f3d66d]" : "text-[#ff9a80]"}`}>
                {positive ? "+" : ""}
                {entry.score} pts
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-5 rounded-[1.6rem] border border-[#f3c85e]/20 bg-[radial-gradient(circle_at_top,rgba(243,200,94,0.16),transparent_42%),rgba(255,255,255,0.04)] p-5 text-center">
        <p className="text-2xl font-black text-[#f3c85e]">COUNT UP</p>
        <p className="mt-2 text-sm font-black uppercase tracking-[0.18em] text-[#fff4cf]">
          Positive rounds glow gold while misses flash coral.
        </p>
      </div>
    </AppShell>
  );
}
