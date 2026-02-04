"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    fbq?: (action: string, event: string, params?: Record<string, unknown>) => void;
  }
}

type ThankYouModalProps = {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  phone: string;
};

export default function ThankYouModal({ isOpen, onClose, name, phone }: ThankYouModalProps) {
  // Конверсія Meta Pixel — саме при відкритті вікна «Дякуємо»
  useEffect(() => {
    if (!isOpen) return;
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "Lead");
    }
  }, [isOpen]);

  // Блокування прокрутки фону
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="thank-you-title"
    >
      {/* Затемнений фон */}
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        aria-label="Закрити"
      />
      {/* Модальне вікно */}
      <div className="relative w-full max-w-md rounded-[22px] border border-line bg-white p-6 shadow-[0_24px_60px_rgba(2,10,30,.2)] sm:p-8">
        <h2 id="thank-you-title" className="font-display text-xl font-extrabold tracking-tight text-text sm:text-2xl">
          ✅ Дякуємо за ваше замовлення!
        </h2>
        <p className="mt-4 text-muted">
          Дякуємо, що зробили замовлення у нашому магазині HomeMarket.
          <br />
          Будь ласка, уважно перевірте дані, які ви вказали:
        </p>
        <div className="mt-4 rounded-2xl border border-line bg-bg/50 p-4">
          <p className="font-extrabold text-text">
            Ім'я: <span className="font-bold text-muted">{name}</span>
          </p>
          <p className="mt-2 font-extrabold text-text">
            Телефон: <span className="font-bold text-muted">{phone}</span>
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="mt-6 flex h-14 w-full items-center justify-center rounded-[18px] bg-mint font-black text-[#052016] shadow-mint transition hover:-translate-y-0.5 hover:shadow-lg"
        >
          Закрити
        </button>
      </div>
    </div>
  );
}
