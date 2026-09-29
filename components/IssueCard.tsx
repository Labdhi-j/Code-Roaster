import { RoastIssue } from "@/types/roast";

interface IssueCardProps {
  index: number;
  issue: RoastIssue;
}

export function IssueCard({ index, issue }: IssueCardProps) {
  const getSeverityStyle = (severity: string) => {
    switch (severity) {
      case "FATAL BUG": return "bg-red-100 text-red-900 border-red-300";
      case "CODE SMELL": return "bg-amber-100 text-amber-900 border-amber-300";
      case "OPTIMIZATION": return "bg-green-100 text-green-900 border-green-300";
      default: return "bg-gray-100 text-gray-900 border-gray-300";
    }
  };

  const getAccentColor = (severity: string) => {
    switch (severity) {
      case "FATAL BUG": return "#ef4444";
      case "CODE SMELL": return "#f59e0b";
      case "OPTIMIZATION": return "#10b981";
      default: return "var(--color-frame)";
    }
  };

  const formattedNum = index.toString().padStart(2, "0");

  return (
    <div className="card-brutal mb-4 p-4 flex flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="bg-[var(--color-ink)] text-white font-jetbrains-mono font-bold text-xs px-2 py-0.5 rounded-sm">
            {formattedNum}
          </span>
          <span className="font-space-grotesk font-bold uppercase text-[var(--color-ink)] text-sm tracking-widest">
            LINE {issue.line}
          </span>
          <span className={`font-jetbrains-mono text-[10px] font-bold px-2 py-0.5 border ${getSeverityStyle(issue.severity)}`}>
            {issue.severity}
          </span>
        </div>
        <div className="font-jetbrains-mono text-xs text-[var(--color-subtle)] text-right break-words max-w-full">
          {issue.title}
        </div>
      </div>
      
      <div 
        className="font-jetbrains-mono text-xs p-3 bg-[var(--color-canvas)] border-[2px] border-[var(--color-frame)] overflow-auto"
        style={{ borderLeftColor: getAccentColor(issue.severity), borderLeftWidth: '4px' }}
      >
        <pre><code>{issue.codeSnippet}</code></pre>
      </div>
      
      <div className="flex flex-col gap-1 font-jetbrains-mono text-xs">
        <div className="text-[var(--color-accent)]">
          <span className="font-bold">✕ Diagnosis:</span> {issue.diagnosis}
        </div>
        <div className="text-green-700">
          <span className="font-bold">✓ Expected:</span> {issue.expected}
        </div>
      </div>
    </div>
  );
}
