import { Avatar } from "./Avatar";

type PlayerInputCardProps = {
  name: string;
  role: string;
  icon: string;
  accent: string;
  bid: number;
  won: number;
  bonus: number;
};

function Stepper({ value }: { value: number }) {
  return (
    <div className="inline-flex items-center rounded-full border border-white/10 bg-[#102538]/90 p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
      <button className="grid h-8 w-8 place-items-center rounded-full bg-white/[0.06] text-lg text-[#f6d37a]" type="button">
        -
      </button>
      <span className="min-w-10 px-3 text-center text-base font-bold text-[#fff7dd]">
        {value}
      </span>
      <button className="grid h-8 w-8 place-items-center rounded-full bg-[#f0bf4c] text-lg font-bold text-[#22160c]" type="button">
        +
      </button>
    </div>
  );
}

export function PlayerInputCard({
  name,
  role,
  icon,
  accent,
  bid,
  won,
  bonus,
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
          <Stepper value={bid} />
        </div>
        <div className="flex items-center justify-between rounded-2xl bg-white/5 px-3 py-2">
          <span className="text-sm font-semibold text-[#b6d3e6]">Won</span>
          <Stepper value={won} />
        </div>
        <div className="flex items-center justify-between rounded-2xl bg-white/5 px-3 py-2">
          <span className="text-sm font-semibold text-[#b6d3e6]">Bonus</span>
          <div className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-sm font-bold text-emerald-200">
            +{bonus}
          </div>
        </div>
      </div>
    </article>
  );
}
