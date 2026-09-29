export function EmptyState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center gap-4">
      <div className="w-16 h-16 border-[2px] border-dashed border-[var(--color-subtle)] flex items-center justify-center text-3xl font-jetbrains-mono font-bold text-[var(--color-subtle)]">
        {'{ }'}
      </div>
      <h2 className="font-space-grotesk font-bold uppercase text-[var(--color-ink)] text-xl tracking-wide">
        Awaiting Code Submission
      </h2>
      <p className="font-jetbrains-mono text-sm text-[var(--color-subtle)] max-w-sm">
        Paste your code on the left, then click &quot;ROAST MY CODE&quot; or press Ctrl+Enter (⌘+Enter on Mac).
      </p>
    </div>
  );
}
