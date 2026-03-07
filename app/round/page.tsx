"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { Avatar } from "@/components/Avatar";
import { ParchmentButton } from "@/components/ParchmentButton";
import { RouteGuard } from "@/components/RouteGuard";
import { useGameStore } from "@/components/GameStoreProvider";
import { cloneRoundInputs, validateRound } from "@/lib/game";

export default function RoundPage() {
  const router = useRouter();
  const { currentGame, submitCurrentRound } = useGameStore();
  const [entries, setEntries] = useState<Array<{ playerId: string; bid: number; won: number; bonus: number }>>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showReview, setShowReview] = useState(false);

  useEffect(() => {
    if (!currentGame) {
      return;
    }

    if (currentGame.status === "finished") {
      router.replace("/finished");
      return;
    }

    setEntries(cloneRoundInputs(currentGame.players));
    setActiveIndex(0);
    setShowReview(false);
  }, [currentGame?.currentRound, currentGame?.id, currentGame?.players, currentGame?.status, router]);

  return (
    <RouteGuard>
      <RoundView
        activeIndex={activeIndex}
        entries={entries}
        onActiveIndexChange={setActiveIndex}
        onChange={setEntries}
        onReviewToggle={() => setShowReview((value) => !value)}
        onSubmit={() => {
          if (!currentGame || currentGame.status === "finished") {
            return;
          }
          const next = submitCurrentRound(entries);
          if (next) {
            router.push("/result");
          }
        }}
        showReview={showReview}
      />
    </RouteGuard>
  );
}

function RoundView({
  activeIndex,
  entries,
  onActiveIndexChange,
  onChange,
  onReviewToggle,
  onSubmit,
  showReview,
}: {
  activeIndex: number;
  entries: Array<{ playerId: string; bid: number; won: number; bonus: number }>;
  onActiveIndexChange: (value: number) => void;
  onChange: (entries: Array<{ playerId: string; bid: number; won: number; bonus: number }>) => void;
  onReviewToggle: () => void;
  onSubmit: () => void;
  showReview: boolean;
}) {
  const { currentGame } = useGameStore();
  const [bonusOpen, setBonusOpen] = useState<Record<string, boolean>>({});

  if (!currentGame || currentGame.status === "finished") {
    return null;
  }

  const cards = currentGame.currentRound;
  const validation = validateRound(entries, cards);
  const activePlayer = currentGame.players[activeIndex];
  const activeEntry = entries.find((item) => item.playerId === activePlayer?.id);
  const tricksLeft = cards - validation.totalWon;
  const reviewReady = validation.valid && entries.length === currentGame.players.length;
  const completedPlayers = entries.filter((entry) => entry.bid > 0 || entry.won > 0 || entry.bonus > 0).length;

  const summaryLabel = useMemo(() => {
    if (validation.valid) {
      return "Trick count is balanced. Open Quick Review or score the round.";
    }
    if (tricksLeft > 0) {
      return `You still need to assign ${tricksLeft} more trick${tricksLeft === 1 ? "" : "s"} before scoring.`;
    }
    return `You assigned ${Math.abs(tricksLeft)} trick${Math.abs(tricksLeft) === 1 ? "" : "s"} too many. Reduce a player's Won value.`;
  }, [tricksLeft, validation.valid]);

  const statusTitle = validation.valid
    ? "Ready to score"
    : tricksLeft > 0
      ? "More tricks needed"
      : "Too many tricks assigned";

  function updateEntry(playerId: string, field: "bid" | "won" | "bonus", value: number) {
    onChange(
      entries.map((entry) =>
        entry.playerId === playerId ? { ...entry, [field]: value } : entry,
      ),
    );
  }

  function maybeAdvance(field: "bid" | "won", value: number) {
    if (field === "won" && activeIndex < currentGame.players.length - 1) {
      onActiveIndexChange(activeIndex + 1);
    }
    if (field === "bid" && value === 0) {
      return;
    }
  }

  return (
    <AppShell
      eyebrow="Round"
      title={`Round ${currentGame.currentRound}`}
      actions={
        <div className="space-y-3 pb-4">
          <ParchmentButton disabled={!reviewReady} icon="REV" onClick={onReviewToggle}>
            {showReview ? "Hide Review" : "Quick Review"}
          </ParchmentButton>
          <ParchmentButton disabled={!reviewReady} icon="CALC" onClick={onSubmit} variant="secondary">
            Score Round
          </ParchmentButton>
        </div>
      }
    >
      <div className="sticky top-0 z-10 -mx-4 mb-4 border-b border-white/10 bg-[linear-gradient(180deg,rgba(11,28,43,0.96),rgba(11,28,43,0.88))] px-4 pb-4 pt-1 backdrop-blur sm:-mx-4 sm:rounded-t-[1.4rem]">
        <div className="grid grid-cols-3 gap-2">
          <SummaryCard label="Cards" value={`${cards}`} />
          <SummaryCard label="Entered" value={`${validation.totalWon}/${cards}`} />
          <SummaryCard label="Crew" value={`${completedPlayers}/${currentGame.players.length}`} />
        </div>
        <div className={`mt-3 rounded-2xl border px-4 py-3 ${validation.valid ? "border-emerald-300/20 bg-emerald-300/10 text-emerald-100" : "border-[#ff9a80]/25 bg-[#ff9a80]/10 text-[#ffd5ca]"}`}>
          <p className="text-xs font-black uppercase tracking-[0.18em]">{statusTitle}</p>
          <p className="mt-1 text-sm font-semibold leading-6">{summaryLabel}</p>
        </div>
      </div>

      <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
        {currentGame.players.map((player, index) => {
          const entry = entries.find((item) => item.playerId === player.id);
          const isActive = index === activeIndex;

          return (
            <button
              key={player.id}
              className={`flex min-w-[84px] flex-col items-center gap-2 rounded-[1.25rem] border px-3 py-3 text-center ${isActive ? "border-[#f3c85e]/40 bg-[#f3c85e]/10" : "border-white/10 bg-white/5"}`}
              onClick={() => onActiveIndexChange(index)}
              type="button"
            >
              <Avatar accent={player.accent} icon={player.icon} label={player.name} size="sm" />
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.12em] text-[#fff4cf]">
                  {player.name}
                </p>
                <p className="text-[10px] uppercase tracking-[0.18em] text-[#78b9db]">
                  {entry ? `${entry.bid}/${entry.won}` : "0/0"}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {activePlayer && activeEntry ? (
        <section className="pixel-frame rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(14,35,54,0.96),rgba(8,21,35,0.96))] p-4 shadow-[0_20px_40px_rgba(1,8,16,0.45)]">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Avatar accent={activePlayer.accent} icon={activePlayer.icon} label={activePlayer.role} size="md" />
              <div>
                <h2 className="text-xl font-black uppercase tracking-[0.12em] text-[#fff3c2]">
                  {activePlayer.name}
                </h2>
                <p className="text-xs uppercase tracking-[0.18em] text-[#7fbde6]">
                  {activePlayer.role}
                </p>
              </div>
            </div>
            <div className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-[#f3c85e]">
              {activeIndex + 1}/{currentGame.players.length}
            </div>
          </div>

          <FastSelectRow
            label="Bid"
            helper="Tap the predicted tricks"
            value={activeEntry.bid}
            max={cards}
            onSelect={(value) => {
              updateEntry(activePlayer.id, "bid", value);
              maybeAdvance("bid", value);
            }}
          />

          <FastSelectRow
            label="Won"
            helper="Tap tricks won, then move on"
            value={activeEntry.won}
            max={cards}
            onSelect={(value) => {
              updateEntry(activePlayer.id, "won", value);
              maybeAdvance("won", value);
            }}
          />

          <div className="mt-4 rounded-[1.35rem] border border-white/10 bg-white/5 p-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.12em] text-[#fff4cf]">
                  Bonus
                </p>
                <p className="text-[11px] uppercase tracking-[0.16em] text-[#7db5d6]">
                  Open only if this player earned one
                </p>
              </div>
              <button
                className="rounded-full border border-white/10 bg-[#102538] px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-[#f3c85e]"
                onClick={() =>
                  setBonusOpen((current) => ({
                    ...current,
                    [activePlayer.id]: !current[activePlayer.id],
                  }))
                }
                type="button"
              >
                {bonusOpen[activePlayer.id] || activeEntry.bonus > 0 ? "Hide Bonus" : "Add Bonus"}
              </button>
            </div>
            {bonusOpen[activePlayer.id] || activeEntry.bonus > 0 ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {[0, 10, 20, 30, 40, 50].map((value) => (
                  <button
                    key={value}
                    className={`rounded-full px-4 py-2 text-sm font-black ${activeEntry.bonus === value ? "bg-[#f3c85e] text-[#24170d]" : "bg-[#102538] text-[#d9edf8]"}`}
                    onClick={() => updateEntry(activePlayer.id, "bonus", value)}
                    type="button"
                  >
                    {value === 0 ? "No bonus" : `+${value}`}
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <div className="mt-4 flex gap-3">
            <button
              className="flex-1 rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-3 text-sm font-black uppercase tracking-[0.16em] text-[#d2ebf9] disabled:opacity-40"
              disabled={activeIndex === 0}
              onClick={() => onActiveIndexChange(Math.max(0, activeIndex - 1))}
              type="button"
            >
              Previous
            </button>
            <button
              className="flex-1 rounded-[1.25rem] bg-[#f3c85e] px-4 py-3 text-sm font-black uppercase tracking-[0.16em] text-[#24170d] disabled:opacity-40"
              disabled={activeIndex === currentGame.players.length - 1}
              onClick={() => onActiveIndexChange(Math.min(currentGame.players.length - 1, activeIndex + 1))}
              type="button"
            >
              Next Player
            </button>
          </div>
        </section>
      ) : null}

      {showReview ? (
        <section className="mt-4 rounded-[1.6rem] border border-white/10 bg-white/5 p-4">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.14em] text-[#fff4cf]">
                Quick Review
              </p>
              <p className="text-[11px] uppercase tracking-[0.16em] text-[#7db5d6]">
                Final pass before scoring
              </p>
            </div>
            <button
              className="rounded-full bg-white/[0.08] px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-[#f3c85e]"
              onClick={onReviewToggle}
              type="button"
            >
              Close
            </button>
          </div>
          <div className="space-y-2">
            {currentGame.players.map((player, index) => {
              const entry = entries.find((item) => item.playerId === player.id);
              if (!entry) {
                return null;
              }

              return (
                <button
                  key={player.id}
                  className="flex w-full items-center justify-between rounded-[1.25rem] border border-white/10 bg-[#0d2234]/80 px-3 py-3 text-left"
                  onClick={() => {
                    onActiveIndexChange(index);
                    onReviewToggle();
                  }}
                  type="button"
                >
                  <div className="flex items-center gap-3">
                    <Avatar accent={player.accent} icon={player.icon} label={player.name} size="sm" />
                    <div>
                      <p className="text-sm font-black uppercase tracking-[0.12em] text-[#fff4cf]">
                        {player.name}
                      </p>
                      <p className="text-[10px] uppercase tracking-[0.16em] text-[#7db5d6]">
                        bid {entry.bid} / won {entry.won} / bonus {entry.bonus}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.16em] text-[#f3c85e]">
                    Edit
                  </span>
                </button>
              );
            })}
          </div>
        </section>
      ) : null}
    </AppShell>
  );
}

function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.15rem] border border-white/10 bg-white/5 p-3">
      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#73b8dc]">{label}</p>
      <p className="mt-1 text-xl font-black text-[#fff2c0]">{value}</p>
    </div>
  );
}

function FastSelectRow({
  label,
  helper,
  max,
  onSelect,
  value,
}: {
  label: string;
  helper: string;
  max: number;
  onSelect: (value: number) => void;
  value: number;
}) {
  return (
    <div className="mt-4 rounded-[1.35rem] border border-white/10 bg-white/5 p-3">
      <div className="mb-3 flex items-end justify-between gap-3">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.12em] text-[#fff4cf]">{label}</p>
          <p className="text-[11px] uppercase tracking-[0.16em] text-[#7db5d6]">{helper}</p>
        </div>
        <div className="rounded-full bg-[#102538] px-4 py-2 text-lg font-black text-[#f3c85e]">
          {value}
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {Array.from({ length: max + 1 }, (_, index) => (
          <button
            key={index}
            className={`rounded-[1rem] px-3 py-3 text-base font-black ${value === index ? "bg-[#f3c85e] text-[#24170d]" : "bg-[#102538] text-[#d7edf9]"}`}
            onClick={() => onSelect(index)}
            type="button"
          >
            {index}
          </button>
        ))}
      </div>
    </div>
  );
}
