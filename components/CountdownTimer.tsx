"use client";

import { useState, useEffect } from "react";

const COUNTDOWN_DURATION_MS = 3 * 24 * 60 * 60 * 1000; // 3 дні в мілісекундах
const STORAGE_KEY = "sale_countdown_start";

function formatTime(ms: number): string {
  if (ms <= 0) return "00:00:00";
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function formatDays(ms: number): string {
  if (ms <= 0) return "0 дн 00:00:00";
  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${days} дн ${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<string>("--:--:--");

  useEffect(() => {
    // Отримуємо або встановлюємо час початку відліку
    let startTime: number;
    const stored = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
    
    if (stored) {
      startTime = Number(stored);
      // Перевіряємо, чи не минуло вже 3 дні
      const elapsed = Date.now() - startTime;
      if (elapsed >= COUNTDOWN_DURATION_MS) {
        // Якщо минуло, скидаємо таймер
        startTime = Date.now();
        if (typeof window !== "undefined") {
          localStorage.setItem(STORAGE_KEY, String(startTime));
        }
      }
    } else {
      startTime = Date.now();
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, String(startTime));
      }
    }

    const endTime = startTime + COUNTDOWN_DURATION_MS;

    const update = () => {
      const now = Date.now();
      const remaining = Math.max(0, endTime - now);
      setTimeLeft(formatDays(remaining));
    };

    update();
    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, []);

  return <>{timeLeft}</>;
}
