export function SectionHeader({ number, title, children }: { number: number, title: string, children?: React.ReactNode }) {
  const formattedNum = number.toString().padStart(2, "0");
  return (
    <div className="flex justify-between items-center border-b-[2px] border-[var(--color-frame)] pb-2 mb-4">
      <h2 className="font-jetbrains-mono font-bold uppercase tracking-widest text-sm text-[var(--color-ink)]">
        {formattedNum} {`//`} {title}
      </h2>
      {children && <div>{children}</div>}
    </div>
  );
}
