import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Home from "@/app/page";

const GITHUB_URL = "https://github.com/teckedd-code2save/groundcontrol";

describe("Home page", () => {
  it("renders the hero heading and primary install CTA", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { level: 1, name: /operational co-pilot/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /install on your vps/i }),
    ).toHaveAttribute("href", "#install");
  });

  it("points every GitHub link at the GroundControl product repo", () => {
    render(<Home />);
    const githubLinks = screen.getAllByRole("link", { name: /github/i });
    expect(githubLinks.length).toBeGreaterThan(0);
    for (const link of githubLinks) {
      expect(link).toHaveAttribute("href", GITHUB_URL);
    }
  });

  it("renders the three capability cards", () => {
    render(<Home />);
    expect(screen.getByText("See the whole host")).toBeInTheDocument();
    expect(screen.getByText("Deploy with context")).toBeInTheDocument();
    expect(screen.getByText("Investigate from evidence")).toBeInTheDocument();
  });

  it("shows the remote install command by default", () => {
    render(<Home />);
    expect(screen.getByRole("tab", { name: /remote/i })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByText(/root@YOUR_VPS_IP/)).toBeInTheDocument();
  });

  it("switches the install command when another tab is selected", () => {
    render(<Home />);
    fireEvent.click(screen.getByRole("tab", { name: /guided/i }));
    expect(screen.getByRole("tab", { name: /guided/i })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByText(/--interactive/)).toBeInTheDocument();
    expect(screen.queryByText(/root@YOUR_VPS_IP/)).not.toBeInTheDocument();
  });

  it("copies the active command to the clipboard", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      configurable: true,
    });

    render(<Home />);
    fireEvent.click(
      screen.getByRole("button", { name: "Copy installation command" }),
    );

    await waitFor(() => expect(writeText).toHaveBeenCalledTimes(1));
    expect(writeText).toHaveBeenCalledWith(
      expect.stringContaining("root@YOUR_VPS_IP"),
    );
    expect(screen.getByText("COPIED")).toBeInTheDocument();
  });
});
