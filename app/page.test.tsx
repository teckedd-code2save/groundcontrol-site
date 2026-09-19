import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Home from "@/app/page";

const GITHUB_URL = "https://github.com/teckedd-code2save/groundcontrol";

describe("Home page", () => {
  it("positions GroundControl as an agent-native self-hosted control plane", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { level: 1, name: /give your agents infrastructure arms/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/MCP \+ OAuth/i)).toBeInTheDocument();
    expect(screen.getByText(/single tenant/i)).toBeInTheDocument();
  });

  it("keeps the public site separate from the private operator login", () => {
    render(<Home />);
    const links = screen.getAllByRole("link");
    expect(
      links.some((link) => link.getAttribute("href") === "https://groundcontrol.serendepify.com"),
    ).toBe(false);
  });

  it("uses the fresh September MCP and durable-operation proof", () => {
    render(<Home />);
    expect(
      screen.getByAltText(/active ChatGPT OAuth grant with scoped deployment capabilities/i),
    ).toBeInTheDocument();
    expect(
      screen.getByAltText(/successful GroundControl redeploy with an operation ID/i),
    ).toBeInTheDocument();
    expect(
      screen.getByAltText(/successful GroundControl redeploy evidence returned inside ChatGPT/i),
    ).toBeInTheDocument();

    expect(screen.queryByAltText(/current GroundControl dashboard/i)).not.toBeInTheDocument();
    expect(screen.queryByAltText(/current GroundControl topology/i)).not.toBeInTheDocument();
  });

  it("shows the scoped MCP tool surface", () => {
    render(<Home />);
    expect(screen.getByText("deployment.list")).toBeInTheDocument();
    expect(screen.getByText("deployment.health")).toBeInTheDocument();
    expect(screen.getByText("deployment.config.check")).toBeInTheDocument();
    expect(screen.getByText("deployment.redeploy")).toBeInTheDocument();
    expect(screen.getByText("operation.get")).toBeInTheDocument();
  });

  it("uses Connect Repo language for repository linking", () => {
    render(<Home />);
    expect(screen.getByText("Connect Repo")).toBeInTheDocument();
    expect(screen.queryByText(/install on repositories/i)).not.toBeInTheDocument();
  });

  it("points GitHub links at the GroundControl product repo", () => {
    render(<Home />);
    const githubLinks = screen.getAllByRole("link", { name: /github|view source/i });
    expect(githubLinks.length).toBeGreaterThan(0);
    for (const link of githubLinks) expect(link).toHaveAttribute("href", GITHUB_URL);
  });

  it("shows the agent-assisted installer by default", () => {
    render(<Home />);
    expect(screen.getByRole("tab", { name: /agent/i })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByText(/scripts\/install/)).toBeInTheDocument();
    expect(screen.getByText(/--json/)).toBeInTheDocument();
  });

  it("switches to the human-readable installer", () => {
    render(<Home />);
    fireEvent.click(screen.getByRole("tab", { name: /on your vps/i }));
    expect(screen.getByRole("tab", { name: /on your vps/i })).toHaveAttribute("aria-selected", "true");
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
    expect(writeText).toHaveBeenCalledWith(expect.stringContaining("--json"));
    expect(screen.getByText("COPIED")).toBeInTheDocument();
  });
});
