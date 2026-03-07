import type { ReactNode } from "react";

type ParchmentButtonProps = {
  children: ReactNode;
  icon?: ReactNode;
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
};

export function ParchmentButton({
  children,
  icon,
  variant = "primary",
  fullWidth = true,
}: ParchmentButtonProps) {
  const tone =
    variant === "primary"
      ? "from-[#eadab3] via-[#d9c08d] to-[#c59b5d] text-[#261a0d]"
      : "from-[#d8c19a] via-[#baa074] to-[#8f6b3f] text-[#1d140a]";

  return (
    <button
      className={`pixel-frame relative overflow-hidden rounded-[1.35rem] border border-[#f6e7c3]/30 bg-gradient-to-br ${tone} px-5 py-4 text-left shadow-[0_12px_24px_rgba(0,0,0,0.26)] transition-transform duration-150 active:translate-y-[2px] ${fullWidth ? "w-full" : ""}`}
      type="button"
    >
      <span className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.35),transparent_36%),linear-gradient(180deg,transparent,rgba(73,38,12,0.15))]" />
      <span className="relative flex items-center justify-center gap-3 text-sm font-black uppercase tracking-[0.22em]">
        {icon ? <span className="text-lg">{icon}</span> : null}
        {children}
      </span>
    </button>
  );
}
