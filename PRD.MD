# PRD — pup CLI Tool

- NPM name - pup-cli
- terminal command - pup 

## What We Are Building

A command-line tool called `pup` that takes a developer's rough, incomplete, or lazy prompt and returns an improved version of it using the Google Gemini AI API. The developer runs one command in their terminal, gets a better prompt back, and pastes it into Claude Code, Copilot, Codex, Gemini CLI, or any other AI coding tool they are using. No tab switching, no copy-pasting into ChatGPT, no friction.

---

## Problem It Solves

Developers using AI coding tools like Claude Code, GitHub Copilot, and Codex often write short and vague prompts because they do not want to spend time writing long detailed ones. This leads to poor AI output and wasted time. The current workaround is pasting the prompt into ChatGPT and asking it to improve it, which adds unnecessary steps. This tool eliminates that friction by bringing prompt improvement directly into the terminal.

---

## Package and SDK

- Use the `@google/genai` npm package exclusively. Do not use `@google/generative-ai` — that is the old package. The correct and current one is `@google/genai`.
- Import style: `import { GoogleGenAI } from "@google/genai"`
- Initialize: `const ai = new GoogleGenAI({ apiKey: "USER_API_KEY" })`
- Make the API call like this:

```js
const response = await ai.models.generateContent({
  model: "gemini-2.0-flash",
  contents: "your prompt here",
});
const text = response.text;
```

- Do not use `.getGenerativeModel()`, do not use `.generateContentStream()` unless explicitly needed, and do not import anything other than `GoogleGenAI` from this package.

---

## Tool Name

`pup`

---

## Runtime and Module System

- Node.js 18 or higher
- Use ESM modules throughout. Set `"type": "module"` in package.json.
- All files use `import`/`export` syntax. No `require()` anywhere.

---

## How the User Installs It

The user installs the tool globally using any of these:

```
npm install -g pup-cli
pnpm add -g pup-cli
yarn global add pup-cli
bun add -g pup-cli
```

After installation, the command `pup` is available globally in their terminal.

---

## API Key — How It Works

- The user brings their own Google Gemini API key.
- The tool reads the key from the environment variable `GEMINI_API_KEY`.
- The user sets this in their shell profile: `export GEMINI_API_KEY=your_key_here`
- If the key is not found in the environment, the tool prints a clear error message telling the user exactly what to do and exits. Do not crash silently.
- Never store the API key in any file. Never prompt the user to enter it interactively. Just read from the environment variable and fail gracefully if it is missing.

---

## Commands and Flags

There are no subcommands. The tool has one job: take a prompt, return a better one.

### Default behavior (no flag)

```
pup "your prompt here"
```

Lightly improve the prompt. Fix obvious gaps, add clarity, make it more useful for an AI coding tool. Do not change the intent. Do not make it longer than necessary. Think of this as a quick cleanup.

### --enhance

```
pup "your prompt here" --enhance
```

Fully enhance the prompt. Make it detailed, structured, and optimized for AI coding tools. Add context, specify expected output format, mention constraints, cover edge cases. This produces the most thorough version of the prompt.

### --short

```
pup "your prompt here" --short
```

Shorten the prompt. Keep the core intent but remove all fluff, redundancy, and unnecessary words. Return a clean, concise version.

### --fix

```
pup "your prompt here" --fix
```

Fix only typos, spelling mistakes, and grammatical errors. Do not change the structure, content, or meaning of the prompt. Return a corrected version.

---

## Input Methods

The user can provide their prompt in two ways:

**1. Inline argument:**

```
pup "fix the auth bug in my express middleware"
```

**2. Piped from stdin:**

```
echo "fix the auth bug" | pup
echo "fix the auth bug" | pup --enhance
```

Both must work. When reading from stdin, wait for the full input before sending to the API.

If neither an argument nor stdin input is provided, print a short usage message and exit.

---

## Output Behavior

- Print only the improved prompt to stdout. Nothing else.
- No labels like "Enhanced prompt:" or "Here is your result:". Just the raw improved text.
- After printing to stdout, also automatically copy the result to the clipboard using the `clipboardy` package.
- Print a single dim/muted line below the output confirming it was copied, like: `✔ Copied to clipboard`
- If clipboard copy fails for any reason, silently skip it. Do not error out.
- Output must be pipe-safe. If stdout is not a TTY (i.e. the output is being piped), disable all colors and the clipboard line. Print only the raw text.

---

## Dependencies

Use exactly these packages. No others.

```json
{
  "@google/genai": "latest",
  "chalk": "^5.4.1",
  "clipboardy": "^4.0.0",
  "commander": "^12.1.0",
  "ora": "^8.1.1"
}
```

All of these are ESM-compatible. Do not add any other dependencies.

---

## Project File Structure

```
promptly/
├── bin/
│   └── promptly.js        (CLI entry point, has the node shebang line)
├── src/
│   ├── commands/
│   │   └── run.js         (handles the main command logic)
│   ├── core/
│   │   ├── enhancer.js    (builds the prompt and calls Gemini API)
│   │   └── input.js       (reads from arg or stdin)
│   └── ui/
│       └── theme.js       (chalk color helpers and output formatting)
├── package.json
└── README.md
```

---

## package.json Requirements

```json
{
  "name": "pup-cli",
  "version": "1.0.0",
  "description": "Improve your AI prompts directly from the terminal",
  "type": "module",
  "bin": {
    "pup": "./bin/promptly.js"
  },
  "engines": {
    "node": ">=18"
  }
}
```

The `bin` field is what makes `pup` available as a global command after install.

---

## The Shebang Line

The first line of `bin/promptly.js` must be:

```
#!/usr/bin/env node
```

Without this, the global command will not work on Unix systems.

---

## Gemini Model

Use `gemini-2.0-flash` as the model. It is fast, free-tier eligible, and more than capable for prompt rewriting tasks.

---

## System Prompts for Each Mode

These are the exact instructions to send to Gemini for each flag. Pass them as a system instruction or prepend them to the user content.

### Default (no flag)

```
You are a prompt improvement assistant for developer AI tools like Claude Code, GitHub Copilot, and Codex.
The user has given you a rough prompt. Lightly improve it — fix gaps, add small amounts of clarity, make it more actionable.
Do not change the intent. Do not make it significantly longer.
Return ONLY the improved prompt. No explanation. No preamble. No quotes around it.
```

### --enhance

```
You are an expert prompt engineer for developer AI coding tools.
Take the user's rough prompt and transform it into a detailed, well-structured, highly effective prompt.
Add relevant context, specify the expected output, mention constraints and edge cases where applicable.
Do not change what the user is asking for — only make it clearer, richer, and more useful for an AI coding assistant.
Return ONLY the enhanced prompt. No explanation. No preamble. No quotes around it.
```

### --short

```
You are a prompt editing assistant.
Take the user's prompt and shorten it significantly. Remove all fluff, filler words, and redundancy.
Keep the exact intent and all essential information but make it as concise as possible.
Return ONLY the shortened prompt. No explanation. No preamble. No quotes around it.
```

### --fix

```
You are a grammar and spelling correction assistant.
Fix all typos, spelling mistakes, and grammatical errors in the user's prompt.
Do not change the structure, wording choices, or meaning beyond correcting errors.
Return ONLY the corrected prompt. No explanation. No preamble. No quotes around it.
```

---

## Error Handling

Handle these cases explicitly and print a helpful message for each:

| Situation               | Message to print                                                                                                             |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| GEMINI_API_KEY not set  | `Error: GEMINI_API_KEY environment variable is not set. Add this to your shell profile: export GEMINI_API_KEY=your_key_here` |
| No prompt provided      | `Usage: pup "your prompt" [--enhance, --short, --fix]`                                                                  |
| API call fails          | `Error: Failed to reach Gemini API. Check your API key and internet connection.`                                             |
| Empty response from API | `Error: Gemini returned an empty response. Try again.`                                                                       |

Always exit with code 1 on errors.

---

## UX Details

- Show an `ora` spinner while waiting for the Gemini API response. Spinner text: `Improving your prompt...`
- Stop and clear the spinner before printing the result.
- The result text should be printed in the default terminal color (no special color). Keep it clean.
- The `✔ Copied to clipboard` line should be printed in a dim/muted color using chalk so it does not compete with the actual result.

---

## README.md Content

The README must include:

1. One-line description of what the tool does
2. Installation instructions for npm, pnpm, yarn, and bun
3. How to set the API key (get it from Google AI Studio, export the env var)
4. All four usage examples with the flags
5. A note that the tool is free to use and users bring their own Gemini API key

---

## What Claude Code Should NOT Do

- Do not add a config file or setup wizard
- Do not add any other flags beyond --enhance, --short, --fix
- Do not add a --profile flag or any tool-targeting behavior
- Do not add a history feature
- Do not store anything to disk
- Do not add a --version flag unless it comes free from commander
- Do not add tests unless asked
- Do not use CommonJS. Everything is ESM.
- Do not use the old `@google/generative-ai` package under any circumstance
- Do not wrap the output in quotes or add any label before it
