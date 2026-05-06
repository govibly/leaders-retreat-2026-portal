import type { Metadata } from "next";
import { Archivo, Sora } from "next/font/google";
import "./globals.css";

const displayFont = Archivo({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["700", "800"],
});

const bodyFont = Sora({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "ANFGC Leader's Retreat 2026",
    template: "%s",
  },
  description:
    "A private audio and resource library for the ANFGC Leader's Retreat 2026 sessions.",
  icons: {
    icon: "/brand/logo.png",
    shortcut: "/brand/logo.png",
    apple: "/brand/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentYear = new Date().getFullYear();

  return (
    <html lang="en">
      <body className={`${displayFont.variable} ${bodyFont.variable} flex min-h-screen flex-col antialiased`}>
        <div className="flex-1">{children}</div>
        <footer className="site-footer">
          <p className="site-footer-copy">
            All Nations Full Gospel Church . copyright c {currentYear} . All rights reserved
          </p>
        </footer>
      </body>
    </html>
  );
}
