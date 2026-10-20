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
    title: "Put your agents to work | GroundControl",
    description: "Deploy and operate on infrastructure you own. Start on your computer or a Linux server, bring a project from a folder or GitHub, and connect your agent.",
  },
  twitter: { card: "summary_large_image" },
  title: "GroundControl | Agentic deployment on infrastructure you own",
  description:
    "Connect your agents to your applications through MCP and OAuth. Inspect workloads, run supported deployments, and verify results on infrastructure you own. Open source and self-hosted.",
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
