import Image from "next/image";
export default function Capture({
  file,
  alt,
  caption,
  priority = false,
}: {
  file: string;
  alt: string;
  caption: string;
  priority?: boolean;
}) {
  return (
    <figure className="capture">
      <a
        href={`/proof/${file}`}
        target="_blank"
        rel="noreferrer"
        aria-label={`Enlarge: ${alt}`}
      >
        <Image
          src={`/proof/${file}`}
          width={1363}
          height={936}
          alt={alt}
          priority={priority}
          sizes="(max-width: 760px) 100vw, 1000px"
        />
      </a>
      <figcaption>
        <span>{caption}</span>
        <a href={`/proof/${file}`} target="_blank" rel="noreferrer">
          Enlarge ↗︎
        </a>
      </figcaption>
    </figure>
  );
}
