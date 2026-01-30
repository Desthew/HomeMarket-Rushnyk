"use client";

import { useState, useCallback } from "react";

function maskPhone(value: string): string {
  let d = value.replace(/\D/g, "");
  if (d.startsWith("0")) d = "38" + d;
  if (!d.startsWith("380")) d = "380" + d.replace(/^38?0?/, "");
  d = d.slice(0, 12);
  const p = d.padEnd(12, "_").split("");
  return `+${p[0]}${p[1]}${p[2]} (${p[3]}${p[4]}) ${p[5]}${p[6]}${p[7]}-${p[8]}${p[9]}-${p[10]}${p[11]}`
    .replace(/_/g, "");
}

function isValidUA(phone: string): boolean {
  const d = phone.replace(/\D/g, "");
  return d.length === 12 && d.startsWith("380");
}

export default function OrderForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<{ message: string; ok: boolean } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handlePhoneInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(maskPhone(e.target.value));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);

    const trimmedName = name.trim();
    if (trimmedName.length < 2) {
      setStatus({ message: "Вкажіть ПІБ (мінімум 2 символи).", ok: false });
      return;
    }
    if (!isValidUA(phone)) {
      setStatus({
        message: "Вкажіть номер у форматі +380 (XX) XXX-XX-XX",
        ok: false,
      });
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trimmedName,
          phone,
          source: typeof window !== "undefined" ? window.location.origin : "",
          url: typeof window !== "undefined" ? window.location.href : "",
        }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus({
          message: data.error || "Не вдалося відправити. Спробуйте ще раз.",
          ok: false,
        });
        return;
      }

      setName("");
      setPhone("");
      setStatus({
        message: "✅ Заявку відправлено! Ми зв'яжемось найближчим часом.",
        ok: true,
      });
    } catch {
      setStatus({
        message: "Немає з'єднання. Спробуйте ще раз.",
        ok: false,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-card border border-line bg-white/90 p-[18px] shadow-soft"
    >
      <div className="sr-only">
        <label htmlFor="hp">Company</label>
        <input id="hp" name="company" type="text" autoComplete="off" tabIndex={-1} />
      </div>

      <div className="mb-3 flex flex-col gap-2">
        <label htmlFor="name" className="text-[13px] font-black text-muted">
          ПІБ
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Наприклад: Іван Петренко"
          value={name}
          onChange={(e) => setName(e.target.value)}
          minLength={2}
          required
          className="h-[52px] rounded-2xl border border-line bg-white px-[14px] text-base outline-none transition-[box-shadow,border-color] focus:border-mint/60 focus:ring-4 focus:ring-mint/10"
        />
      </div>

      <div className="mb-3 flex flex-col gap-2">
        <label htmlFor="phone" className="text-[13px] font-black text-muted">
          Телефон
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          placeholder="+380 (__) ___-__-__"
          value={phone}
          onChange={handlePhoneInput}
          required
          className="h-[52px] rounded-2xl border border-line bg-white px-[14px] text-base outline-none transition-[box-shadow,border-color] focus:border-mint/60 focus:ring-4 focus:ring-mint/10"
        />
        <small className="font-bold text-muted">Формат: +380 (XX) XXX-XX-XX</small>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="flex h-14 w-full items-center justify-center rounded-[18px] bg-mint px-6 font-black text-[#052016] shadow-mint transition hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-lg disabled:opacity-70"
      >
        {submitting ? "Відправляємо…" : "Замовити зараз"}
      </button>

      <div className="mt-3 flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/80 px-3 py-2.5 font-extrabold text-muted">
          🛡️ Дані не передаємо третім
        </span>
        <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/80 px-3 py-2.5 font-extrabold text-muted">
          🐾 Для собак і котів
        </span>
      </div>

      {status && (
        <div
          role="status"
          aria-live="polite"
          className={`mt-3 font-black ${status.ok ? "text-[#0A3A2A]" : "text-sale"}`}
        >
          {status.message}
        </div>
      )}
    </form>
  );
}
