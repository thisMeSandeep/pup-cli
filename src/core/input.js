// Input reader — gets the user's prompt from CLI args or piped stdin.

// Read all data from stdin (used when input is piped).
// Waits for the stream to end before resolving.
function readStdin() {
  return new Promise((resolve, reject) => {
    let data = "";
    process.stdin.setEncoding("utf-8");
    process.stdin.on("data", (chunk) => (data += chunk));
    process.stdin.on("end", () => resolve(data.trim()));
    process.stdin.on("error", reject);
  });
}

// Get the user's prompt from either:
//  1. Inline CLI argument (e.g. pup "fix the bug")
//  2. Piped stdin (e.g. echo "fix the bug" | pup)
// Returns the prompt string, or null if nothing was provided.
export async function getInput(args) {
  // Check for inline argument first
  if (args.length > 0) {
    return args.join(" ");
  }

  // Check if stdin has piped data (not a TTY = data is being piped in)
  if (!process.stdin.isTTY) {
    return await readStdin();
  }

  // No input provided
  return null;
}
