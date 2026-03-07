"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { Avatar } from "@/components/Avatar";
import { ParchmentButton } from "@/components/ParchmentButton";
import { useGameStore } from "@/components/GameStoreProvider";
import { createDefaultPlayers, makeSetupPlayer } from "@/lib/game";
import { PLAYER_ROLES } from "@/lib/types";
import type { PlayerRole, SetupPlayer } from "@/lib/types";

export default function SetupPage() {
  const router = useRouter();
  const { startGame } = useGameStore();
  const [players, setPlayers] = useState<SetupPlayer[]>(createDefaultPlayers());
  const [totalRounds, setTotalRounds] = useState(10);
  const [pickerPlayerId, setPickerPlayerId] = useState<string | null>(null);

  function updatePlayerName(id: string, name: string) {
    setPlayers((current) =>
      current.map((player) => (player.id === id ? { ...player, name } : player)),
    );
  }

  function updatePlayerAvatar(id: string, role: PlayerRole) {
    setPlayers((current) =>
      current.map((player) =>
        player.id === id
          ? {
              ...player,
              role: role.role,
              icon: role.icon,
              accent: role.accent,
            }
          : player,
      ),
    );
    setPickerPlayerId(null);
  }

  function addPlayer() {
    if (players.length >= 8) {
      return;
    }

    const nextPlayer = makeSetupPlayer(players.length, "");
    setPlayers((current) => [...current, nextPlayer]);
    setPickerPlayerId(nextPlayer.id);
  }

  function removePlayer(id: string) {
    if (players.length <= 2) {
      return;
    }

    setPlayers((current) => current.filter((player) => player.id !== id));
    setPickerPlayerId((current) => (current === id ? null : current));
  }

  const readyPlayers = players.filter((player) => player.name.trim().length > 0);
  const canStart = readyPlayers.length >= 2;
  const selectedPlayer = useMemo(
    () => players.find((player) => player.id === pickerPlayerId) ?? null,
    [pickerPlayerId, players],
  );

  return (
    <>
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
              <button
                className="shrink-0"
                onClick={() => setPickerPlayerId(player.id)}
                type="button"
              >
                <Avatar accent={player.accent} icon={player.icon} label={player.role} size="sm" />
              </button>
              <div className="min-w-0 flex-1">
                <input
                  className="w-full rounded-xl border border-white/10 bg-[#0c2234] px-3 py-2 text-sm font-black uppercase tracking-[0.08em] text-[#fff4cc] outline-none placeholder:text-[#6a8fa9]"
                  onChange={(event) => updatePlayerName(player.id, event.target.value)}
                  placeholder="Enter player name"
                  value={player.name}
                />
                <button
                  className="mt-1 text-[11px] uppercase tracking-[0.18em] text-[#76b9dc]"
                  onClick={() => setPickerPlayerId(player.id)}
                  type="button"
                >
                  {player.role} · Change avatar
                </button>
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

      {selectedPlayer ? (
        <div className="fixed inset-0 z-50 flex items-end bg-black/60 sm:items-center sm:justify-center">
          <button
            aria-label="Close avatar picker"
            className="absolute inset-0"
            onClick={() => setPickerPlayerId(null)}
            type="button"
          />
          <div className="relative w-full rounded-t-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(12,30,46,0.98),rgba(7,18,29,0.99))] p-4 sm:max-w-[430px] sm:rounded-[2rem]">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#76b8db]">
                  Avatar Picker
                </p>
                <p className="font-display text-2xl text-[#fff0be]">
                  Choose {selectedPlayer.name || "this player"}'s character
                </p>
              </div>
              <button
                className="rounded-full bg-white/[0.08] px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-[#f3c85e]"
                onClick={() => setPickerPlayerId(null)}
                type="button"
              >
                Close
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {PLAYER_ROLES.map((role) => {
                const selected =
                  selectedPlayer.role === role.role &&
                  selectedPlayer.icon === role.icon &&
                  selectedPlayer.accent === role.accent;

                return (
                  <button
                    key={`${role.role}-${role.icon}`}
                    className={`rounded-[1.5rem] border p-3 text-left ${selected ? "border-[#f3c85e]/50 bg-[#f3c85e]/10" : "border-white/10 bg-white/5"}`}
                    onClick={() => updatePlayerAvatar(selectedPlayer.id, role)}
                    type="button"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar accent={role.accent} icon={role.icon} label={role.role} size="sm" />
                      <div>
                        <p className="text-sm font-black uppercase tracking-[0.12em] text-[#fff4cf]">
                          {role.role}
                        </p>
                        <p className="text-[10px] uppercase tracking-[0.16em] text-[#7db5d6]">
                          {selected ? "Selected" : "Tap to choose"}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
