type AvatarProps = {
  icon: string;
  label: string;
  accent: string;
  size?: "sm" | "md" | "lg";
};

const sizeClasses = {
  sm: "h-12 w-12 text-lg",
  md: "h-16 w-16 text-2xl",
  lg: "h-20 w-20 text-3xl",
};

export function Avatar({
  icon,
  label,
  accent,
  size = "md",
}: AvatarProps) {
  return (
    <div
      aria-label={label}
      className={`pixel-frame relative grid place-items-center overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.22),transparent_38%),linear-gradient(135deg,rgba(11,26,43,0.92),rgba(20,56,77,0.82))] ${sizeClasses[size]}`}
      style={{ boxShadow: `0 0 0 2px ${accent}35, 0 12px 30px ${accent}20` }}
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "8px 8px",
        }}
      />
      <span className="relative drop-shadow-[0_3px_0_rgba(0,0,0,0.35)]">
        {icon}
      </span>
      <span
        className="absolute inset-x-2 bottom-1 h-1 rounded-full"
        style={{ backgroundColor: accent }}
      />
    </div>
  );
}
