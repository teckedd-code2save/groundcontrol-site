"use client";
import { useState } from "react";
import CodeBlock from "@/app/components/CodeBlock";
export default function EndpointBuilder() {
  const [value, setValue] = useState("");
  let origin = "";
  try {
    const url = new URL(value);
    if (
      url.protocol === "https:" &&
      !url.username &&
      !url.password &&
      !url.search &&
      !url.hash &&
      (url.pathname === "/" || url.pathname === "/mcp")
    )
      origin = url.origin;
  } catch {}
  return (
    <div className="endpoint-builder">
      <label htmlFor="instance-url">Your GroundControl HTTPS address</label>
      <input
        id="instance-url"
        type="url"
        value={value}
        onChange={(event) => setValue(event.target.value.trim())}
        placeholder="https://gc.example.com"
        aria-describedby="endpoint-help"
      />
      <p id="endpoint-help">
        Enter your instance address. This only formats the URL in your browser;
        it does not connect or send data.
      </p>
      {value && !origin && (
        <p className="input-error" role="alert">
          Use an HTTPS origin, such as https://gc.example.com, without
          credentials, query parameters or extra paths.
        </p>
      )}
      <CodeBlock
        label="MCP server URL"
        code={`${origin || "https://gc.example.com"}/mcp`}
      />
      <span className="small">
        {origin
          ? "Copy this into your client’s MCP server URL field."
          : "Example only. Replace gc.example.com with your own hostname."}
      </span>
    </div>
  );
}
