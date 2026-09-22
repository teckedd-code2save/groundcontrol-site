"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Capture from "./Capture";

const stages = [
  {
    title: "Discover",
    heading: "Start with what is already running.",
    text: "GroundControl reads the active host, finds Compose folders and containers, and presents candidates you can inspect.",
    fact: "Review the candidates and choose which to enroll.",
    file: "discovery-desktop.jpg",
    alt: "GroundControl discovered workloads with source paths and Enrol deployment buttons",
    href: "/docs/discovery",
    link: "How discovery works",
  },
  {
    title: "Enrol",
    heading: "Choose what belongs in GroundControl.",
    text: "Enrol one candidate, keep its files where they are, and optionally group it into a project. Confirm its source, runtime and public address.",
    fact: "Enrollment preserves the workload’s existing location.",
    file: "enrollment-desktop.jpg",
    alt: "GroundControl enrollment dialog showing optional project grouping",
    href: "/docs/first-deployment",
    link: "Follow the enrollment guide",
  },
  {
    title: "Connect",
    heading: "Give your agent a scoped connection.",
    text: "Add your instance’s MCP endpoint to a compatible client, sign in through OAuth and select the deployments it may access.",
    fact: "The grant names the capabilities and workloads.",
    file: "agents-desktop.jpg",
    alt: "GroundControl Agents workspace showing a real active ChatGPT grant",
    href: "/docs/agent-access",
    link: "Connect your agent",
  },
  {
    title: "Verify",
    heading: "Follow the operation to its outcome.",
    text: "Read runtime checks and the public endpoint result. A durable operation ID lets your agent return to the same work after a timeout.",
    fact: "RentAWeekend recorded release · 21 September 2026.",
    file: "verification-desktop.jpg",
    alt: "GroundControl runtime image verification and public endpoint evidence",
    href: "/docs/evidence",
    link: "Inspect the recorded evidence",
  },
] as const;

export default function ProductTour() {
  const [active, setActive] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const stage = stages[active];
  return (
    <div className="product-tour">
      <div
        className="tour-tabs"
        role="tablist"
        aria-label="GroundControl product walkthrough"
      >
        {stages.map((item, index) => (
          <button
            key={item.title}
            ref={(node) => {
              buttons.current[index] = node;
            }}
            type="button"
            role="tab"
            id={`tour-tab-${index}`}
            aria-controls="tour-panel"
            aria-selected={active === index}
            tabIndex={active === index ? 0 : -1}
            onClick={() => setActive(index)}
            onKeyDown={(event) => {
              let next = active;
              if (event.key === "ArrowRight")
                next = (active + 1) % stages.length;
              else if (event.key === "ArrowLeft")
                next = (active - 1 + stages.length) % stages.length;
              else if (event.key === "Home") next = 0;
              else if (event.key === "End") next = stages.length - 1;
              else return;
              event.preventDefault();
              setActive(next);
              buttons.current[next]?.focus();
            }}
          >
            <span>0{index + 1}</span>
            {item.title}
            <span aria-hidden="true">↗︎</span>
          </button>
        ))}
      </div>
      <div
        id="tour-panel"
        role="tabpanel"
        aria-labelledby={`tour-tab-${active}`}
        className="tour-panel"
      >
        <div className="tour-copy">
          <p className="eyebrow">Inside GroundControl</p>
          <h2>{stage.heading}</h2>
          <p>{stage.text}</p>
          <p className="tour-fact">{stage.fact}</p>
          <Link href={stage.href}>
            {stage.link} <span aria-hidden="true">→</span>
          </Link>
        </div>
        <Capture
          file={stage.file}
          alt={stage.alt}
          caption="Operator interface · captured 22 September 2026"
          priority
        />
      </div>
    </div>
  );
}
