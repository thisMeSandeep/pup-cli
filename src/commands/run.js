/**
 * Run command — the main orchestrator.
 * Reads input, shows a spinner, calls Gemini, prints the result, copies to clipboard.
 */

import ora from "ora";
import { execSync } from "node:child_process";

import { getInput } from "../core/input.js";
import { improvePrompt } from "../core/enhancer.js";
import {
  printResult,
  printCopied,
  printClipboardUnavailable,
  printError,
  printHelpTip,
  isOutputPiped,
} from "../ui/theme.js";

/**
 * Copy text to clipboard using native OS commands.
 * Returns true on success, false on failure.
 * Uses execSync with a short timeout so the process never hangs.
 */
function copyToClipboard(text) {
  try {
    if (process.platform === "darwin") {
      execSync("pbcopy", { input: text, timeout: 3000 });
    } else if (process.platform === "win32") {
      execSync("clip", { input: text, timeout: 3000 });
    } else {
      // Linux — try wl-copy (Wayland), then xclip (X11), then xsel (X11 fallback)
      const cmds = [
        "wl-copy",
        "xclip -selection clipboard",
        "xsel --clipboard --input",
      ];
      let copied = false;
      for (const cmd of cmds) {
        try {
          execSync(cmd, { input: text, timeout: 3000, stdio: ["pipe", "ignore", "ignore"] });
          copied = true;
          break;
        } catch {
          // Try next command
        }
      }
      if (!copied) return false;
    }
    return true;
  } catch {
    return false;
  }
}

/**
 * Main handler called by the CLI entry point.
 *
 * @param {string[]} args    - Positional arguments (the user's prompt words)
 * @param {object}   options - Parsed CLI flags (enhance, short, fix)
 */
export async function run(args, options) {
  // 1. Get the user's prompt (from args or stdin)
  const prompt = await getInput(args);

  if (!prompt) {
    printError('Usage: pup "your prompt" [--enhance, --short, --fix]');
    printHelpTip();
    process.exit(1);
  }

  // 2. Show a spinner while we wait for Gemini (only in interactive terminals)
  const spinner = isOutputPiped() ? null : ora("Improving your prompt...").start();

  try {
    // 3. Call Gemini API to improve the prompt
    const result = await improvePrompt(prompt, options);

    // 4. Stop spinner before printing
    if (spinner) spinner.stop();

    // 5. Print the improved prompt
    printResult(result);

    // 6. Copy to clipboard (only in interactive terminals)
    if (!isOutputPiped()) {
      if (copyToClipboard(result)) {
        printCopied();
      } else {
        printClipboardUnavailable();
      }
    }
  } catch (error) {
    // Stop spinner on error
    if (spinner) spinner.stop();

    const msg = error.message || "";

    // Show a specific error message based on what went wrong
    if (msg.includes("GEMINI_API_KEY")) {
      printError(`Error: ${msg}`);
    } else if (msg.includes("empty response")) {
      printError(`Error: ${msg}`);
    } else if (msg.includes("429") || msg.includes("RESOURCE_EXHAUSTED") || msg.includes("quota")) {
      printError("Error: API quota exceeded. Your free-tier limit has been reached.");
      printError("Wait a few minutes or check your usage at: https://ai.google.dev/gemini-api/docs/rate-limits");
    } else if (msg.includes("401") || msg.includes("403") || msg.includes("API_KEY_INVALID")) {
      printError("Error: Invalid API key. Check that your GEMINI_API_KEY is correct.");
      printError("Get a new key at: https://aistudio.google.com/apikey");
    } else if (msg.includes("404") || msg.includes("not found")) {
      printError("Error: Model not found. The Gemini model may have been updated or renamed.");
    } else if (msg.includes("ENOTFOUND") || msg.includes("ECONNREFUSED") || msg.includes("fetch failed")) {
      printError("Error: No internet connection. Check your network and try again.");
    } else {
      printError("Error: Failed to reach Gemini API. Check your API key and internet connection.");
      printError(`Details: ${msg}`);
    }

    printHelpTip();
    process.exit(1);
  }
}


