import { Avatar } from "./Avatar";

type PodiumPlayer = {
  name: string;
  score: number;
  icon: string;
  accent: string;
};

type PodiumProps = {
  players: [PodiumPlayer, PodiumPlayer, PodiumPlayer];
};

export function Podium({ players }: PodiumProps) {
  const [first, second, third] = players;

  return (
    <div className="grid grid-cols-3 items-end gap-3">
      <PodiumBlock height="h-24" place="2" player={second} />
      <PodiumBlock height="h-32" highlight place="1" player={first} />
      <PodiumBlock height="h-20" place="3" player={third} />
    </div>
  );
}

function PodiumBlock({
  player,
  place,
  height,
  highlight = false,
}: {
  player: PodiumPlayer;
  place: string;
  height: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <Avatar
        accent={player.accent}
        icon={player.icon}
        label={player.name}
        size={highlight ? "lg" : "md"}
      />
      <div
        className={`w-full rounded-t-[1.5rem] border border-white/10 bg-gradient-to-b ${
          highlight
            ? "from-[#f3cb67] via-[#d49d35] to-[#78531f] text-[#261909]"
            : "from-[#1c4a67] via-[#14334a] to-[#0d2031] text-[#f4d896]"
        } ${height} flex flex-col items-center justify-center`}
      >
        <p className="text-xs font-black uppercase tracking-[0.2em]">{place}</p>
        <p className="mt-1 px-1 text-center text-[11px] font-black uppercase tracking-[0.12em]">
          {player.name}
        </p>
        <p className="text-xs font-bold">{player.score} pts</p>
      </div>
    </div>
  );
}
