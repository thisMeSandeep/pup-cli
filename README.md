# pup

Improve your AI prompts directly from the terminal. One command, better prompts for Claude Code, Copilot, Codex, and more.

## Installation

```bash
npm install -g pup-prompt
pnpm add -g pup-prompt
yarn global add pup-prompt
bun add -g pup-prompt
```

## API Key Setup

pup uses the Google Gemini API. Get a free API key from [Google AI Studio](https://aistudio.google.com/apikey), then add it to your shell profile:

```bash
export GEMINI_API_KEY=your_key_here
```

Restart your terminal or run `source ~/.bashrc` (or `~/.zshrc`) for the change to take effect.

## Usage

### Default — light cleanup

```bash
pup "fix the auth bug in my express middleware"
```

### --enhance — full enhancement

```bash
pup "fix the auth bug in my express middleware" --enhance
```

### --short — make it concise

```bash
pup "fix the auth bug in my express middleware" --short
```

### --fix — fix typos and grammar only

```bash
pup "fix the auth bug in my express middleware" --fix
```

### Piped input

```bash
echo "fix the auth bug" | pup
echo "fix the auth bug" | pup --enhance
```

## How It Works

pup sends your prompt to Gemini 2.5 Flash Lite, which rewrites it based on the mode you pick. The improved prompt is printed to stdout and automatically copied to your clipboard.

## Notes

- Free to use — you bring your own Gemini API key (free tier eligible)
- Output is pipe-safe — colors and clipboard messages are hidden when piping
- Works with any AI coding tool — Claude Code, Copilot, Codex, Gemini CLI, etc.



