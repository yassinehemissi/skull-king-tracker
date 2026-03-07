import { Avatar } from "@/components/Avatar";
import { LeaderboardItem } from "@/components/LeaderboardItem";
import { ParchmentButton } from "@/components/ParchmentButton";
import { PlayerInputCard } from "@/components/PlayerInputCard";
import { Podium } from "@/components/Podium";
import { ScoreTable } from "@/components/ScoreTable";

const players = [
  {
    name: "Jack",
    role: "Skull King",
    icon: "SK",
    accent: "#f1c45b",
    score: 240,
    roundScore: 20,
    bid: 2,
    won: 3,
    bonus: 20,
  },
  {
    name: "Lila",
    role: "Mermaid",
    icon: "ME",
    accent: "#73d8ff",
    score: 210,
    roundScore: 20,
    bid: 1,
    won: 1,
    bonus: 20,
  },
  {
    name: "Peter",
    role: "Parrot Pirate",
    icon: "PR",
    accent: "#7ef0a3",
    score: 190,
    roundScore: 40,
    bid: 0,
    won: 0,
    bonus: 40,
  },
  {
    name: "Olivia",
    role: "Blade Captain",
    icon: "BC",
    accent: "#ff8f70",
    score: 160,
    roundScore: -20,
    bid: 2,
    won: 0,
    bonus: 0,
  },
];

const previousGames = [
  { title: "Game 1", players: 5, status: "Round 7" },
  { title: "Game 2", players: 4, status: "Finished" },
];

const scoreRows = [
  { name: "Jack", values: [20, 10, 0, 20, 40, 30, 20], total: 140 },
  { name: "Lila", values: [10, 20, 20, 20, 10, 40, 15], total: 135 },
  { name: "Peter", values: [0, 10, 40, 20, 25, 10, 30], total: 135 },
  { name: "Olivia", values: [-10, 10, 0, -20, 30, 15, -5], total: 20 },
];

function ScreenFrame({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto w-full max-w-[430px] rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(12,30,46,0.96),rgba(7,18,29,0.97))] p-4 shadow-[0_28px_80px_rgba(1,10,18,0.55)] backdrop-blur">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.26em] text-[#76b8df]">
            {eyebrow}
          </p>
          <h2 className="font-display text-2xl tracking-[0.08em] text-[#fff0be]">
            {title}
          </h2>
        </div>
        <div className="rounded-full border border-[#f0c763]/20 bg-[#f0c763]/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.25em] text-[#f0c763]">
          Mobile
        </div>
      </div>
      {children}
    </section>
  );
}

export default function Home() {
  const podiumPlayers = [players[0], players[1], players[2]] as const;

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#18476b_0%,#0b2236_28%,#07131f_62%,#040b12_100%)] px-4 py-8 text-white">
      <div className="mx-auto max-w-6xl">
        <header className="mx-auto mb-8 w-full max-w-[430px] text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#f3c85e]/20 bg-[#f3c85e]/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.3em] text-[#f3c85e]">
            <span>Skull King</span>
            <span>Score App</span>
          </div>
          <h1 className="font-display text-4xl leading-none text-[#fff0be]">
            Gamey mobile wireframe for the full round flow
          </h1>
          <p className="mt-3 text-sm leading-6 text-[#93b9d2]">
            Mobile-first layout with a handset max width, inspired by the Designs
            references and ready for later stateful game logic.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          <ScreenFrame eyebrow="1. Home" title="Start Or Resume">
            <div className="relative overflow-hidden rounded-[1.7rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(240,199,99,0.18),transparent_32%),linear-gradient(180deg,rgba(7,18,30,0.2),rgba(7,18,30,0.4))] p-5">
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
                  backgroundSize: "100% 12px",
                }}
              />
              <div className="relative flex flex-col items-center gap-4 text-center">
                <div className="signal-pulse grid h-24 w-24 place-items-center rounded-full border border-[#f3c85e]/25 bg-[#f3c85e]/10 text-4xl font-black text-[#fff0be]">
                  SK
                </div>
                <div>
                  <p className="font-display text-3xl text-[#fff0be]">Skull King</p>
                  <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#77b7dd]">
                    Score Tracker
                  </p>
                </div>
                <div className="w-full space-y-3">
                  <ParchmentButton icon="+">New Game</ParchmentButton>
                  <ParchmentButton icon=">" variant="secondary">
                    Continue
                  </ParchmentButton>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <p className="mb-3 text-xs font-black uppercase tracking-[0.26em] text-[#f0c763]">
                Previous Games
              </p>
              <div className="space-y-3">
                {previousGames.map((game) => (
                  <div
                    key={game.title}
                    className="rounded-[1.4rem] border border-white/[0.08] bg-white/5 px-4 py-4"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-black uppercase tracking-[0.12em] text-[#fff4d2]">
                          {game.title}
                        </p>
                        <p className="text-xs uppercase tracking-[0.16em] text-[#84adc6]">
                          {game.players} players
                        </p>
                      </div>
                      <span className="rounded-full bg-[#f3c85e]/12 px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em] text-[#f3c85e]">
                        {game.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScreenFrame>

          <ScreenFrame eyebrow="2. Setup" title="Build The Crew">
            <div className="space-y-3">
              {players.map((player) => (
                <div
                  key={player.name}
                  className="flex items-center gap-3 rounded-[1.5rem] border border-white/10 bg-white/5 px-3 py-3"
                >
                  <Avatar
                    accent={player.accent}
                    icon={player.icon}
                    label={player.role}
                    size="sm"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="rounded-xl border border-white/10 bg-[#0c2234] px-3 py-2 text-sm font-black uppercase tracking-[0.08em] text-[#fff4cc]">
                      {player.name}
                    </div>
                    <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-[#76b9dc]">
                      {player.role}
                    </p>
                  </div>
                  <button className="rounded-full bg-white/[0.08] px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#f3c85e]" type="button">
                    Edit
                  </button>
                </div>
              ))}
            </div>

            <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-[1.4rem] border-2 border-dashed border-[#73c7f7]/30 bg-[rgba(115,199,247,0.06)] px-4 py-4 text-sm font-black uppercase tracking-[0.18em] text-[#87d5ff]" type="button">
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
                    Supports 2 to 8 players
                  </p>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-[#0e2538] p-1">
                  <button className="grid h-8 w-8 place-items-center rounded-full bg-white/[0.06] text-[#f1c45b]" type="button">
                    -
                  </button>
                  <span className="min-w-8 text-center text-lg font-black text-[#fff4c9]">
                    10
                  </span>
                  <button className="grid h-8 w-8 place-items-center rounded-full bg-[#f1c45b] font-black text-[#24170d]" type="button">
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <ParchmentButton icon="GO">Start Game</ParchmentButton>
            </div>
          </ScreenFrame>

          <ScreenFrame eyebrow="3. Round" title="Input The Tricks">
            <div className="mb-4 grid grid-cols-2 gap-3">
              <div className="rounded-[1.3rem] border border-white/10 bg-white/5 p-3">
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#73b8dc]">
                  Round
                </p>
                <p className="mt-1 text-2xl font-black text-[#fff2c0]">4 / 10</p>
              </div>
              <div className="rounded-[1.3rem] border border-white/10 bg-white/5 p-3">
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#73b8dc]">
                  Cards
                </p>
                <p className="mt-1 text-2xl font-black text-[#fff2c0]">4</p>
              </div>
            </div>

            <div className="mb-4 rounded-[1.3rem] border border-emerald-300/20 bg-emerald-300/10 px-4 py-3 text-sm font-semibold text-emerald-100">
              Validation: tricks won must total the round number. Swipe dots hint at
              player-to-player entry on mobile.
            </div>

            <div className="space-y-4">
              {players.map((player) => (
                <PlayerInputCard key={player.name} {...player} />
              ))}
            </div>

            <div className="mt-4 flex items-center justify-center gap-2">
              {[0, 1, 2, 3].map((index) => (
                <span
                  key={index}
                  className={`h-2.5 rounded-full ${
                    index === 0 ? "w-8 bg-[#f3c85e]" : "w-2.5 bg-white/20"
                  }`}
                />
              ))}
            </div>

            <div className="mt-4">
              <ParchmentButton icon="CALC">Calculate Scores</ParchmentButton>
            </div>
          </ScreenFrame>

          <ScreenFrame eyebrow="4. Results" title="Round 4 Results">
            <div className="space-y-3">
              {players.map((player) => {
                const positive = player.roundScore >= 0;

                return (
                  <div
                    key={player.name}
                    className="result-glow flex items-center justify-between rounded-[1.45rem] border border-white/10 bg-white/5 px-4 py-4"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar
                        accent={player.accent}
                        icon={player.icon}
                        label={player.name}
                        size="sm"
                      />
                      <div>
                        <p className="text-sm font-black uppercase tracking-[0.12em] text-[#fff4cc]">
                          {player.name}
                        </p>
                        <p className="text-[10px] uppercase tracking-[0.18em] text-[#76b8db]">
                          count up animation
                        </p>
                      </div>
                    </div>
                    <p
                      className={`text-xl font-black ${
                        positive ? "text-[#f3d66d]" : "text-[#ff9a80]"
                      }`}
                    >
                      {positive ? "+" : ""}
                      {player.roundScore} pts
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 rounded-[1.6rem] border border-[#f3c85e]/20 bg-[radial-gradient(circle_at_top,rgba(243,200,94,0.16),transparent_42%),rgba(255,255,255,0.04)] p-5 text-center">
              <p className="text-2xl">WIN STREAK</p>
              <p className="mt-2 text-sm font-black uppercase tracking-[0.18em] text-[#fff4cf]">
                Gold sparkles for positive rounds
              </p>
            </div>

            <div className="mt-4">
              <ParchmentButton icon="TOP">View Leaderboard</ParchmentButton>
            </div>
          </ScreenFrame>

          <ScreenFrame eyebrow="5. Ranking" title="Leaderboard">
            <div className="rounded-[1.7rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(243,200,94,0.16),transparent_34%),rgba(255,255,255,0.04)] p-4">
              <div className="mb-4 text-center">
                <p className="text-3xl font-black text-[#f3c85e]">NO.1</p>
                <p className="font-display text-2xl text-[#fff0be]">Skull King</p>
                <p className="text-xs font-black uppercase tracking-[0.28em] text-[#f3c85e]">
                  podium animation
                </p>
              </div>
              <Podium players={podiumPlayers} />
            </div>

            <div className="mt-4 space-y-3">
              {players.map((player, index) => (
                <LeaderboardItem
                  key={player.name}
                  accent={player.accent}
                  icon={player.icon}
                  name={player.name}
                  rank={index + 4}
                  score={player.score}
                />
              ))}
            </div>

            <div className="mt-4">
              <ParchmentButton icon="->">Next Round</ParchmentButton>
            </div>
          </ScreenFrame>

          <ScreenFrame eyebrow="6. Table" title="Full Score Table">
            <div className="mb-4 rounded-[1.3rem] border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-[#b3d0e4]">
              Horizontal scroll is preserved for mobile. Previous rounds can be
              opened for edits later from the same table model.
            </div>
            <ScoreTable
              columns={["R1", "R2", "R3", "R4", "R5", "R6", "R7"]}
              rows={scoreRows}
            />
            <div className="mt-4">
              <ParchmentButton icon="DL">Export</ParchmentButton>
            </div>
          </ScreenFrame>

          <ScreenFrame eyebrow="7. Finish" title="Game Over">
            <div className="rounded-[1.8rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(243,200,94,0.22),transparent_36%),linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] p-5 text-center">
              <div className="mb-4 text-5xl font-black text-[#f3c85e]">END</div>
              <p className="font-display text-4xl text-[#fff0be]">Jack Wins!</p>
              <p className="mt-2 text-xs font-black uppercase tracking-[0.28em] text-[#f3c85e]">
                fireworks and pirate music hook here
              </p>
              <div className="mt-5 space-y-3">
                {players.slice(0, 3).map((player, index) => (
                  <div
                    key={player.name}
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
                    <p className="text-lg font-black text-[#f3c85e]">
                      {player.score} pts
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <ParchmentButton icon="NEW">New Game</ParchmentButton>
              <ParchmentButton icon="TAB" variant="secondary">
                View Full Table
              </ParchmentButton>
            </div>
          </ScreenFrame>
        </div>
      </div>
    </main>
  );
}
