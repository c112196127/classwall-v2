import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Claude 招牌的優雅 serif，用於大標 display
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "世界足球聊天室 · 匿名球迷即時討論",
  description:
    "世界足球聊天室：用 Next.js + Supabase 打造的匿名球迷即時討論牆。",
};

// 防止 FOUC：hydration 前先依 localStorage / 系統偏好套上 .dark
const themeInitScript = `
(function(){
  try {
    var t = localStorage.getItem("classwall:theme");
    var sys = window.matchMedia("(prefers-color-scheme: dark)").matches;
    var dark = t === "dark" || (!t && sys);
    if (dark) document.documentElement.classList.add("dark");
  } catch (_) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-Hant"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
