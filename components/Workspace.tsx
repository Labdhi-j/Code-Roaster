"use client";
import { useState, useCallback, useEffect } from "react";
import { TopBar } from "./TopBar";
import { RoastControls } from "./RoastControls";
import { ErrorMessageInput } from "./ErrorMessageInput";
import { CodeEditor } from "./CodeEditor";
import { RoastReport } from "./RoastReport";
import { StatusBar } from "./StatusBar";
import { DEFAULTS, SAMPLE } from "@/config/app.config";
import { LanguageId, ReportState, RoastLevel, RoastResult } from "@/types/roast";
import { requestRoast } from "@/lib/api";

export function Workspace() {
  const [roastLevel, setRoastLevel] = useState<RoastLevel>(DEFAULTS.roastLevel);
  const [language, setLanguage] = useState<LanguageId>(DEFAULTS.language);
  const [code, setCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorDrawerOpen, setErrorDrawerOpen] = useState(false);
  const [reportState, setReportState] = useState<ReportState>("empty");
  const [roastResult, setRoastResult] = useState<RoastResult | null>(null);
  const [roastedCode, setRoastedCode] = useState("");
  const [apiError, setApiError] = useState("");

  const isRoasting = reportState === "loading";

  const handleRoast = useCallback(async () => {
    if (isRoasting) return;
    if (!code.trim()) {
      setApiError("No code provided. I can't roast the void.");
      setReportState("error");
      return;
    }

    setReportState("loading");
    setRoastResult(null);
    setApiError("");

    try {
      const result = await requestRoast({ language, code, roastLevel, errorMessage });
      setRoastResult(result);
      setRoastedCode(code);
      setReportState("results");
    } catch (err: unknown) {
      setApiError((err as Error).message || "An unknown error occurred.");
      setReportState("error");
    }
  }, [code, language, roastLevel, errorMessage, isRoasting]);

  const handleLoadSample = () => {
    setLanguage(SAMPLE.language as LanguageId);
    setCode(SAMPLE.code);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        handleRoast();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleRoast]);

  const errorLine = reportState === "results" && code === roastedCode 
    ? roastResult?.issues[0]?.line 
    : undefined;

  return (
    <div className="w-full max-w-[1360px] mx-auto flex flex-col items-center">
      <TopBar>
        <RoastControls 
          roastLevel={roastLevel}
          onRoastLevelChange={setRoastLevel}
          language={language}
          onLanguageChange={setLanguage}
          onRoast={handleRoast}
          isRoasting={isRoasting}
          errorDrawerOpen={errorDrawerOpen}
          onToggleErrorDrawer={() => setErrorDrawerOpen(!errorDrawerOpen)}
        />
      </TopBar>

      <main className="w-full h-[calc(100vh-8rem)] min-h-[600px] card-brutal flex flex-col overflow-hidden my-2">
        {errorDrawerOpen && (
          <ErrorMessageInput 
            value={errorMessage}
            onChange={setErrorMessage}
            onClose={() => setErrorDrawerOpen(false)}
          />
        )}

        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          <div className="flex-1 md:w-[55%] flex flex-col h-[50vh] md:h-auto border-b-[2px] md:border-b-0 border-r-0 md:border-r-[2px] border-[var(--color-frame)]">
            <CodeEditor 
              code={code}
              onChange={setCode}
              language={language}
              errorLine={errorLine}
              onLoadSample={handleLoadSample}
            />
          </div>
          <div className="flex-1 md:w-[45%] flex flex-col h-[50vh] md:h-auto">
            <RoastReport 
              state={reportState}
              roastLevel={roastLevel}
              language={language}
              result={roastResult}
              errorMsg={apiError}
              onRetry={handleRoast}
              onApplyFix={setCode}
            />
          </div>
        </div>

        <StatusBar isRoasting={isRoasting} />
      </main>
    </div>
  );
}
