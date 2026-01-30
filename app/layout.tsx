import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import FacebookPixel from "@/components/FacebookPixel";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});
const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  weight: ["700", "800"],
});

export const metadata: Metadata = {
  title: "Рукавиця-рушник для собак і котів — 329 грн",
  description:
    "Висушіть улюбленця за 3 хвилини. Акція: 329 грн (було 500). На складі 54 шт.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk" className={`${inter.variable} ${manrope.variable}`}>
      <body className="font-sans">
        <FacebookPixel />
        {children}
      </body>
    </html>
  );
}
