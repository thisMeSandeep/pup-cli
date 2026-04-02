#!/usr/bin/env node

//  pup CLI — improve your AI prompts from the terminal.
//  Entry point: sets up commander and hands off to the run command.

import { program } from "commander";
import { run } from "../src/commands/run.js"; // The main handler for the "run" command, which orchestrates the whole process.

program
  .name("pup")
  .description("Improve your AI prompts directly from the terminal")
  .argument("[prompt...]", "The prompt to improve")
  .option("--enhance", "Fully enhance the prompt with detail and structure")
  .option("--short", "Shorten the prompt, remove all fluff")
  .option("--fix", "Fix only typos, spelling, and grammar")
  .addHelpText(
    "after",
    `
Setup:
  1. Get a free API key at https://aistudio.google.com/apikey
  2. Add it to your shell profile:
     echo 'export GEMINI_API_KEY=your_key' >> ~/.zshrc && source ~/.zshrc
  3. To change your key later, edit ~/.zshrc or run:
     export GEMINI_API_KEY=your_new_key

Examples:
  pup "fix the auth bug"              Light cleanup (default)
  pup "fix the auth bug" --enhance    Full enhancement with detail
  pup "fix the auth bug" --short      Make it concise
  pup "fix the auth bug" --fix        Fix typos and grammar only
  echo "fix the auth bug" | pup       Piped input

Clipboard:
  pup auto-copies the result to your clipboard. If it doesn't work:
  - macOS:    Built-in (pbcopy) — no setup needed
  - Windows:  Built-in (clip) — no setup needed
  - Linux (Wayland): sudo apt install wl-clipboard
  - Linux (X11):     sudo apt install xclip

Note:
  Only one mode flag (--enhance, --short, --fix) should be used at a time.
  If multiple flags are provided, only the first one will be applied.`,
  )
  .action(run);

program.parse();
