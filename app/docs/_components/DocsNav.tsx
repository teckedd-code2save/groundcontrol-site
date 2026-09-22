"use client";
import Link from "next/link";
import { useState } from "react";
import { guideGroups, guideIndex } from "@/content/guide-index";
export default function DocsNav({ current = "" }: { current?: string }) {
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState(false);
  const matches = guideIndex.filter((guide) =>
    `${guide.title} ${guide.description} ${guide.keywords}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );
  return (
    <aside className="docs-sidebar">
      <button
        type="button"
        className="docs-toggle"
        aria-expanded={expanded}
        aria-controls="docs-navigation"
        onClick={() => setExpanded(!expanded)}
      >
        <span>Browse documentation</span>
        <span aria-hidden="true">{expanded ? "−" : "+"}</span>
      </button>
      <div
        id="docs-navigation"
        className={`docs-nav-body ${expanded ? "is-open" : ""}`}
      >
        <label className="sr-only" htmlFor="find-guide">
          Find a guide
        </label>
        <input
          id="find-guide"
          type="search"
          placeholder="Find a guide…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <nav aria-label="Documentation">
          <Link
            aria-current={current === "" ? "page" : undefined}
            className={current === "" ? "active" : ""}
            href="/docs"
          >
            Overview
          </Link>
          {guideGroups.map((group) => {
            const items = matches.filter((guide) => guide.group === group);
            return (
              items.length > 0 && (
                <div className="nav-group" key={group}>
                  <p>{group}</p>
                  {items.map((guide) => (
                    <Link
                      key={guide.slug}
                      aria-current={guide.slug === current ? "page" : undefined}
                      className={guide.slug === current ? "active" : ""}
                      href={`/docs/${guide.slug}`}
                    >
                      {guide.title}
                    </Link>
                  ))}
                </div>
              )
            );
          })}
        </nav>
        {matches.length === 0 && (
          <p className="small">
            No guide found. Try “discovery”, “OAuth” or “health”.
          </p>
        )}
        <div className="sidebar-note">
          Your host. Your workloads.
          <br />
          Explicit access. Recorded outcomes.
        </div>
      </div>
    </aside>
  );
}
