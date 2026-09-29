import { ROAST_LEVELS, LANGUAGES } from "@/config/app.config";
import { LanguageId, RoastLevel } from "@/types/roast";

interface RoastControlsProps {
  roastLevel: RoastLevel;
  onRoastLevelChange: (l: RoastLevel) => void;
  language: LanguageId;
  onLanguageChange: (l: LanguageId) => void;
  onRoast: () => void;
  isRoasting: boolean;
  errorDrawerOpen: boolean;
  onToggleErrorDrawer: () => void;
}

export function RoastControls({
  roastLevel, onRoastLevelChange, language, onLanguageChange, onRoast, isRoasting, errorDrawerOpen, onToggleErrorDrawer
}: RoastControlsProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
      <div className="flex items-center gap-2">
        <span>Roast Level:</span>
        <div className="flex items-center gap-2">
          {ROAST_LEVELS.map(level => (
            <label key={level.id} title={level.description} className="flex items-center gap-1 cursor-pointer">
              <input 
                type="radio" 
                name="roastLevel" 
                value={level.id} 
                checked={roastLevel === level.id}
                onChange={() => onRoastLevelChange(level.id)}
                className="accent-[var(--color-accent)] cursor-pointer"
              />
              <span className="capitalize">{level.label}</span>
            </label>
          ))}
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <span>Language:</span>
        <select 
          value={language}
          onChange={(e) => onLanguageChange(e.target.value as LanguageId)}
          className="appearance-none border-[2px] border-[var(--color-frame)] bg-white px-3 py-1.5 pr-8 rounded-[14px] font-jetbrains-mono text-xs outline-none focus:ring-2 focus:ring-[var(--color-accent)] shadow-[2px_2px_0px_var(--color-frame)]"
          style={{ background: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="%23141414" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>') no-repeat right 8px center / 12px white` }}
        >
          {LANGUAGES.map(lang => (
            <option key={lang.id} value={lang.id}>{lang.label}</option>
          ))}
        </select>
      </div>

      <button 
        onClick={onToggleErrorDrawer}
        className="border-[2px] border-[var(--color-frame)] rounded-[999px] bg-white px-4 py-1.5 font-jetbrains-mono text-xs hover:bg-[var(--color-lavender)] transition-colors shadow-[2px_2px_0px_var(--color-frame)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
      >
        {errorDrawerOpen ? "− ERROR MESSAGE" : "+ ERROR MESSAGE"}
      </button>

      <button
        onClick={onRoast}
        disabled={isRoasting}
        className="bg-[var(--color-accent)] text-[var(--color-ink)] font-bold uppercase px-6 py-2 text-xs flex items-center gap-2 hover:bg-[#eab308] disabled:opacity-70 transition-all btn-brutal"
      >
        {isRoasting ? (
          <span className="animate-pulse">ANALYZING...</span>
        ) : (
          <>
            ROAST MY CODE
            <span className="bg-white/20 px-1 py-0.5 rounded text-[10px]">Ctrl ⏎</span>
          </>
        )}
      </button>
    </div>
  );
}
