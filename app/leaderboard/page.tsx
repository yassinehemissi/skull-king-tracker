"use client";

import { useRouter } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { LeaderboardItem } from "@/components/LeaderboardItem";
import { ParchmentButton } from "@/components/ParchmentButton";
import { Podium } from "@/components/Podium";
import { RouteGuard } from "@/components/RouteGuard";
import { useGameStore } from "@/components/GameStoreProvider";
import { getLeaderboard } from "@/lib/game";

export default function LeaderboardPage() {
  return (
    <RouteGuard requiresRound>
      <LeaderboardView />
    </RouteGuard>
  );
}

function LeaderboardView() {
  const router = useRouter();
  const { currentGame } = useGameStore();
  if (!currentGame) {
    return null;
  }

  const leaderboard = getLeaderboard(currentGame);
  const podium = leaderboard.slice(0, 3);
  const remaining = leaderboard.slice(podium.length);
  const nextRoute = currentGame.status === "finished" ? "/finished" : "/round";

  return (
    <AppShell
      eyebrow="Ranking"
      title="Leaderboard"
      actions={
        <div className="space-y-3">
          <ParchmentButton icon={currentGame.status === "finished" ? "END" : "->"} onClick={() => router.push(nextRoute)}>
            {currentGame.status === "finished" ? "Finish Game" : "Next Round"}
          </ParchmentButton>
          <ParchmentButton icon="TAB" onClick={() => router.push("/scores")} variant="secondary">
            Full Score Table
          </ParchmentButton>
        </div>
      }
    >
      {podium.length === 3 ? (
        <div className="rounded-[1.7rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(243,200,94,0.16),transparent_34%),rgba(255,255,255,0.04)] p-4">
          <div className="mb-4 text-center">
            <p className="text-3xl font-black text-[#f3c85e]">NO.1</p>
            <p className="font-display text-2xl text-[#fff0be]">Skull King</p>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#f3c85e]">
              podium animation
            </p>
          </div>
          <Podium players={[podium[0], podium[1], podium[2]]} />
        </div>
      ) : null}

      <div className="mt-4 space-y-3">
        {(podium.length === 3 ? remaining : leaderboard).map((player, index) => (
          <LeaderboardItem
            key={player.id}
            accent={player.accent}
            icon={player.icon}
            name={player.name}
            rank={podium.length === 3 ? index + 4 : index + 1}
            score={player.score}
          />
        ))}
      </div>
    </AppShell>
  );
}
