import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, phone, message } = await req.json();

  if (!message?.trim()) {
    return NextResponse.json({ error: "Message required" }, { status: 400 });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.error("TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set");
    return NextResponse.json({ error: "Not configured" }, { status: 500 });
  }

  const text = [
    `🏠 <b>Новый вопрос с сайта</b>`,
    ``,
    `👤 <b>Имя:</b> ${name || "не указано"}`,
    phone ? `📱 <b>Телефон:</b> ${phone}` : null,
    `💬 <b>Сообщение:</b>`,
    message,
  ]
    .filter((line) => line !== null)
    .join("\n");

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("Telegram API error:", err);
    return NextResponse.json({ error: "Telegram error" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
