import { NextRequest, NextResponse } from "next/server";

const TELEGRAM_API = "https://api.telegram.org/bot";

export async function POST(request: NextRequest) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return NextResponse.json(
      { error: "Telegram not configured" },
      { status: 500 }
    );
  }

  let body: { name?: string; phone?: string; source?: string; url?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON" },
      { status: 400 }
    );
  }

  const name = String(body.name ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const source = String(body.source ?? "").trim();
  const url = String(body.url ?? "").trim();

  if (name.length < 2) {
    return NextResponse.json(
      { error: "Вкажіть ПІБ (мінімум 2 символи)." },
      { status: 400 }
    );
  }
  if (!phone) {
    return NextResponse.json(
      { error: "Вкажіть номер телефону." },
      { status: 400 }
    );
  }

  // Escape HTML for Telegram (avoid breaking tags)
  const escape = (s: string) =>
    s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

  const lines = [
    "🛒 <b>Нове замовлення</b>",
    "",
    `👤 <b>ПІБ:</b> ${escape(name)}`,
    `📞 <b>Телефон:</b> ${escape(phone)}`,
    "",
    "🌐 <b>Сайт:</b> " + (source ? escape(source) : "—"),
    "📄 <b>Сторінка:</b> " + (url ? `<a href="${escape(url)}">${escape(url)}</a>` : "—"),
    "",
    `🕐 ${escape(new Date().toLocaleString("uk-UA"))}`,
  ];
  const text = lines.join("\n");

  const apiUrl = `${TELEGRAM_API}${token}/sendMessage`;
  const res = await fetch(apiUrl, {
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
    console.error("Telegram API error:", res.status, err);
    return NextResponse.json(
      { error: "Не вдалося відправити заявку. Спробуйте ще раз." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
