"use client";
import Link from "next/link";
import { useState } from "react";

const paths = [
  {
    id: "existing",
    title: "My apps already run here",
    intro:
      "Bring one existing workload into view before granting an agent access.",
    steps: [
      ["Confirm the active host and scan paths", "discovery#locations"],
      ["Scan and inspect the correct candidate", "discovery#scan"],
      ["Enrol it and verify its runtime identity", "first-deployment#enroll"],
      ["Add its repository and public URL", "first-deployment#source"],
      ["Connect your agent and make a read-only call", "agent-access#first-call"],
    ],
  },
  {
    id: "new",
    title: "I want to deploy a new app",
    intro: "Use a template to validate, create and enroll a new deployment.",
    steps: [
      ["Choose a template for your application", "new-deployment#choose"],
      ["Connect and verify the source", "new-deployment#source"],
      ["Configure and review the proposed deployment", "new-deployment#review"],
      ["Deploy and check the public result", "new-deployment#verify"],
      ["Grant your agent access to that workload", "agent-access#consent"],
    ],
  },
] as const;

export default function NextSteps() {
  const [path, setPath] = useState(0);
  const [done, setDone] = useState<string[]>([]);
  const current = paths[path];
  const completed = current.steps.filter((_, index) =>
    done.includes(`${current.id}-${index}`),
  ).length;
  return (
    <div className="next-steps">
      <div
        className="path-switch"
        role="group"
        aria-label="Choose your post-install path"
      >
        {paths.map((item, i) => (
          <button
            type="button"
            key={item.id}
            aria-pressed={path === i}
            onClick={() => setPath(i)}
          >
            {item.title}
            <span aria-hidden="true">↗︎</span>
          </button>
        ))}
      </div>
      <div className="path-heading">
        <p>{current.intro}</p>
        <span>
          {completed} / {current.steps.length} checked
        </span>
      </div>
      <ol className="path-checklist">
        {current.steps.map(([title, href], index) => {
          const key = `${current.id}-${index}`;
          return (
            <li key={key}>
              <label>
                <input
                  type="checkbox"
                  checked={done.includes(key)}
                  onChange={() =>
                    setDone((previous) =>
                      previous.includes(key)
                        ? previous.filter((item) => item !== key)
                        : [...previous, key],
                    )
                  }
                />
                <span>{title}</span>
              </label>
              <Link href={`/docs/${href}`} aria-label={`Guide: ${title}`}>
                Guide <span aria-hidden="true">↗︎</span>
              </Link>
            </li>
          );
        })}
      </ol>
      <p className="checklist-note">
        Your checklist for this page session. Checking a box does not run an
        action or verify a server.
      </p>
    </div>
  );
}
