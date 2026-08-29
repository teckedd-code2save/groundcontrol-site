import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Home from "@/app/page";

const GITHUB_URL = "https://github.com/teckedd-code2save/groundcontrol";
const PRODUCT_URL = "https://groundcontrol.serendepify.com";

describe("Home page", () => {
  it("renders the product-led hero and live product CTA", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { level: 1, name: /build, deploy and operate your vps/i }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /open groundcontrol/i })[0]).toHaveAttribute(
      "href",
      PRODUCT_URL,
    );
  });

  it("points every GitHub link at the GroundControl product repo", () => {
    render(<Home />);
    const githubLinks = screen.getAllByRole("link", { name: /github/i });
    expect(githubLinks.length).toBeGreaterThan(0);
    for (const link of githubLinks) expect(link).toHaveAttribute("href", GITHUB_URL);
  });

  it("markets real GroundControl capabilities", () => {
    render(<Home />);
    expect(screen.getByText("Deployments")).toBeInTheDocument();
    expect(screen.getByText("Runtime")).toBeInTheDocument();
    expect(screen.getByText("Terminal")).toBeInTheDocument();
    expect(screen.getByText("Intelligence")).toBeInTheDocument();
    expect(screen.getByText("Domains & edge")).toBeInTheDocument();
  });

  it("shows production deployment templates", () => {
    render(<Home />);
    expect(screen.getByText("Existing Compose")).toBeInTheDocument();
    expect(screen.getByText("Odoo Community")).toBeInTheDocument();
    expect(screen.getByText("Next.js SaaS")).toBeInTheDocument();
    expect(screen.getByText("FastAPI + worker")).toBeInTheDocument();
  });

  it("shows the remote install command by default", () => {
    render(<Home />);
    expect(screen.getByRole("tab", { name: /remote/i })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByText(/root@YOUR_VPS_IP/)).toBeInTheDocument();
  });

  it("switches the install command when another tab is selected", () => {
    render(<Home />);
    fireEvent.click(screen.getByRole("tab", { name: /guided/i }));
    expect(screen.getByRole("tab", { name: /guided/i })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByText(/--interactive/)).toBeInTheDocument();
    expect(screen.queryByText(/root@YOUR_VPS_IP/)).not.toBeInTheDocument();
  });

  it("copies the active command to the clipboard", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", { value: { writeText }, configurable: true });

    render(<Home />);
    fireEvent.click(screen.getByRole("button", { name: "Copy installation command" }));

    await waitFor(() => expect(writeText).toHaveBeenCalledTimes(1));
    expect(writeText).toHaveBeenCalledWith(expect.stringContaining("root@YOUR_VPS_IP"));
    expect(screen.getByText("COPIED")).toBeInTheDocument();
  });
});
