export function LoadingState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center gap-4">
      <div className="w-16 h-16 border-[2px] border-[var(--color-ink)] flex items-center justify-center text-3xl font-jetbrains-mono font-bold text-[var(--color-ink)]">
        <span className="animate-spin">/</span>
      </div>
      <h2 className="font-space-grotesk font-bold uppercase text-[var(--color-ink)] text-xl tracking-wide animate-pulse">
        Analyzing Code
      </h2>
      <p className="font-jetbrains-mono text-sm text-[var(--color-subtle)] max-w-sm">
        Evaluating computational complexity and architectural purity...
      </p>
    </div>
  );
}
