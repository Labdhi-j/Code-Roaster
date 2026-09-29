import { APP } from "@/config/app.config";
import React from "react";

export function TopBar({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center mb-6 mt-4">
      <header className="border-[2px] border-[var(--color-frame)] bg-white flex flex-col md:flex-row justify-between md:items-center px-6 py-3 gap-6 rounded-full shadow-[4px_4px_0_var(--color-frame)]">
        <div className="flex items-center gap-4">
          <h1 className="font-space-grotesk font-bold uppercase tracking-widest text-xl text-[var(--color-ink)] flex items-center gap-3">
            <span className="bg-[#4C80F0] text-white text-xs px-2 py-0.5 rounded-full font-jetbrains-mono tracking-normal">GDG Nashik</span>
            {APP.name}
          </h1>
          <span className="font-jetbrains-mono text-[10px] bg-[var(--color-accent)] text-[var(--color-ink)] font-bold px-2 py-0.5 rounded-full">
            {APP.version}
          </span>
        </div>
        <div className="flex flex-row items-center gap-4 font-jetbrains-mono text-sm text-[var(--color-ink)]">
          {children}
        </div>
      </header>
    </div>
  );
}
