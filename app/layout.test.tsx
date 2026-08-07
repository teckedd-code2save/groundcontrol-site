import { beforeAll, describe, expect, it, vi } from "vitest";

vi.mock("next/font/google", () => ({
  Geist: () => ({ variable: "--font-geist-sans" }),
  Geist_Mono: () => ({ variable: "--font-geist-mono" }),
}));

import { render, screen } from "@testing-library/react";
import RootLayout from "@/app/layout";

describe("RootLayout", () => {
  // Rendering <html>/<body> in jsdom trips React's "cannot be a child of
  // <div>" dev warning — expected here, so keep the output clean.
  beforeAll(() => {
    const originalError = console.error;
    vi.spyOn(console, "error").mockImplementation((...args: unknown[]) => {
      const message = typeof args[0] === "string" ? args[0] : "";
      if (message.includes("cannot be a child of")) return;
      originalError(...args);
    });
  });

  it("renders an English document shell around the children", () => {
    // React mounts <html>/<body> onto the real document elements, not the
    // render container, so assert against document.documentElement/body.
    render(
      <RootLayout>
        <main>GroundControl installer</main>
      </RootLayout>,
    );

    expect(document.documentElement).toHaveAttribute("lang", "en");
    expect(document.documentElement).toHaveClass("bg-[#090b0a]");
    expect(document.body.className).toContain("antialiased");
    expect(screen.getByText("GroundControl installer")).toBeInTheDocument();
  });
});
