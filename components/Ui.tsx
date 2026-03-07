"use client";

import type { ReactNode } from "react";
import { ParchmentButton } from "./ParchmentButton";

export function Stepper({
  value,
  min = 0,
  max,
  onChange,
}: {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
}) {
  const canDecrement = value > min;
  const canIncrement = max === undefined || value < max;

  return (
    <div className="inline-flex items-center rounded-full border border-white/10 bg-[#102538]/90 p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
      <button
        className="grid h-8 w-8 place-items-center rounded-full bg-white/[0.06] text-lg text-[#f6d37a] disabled:opacity-40"
        disabled={!canDecrement}
        onClick={() => canDecrement && onChange(value - 1)}
        type="button"
      >
        -
      </button>
      <span className="min-w-10 px-3 text-center text-base font-bold text-[#fff7dd]">
        {value}
      </span>
      <button
        className="grid h-8 w-8 place-items-center rounded-full bg-[#f0bf4c] text-lg font-bold text-[#22160c] disabled:opacity-40"
        disabled={!canIncrement}
        onClick={() => canIncrement && onChange(value + 1)}
        type="button"
      >
        +
      </button>
    </div>
  );
}

export function ActionRow({
  primary,
  secondary,
}: {
  primary: ReactNode;
  secondary?: ReactNode;
}) {
  return (
    <div className="space-y-3">
      {primary}
      {secondary}
    </div>
  );
}

export { ParchmentButton };
