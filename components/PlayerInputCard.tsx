import { Avatar } from "./Avatar";
import { Stepper } from "./Ui";

type PlayerInputCardProps = {
  name: string;
  role: string;
  icon: string;
  accent: string;
  bid: number;
  won: number;
  bonus: number;
  cards: number;
  onBidChange: (value: number) => void;
  onWonChange: (value: number) => void;
  onBonusChange: (value: number) => void;
};

export function PlayerInputCard({
  name,
  role,
  icon,
  accent,
  bid,
  won,
  bonus,
  cards,
  onBidChange,
  onWonChange,
  onBonusChange,
}: PlayerInputCardProps) {
  return (
    <article className="pixel-frame rounded-[1.6rem] border border-white/10 bg-[linear-gradient(180deg,rgba(14,35,54,0.96),rgba(8,21,35,0.96))] p-4 shadow-[0_20px_40px_rgba(1,8,16,0.45)]">
      <div className="mb-4 flex items-center gap-3">
        <Avatar accent={accent} icon={icon} label={role} size="sm" />
        <div>
          <h3 className="text-base font-black uppercase tracking-[0.12em] text-[#fff3c2]">
            {name}
          </h3>
          <p className="text-xs uppercase tracking-[0.18em] text-[#7fbde6]">
            {role}
          </p>
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between rounded-2xl bg-white/5 px-3 py-2">
          <span className="text-sm font-semibold text-[#b6d3e6]">Bid</span>
          <Stepper max={cards} onChange={onBidChange} value={bid} />
        </div>
        <div className="flex items-center justify-between rounded-2xl bg-white/5 px-3 py-2">
          <span className="text-sm font-semibold text-[#b6d3e6]">Won</span>
          <Stepper max={cards} onChange={onWonChange} value={won} />
        </div>
        <div className="flex items-center justify-between rounded-2xl bg-white/5 px-3 py-2">
          <span className="text-sm font-semibold text-[#b6d3e6]">Bonus</span>
          <Stepper max={200} onChange={onBonusChange} value={bonus} />
        </div>
      </div>
    </article>
  );
}
