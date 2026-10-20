"use client";

import { useEffect, useRef, type CSSProperties } from "react";

const story = "From the first deploy to the next release, your project stays in your hands. Bring your code, choose your infrastructure, and work with your agent to configure, deploy and verify.";
const words = story.split(" ");

export default function DeploymentStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const paragraph = textRef.current;
    if (!section || !paragraph || !window.matchMedia) return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    function update() {
      frame = 0;
      if (!section || !paragraph) return;
      const { top, height } = paragraph.getBoundingClientRect();
      // Finish while the paragraph is still in view, including on small screens.
      const distance = Math.min(height, window.innerHeight * 0.55);
      const progress = Math.max(0, Math.min(1, (window.innerHeight * 0.82 - top) / distance));
      section.style.setProperty("--story-progress", String(progress));
      section.dataset.reveal = "true";
    }

    function schedule() {
      if (!frame) frame = window.requestAnimationFrame(update);
    }

    function stop() {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.cancelAnimationFrame(frame);
      frame = 0;
      section?.removeAttribute("data-reveal");
      section?.style.removeProperty("--story-progress");
    }

    function syncPreference() {
      stop();
      if (preference.matches) return;
      update();
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule);
    }

    syncPreference();
    preference.addEventListener("change", syncPreference);
    return () => {
      stop();
      preference.removeEventListener("change", syncPreference);
    };
  }, []);

  return (
    <section className="deployment-story wrap" ref={sectionRef} aria-labelledby="ownership-title">
      <h2 className="eyebrow" id="ownership-title">Deployment, with ownership built in.</h2>
      <p className="deployment-statement" ref={textRef}>
        {words.map((word, index) => (
          <span key={index} className="reveal-word" style={{ "--word-start": index / words.length } as CSSProperties}>
            {word}{index < words.length - 1 ? " " : ""}
          </span>
        ))}
      </p>
      <ol className="deployment-journey" aria-label="The deployment workflow">
        {["Source", "Configure", "Deploy", "Verify"].map((step, index) => (
          <li key={step}><span className="mono">0{index + 1}</span>{step}</li>
        ))}
      </ol>
    </section>
  );
}
