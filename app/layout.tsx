
}import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Your AI App",
  description: "極簡霓虹感，真正像 AI SaaS 官網的首頁。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  );
}