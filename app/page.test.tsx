import { describe, expect, it, vi } from "vitest";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  cleanup,
} from "@testing-library/react";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import Home from "@/app/page";
import DocsPage from "@/app/docs/page";
import GuidePage from "@/app/docs/[slug]/page";
import EndpointBuilder from "@/app/docs/_components/EndpointBuilder";
import CodeBlock from "@/app/components/CodeBlock";
import { guideIndex } from "@/content/guide-index";
import { guides } from "@/content/guides";

describe("The self-contained adoption journey", () => {
  it("keeps guide navigation on the site and provides every destination", () => {
    render(<DocsPage />);
    for (const guide of guideIndex) {
      expect(guides[guide.slug]).toBeDefined();
      expect(
        screen
          .getAllByRole("link")
          .some((a) => a.getAttribute("href") === `/docs/${guide.slug}`),
      ).toBe(true);
    }
    expect(screen.queryByText(/read on GitHub/i)).not.toBeInTheDocument();
  });
  it("renders all guide anchors and resolves every guide link and screenshot", async () => {
    for (const { slug } of guideIndex) {
      const { container } = render(
        await GuidePage({ params: Promise.resolve({ slug }) }),
      );
      for (const section of guides[slug].sections)
        expect(container.querySelector(`[id="${section.id}"]`)).not.toBeNull();
      for (const link of container.querySelectorAll('a[href^="/docs/"]')) {
        const [path, anchor] = link.getAttribute("href")!.split("#");
        const destination = guides[path.replace("/docs/", "")];
        expect(destination, path).toBeDefined();
        if (anchor)
          expect(
            destination.sections.some((s) => s.id === anchor),
            `${path}#${anchor}`,
          ).toBe(true);
      }
      for (const link of container.querySelectorAll(
        'a[href^="/proof/"], a[href^="/evidence/"]',
      ))
        expect(
          existsSync(
            resolve(process.cwd(), "public" + link.getAttribute("href")),
          ),
        ).toBe(true);
      cleanup();
    }
  });
  it("makes plugin setup, OAuth consent and a first tool call readable in one guide", async () => {
    render(
      await GuidePage({ params: Promise.resolve({ slug: "agent-access" }) }),
    );
    expect(
      screen.getByText("Settings → Security and login"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Add the connection in ChatGPT/ }),
    ).toBeInTheDocument();
    expect(screen.getByText("Requested capabilities")).toBeInTheDocument();
    expect(
      screen.getByText(/Use GroundControl to list the deployments/),
    ).toBeInTheDocument();
  });
  it("formats a valid HTTPS origin and rejects credentials and non-HTTPS URLs", () => {
    render(<EndpointBuilder />);
    const input = screen.getByLabelText("Your GroundControl HTTPS address");
    fireEvent.change(input, { target: { value: "https://gc.example.org/" } });
    expect(screen.getByText("https://gc.example.org/mcp")).toBeInTheDocument();
    for (const value of [
      "http://gc.example.org",
      "https://secret@gc.example.org",
      "https://gc.example.org/?token=secret",
      "https://gc.example.org/extra",
    ]) {
      fireEvent.change(input, { target: { value } });
      expect(screen.getByRole("alert")).toBeInTheDocument();
      expect(screen.queryByText(`${value}/mcp`)).not.toBeInTheDocument();
    }
  });
  it("copies the actual command and reports clipboard failures honestly", async () => {
    const writeText = vi
      .fn()
      .mockRejectedValueOnce(new Error("Clipboard denied"))
      .mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      configurable: true,
    });
    render(<CodeBlock code="example command" label="Test command" />);
    fireEvent.click(screen.getByRole("button", { name: "Copy Test command" }));
    await waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent("Select and copy"),
    );
    fireEvent.click(screen.getByRole("button", { name: "Copy Test command" }));
    await waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent("Copied"),
    );
    expect(writeText).toHaveBeenCalledWith("example command");
  });
  it("replaces phone captures with current desktop evidence and clear provenance", () => {
    render(<Home />);
    expect(
      screen.getByAltText(/real active ChatGPT grant/),
    ).toBeInTheDocument();
    expect(
      screen.getByAltText(/runtime image verification/),
    ).toBeInTheDocument();
    expect(screen.getByText(/not a live status feed/)).toBeInTheDocument();
    expect(
      screen
        .getAllByRole("img")
        .every(
          (img) => !img.getAttribute("src")?.includes("oauth-scoped-grant"),
        ),
    ).toBe(true);
  });
});
