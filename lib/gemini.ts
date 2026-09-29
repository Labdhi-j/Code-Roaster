import { GoogleGenAI } from "@google/genai";
import { AI } from "../config/app.config";
import { RoastRequest, RoastResult } from "../types/roast";
import { ROAST_SYSTEM_INSTRUCTION, buildUserPrompt } from "./prompt";
import { roastResponseSchema } from "./schema";

function friendlyErrorMessage(status: number, error: unknown): string {
  if (status === 400) return "Bad Request. The code might be too long or malformed.";
  if (status === 403) return "Forbidden. Check your GEMINI_API_KEY in .env.local.";
  if (status === 404) return `Model not found. Ensure ${AI.model} is correct in config.`;
  if (status === 429) return "Rate limit exceeded. Please try again later.";
  if (status === 503) return "Gemini API is overloaded (503). Retrying might help.";
  const err = error as { message?: string };
  return err?.message || "An unknown error occurred during code evaluation.";
}

export async function analyzeCode(request: RoastRequest): Promise<RoastResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is missing. Copy .env.example to .env.local, add your key, and restart the server.");
  }

  const ai = new GoogleGenAI({ apiKey });
  const contents = buildUserPrompt(request);

  let attempt = 0;
  while (attempt < AI.maxAttempts) {
    attempt++;
    try {
      const response = await ai.models.generateContent({
        model: AI.model,
        contents,
        config: {
          systemInstruction: ROAST_SYSTEM_INSTRUCTION,
          responseMimeType: "application/json",
          responseSchema: roastResponseSchema,
        }
      });
      
      const text = response.text;
      if (!text) throw new Error("Empty response from Gemini.");
      
      const result = JSON.parse(text);
      return {
        roast: result.roast ?? "",
        issues: Array.isArray(result.issues) ? result.issues : [],
        correctedCode: result.correctedCode ?? "",
        takeaway: result.takeaway ?? ""
      };
    } catch (error: unknown) {
      const err = error as { status?: number, response?: { status?: number }, message?: string };
      const status = err?.status || err?.response?.status;
      if (status === 503 && attempt < AI.maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, attempt * 1000));
        continue;
      }
      throw new Error(friendlyErrorMessage(status || 500, err));
    }
  }
  throw new Error("Max retries reached.");
}
