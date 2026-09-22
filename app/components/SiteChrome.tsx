import Link from "next/link";
export const SOURCE = "https://github.com/teckedd-code2save/groundcontrol";
export function Header() {
  return (
    <header className="site-header">
      <Link href="/" className="wordmark" aria-label="GroundControl home">
        <svg
          className="brand-mark"
          width="29"
          height="29"
          viewBox="0 0 32 32"
          fill="none"
          aria-hidden="true"
        >
          <rect
            x="2"
            y="2"
            width="28"
            height="28"
            rx="7"
            stroke="currentColor"
          />
          <path
            d="M9 20V12L16 8L23 12V20L16 24L9 20Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M16 16L23 12M16 16L9 12M16 16V24"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
        GroundControl
      </Link>
      <nav aria-label="Primary navigation">
        <Link href="/#product">Product</Link>
        <Link href="/docs/philosophy">Approach</Link>
        <Link href="/docs">Docs</Link>
        <Link href="/articles/chatgpt-operated-my-deployment">Field notes</Link>
      </nav>
      <Link className="button compact" href="/docs/getting-started">
        Get started <span aria-hidden="true">↗︎</span>
      </Link>
    </header>
  );
}
export function Footer() {
  return (
    <footer className="site-footer wrap">
      <div>
        <Link className="wordmark" href="/">
          GroundControl
        </Link>
        <p>
          Open-source operations for infrastructure you own.
          <br />A Serendepify product.
        </p>
      </div>
      <nav aria-label="Footer navigation">
        <Link href="/docs/after-install">After installation</Link>
        <Link href="/docs/agent-access">Connect ChatGPT</Link>
        <Link href="/docs/philosophy">The approach</Link>
        <Link href="/docs/evidence">Evidence</Link>
        <a href={SOURCE} target="_blank" rel="noreferrer">
          View source ↗︎
        </a>
      </nav>
      <span className="mono">Safe, smooth, observable, agentic.</span>
    </footer>
  );
}
