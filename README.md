#  pup - Prompt UPgrade

> Improve your AI prompts directly from the terminal. One command, better prompts.

**pup** (**P**rompt **UP**grade) is a lightweight CLI tool that transforms your quick, rough prompts into clear, structured instructions optimized for AI coding assistants like Claude Code, GitHub Copilot, Codex, and more.

## ✨ Features

- 🎯 **Four enhancement modes** — Default cleanup, full enhancement, shortening, or grammar-only fixes
- 📋 **Auto-clipboard** — Results are automatically copied to your clipboard
- 🔄 **Pipe-friendly** — Works seamlessly in command pipelines
- 🚀 **Fast** — Powered by Gemini 2.5 Flash Lite for sub-second responses
- 🆓 **Free tier eligible** — Uses your own Gemini API key (free tier available)
- 🌍 **Cross-platform** — Works on macOS, Linux, and Windows

## 📦 Installation

Install globally using your preferred package manager:

```bash
# npm
npm install -g pup-prompt

# pnpm
pnpm add -g pup-prompt

# yarn
yarn global add pup-prompt

# bun
bun add -g pup-prompt
```

### Requirements

- Node.js 18 or higher

## 🔑 API Key Setup

pup uses the Google Gemini API. Follow these steps to set it up:

### 1. Get Your API Key

Get a free API key from [Google AI Studio](https://aistudio.google.com/apikey).

### 2. Set Environment Variable (Choose Your Platform)

#### macOS / Linux (Bash)

```bash
echo 'export GEMINI_PUP_API_KEY=your_key_here' >> ~/.bashrc
source ~/.bashrc
```

#### macOS / Linux (Zsh)

```bash
echo 'export GEMINI_PUP_API_KEY=your_key_here' >> ~/.zshrc
source ~/.zshrc
```

#### Windows (PowerShell)

```powershell
[System.Environment]::SetEnvironmentVariable('GEMINI_PUP_API_KEY', 'your_key_here', 'User')
```

Then restart your terminal.

#### Windows (Command Prompt)

```cmd
setx GEMINI_PUP_API_KEY "your_key_here"
```

Then restart your terminal.

### 3. Verify Setup

Run `pup "test"` to verify your API key is configured correctly.

## 🚀 Usage

### Default Mode — Light Cleanup

Improves clarity and structure while keeping your original intent:

```bash
pup "fix the auth bug in my express middleware"
```

**Example output:**
```
Fix the authentication bug in the Express middleware that handles user sessions
```

### --enhance — Full Enhancement

Adds detail, structure, and context for maximum clarity:

```bash
pup "fix the auth bug" --enhance
```

**Example output:**
```
Investigate and fix the authentication bug in the user session handling middleware. 
The bug is likely related to token validation or session expiry logic. Check the 
Express middleware that processes authentication headers and ensure proper error 
handling for expired tokens.
```

### --short — Make It Concise

Removes fluff and gets straight to the point:

```bash
pup "I need you to please help me fix the authentication bug that seems to be happening in my express middleware code" --short
```

**Example output:**
```
Fix auth bug in Express middleware
```

### --fix — Grammar & Typos Only

Fixes spelling and grammar without changing the meaning:

```bash
pup "fix teh autentication bgu in expresss" --fix
```

**Example output:**
```
fix the authentication bug in express
```

### Piped Input

Works seamlessly with pipes for scripting workflows:

```bash
echo "fix the auth bug" | pup
echo "add error handling" | pup --enhance
cat prompt.txt | pup --short
```

## 🎯 Real-World Examples

```bash
# Quick bug fix
pup "login not working"
# Output: Fix the login functionality that is currently not working

# Feature request with context
pup "add dark mode to settings page" --enhance
# Output: Implement a dark mode toggle in the application settings page. Add a 
# switch component that allows users to toggle between light and dark themes...

# Code review prompt
pup "review my PR for security issues and best practices" --enhance
# Output: Conduct a thorough code review of the pull request, focusing on...

# Concise commit message
echo "updated the user authentication system to use JWT tokens instead of sessions" | pup --short
# Output: Switch auth from sessions to JWT
```

## 📋 Clipboard Support

pup automatically copies the improved prompt to your clipboard for easy pasting.

### Platform Support

- **macOS**: Built-in support via `pbcopy` ✅
- **Windows**: Built-in support via `clip` ✅
- **Linux (Wayland)**: Install `wl-clipboard`
  ```bash
  sudo apt install wl-clipboard
  ```
- **Linux (X11)**: Install `xclip`
  ```bash
  sudo apt install xclip
  ```

### Disable Clipboard Notifications

When piping output, clipboard notifications are automatically hidden to keep output clean.

## 🔧 How It Works

1. You provide a prompt (as an argument or via pipe)
2. pup sends it to Google's Gemini 2.5 Flash Lite API with mode-specific instructions
3. The AI rewrites your prompt according to the selected mode
4. The improved prompt is printed to stdout and copied to your clipboard
5. Ready to paste into your AI coding assistant!

## 🤔 FAQ

**Q: Is this free to use?**  
A: Yes! pup is open source and free. You'll need your own Gemini API key, which has a generous free tier.

**Q: What AI models does pup work with?**  
A: pup improves prompts for any AI tool — GitHub Copilot, Claude Code, Cursor, Codex, ChatGPT, etc.

**Q: Can I use this in scripts?**  
A: Absolutely! pup is pipe-friendly and perfect for automation workflows.

**Q: Does pup send my code to the API?**  
A: No. pup only sends the prompt text you provide, not your codebase.

**Q: How do I update my API key?**  
A: Edit your shell profile (`~/.bashrc` or `~/.zshrc`) and update the `GEMINI_PUP_API_KEY` value, then restart your terminal.

## 🐛 Troubleshooting

**API Key Not Found Error**

If you see `GEMINI_PUP_API_KEY environment variable is not set`, make sure:
1. You've set the environment variable (see [API Key Setup](#-api-key-setup))
2. You've restarted your terminal after setting it
3. You're using the correct variable name: `GEMINI_PUP_API_KEY`

**Clipboard Not Working**

On Linux, install the required clipboard utility:
- Wayland: `sudo apt install wl-clipboard`
- X11: `sudo apt install xclip`

**Permission Denied Error**

If you get a permission error during installation, use:
```bash
npm install -g pup-prompt --unsafe-perm=true
```

## 📄 License

ISC

## 👤 Author

**Sandeep Singh Nayal**  
Email: batfighter50@gmail.com  
GitHub: [@thisMeSandeep](https://github.com/thisMeSandeep)

## 🔗 Links

- [GitHub Repository](https://github.com/thisMeSandeep/pup-prompt)
- [Report Issues](https://github.com/thisMeSandeep/pup-prompt/issues)
- [Get Gemini API Key](https://aistudio.google.com/apikey)

## 🙏 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

---

Made with ❤️ for developers who want better AI prompts
