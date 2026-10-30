// Тонкая обёртка над kie.ai: создать задачу, дождаться, скачать результат.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const API = "https://api.kie.ai/api/v1";
const KEY =
  process.env.KIE_API_KEY ||
  fs.readFileSync(path.join(os.homedir(), ".kie", "key"), "utf8").trim();

async function api(method, url, body) {
  const res = await fetch(API + url, {
    method,
    headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await res.json();
  if (json.code !== 200) throw new Error(`kie ${url}: ${json.code} ${json.msg}`);
  return json.data;
}

// Запускает модель и ждёт результата. Возвращает массив ссылок на файлы.
export async function runTask(model, input, { timeoutMs = 5 * 60_000 } = {}) {
  const { taskId } = await api("POST", "/jobs/createTask", { model, input });
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    await new Promise((r) => setTimeout(r, 4000));
    const rec = await api("GET", `/jobs/recordInfo?taskId=${taskId}`);
    if (rec.state === "success") return JSON.parse(rec.resultJson).resultUrls;
    if (rec.state === "fail") throw new Error(`kie ${model} failed: ${rec.failMsg}`);
  }
  throw new Error(`kie ${model}: timeout`);
}

export async function download(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`download ${url}: ${res.status}`);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
}

export async function balance() {
  return api("GET", "/chat/credit");
}
