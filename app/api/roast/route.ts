import { NextResponse } from "next/server";
import { analyzeCode } from "@/lib/gemini";
import { ROAST_LEVELS, LANGUAGES, DEFAULTS, LIMITS } from "@/config/app.config";
import { RoastRequest } from "@/types/roast";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
    }

    const rawCode = typeof body.code === "string" ? body.code : "";
    const rawErrorMessage = typeof body.errorMessage === "string" ? body.errorMessage.trim() : "";
    
    if (!rawCode) {
      return NextResponse.json({ error: "No code provided." }, { status: 400 });
    }
    if (rawCode.length > LIMITS.maxCodeLength) {
      return NextResponse.json({ error: `Code is too long (max ${LIMITS.maxCodeLength} chars).` }, { status: 400 });
    }
    if (rawErrorMessage.length > LIMITS.maxErrorMessageLength) {
      return NextResponse.json({ error: `Error message is too long (max ${LIMITS.maxErrorMessageLength} chars).` }, { status: 400 });
    }

    const language = LANGUAGES.find(l => l.id === body.language)?.id ?? DEFAULTS.language;
    const roastLevel = ROAST_LEVELS.find(r => r.id === body.roastLevel)?.id ?? DEFAULTS.roastLevel;

    const requestPayload: RoastRequest = {
      language,
      code: rawCode,
      roastLevel,
      errorMessage: rawErrorMessage
    };

    const result = await analyzeCode(requestPayload);
    return NextResponse.json(result);
  } catch (error: unknown) {
    console.error("API Error:", error);
    return NextResponse.json({ error: (error as Error).message || "An error occurred." }, { status: 500 });
  }
}
