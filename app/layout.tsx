import type { Metadata } from "next";
import { LanguageProvider } from "./components/I18n";
import "./globals.css";

export const metadata: Metadata = {
  title: "Medivo AI — Patient Education, Understood",
  description: "Clinician-reviewed, personalised patient education videos for healthcare teams.",
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
      <body><LanguageProvider>{children}</LanguageProvider></body>
    </html>
  );
}
