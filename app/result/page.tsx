"use client";

import { useRouter } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { Avatar } from "@/components/Avatar";
import { ParchmentButton } from "@/components/ParchmentButton";
import { RouteGuard } from "@/components/RouteGuard";
import { useGameStore } from "@/components/GameStoreProvider";
import { getLastRound, getLeaderboard } from "@/lib/game";

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

  const leaderboard = getLeaderboard(currentGame);
  const nextAction = currentGame.status === "finished" ? "/finished" : "/round";
  const nextLabel = currentGame.status === "finished" ? "Finish Game" : "Next Round";

  return (
    <AppShell
      eyebrow="Results"
      title={`Round ${round.roundNumber} Summary`}
      actions={
        <div className="space-y-3">
          <ParchmentButton icon={currentGame.status === "finished" ? "END" : "->"} onClick={() => router.push(nextAction)}>
            {nextLabel}
          </ParchmentButton>
          <ParchmentButton icon="TAB" onClick={() => router.push("/scores")} variant="secondary">
            Full Score Table
          </ParchmentButton>
        </div>
      }
    >
      <div className="rounded-[1.6rem] border border-[#f3c85e]/20 bg-[radial-gradient(circle_at_top,rgba(243,200,94,0.16),transparent_42%),rgba(255,255,255,0.04)] p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#76b8db]">
              Fast Recap
            </p>
            <p className="font-display text-2xl text-[#fff0be]">Keep The Table Moving</p>
          </div>
          <div className="rounded-full bg-[#f3c85e]/10 px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-[#f3c85e]">
            Ranked Live
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {currentGame.players.map((player) => {
          const entry = round.entries.find((item) => item.playerId === player.id);
          const overall = leaderboard.find((item) => item.id === player.id);
          if (!entry || !overall) {
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
                    {entry.bid}/{entry.won}/{entry.bonus} this round
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-xl font-black ${positive ? "text-[#f3d66d]" : "text-[#ff9a80]"}`}>
                  {positive ? "+" : ""}
                  {entry.score}
                </p>
                <p className="text-[10px] uppercase tracking-[0.18em] text-[#92b5cb]">
                  total {overall.score}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <section className="mt-5 rounded-[1.6rem] border border-white/10 bg-white/5 p-4">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.14em] text-[#fff4cf]">
              Top Table
            </p>
            <p className="text-[11px] uppercase tracking-[0.16em] text-[#7db5d6]">
              No extra leaderboard screen needed to keep going
            </p>
          </div>
        </div>
        <div className="space-y-2">
          {leaderboard.slice(0, 3).map((player, index) => (
            <div
              key={player.id}
              className="flex items-center justify-between rounded-[1.25rem] border border-white/10 bg-[#0d2234]/80 px-3 py-3"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-[#f3c85e]/10 text-sm font-black text-[#f3c85e]">
                  {index + 1}
                </span>
                <Avatar accent={player.accent} icon={player.icon} label={player.name} size="sm" />
                <p className="text-sm font-black uppercase tracking-[0.12em] text-[#fff4cf]">
                  {player.name}
                </p>
              </div>
              <p className="text-lg font-black text-[#f3c85e]">{player.score}</p>
            </div>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
