"use client";
import Link from "next/link";
import { useState } from "react";
import { guideIndex } from "@/content/guide-index";
export default function DocsNav({ current = "" }: { current?: string }) {
  const [query, setQuery] = useState("");
  const matches = guideIndex.filter((g) =>
    `${g.title} ${g.description} ${g.keywords}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );
  return (
    <aside className="docs-sidebar">
      <p className="eyebrow">DOCUMENTATION</p>
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
        <Link className={current === "" ? "active" : ""} href="/docs">
          Overview
        </Link>
        {matches.map((g) => (
          <Link
            key={g.slug}
            aria-current={g.slug === current ? "page" : undefined}
            className={g.slug === current ? "active" : ""}
            href={`/docs/${g.slug}`}
          >
            <span>{g.title}</span>
            <small>{g.short}</small>
          </Link>
        ))}
      </nav>
      {matches.length === 0 && (
        <p className="small">
          No guide found. Try “OAuth”, “install” or “health”.
        </p>
      )}
      <div className="sidebar-note">
        Start with a VPS.
        <br />
        Finish with a verified agent connection.
      </div>
    </aside>
  );
}
