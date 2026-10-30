// Обработка одного фото в фирменном стиле:
// 1) Nano Banana Edit - свет/цвет/резкость, без дорисовки (4 кредита)
// 2) Recraft Crisp Upscale - увеличение x2 (0,5 кредита)
// 3) sips - ужать до 1600 px по длинной стороне, JPEG 85 (чтобы репозиторий не пух)
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import { runTask, download } from "./kie.mjs";

export const STYLE_PROMPT =
  "Professional real-estate photo retouch for a premium agency. " +
  "Keep every object, wall, window, furniture, view and layout exactly as in the original - " +
  "do not add, remove, move or replace anything. Only: balance exposure, correct white balance " +
  "(remove yellow/green cast), lift shadows, recover highlights, gentle HDR, straighten verticals, " +
  "subtle warm cinematic grade with deep neutral shadows, crisp clean details. " +
  "Elegant interior-magazine look.";

const MAX_SIDE = 1600;

export async function enhancePhoto(srcUrl, destPath) {
  const [edited] = await runTask("google/nano-banana-edit", {
    prompt: STYLE_PROMPT,
    image_urls: [srcUrl],
    output_format: "jpeg",
    image_size: "auto",
  });
  let final = edited;
  try {
    [final] = await runTask("recraft/crisp-upscale", { image: edited });
  } catch (e) {
    console.warn(`  upscale skipped: ${e.message}`);
  }
  await download(final, destPath);
  execFileSync("sips", ["-s", "format", "jpeg", "-s", "formatOptions", "85", "-Z", String(MAX_SIDE), destPath, "--out", destPath], { stdio: "ignore" });
  return destPath;
}

// Ручной запуск: node scripts/myhome/enhance.mjs <url> <out.jpg>
if (process.argv[1]?.endsWith("enhance.mjs") && process.argv[2]) {
  const [, , url, out = "enhanced.jpg"] = process.argv;
  await enhancePhoto(url, out);
  console.log(`saved ${out} (${Math.round(fs.statSync(out).size / 1024)} KB)`);
}
