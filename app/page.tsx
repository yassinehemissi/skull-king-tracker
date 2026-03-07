"use client";

import { useRouter } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { Avatar } from "@/components/Avatar";
import { ParchmentButton } from "@/components/ParchmentButton";
import { useGameStore } from "@/components/GameStoreProvider";
import { getGameSubtitle, getLeaderboard } from "@/lib/game";

export default function HomePage() {
  const router = useRouter();
  const { games, currentGame, continueGame, deleteGame, hydrated } =
    useGameStore();

  const previousGames = [...games].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );

  const canContinue = Boolean(currentGame && currentGame.status !== "finished");

  return (
    <AppShell
      eyebrow="Home"
      title="Skull King"
      actions={
        <div className="space-y-3">
          <ParchmentButton icon="+" onClick={() => router.push("/setup")}>
            New Game
          </ParchmentButton>
          <ParchmentButton
            disabled={!canContinue}
            icon=">"
            onClick={() => canContinue && router.push("/round")}
            variant="secondary"
          >
            Continue
          </ParchmentButton>
        </div>
      }
    >
      <div className="relative overflow-hidden rounded-[1.7rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(240,199,99,0.18),transparent_32%),linear-gradient(180deg,rgba(7,18,30,0.2),rgba(7,18,30,0.4))] p-5 text-center">
        <img
          src="/skullking.png"
          alt="skullking"
          className="signal-pulse bg-cover mx-auto grid h-24 w-24 place-items-center rounded-full border border-[#f3c85e]/25 bg-[#f3c85e]/10 text-4xl font-black text-[#fff0be]"
        />

        <p className="mt-4 font-display text-4xl text-[#fff0be]">
          Score Tracker
        </p>
        <p className="mt-2 text-sm leading-6 text-[#93b9d2]">
          Track rounds, bids, tricks, and bonuses in a mobile-first pirate
          shell.
        </p>
      </div>

      <section className="mt-5">
        <p className="mb-3 text-xs font-black uppercase tracking-[0.26em] text-[#f0c763]">
          Previous Games
        </p>
        {!hydrated ? (
          <div className="rounded-[1.4rem] border border-white/10 bg-white/5 px-4 py-4 text-sm text-[#93b9d2]">
            Loading saved games...
          </div>
        ) : previousGames.length === 0 ? (
          <div className="rounded-[1.4rem] border border-white/10 bg-white/5 px-4 py-4 text-sm text-[#93b9d2]">
            No games yet. Start a new match to build your history.
          </div>
        ) : (
          <div className="space-y-3">
            {previousGames.map((game) => {
              const leader = getLeaderboard(game)[0];
              const isCurrent = currentGame?.id === game.id;

              return (
                <div
                  key={game.id}
                  className="rounded-[1.4rem] border border-white/[0.08] bg-white/5 px-4 py-4"
                >
                  <button
                    className="flex w-full items-center gap-3 text-left"
                    onClick={() => {
                      continueGame(game.id);
                      router.push(
                        game.status === "finished" ? "/finished" : "/round",
                      );
                    }}
                    type="button"
                  >
                    <Avatar
                      accent={leader?.accent ?? "#f1c45b"}
                      icon={leader?.icon ?? "SK"}
                      label={leader?.name ?? game.id}
                      size="sm"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-black uppercase tracking-[0.12em] text-[#fff4d2]">
                        {game.players.length} players
                      </p>
                      <p className="text-xs uppercase tracking-[0.16em] text-[#84adc6]">
                        {getGameSubtitle(game)}
                      </p>
                    </div>
                    <span className="rounded-full bg-[#f3c85e]/12 px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em] text-[#f3c85e]">
                      {game.status === "finished" ? "Open" : "Resume"}
                    </span>
                  </button>
                  <div className="mt-3 flex items-center justify-between gap-3 border-t border-white/10 pt-3">
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#7db5d6]">
                      {isCurrent ? "Current game" : "Saved game"}
                    </p>
                    <button
                      className="rounded-full border border-[#ff9a80]/30 bg-[#ff9a80]/10 px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-[#ffd5ca]"
                      onClick={() => deleteGame(game.id)}
                      type="button"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </AppShell>
  );
}
