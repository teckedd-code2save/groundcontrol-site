import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Home from "@/app/page";
import DocsPage from "@/app/docs/page";
import ArticlePage from "@/app/articles/chatgpt-operated-my-deployment/page";

const GITHUB_URL = "https://github.com/teckedd-code2save/groundcontrol";

describe("GroundControl public site", () => {
  it("states the open-source agentic deployment product clearly", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { level: 1, name: /give AI agents controlled access to deploy/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/No repeated permission prompts/i)).toBeInTheDocument();
    expect(screen.getByText(/one scoped OAuth grant/i)).toBeInTheDocument();
  });

  it("shows a real evidence chain with authentic proof images", () => {
    render(<Home />);
    expect(screen.getByText(/operation cmubbc14l/i)).toBeInTheDocument();
    expect(screen.getByText(/HTTP 200 · 99 ms/i)).toBeInTheDocument();
    expect(screen.getByText(/one attempt with no recorded error/i)).toBeInTheDocument();
    expect(screen.queryByText(/capture unavailable/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Daytona remains an early-access/i)).not.toBeInTheDocument();
    expect(screen.getByAltText(/OAuth screen granting ChatGPT/i)).toHaveAttribute("src", expect.stringContaining("oauth-scoped-grant.jpg"));
    expect(screen.getByAltText(/live RentAWeekend application/i)).toHaveAttribute("src", expect.stringContaining("rentaweekend-live.jpg"));
  });

  it("links public documentation and the technical article", () => {
    render(<Home />);
    expect(screen.getAllByRole("link", { name: /docs|technical docs/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /article|deployment story/i }).length).toBeGreaterThan(0);
  });

  it("keeps the public site separate from the private operator login", () => {
    render(<Home />);
    expect(
      screen.getAllByRole("link").some(
        (link) => link.getAttribute("href") === "https://groundcontrol.serendepify.com",
      ),
    ).toBe(false);
  });

  it("shows the scoped MCP tool surface", () => {
    render(<Home />);
    for (const tool of [
      "deployment.list",
      "deployment.health",
      "deployment.config.check",
      "deployment.redeploy",
      "operation.get",
    ]) {
      expect(screen.getByText(tool)).toBeInTheDocument();
    }
  });

  it("points GitHub links at the product repository", () => {
    render(<Home />);
    for (const link of screen.getAllByRole("link", { name: /github|view source/i })) {
      expect(link).toHaveAttribute("href", GITHUB_URL);
    }
  });

  it("shows the agent-assisted installer by default and can switch modes", () => {
    render(<Home />);
    expect(screen.getByRole("tab", { name: /agent/i })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByText(/--json/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("tab", { name: /on your vps/i }));
    expect(screen.queryByText(/--json/)).not.toBeInTheDocument();
  });

  it("copies the active install command", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      configurable: true,
    });

    render(<Home />);
    fireEvent.click(screen.getByRole("button", { name: "Copy installation command" }));
    await waitFor(() => expect(writeText).toHaveBeenCalledTimes(1));
    expect(writeText).toHaveBeenCalledWith(expect.stringContaining("scripts/install"));
  });

  it("publishes a useful docs index", () => {
    render(<DocsPage />);
    expect(screen.getByRole("heading", { name: /install it\. connect one deployment/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Adopt GroundControl" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Agent access with OAuth and MCP" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Adopt GroundControl/i })).toHaveAttribute("href", "/docs/getting-started");
  });

  it("publishes the complete technical article", () => {
    render(<ArticlePage />);
    expect(
      screen.getByRole("heading", { name: /How ChatGPT deployed a real app without receiving SSH access/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("cmubbc14l0002tjpa0r56r1sm")).toBeInTheDocument();
    expect(screen.getByText(/Give agents infrastructure capabilities/i)).toBeInTheDocument();
  });
});
