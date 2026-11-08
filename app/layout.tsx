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
  metadataBase: new URL("https://trygroundcontrol.serendepify.com"),
  openGraph: {
    type: "website",
    siteName: "GroundControl",
    title: "Build, deploy and operate with your agents | GroundControl",
    description: "Give your AI agents controlled access to build, deploy and operate applications on infrastructure you own.",
  },
  twitter: { card: "summary_large_image" },
  title: "GroundControl | Build, deploy and operate with your agents",
  description:
    "Give your AI agents controlled access to build, deploy and operate applications on infrastructure you own. Open source and self-hosted.",
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
