// Theme — output formatting helpers using chalk.
// All visual output goes through here so it's easy to control.

import chalk from "chalk";

// True when stdout is being piped (not a terminal)
const isPiped = !process.stdout.isTTY;

// Print the improved prompt to stdout.
// Plain text, no colors — keeps it pipe-safe.
export function printResult(text) {
  console.log(text);
}

// Print the "Copied to clipboard" confirmation.
// Dim/muted so it doesn't compete with the actual result.
// Hidden entirely when output is piped.
export function printCopied() {
  if (isPiped) return;
  console.log(chalk.dim("✔ Copied to clipboard - paste it anywhere you want"));
}

// Print a muted note when clipboard integration is unavailable.
export function printClipboardUnavailable() {
  if (isPiped) return;
  console.log(chalk.dim("Clipboard unavailable in this terminal session"));
}

// Print an error message in red.
// Always prints to stderr so it doesn't pollute piped output.
export function printError(message) {
  console.error(chalk.red(message));
}

// Print a help tip pointing users to --help for full usage + setup info.
// Shown after every error so the user always knows where to look.
export function printHelpTip() {
  console.error(chalk.dim("\nRun pup --help for usage and setup instructions."));
}

// Check if stdout is being piped (not a TTY).
export function isOutputPiped() {
  return isPiped;
}
