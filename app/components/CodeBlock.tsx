"use client";
import { useState } from "react";
export default function CodeBlock({
  code,
  label = "Terminal",
  copy = true,
}: {
  code: string;
  label?: string;
  copy?: boolean;
}) {
  const [status, setStatus] = useState("");
  async function copyCode() {
    try {
      await navigator.clipboard.writeText(code);
      setStatus("Copied");
    } catch {
      setStatus("Select and copy the text below");
    }
  }
  return (
    <div className="code-block">
      <div className="code-toolbar">
        <span>{label}</span>
        {copy && (
          <button type="button" onClick={copyCode} aria-label={`Copy ${label}`}>
            Copy <span aria-hidden="true">↗</span>
          </button>
        )}
      </div>
      <pre tabIndex={0}>
        <code>{code}</code>
      </pre>
      <span className="copy-status" role="status">
        {status}
      </span>
    </div>
  );
}
