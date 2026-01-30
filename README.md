# Towel Store — Next.js (App Router) + Tailwind

Landing for selling pet towels (рукавиця-рушник) with an order form that sends leads to your Telegram.

## Stack

- **Next.js 14** (App Router)
- **Tailwind CSS**
- **TypeScript**
- **Telegram Bot API** — form submissions are sent to your Telegram chat

## Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Environment**

   Copy `.env.example` to `.env.local` and set:

   - `TELEGRAM_BOT_TOKEN` — from [@BotFather](https://t.me/BotFather)
   - `TELEGRAM_CHAT_ID` — your chat ID (e.g. `-5234504493`)

   Your `.env.local` is already created with the values you provided and is gitignored.

3. **Run**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Order form

- **Fields:** name (ПІБ), phone (Ukrainian format +380)
- **API:** `POST /api/order` with JSON `{ name, phone }`
- **Telegram:** each order is sent to your chat as a formatted message

## Future (marketplace)

The app is structured so you can add more products and routes later (e.g. `/products/[slug]`, product listing, etc.) while reusing the same order/Telegram flow.
