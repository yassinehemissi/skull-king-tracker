"use client";

import { useRouter } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { ParchmentButton } from "@/components/ParchmentButton";
import { RouteGuard } from "@/components/RouteGuard";
import { ScoreTable } from "@/components/ScoreTable";
import { useGameStore } from "@/components/GameStoreProvider";
import { getScoreTable } from "@/lib/game";

export default function ScoresPage() {
  return (
    <RouteGuard>
      <ScoresView />
    </RouteGuard>
  );
}

function ScoresView() {
  const router = useRouter();
  const { currentGame } = useGameStore();
  if (!currentGame) {
    return null;
  }

  const rows = getScoreTable(currentGame);
  const columns = Array.from({ length: currentGame.rounds.length }, (_, index) => `R${index + 1}`);

  return (
    <AppShell
      eyebrow="Table"
      title="Full Score Table"
      actions={
        <ParchmentButton
          icon="<-"
          onClick={() => router.push(currentGame.status === "finished" ? "/finished" : "/leaderboard")}
        >
          Back
        </ParchmentButton>
      }
    >
      <div className="mb-4 rounded-[1.3rem] border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-[#b3d0e4]">
        Horizontal scroll is preserved for mobile. Round columns expand as the game progresses.
      </div>
      <ScoreTable columns={columns.length > 0 ? columns : ["R1"]} rows={rows} />
    </AppShell>
  );
}
