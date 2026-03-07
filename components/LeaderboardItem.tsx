import { Avatar } from "./Avatar";

type LeaderboardItemProps = {
  rank: number;
  name: string;
  score: number;
  icon: string;
  accent: string;
};

export function LeaderboardItem({
  rank,
  name,
  score,
  icon,
  accent,
}: LeaderboardItemProps) {
  return (
    <div className="flex items-center gap-3 rounded-[1.4rem] border border-white/[0.08] bg-white/5 px-3 py-3">
      <div className="grid h-9 w-9 place-items-center rounded-full bg-[#0f2a41] text-sm font-black text-[#f2c257]">
        {rank}
      </div>
      <Avatar accent={accent} icon={icon} label={name} size="sm" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-black uppercase tracking-[0.12em] text-[#fff5d8]">
          {name}
        </p>
      </div>
      <div className="text-right">
        <p className="text-lg font-black text-[#f3c85b]">{score}</p>
        <p className="text-[10px] uppercase tracking-[0.22em] text-[#87aac3]">
          pts
        </p>
      </div>
    </div>
  );
}
