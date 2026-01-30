import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#F7FAFF",
        card: "#FFFFFF",
        text: "#0B1320",
        muted: "#64748B",
        line: "#E6EEF8",
        mint: "#20C997",
        sale: "#FF3B30",
        orange: "#FF7A00",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "22px",
      },
      boxShadow: {
        soft: "0 14px 40px rgba(2,10,30,.10)",
        soft2: "0 10px 24px rgba(2,10,30,.10)",
        mint: "0 14px 30px rgba(32,201,151,.22)",
      },
    },
  },
  plugins: [],
};

export default config;
