import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import DeploymentStory from "@/app/components/DeploymentStory";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

function preference(initial: boolean) {
  const events = new EventTarget();
  const media = {
    matches: initial,
    addEventListener: events.addEventListener.bind(events),
    removeEventListener: vi.fn(events.removeEventListener.bind(events)),
  };
  vi.stubGlobal("matchMedia", vi.fn(() => media));
  return {
    media,
    change(matches: boolean) {
      media.matches = matches;
      events.dispatchEvent(new Event("change"));
    },
  };
}

describe("The deployment story's optional motion", () => {
  it("ships the complete readable story without waiting for JavaScript", () => {
    const html = renderToStaticMarkup(<DeploymentStory />);
    const document = new DOMParser().parseFromString(html, "text/html");
    expect(document.querySelector("p")?.textContent).toBe(
      "From the first deploy to the next release, your project stays in your hands. Bring your code, choose your infrastructure, and work with your agent to configure, deploy and verify.",
    );
    expect(document.querySelector("section")?.hasAttribute("data-reveal")).toBe(false);
    expect(document.querySelector("[aria-hidden]")).toBeNull();
  });

  it("keeps the static experience when browser motion APIs are unavailable", () => {
    vi.stubGlobal("matchMedia", undefined);
    render(<DeploymentStory />);
    expect(screen.getByRole("region")).not.toHaveAttribute("data-reveal");
  });

  it("never starts scroll motion when reduced motion is requested", () => {
    preference(true);
    const requestFrame = vi.spyOn(window, "requestAnimationFrame");
    render(<DeploymentStory />);
    fireEvent.scroll(window);
    expect(screen.getByRole("region")).not.toHaveAttribute("data-reveal");
    expect(requestFrame).not.toHaveBeenCalled();
  });

  it("follows scrolling in both directions, batches frames, and respects preference changes", () => {
    const motion = preference(false);
    vi.stubGlobal("innerHeight", 1000);
    let top = 900;
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(() => ({
      top, height: 400, bottom: top + 400, left: 0, right: 1000, width: 1000,
      x: 0, y: top, toJSON: () => ({}),
    }));
    let pending: FrameRequestCallback = () => {};
    const requestFrame = vi.spyOn(window, "requestAnimationFrame").mockImplementation((callback) => {
      pending = callback;
      return 1;
    });
    const cancelFrame = vi.spyOn(window, "cancelAnimationFrame");
    const { unmount } = render(<DeploymentStory />);
    const section = screen.getByRole("region");
    const progress = () => Number(section.style.getPropertyValue("--story-progress"));
    expect(progress()).toBe(0);

    top = 620;
    fireEvent.scroll(window);
    fireEvent.scroll(window);
    expect(requestFrame).toHaveBeenCalledTimes(1);
    pending(0);
    expect(progress()).toBe(0.5);
    top = 400;
    fireEvent.scroll(window);
    pending(0);
    expect(progress()).toBe(1);
    top = 900;
    fireEvent.scroll(window);
    pending(0);
    expect(progress()).toBe(0);

    fireEvent.scroll(window);
    motion.change(true);
    expect(cancelFrame).toHaveBeenCalledWith(1);
    expect(section).not.toHaveAttribute("data-reveal");
    const calls = requestFrame.mock.calls.length;
    fireEvent.scroll(window);
    expect(requestFrame).toHaveBeenCalledTimes(calls);
    motion.change(false);
    expect(section).toHaveAttribute("data-reveal", "true");

    unmount();
    fireEvent.scroll(window);
    expect(requestFrame).toHaveBeenCalledTimes(calls);
    expect(motion.media.removeEventListener).toHaveBeenCalledWith("change", expect.any(Function));
  });
});
