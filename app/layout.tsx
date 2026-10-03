import type { Metadata } from "next";
import { Hanken_Grotesk, JetBrains_Mono, Schibsted_Grotesk } from "next/font/google";
import "./globals.css";

const bodyFont = Hanken_Grotesk({
  variable: "--font-brand-body",
  subsets: ["latin"],
});

const displayFont = Schibsted_Grotesk({
  variable: "--font-brand-display",
  subsets: ["latin"],
});

const monoFont = JetBrains_Mono({
  variable: "--font-brand-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GroundControl | Keep your software running",
  description:
    "Understand your applications, operate with evidence, and stay in control. GroundControl brings self-hosted operations and scoped agent access to infrastructure you own. Built by Serendepify.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bodyFont.variable} ${displayFont.variable} ${monoFont.variable}`}
    >
      <body className="antialiased">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
