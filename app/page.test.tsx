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

  it("uses three current September proof frames in both motion and readable sections", () => {
    render(<Home />);

    expect(
      screen.getAllByAltText(/active ChatGPT OAuth grant with scoped deployment capabilities/i).length,
    ).toBeGreaterThanOrEqual(2);
    expect(
      screen.getAllByAltText(/live GroundControl health check for RentAWeekend/i).length,
    ).toBeGreaterThanOrEqual(2);
    expect(
      screen.getAllByAltText(/successful GroundControl redeploy with an operation ID/i).length,
    ).toBeGreaterThanOrEqual(2);

    expect(screen.queryByAltText(/current GroundControl dashboard/i)).not.toBeInTheDocument();
    expect(screen.queryByAltText(/current GroundControl topology/i)).not.toBeInTheDocument();
  });

  it("keeps an image frame visible if a product capture fails to load", () => {
    render(<Home />);
    const image = screen.getAllByAltText(/live GroundControl health check for RentAWeekend/i)[0];
    fireEvent.error(image);

    expect(screen.getByText("Capture unavailable")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /health check.*unavailable/i })).toBeInTheDocument();
  });

  it("uses direct outcome-first product language", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { name: /your agents only need to tell GroundControl what they want done/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/deploy this release\. check the health\. roll back if verification fails/i),
    ).toBeInTheDocument();
    expect(screen.queryByText(/agents should ask for outcomes, not learn your server/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/current proof, not decorative product frames/i)).not.toBeInTheDocument();
  });

  it("renders the Verify and Operate proof captures from real public assets", () => {
    render(<Home />);
    const verify = screen.getAllByAltText(/live GroundControl health check for RentAWeekend/i)[0];
    const operate = screen.getAllByAltText(/successful GroundControl redeploy with an operation ID/i)[0];
    expect(verify).toHaveAttribute("src", "/product/assistant-health-check.webp");
    expect(operate).toHaveAttribute("src", "/product/redeploy-proof.webp");
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
