import { analyzeCode } from "../lib/gemini";
import { AI, SAMPLE } from "../config/app.config";

async function main() {
  console.log(`Checking API with model: ${AI.model}`);
  try {
    const result = await analyzeCode({
      language: SAMPLE.language,
      code: SAMPLE.code,
      roastLevel: "sharp",
      errorMessage: "TypeError: unsupported operand type(s) for +=: 'int' and 'list'"
    });
    console.log("SUCCESS!");
    console.log("Roast:", result.roast);
    console.log(`Issues found: ${result.issues.length}`);
    process.exit(0);
  } catch (error) {
    console.error("API Check Failed:", error);
    process.exit(1);
  }
}

main();
