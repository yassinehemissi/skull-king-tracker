"use client";

import type { ReactNode } from "react";
import Link from "next/link";

export function AppShell({
  title,
  eyebrow,
  children,
  actions,
}: {
  title: string;
  eyebrow: string;
  children: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#18476b_0%,#0b2236_28%,#07131f_62%,#040b12_100%)] px-4 py-6 text-white">
      <div className="mx-auto w-full max-w-[430px]">
        <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(12,30,46,0.96),rgba(7,18,29,0.97))] p-4 shadow-[0_28px_80px_rgba(1,10,18,0.55)] backdrop-blur">
          <header className="mb-5 flex items-start justify-between gap-3">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.26em] text-[#76b8df]">
                {eyebrow}
              </p>
              <h1 className="font-display text-3xl tracking-[0.08em] text-[#fff0be]">
                {title}
              </h1>
            </div>
            <Link
              href="/"
              className="rounded-full border border-[#f0c763]/20 bg-[#f0c763]/10 px-3 py-2 text-[10px] font-black uppercase tracking-[0.25em] text-[#f0c763]"
            >
              Home
            </Link>
          </header>
          {children}
          {actions ? <div className="mt-5">{actions}</div> : null}
        </div>
      </div>
    </main>
  );
}
