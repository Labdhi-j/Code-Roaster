import { APP, AI } from "@/config/app.config";

export function StatusBar({ isRoasting }: { isRoasting: boolean }) {
  return (
    <footer className="border-t-[2px] border-[var(--color-frame)] bg-[var(--color-canvas)] shrink-0">
      <div className="flex justify-between items-center px-4 py-2 font-jetbrains-mono text-xs text-[var(--color-subtle)] uppercase tracking-wide">
        <div className="flex items-center gap-2">
          <span className="font-bold">STATUS:</span>
          {isRoasting ? (
            <span className="text-amber-600 font-bold animate-pulse">PROCESSING...</span>
          ) : (
            <span className="text-green-700 font-bold">ONLINE ({AI.modelLabel.toUpperCase()})</span>
          )}
          <span className="hidden md:inline">| ENGINE: GOOGLE GEMINI</span>
        </div>
        <div className="font-bold tracking-widest">
          {APP.name} {APP.version} {`//`} LIVE
        </div>
      </div>
      <div className="text-center font-jetbrains-mono text-[10px] text-[var(--color-subtle)] pb-2 opacity-70">
        Made at GDG Nashik Pre-DevFest Workshop
      </div>
    </footer>
  );
}
