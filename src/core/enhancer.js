// Enhancer — builds system prompts and calls the Gemini API.

import { GoogleGenAI } from "@google/genai";
import { SYSTEM_PROMPTS } from "./systemPrompts.js";

// Pick which mode to use based on the CLI flags.
// Only one flag can be active; defaults to "default" mode.
function getMode(options = {}) {
  if (options.enhance) return "enhance";
  if (options.short) return "short";
  if (options.fix) return "fix";
  return "default";
}

// Send the user's prompt to Gemini and return the improved version.
// prompt: user's raw prompt
// options: CLI flags (enhance, short, fix)
// returns: improved prompt text
export async function improvePrompt(prompt, options) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error(
      `GEMINI_API_KEY environment variable is not set.\n\nTo fix this, run:\n  echo 'export GEMINI_API_KEY=your_key_here' >> ~/.zshrc && source ~/.zshrc\n\nGet your free API key at: https://aistudio.google.com/apikey`,
    );
  }

  const ai = new GoogleGenAI({ apiKey });
  const mode = getMode(options);
  const systemPrompt = SYSTEM_PROMPTS[mode];

  // Call the Gemini API with system instruction + user prompt
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: prompt,
    config: {
      systemInstruction: systemPrompt,
    },
  });

  // Check if the response was blocked by safety filters
  if (response.promptFeedback?.blockReason) {
    throw new Error(
      `Your prompt was blocked by Gemini's safety filters. Reason: ${response.promptFeedback.blockReason}. Try rephrasing your prompt.`
    );
  }

  const text = response.text;

  if (!text || text.trim().length === 0) {
    throw new Error("Gemini returned an empty response. Try again.");
  }

  return text.trim();
}
