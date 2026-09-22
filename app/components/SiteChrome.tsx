import Link from "next/link";
export const SOURCE = "https://github.com/teckedd-code2save/groundcontrol";
export function Header() {
  return (
    <header className="site-header">
      <Link href="/" className="wordmark" aria-label="GroundControl home">
        <span className="brand-mark" aria-hidden="true">
          ◌
        </span>
        GroundControl
      </Link>
      <nav aria-label="Primary navigation">
        <Link href="/docs">Docs</Link>
        <Link href="/articles/chatgpt-operated-my-deployment">Field notes</Link>
        <a href={SOURCE} target="_blank" rel="noreferrer">
          View source ↗︎
        </a>
      </nav>
      <Link className="button compact" href="/docs/agent-access">
        Connect ChatGPT <span aria-hidden="true">↗︎</span>
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
          A Serendepify product.
          <br />
          Open source. Self-hosted. Yours.
        </p>
      </div>
      <nav aria-label="Footer navigation">
        <Link href="/docs/getting-started">Installation</Link>
        <Link href="/docs/agent-access">Connect ChatGPT</Link>
        <Link href="/docs/evidence">Evidence</Link>
        <a href={SOURCE}>View source ↗︎</a>
      </nav>
      <span className="mono">Built for infrastructure you own.</span>
    </footer>
  );
}
