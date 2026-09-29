import { ReportState, RoastResult, LanguageId, RoastLevel } from "@/types/roast";
import { SectionHeader } from "./SectionHeader";
import { IssueCard } from "./IssueCard";
import { FixedCode } from "./FixedCode";
import { EmptyState } from "./EmptyState";
import { LoadingState } from "./LoadingState";
import { ErrorState } from "./ErrorState";

interface RoastReportProps {
  state: ReportState;
  roastLevel: RoastLevel;
  language: LanguageId;
  result: RoastResult | null;
  errorMsg: string;
  onRetry: () => void;
  onApplyFix: (c: string) => void;
}

export function RoastReport({ state, roastLevel, language, result, errorMsg, onRetry, onApplyFix }: RoastReportProps) {
  return (
    <div className="flex-1 min-w-[320px] flex flex-col bg-[var(--color-panel)] relative">
      <div className="h-[40px] flex items-center justify-between px-4 border-b-[2px] border-[var(--color-frame)]">
        <span className="font-jetbrains-mono text-xs text-[var(--color-subtle)] font-bold uppercase">AUDIT // REPORT</span>
        <span className="font-space-grotesk font-bold uppercase text-[var(--color-ink)]">Roast Report</span>
        <span className="w-24"></span>
      </div>

      <div className="flex-1 overflow-auto flex flex-col">
        {state === "empty" && <EmptyState />}
        {state === "loading" && <LoadingState />}
        {state === "error" && <ErrorState error={errorMsg} onRetry={onRetry} />}
        
        {state === "results" && result && (
          <div className="p-6">
            <SectionHeader number={1} title="Roast">
              <span className="font-jetbrains-mono text-xs text-[var(--color-subtle)] uppercase">STYLE: {roastLevel}</span>
            </SectionHeader>
            <div className="font-jetbrains-mono text-sm leading-[1.6] text-[var(--color-ink)] mb-8 bg-[var(--color-canvas)] p-4 border-[2px] border-[var(--color-frame)] shadow-[4px_4px_0px_#111111]">
              &quot;{result.roast}&quot;
            </div>

            <SectionHeader number={2} title="What's Wrong">
              <span className="font-jetbrains-mono text-xs font-bold text-[var(--color-accent)] uppercase">
                {result.issues.length} {result.issues.length === 1 ? "ISSUE" : "ISSUES"}
              </span>
            </SectionHeader>
            <div className="mb-8">
              {result.issues.length === 0 ? (
                <div className="font-jetbrains-mono text-sm text-green-700 font-bold p-4 border-[2px] border-[var(--color-frame)] bg-green-50">
                  No issues found. Suspiciously clean.
                </div>
              ) : (
                result.issues.map((issue, idx) => (
                  <IssueCard key={idx} index={idx + 1} issue={issue} />
                ))
              )}
            </div>

            {result.correctedCode && (
              <FixedCode 
                sectionNumber={3} 
                language={language} 
                code={result.correctedCode} 
                onApply={onApplyFix} 
              />
            )}

            {result.takeaway && (
              <div className="mt-8">
                <SectionHeader number={result.correctedCode ? 4 : 3} title="Takeaway" />
                <div className="font-jetbrains-mono text-sm text-[var(--color-ink)]">
                  {result.takeaway}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
