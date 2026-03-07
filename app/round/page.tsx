"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { ParchmentButton } from "@/components/ParchmentButton";
import { PlayerInputCard } from "@/components/PlayerInputCard";
import { RouteGuard } from "@/components/RouteGuard";
import { useGameStore } from "@/components/GameStoreProvider";
import { cloneRoundInputs, validateRound } from "@/lib/game";

export default function RoundPage() {
  const router = useRouter();
  const { currentGame, submitCurrentRound } = useGameStore();
  const [entries, setEntries] = useState<Array<{ playerId: string; bid: number; won: number; bonus: number }>>([]);

  useEffect(() => {
    if (!currentGame) {
      return;
    }

    if (currentGame.status === "finished") {
      router.replace("/finished");
      return;
    }

    setEntries(cloneRoundInputs(currentGame.players));
  }, [currentGame?.currentRound, currentGame?.id, currentGame?.players, currentGame?.status, router]);

  return (
    <RouteGuard>
      <RoundView
        entries={entries}
        onChange={setEntries}
        onSubmit={() => {
          if (!currentGame || currentGame.status === "finished") {
            return;
          }
          const next = submitCurrentRound(entries);
          if (next) {
            router.push("/result");
          }
        }}
      />
    </RouteGuard>
  );
}

function RoundView({
  entries,
  onChange,
  onSubmit,
}: {
  entries: Array<{ playerId: string; bid: number; won: number; bonus: number }>;
  onChange: (entries: Array<{ playerId: string; bid: number; won: number; bonus: number }>) => void;
  onSubmit: () => void;
}) {
  const { currentGame } = useGameStore();
  if (!currentGame || currentGame.status === "finished") {
    return null;
  }

  const cards = currentGame.currentRound;
  const validation = validateRound(entries, cards);

  function updateEntry(playerId: string, field: "bid" | "won" | "bonus", value: number) {
    onChange(
      entries.map((entry) =>
        entry.playerId === playerId ? { ...entry, [field]: value } : entry,
      ),
    );
  }

  return (
    <AppShell
      eyebrow="Round"
      title={`Round ${currentGame.currentRound}`}
      actions={
        <ParchmentButton disabled={!validation.valid} icon="CALC" onClick={onSubmit}>
          Calculate Scores
        </ParchmentButton>
      }
    >
      <div className="mb-4 grid grid-cols-2 gap-3">
        <div className="rounded-[1.3rem] border border-white/10 bg-white/5 p-3">
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#73b8dc]">Cards</p>
          <p className="mt-1 text-2xl font-black text-[#fff2c0]">{cards}</p>
        </div>
        <div className="rounded-[1.3rem] border border-white/10 bg-white/5 p-3">
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#73b8dc]">Tricks Won</p>
          <p className="mt-1 text-2xl font-black text-[#fff2c0]">{validation.totalWon} / {cards}</p>
        </div>
      </div>

      <div className={`mb-4 rounded-[1.3rem] border px-4 py-3 text-sm font-semibold ${validation.valid ? "border-emerald-300/20 bg-emerald-300/10 text-emerald-100" : "border-[#ff9a80]/25 bg-[#ff9a80]/10 text-[#ffd5ca]"}`}>
        {validation.valid
          ? "Round is valid. Totals match the number of cards in play."
          : `Round is invalid. Tricks won must total ${cards}.`}
      </div>

      <div className="space-y-4">
        {currentGame.players.map((player) => {
          const entry = entries.find((item) => item.playerId === player.id);
          if (!entry) {
            return null;
          }

          return (
            <PlayerInputCard
              key={player.id}
              accent={player.accent}
              bid={entry.bid}
              bonus={entry.bonus}
              cards={cards}
              icon={player.icon}
              name={player.name}
              onBidChange={(value) => updateEntry(player.id, "bid", value)}
              onBonusChange={(value) => updateEntry(player.id, "bonus", value)}
              onWonChange={(value) => updateEntry(player.id, "won", value)}
              role={player.role}
              won={entry.won}
            />
          );
        })}
      </div>
    </AppShell>
  );
}
