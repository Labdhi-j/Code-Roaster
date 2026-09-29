"use client";
import { useRef, useState } from "react";
import { LanguageId } from "@/types/roast";
import { LANGUAGES } from "@/config/app.config";

interface CodeEditorProps {
  code: string;
  onChange: (c: string) => void;
  language: LanguageId;
  errorLine?: number;
  onLoadSample: () => void;
}

export function CodeEditor({ code, onChange, language, errorLine, onLoadSample }: CodeEditorProps) {
  const [cursor, setCursor] = useState({ line: 1, col: 1 });
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const gutterRef = useRef<HTMLDivElement>(null);

  const langLabel = LANGUAGES.find(l => l.id === language)?.label || language;
  const lines = Math.max(code.split("\n").length, 10);

  const handleSelect = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const el = e.currentTarget;
    const textBeforeCursor = el.value.substring(0, el.selectionStart);
    const line = textBeforeCursor.split("\n").length;
    const col = textBeforeCursor.length - textBeforeCursor.lastIndexOf("\n");
    setCursor({ line, col });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab" && !e.shiftKey) {
      e.preventDefault();
      const el = e.currentTarget;
      const start = el.selectionStart;
      const end = el.selectionEnd;
      const newCode = el.value.substring(0, start) + "    " + el.value.substring(end);
      onChange(newCode);
      setTimeout(() => {
        el.selectionStart = el.selectionEnd = start + 4;
      }, 0);
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    if (gutterRef.current) {
      gutterRef.current.scrollTop = e.currentTarget.scrollTop;
    }
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-[var(--color-editor-bg)] border-r-[2px] border-[var(--color-frame)]">
      <div className="h-[40px] flex items-center justify-between px-3 border-b-[2px] border-[var(--color-frame)]">
        <span className="font-jetbrains-mono text-xs text-[var(--color-subtle)] font-bold">INPUT // SRC</span>
        <span className="font-space-grotesk font-bold uppercase text-[var(--color-editor-ink)]">Your Code</span>
        <div className="flex gap-3 font-jetbrains-mono text-xs font-bold text-[var(--color-editor-ink)]">
          <button onClick={onLoadSample} className="hover:text-[var(--color-accent)]">SAMPLE BUG</button>
          <button onClick={() => onChange("")} className="hover:text-[var(--color-accent)]">CLEAR</button>
        </div>
      </div>
      
      <div className="flex-1 flex overflow-hidden relative">
        <div 
          ref={gutterRef}
          className="w-12 flex-shrink-0 bg-[#111111] border-r-[2px] border-[var(--color-frame)] text-right py-4 overflow-hidden font-jetbrains-mono text-sm leading-[1.5] text-[#888] select-none"
        >
          {Array.from({ length: lines }).map((_, i) => (
            <div 
              key={i} 
              className={`pr-2 ${errorLine === i + 1 ? "bg-[var(--color-accent)] text-[var(--color-ink)] font-bold" : ""}`}
            >
              {i + 1}
            </div>
          ))}
        </div>
        <textarea
          ref={textareaRef}
          value={code}
          onChange={e => onChange(e.target.value)}
          onSelect={handleSelect}
          onKeyDown={handleKeyDown}
          onScroll={handleScroll}
          spellCheck={false}
          placeholder="// Paste your code here..."
          className="flex-1 w-full h-full p-4 font-jetbrains-mono text-sm leading-[1.5] bg-transparent resize-none outline-none whitespace-pre overflow-auto text-[var(--color-editor-ink)] selection:bg-[#333]"
        />
        
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-[#111111] border-t-[2px] border-[var(--color-frame)] hidden md:flex justify-between items-center px-2 font-jetbrains-mono text-[10px] uppercase text-[#888] font-bold tracking-wider">
          <span>Ln {cursor.line}, Col {cursor.col} · {langLabel}</span>
          <span>UTF-8 · Tab Size: 4</span>
        </div>
      </div>
    </div>
  );
}
