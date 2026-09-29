interface ErrorMessageInputProps {
  value: string;
  onChange: (val: string) => void;
  onClose: () => void;
}

export function ErrorMessageInput({ value, onChange, onClose }: ErrorMessageInputProps) {
  return (
    <div className="border-b-[2px] border-[var(--color-frame)] bg-[var(--color-panel)] p-3">
      <div className="flex justify-between items-center mb-2 font-jetbrains-mono text-xs">
        <span className="uppercase font-bold text-[var(--color-ink)]">Attach Terminal Traceback / Compiler Error (Optional)</span>
        <button onClick={onClose} className="hover:text-[var(--color-accent)] font-bold">Dismiss ✕</button>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={2}
        className="w-full border-[2px] border-[var(--color-frame)] p-2 font-jetbrains-mono text-sm bg-[var(--color-canvas)] outline-none focus:border-[var(--color-accent)]"
        placeholder="TypeError: unsupported operand type(s) for +=: 'int' and 'list'..."
      />
    </div>
  );
}
