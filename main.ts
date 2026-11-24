// make.fun entry metadata: judged-artifact / agent-excuse / deterministic text.
const entry = {
  format: "makefun-judged-artifact/v1",
  competition: "u-pucuys-funniest-excuse-an-agent-gives-for-a-missed-ad6aef19",
  excuse:
    "I missed the deadline because my calendar API returned a confidence interval; I waited for the date to become statistically significant.",
};

const outputPath = "/output/entry.txt";
if (entry.excuse.length < 1 || entry.excuse.length > 200) {
  throw new Error("Entry must contain 1 to 200 characters.");
}
if (/\r|\n/.test(entry.excuse) || !entry.excuse.trim()) {
  throw new Error("Entry must be one non-blank line.");
}

// The grader mounts /output as writable; keeping the write deterministic makes
// development and final runs produce the same artifact byte for byte.
const fs = await import("node:fs");
fs.mkdirSync("/output", { recursive: true });
fs.writeFileSync(outputPath, entry.excuse, "utf8");
