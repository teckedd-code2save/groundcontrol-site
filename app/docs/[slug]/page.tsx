import Link from "next/link";
import { notFound } from "next/navigation";
import { Header, Footer } from "@/app/components/SiteChrome";
import DocsNav from "@/app/docs/_components/DocsNav";
import { guides } from "@/content/guides";
import { guideIndex } from "@/content/guide-index";
export const dynamicParams = false;
export function generateStaticParams() {
  return guideIndex.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return {
    title: `${guides[slug]?.title || "Documentation"} | GroundControl`,
    description: guides[slug]?.description,
  };
}
export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = guides[slug];
  if (!guide) notFound();
  const index = guideIndex.findIndex((g) => g.slug === slug);
  const nextFor: Record<string, string> = {
    "after-install": "discovery",
    publishing: "discovery",
    "first-deployment": "agent-access",
    "new-deployment": "agent-access",
  };
  const next = nextFor[slug]
    ? guideIndex.find((item) => item.slug === nextFor[slug])
    : guideIndex[index + 1];
  return (
    <>
      <Header />
      <div className="docs-layout wrap">
        <DocsNav current={slug} />
        <main id="main" className="doc-main">
          <div className="breadcrumb">
            <Link href="/docs">Docs</Link>
            <span>/</span>
            <span>{guideIndex[index].title}</span>
          </div>
          <header className="doc-header">
            <p className="eyebrow">{guideIndex[index].short}</p>
            <h1>{guide.title}</h1>
            <p className="lead">{guide.description}</p>
            <div className="outcome">
              <span>YOU WILL FINISH WITH</span>
              <p>{guide.outcome}</p>
            </div>
          </header>
          <details className="mobile-toc">
            <summary>On this page</summary>
            <nav>
              {guide.sections.map((s) => (
                <a key={s.id} href={`#${s.id}`}>
                  {s.title}
                </a>
              ))}
            </nav>
          </details>
          <div className="prose">
            {guide.sections.map((s) => (
              <section key={s.id} id={s.id}>
                <h2>
                  <a href={`#${s.id}`}>{s.title}</a>
                </h2>
                {s.body}
              </section>
            ))}
          </div>
          <div className="doc-next">
            <Link href="/docs">← All guides</Link>
            {next && (
              <Link href={`/docs/${next.slug}`}>
                <small>CONTINUE</small>
                {next.title} →
              </Link>
            )}
          </div>
        </main>
        <aside className="toc">
          <p className="eyebrow">ON THIS PAGE</p>
          <nav>
            {guide.sections.map((s) => (
              <a key={s.id} href={`#${s.id}`}>
                {s.title}
              </a>
            ))}
          </nav>
          <p className="small">
            Checked against product code and evidence
            <br />
            22 September 2026
          </p>
        </aside>
      </div>
      <Footer />
    </>
  );
}
