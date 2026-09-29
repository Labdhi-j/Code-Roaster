interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

export function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center gap-4">
      <div className="w-16 h-16 border-[2px] border-[var(--color-accent)] flex items-center justify-center text-4xl font-space-grotesk font-bold text-[var(--color-accent)]">
        !
      </div>
      <h2 className="font-space-grotesk font-bold uppercase text-[var(--color-accent)] text-xl tracking-wide">
        Analysis Failed
      </h2>
      <p className="font-jetbrains-mono text-sm text-[var(--color-subtle)] max-w-sm mb-4">
        {error || "An unknown error occurred during code evaluation."}
      </p>
      <button 
        onClick={onRetry}
        className="border-[2px] border-[var(--color-frame)] bg-transparent hover:bg-[var(--color-frame)] hover:text-white px-4 py-2 font-jetbrains-mono font-bold text-xs uppercase transition-colors"
      >
        RETRY ANALYSIS ↵
      </button>
    </div>
  );
}
