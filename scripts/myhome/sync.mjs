// Синхронизация объектов myhome -> сайт.
// Новые объявления: скачать, обработать фото, добавить в src/data/listings.json.
// Исчезнувшие: удалить из JSON и стереть фото. Потом commit + push (Vercel деплоит сам).
// Флаги: --no-git (не коммитить), --dry (только показать разницу)
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { fetchListings } from "./fetch.mjs";
import { enhancePhoto } from "./enhance.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const DATA = path.join(ROOT, "src/data/listings.json");
const IMG_DIR = path.join(ROOT, "public/images/listings");
const config = JSON.parse(fs.readFileSync(path.join(ROOT, "scripts/myhome/config.json"), "utf8"));
const args = new Set(process.argv.slice(2));

const git = (...a) => execFileSync("git", a, { cwd: ROOT, stdio: "inherit" });

const old = JSON.parse(fs.readFileSync(DATA, "utf8"));
const fresh = await fetchListings();

const oldIds = new Set(old.map((l) => l.id));
const freshIds = new Set(fresh.map((l) => l.id));
const added = fresh.filter((l) => !oldIds.has(l.id));
const removed = old.filter((l) => !freshIds.has(l.id));
console.log(`новых: ${added.length}, удалённых: ${removed.length}, всего на myhome: ${fresh.length}`);
if (args.has("--dry")) process.exit(0);

// Удалённые
for (const l of removed) {
  fs.rmSync(path.join(IMG_DIR, l.id), { recursive: true, force: true });
  console.log(`- ${l.id} удалён`);
}

// Новые: обрабатываем фото
const kept = old.filter((l) => freshIds.has(l.id));
for (const l of added) {
  const photos = [];
  for (const [i, src] of l.photos.slice(0, config.maxPhotos).entries()) {
    const rel = `/images/listings/${l.id}/${i + 1}.jpg`;
    try {
      await enhancePhoto(src, path.join(ROOT, "public", rel));
      photos.push(rel);
      console.log(`  ${l.id}: фото ${i + 1} готово`);
    } catch (e) {
      console.warn(`  ${l.id}: фото ${i + 1} пропущено - ${e.message}`);
    }
  }
  if (photos.length === 0) { console.warn(`+ ${l.id} пропущен: ни одного фото`); continue; }
  kept.push({ ...l, photos, addedAt: new Date().toISOString().slice(0, 10) });
  console.log(`+ ${l.id} добавлен (${photos.length} фото)`);
}

// У оставшихся обновляем цену/текст, фото не трогаем
const freshById = new Map(fresh.map((l) => [l.id, l]));
const next = kept.map((l) => {
  const f = freshById.get(l.id);
  return f ? { ...f, photos: l.photos, addedAt: l.addedAt } : l;
});

fs.writeFileSync(DATA, JSON.stringify(next, null, 1) + "\n");
console.log(`listings.json: ${next.length} объектов`);

if (args.has("--no-git") || (added.length === 0 && removed.length === 0 && JSON.stringify(old) === JSON.stringify(next))) {
  console.log("изменений для коммита нет");
  process.exit(0);
}
git("add", "src/data/listings.json", "public/images/listings");
git("commit", "-m", `sync myhome: +${added.length} / -${removed.length} (${new Date().toISOString().slice(0, 10)})`);
git("push", "origin", "main");
