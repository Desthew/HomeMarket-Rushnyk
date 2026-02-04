"use client";

import { useState, useCallback } from "react";
import ThankYouModal from "./ThankYouModal";

// +38 фіксований, далі 0 + 9 цифр — маска 0XX XXX-XX-XX
function maskPhoneSuffix(value: string): string {
  let d = value.replace(/\D/g, "");
  // Якщо починається не з 0, додаємо 0
  if (d.length > 0 && d[0] !== "0") {
    d = "0" + d;
  }
  d = d.slice(0, 10); // максимум 10 цифр (0 + 9)
  const p = d.padEnd(10, "_").split("");
  return `${p[0]}${p[1]}${p[2]} ${p[3]}${p[4]}${p[5]}-${p[6]}${p[7]}-${p[8]}${p[9]}`.replace(/_/g, "");
}

function isValidPhoneSuffix(suffix: string): boolean {
  const d = suffix.replace(/\D/g, "");
  return d.length === 10 && d[0] === "0";
}

function suffixToFullPhone(suffix: string): string {
  const d = suffix.replace(/\D/g, "");
  if (d.length !== 10 || d[0] !== "0") return "";
  return `+38 ${d[0]}${d[1]}${d[2]} ${d[3]}${d[4]}${d[5]}-${d[6]}${d[7]}-${d[8]}${d[9]}`;
}

export default function OrderForm() {
  const [name, setName] = useState("");
  const [phoneSuffix, setPhoneSuffix] = useState("");
  const [status, setStatus] = useState<{ message: string; ok: boolean } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [thankYou, setThankYou] = useState<{ name: string; phone: string } | null>(null);

  const handlePhoneInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneSuffix(maskPhoneSuffix(e.target.value));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);

    const trimmedName = name.trim();
    if (trimmedName.length < 2) {
      setStatus({ message: "Вкажіть ПІБ (мінімум 2 символи).", ok: false });
      return;
    }
    const fullPhone = suffixToFullPhone(phoneSuffix);
    if (!isValidPhoneSuffix(phoneSuffix)) {
      setStatus({
        message: "Вкажіть номер: 0 + 9 цифр після +38",
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
          phone: fullPhone,
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

      setThankYou({ name: trimmedName, phone: fullPhone });
      setName("");
      setPhoneSuffix("");
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
    <>
      <ThankYouModal
        isOpen={!!thankYou}
        onClose={() => setThankYou(null)}
        name={thankYou?.name ?? ""}
        phone={thankYou?.phone ?? ""}
      />
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
        <div className="flex h-[52px] overflow-hidden rounded-2xl border border-line bg-white focus-within:ring-4 focus-within:ring-mint/10 focus-within:ring-offset-0">
          <span className="flex items-center border-r border-line bg-bg/40 px-4 text-base font-extrabold text-muted">
            +38
          </span>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="numeric"
            placeholder="0XX XXX-XX-XX"
            value={phoneSuffix}
            onChange={handlePhoneInput}
            required
            className="min-w-0 flex-1 px-4 text-base outline-none placeholder:text-muted/70"
            aria-label="Номер телефону (0 + 9 цифр)"
          />
        </div>
        <small className="font-bold text-muted">Введіть 0 + 9 цифр номера після +38</small>
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
    </>
  );
}
