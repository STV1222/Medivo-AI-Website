import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Medivo AI — Patient Education, Understood",
  description: "Clinician-reviewed, personalised patient education videos for healthcare teams.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/medivo-favicon-v2.png",
    shortcut: "/medivo-favicon-v2.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
