#!/usr/bin/env node
// Finds i18n keys used more than once within the same component file.
// Designed to catch cases where badge + h1 both render the same t("key"),
// making text appear duplicated on screen.
//
// Usage:
//   node scripts/check-i18n-duplicates.mjs          # report + exit 0
//   node scripts/check-i18n-duplicates.mjs --strict # report + exit 1 if any found
//
// Suppress per-file by adding a comment on the specific line:
//   {t("reset_filters")}  {/* i18n-dup-ok: desktop/mobile */}

import { readFileSync, readdirSync, statSync } from "fs";
import { join, relative } from "path";
import { fileURLToPath } from "url";

const strict = process.argv.includes("--strict");
const root = fileURLToPath(new URL("..", import.meta.url));
const srcDir = join(root, "src");

function walkTsx(dir) {
  const files = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) files.push(...walkTsx(full));
    else if (entry.endsWith(".tsx")) files.push(full);
  }
  return files;
}

const files = walkTsx(srcDir);
let issues = 0;

for (const file of files) {
  const src = readFileSync(file, "utf-8");
  const lines = src.split("\n");
  const counts = {};

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes("i18n-dup-ok")) continue;
    // Match t("key") — only the primary t function, not tf/tw/etc.
    for (const [, key] of line.matchAll(/\bt\s*\(\s*["']([^"']+)["']\s*\)/g)) {
      if (!counts[key]) counts[key] = { n: 0, lines: [] };
      counts[key].n++;
      counts[key].lines.push(i + 1);
    }
  }

  for (const [key, { n, lines: lineNums }] of Object.entries(counts)) {
    if (n > 1) {
      const rel = relative(root, file);
      console.warn(`DUPLICATE  ${rel}:${lineNums.join(",")}  →  t("${key}")  ×${n}`);
      issues++;
    }
  }
}

if (issues) {
  console.warn(
    `\n${issues} duplicate(s). Add {/* i18n-dup-ok: reason */} on the line to suppress intentional ones.`
  );
} else {
  console.log("✓ No duplicate i18n keys found");
}

process.exit(strict && issues ? 1 : 0);
