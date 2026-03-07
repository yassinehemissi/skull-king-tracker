"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { Avatar } from "@/components/Avatar";
import { ParchmentButton } from "@/components/ParchmentButton";
import { useGameStore } from "@/components/GameStoreProvider";
import { createDefaultPlayers, makeSetupPlayer } from "@/lib/game";
import type { SetupPlayer } from "@/lib/types";

export default function SetupPage() {
  const router = useRouter();
  const { startGame } = useGameStore();
  const [players, setPlayers] = useState<SetupPlayer[]>(createDefaultPlayers());
  const [totalRounds, setTotalRounds] = useState(10);

  function updatePlayer(id: string, name: string) {
    setPlayers((current) =>
      current.map((player) => (player.id === id ? { ...player, name } : player)),
    );
  }

  function addPlayer() {
    if (players.length >= 8) {
      return;
    }

    setPlayers((current) => [...current, makeSetupPlayer(current.length, "")]);
  }

  function removePlayer(id: string) {
    if (players.length <= 2) {
      return;
    }

    setPlayers((current) => current.filter((player) => player.id !== id));
  }

  const readyPlayers = players.filter((player) => player.name.trim().length > 0);
  const canStart = readyPlayers.length >= 2;

  return (
    <AppShell
      eyebrow="Setup"
      title="Build The Crew"
      actions={
        <ParchmentButton
          disabled={!canStart}
          icon="GO"
          onClick={() => {
            const game = startGame(
              readyPlayers.map((player) => ({ ...player, name: player.name.trim() })),
              totalRounds,
            );
            if (game) {
              router.push("/round");
            }
          }}
        >
          Start Game
        </ParchmentButton>
      }
    >
      <div className="space-y-3">
        {players.map((player) => (
          <div
            key={player.id}
            className="flex items-center gap-3 rounded-[1.5rem] border border-white/10 bg-white/5 px-3 py-3"
          >
            <Avatar accent={player.accent} icon={player.icon} label={player.role} size="sm" />
            <div className="min-w-0 flex-1">
              <input
                className="w-full rounded-xl border border-white/10 bg-[#0c2234] px-3 py-2 text-sm font-black uppercase tracking-[0.08em] text-[#fff4cc] outline-none placeholder:text-[#6a8fa9]"
                onChange={(event) => updatePlayer(player.id, event.target.value)}
                placeholder="Enter player name"
                value={player.name}
              />
              <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-[#76b9dc]">
                {player.role}
              </p>
            </div>
            <button
              className="rounded-full bg-white/[0.08] px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#f3c85e] disabled:opacity-40"
              disabled={players.length <= 2}
              onClick={() => removePlayer(player.id)}
              type="button"
            >
              Cut
            </button>
          </div>
        ))}
      </div>

      <button
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-[1.4rem] border-2 border-dashed border-[#73c7f7]/30 bg-[rgba(115,199,247,0.06)] px-4 py-4 text-sm font-black uppercase tracking-[0.18em] text-[#87d5ff] disabled:opacity-40"
        disabled={players.length >= 8}
        onClick={addPlayer}
        type="button"
      >
        <span>+</span>
        <span>Add Player</span>
      </button>

      <div className="mt-4 rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.12em] text-[#fff4cf]">
              Number of Rounds
            </p>
            <p className="text-xs uppercase tracking-[0.18em] text-[#7db5d6]">
              2 to 8 players, default game length is 10 rounds
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-[#0e2538] p-1">
            <button
              className="grid h-8 w-8 place-items-center rounded-full bg-white/[0.06] text-[#f1c45b] disabled:opacity-40"
              disabled={totalRounds <= 1}
              onClick={() => setTotalRounds((value) => Math.max(1, value - 1))}
              type="button"
            >
              -
            </button>
            <span className="min-w-8 text-center text-lg font-black text-[#fff4c9]">
              {totalRounds}
            </span>
            <button
              className="grid h-8 w-8 place-items-center rounded-full bg-[#f1c45b] font-black text-[#24170d] disabled:opacity-40"
              disabled={totalRounds >= 10}
              onClick={() => setTotalRounds((value) => Math.min(10, value + 1))}
              type="button"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
