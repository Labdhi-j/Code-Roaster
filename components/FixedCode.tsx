"use client";
import { useState } from "react";
import { SectionHeader } from "./SectionHeader";
import { LanguageId } from "@/types/roast";
import { LANGUAGES } from "@/config/app.config";

interface FixedCodeProps {
  sectionNumber: number;
  language: LanguageId;
  code: string;
  onApply: (c: string) => void;
}

export function FixedCode({ sectionNumber, language, code, onApply }: FixedCodeProps) {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">("idle");
  const extension = LANGUAGES.find(l => l.id === language)?.extension || "txt";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    }
    setTimeout(() => setCopyStatus("idle"), 2000);
  };

  const copyLabel = 
    copyStatus === "copied" ? "✓ COPIED TO CLIPBOARD" : 
    copyStatus === "failed" ? "✕ COPY BLOCKED, SELECT MANUALLY" : 
    "📋 COPY FIXED CODE";

  return (
    <div className="mt-8">
      <SectionHeader number={sectionNumber} title="Fix">
        <span className="font-jetbrains-mono font-bold text-green-700 text-xs">CORRECTED CODE</span>
      </SectionHeader>
      
      <div className="card-brutal flex flex-col overflow-hidden">
        <div className="border-b-[2px] border-[var(--color-frame)] bg-[var(--color-lavender)] px-3 py-2 flex justify-between items-center font-jetbrains-mono text-xs">
          <span className="text-[var(--color-ink)] font-bold">solution.{extension}</span>
          <span className="text-[var(--color-accent)] font-bold uppercase">Ready to apply</span>
        </div>
        <div className="p-4 overflow-auto bg-[var(--color-editor-bg)] rounded-b-[20px]">
          <pre className="font-jetbrains-mono text-xs leading-[1.5] text-[var(--color-editor-ink)]">
            <code>{code}</code>
          </pre>
        </div>
      </div>
      
      <div className="mt-4 flex flex-col sm:flex-row gap-3">
        <button 
          onClick={handleCopy}
          className="flex-1 btn-brutal py-2 font-jetbrains-mono font-bold text-xs uppercase bg-[var(--color-canvas)] text-[var(--color-ink)] hover:bg-[var(--color-lavender)]"
        >
          {copyLabel}
        </button>
        <button 
          onClick={() => onApply(code)}
          className="flex-1 btn-brutal py-2 font-jetbrains-mono font-bold text-xs uppercase bg-[var(--color-ink)] text-white hover:opacity-90"
        >
          APPLY TO EDITOR ↵
        </button>
      </div>
    </div>
  );
}
