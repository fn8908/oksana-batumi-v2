// Чтение объявлений Оксаны с myhome.ge.
// myhome закрыт Cloudflare: headless и curl не проходят, поэтому открываем обычный Chrome
// с постоянным профилем (~/.oksana-sync/chrome-profile) и слушаем ответы их же API
// (api-statements.tnet.ge), которые страница делает сама.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require(path.join(os.homedir(), ".npm-global/lib/node_modules/playwright"));

const config = JSON.parse(fs.readFileSync(new URL("./config.json", import.meta.url), "utf8"));
const expand = (p) => p.replace(/^~/, os.homedir());
const RAW_DIR = expand(config.rawDir);

const CURRENCY_USD = 2;
const DEAL = { 1: "buy", 2: "rent", 7: "rent" }; // 1 продажа, 2 аренда, 7 посуточно
const COMMERCIAL_TYPES = new Set([4, 5]); // 4 коммерческая, 5 земля

function isApi(url) {
  return /api-statements\.tnet\.ge\/v1\/statements/.test(url);
}

async function openBrowser() {
  const ctx = await chromium.launchPersistentContext(expand(config.profileDir), {
    channel: "chrome",
    headless: false,
    viewport: { width: 1280, height: 900 },
    args: ["--window-position=4000,4000"], // окно уводим за край экрана, чтобы не мешало
  });
  return ctx;
}

// Ждём, пока Cloudflare пропустит (заголовок "Один момент…" исчезнет)
async function waitForPage(page) {
  for (let i = 0; i < 30; i++) {
    const title = await page.title();
    if (!/момент|moment|Just a/i.test(title)) return;
    await page.waitForTimeout(2000);
  }
  throw new Error("Cloudflare не пропустил браузер. Откройте myhome.ge вручную в этом профиле.");
}

// Собирает всё, что API отдаёт при открытии страницы (список или карточка)
async function collect(ctx, url, locale) {
  const page = await ctx.newPage();
  const hits = [];
  page.on("response", async (res) => {
    if (!isApi(res.url())) return;
    try {
      hits.push({ url: res.url(), body: await res.json() });
    } catch {}
  });
  await page.goto(url.replace(/myhome\.ge\/[a-z]{2}\//, `myhome.ge/${locale}/`), { waitUntil: "domcontentloaded", timeout: 60_000 });
  await waitForPage(page);
  await page.waitForTimeout(6000);
  await page.close();
  return hits;
}

function dump(name, data) {
  fs.mkdirSync(RAW_DIR, { recursive: true });
  fs.writeFileSync(path.join(RAW_DIR, `${name}.json`), JSON.stringify(data, null, 1));
}

// Из ответов API вытаскивает массив объявлений (структура у списка и у карточки разная)
function extractStatements(hits) {
  const out = [];
  for (const { body } of hits) {
    const d = body?.data ?? body;
    if (Array.isArray(d?.data)) out.push(...d.data);
    else if (Array.isArray(d)) out.push(...d);
    else if (d?.statement) out.push(d.statement);
    else if (d?.id) out.push(d);
  }
  return out;
}

// Приводим объявление myhome к плоскому виду. Поля подобраны по API myhome, при первом
// реальном запуске сверить с ~/.oksana-sync/raw/*.json и поправить.
function normalize(s, loc) {
  const priceUsd = s.price?.[CURRENCY_USD] ?? {};
  const deal = DEAL[s.deal_type_id] ?? "buy";
  const commercial = COMMERCIAL_TYPES.has(s.real_estate_type_id);
  return {
    id: String(s.id),
    type: commercial ? `commercial-${deal}` : deal,
    title: { [loc]: s.dynamic_title || s.title || "" },
    description: { [loc]: (s.comment || s.description || "").trim() },
    district: s.district_name || s.urban_name || s.address || "",
    price: Number(priceUsd.price_total ?? s.price_usd ?? s.price ?? 0),
    pricePerSqm: priceUsd.price_square ? Number(priceUsd.price_square) : undefined,
    area: Number(s.area ?? 0),
    rooms: Number(s.bedroom ?? s.room ?? 0),
    floor: Number(s.floor ?? 0),
    totalFloors: Number(s.total_floors ?? 0),
    seaView: /море|sea/i.test(`${s.comment ?? ""} ${s.dynamic_title ?? ""}`),
    isNewBuild: s.condition_id === 1 || s.project_id != null,
    photos: (s.images ?? []).map((img) => img.large || img.original || img.thumb).filter(Boolean),
    url: `https://www.myhome.ge/ru/pr/${s.id}/`,
    updatedAt: s.last_updated || s.updated_at || null,
  };
}

// Главная функция: возвращает список объявлений агента с ru + en текстами
export async function fetchListings() {
  if (!config.agentUrl) throw new Error("В scripts/myhome/config.json не указан agentUrl");
  const ctx = await openBrowser();
  try {
    const listHits = await collect(ctx, config.agentUrl, "ru");
    dump("list-ru", listHits);
    const ids = [...new Set(extractStatements(listHits).map((s) => s.id).filter(Boolean))];
    console.log(`myhome: найдено ${ids.length} объявлений`);

    const result = [];
    for (const id of ids) {
      const url = `https://www.myhome.ge/ru/pr/${id}/`;
      const ru = extractStatements(await collect(ctx, url, "ru")).find((s) => String(s.id) === String(id));
      const en = extractStatements(await collect(ctx, url, "en")).find((s) => String(s.id) === String(id));
      if (!ru) { console.warn(`  ${id}: карточка не прочиталась`); continue; }
      dump(`pr-${id}-ru`, ru);
      const item = normalize(ru, "ru");
      if (en) {
        const e = normalize(en, "en");
        item.title.en = e.title.en;
        item.description.en = e.description.en;
      }
      result.push(item);
    }
    return result;
  } finally {
    await ctx.close();
  }
}

// Ручной запуск: node scripts/myhome/fetch.mjs  -> печатает список и кладёт сырые ответы в rawDir
if (process.argv[1]?.endsWith("fetch.mjs")) {
  const list = await fetchListings();
  console.log(JSON.stringify(list.map(({ photos, ...r }) => ({ ...r, photos: photos.length })), null, 1));
}
