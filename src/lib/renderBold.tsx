import { Fragment, type ReactNode } from "react";

/**
 * Parses `**bold**` markdown-style segments in a plain string into
 * <strong> spans, so copy in data files can carry light emphasis without
 * every section needing to hand-author JSX.
 *
 * `tone` picks the highlight color: "light" (default) for text sitting on
 * a white/soft background, "dark" for text sitting on a dark (bg-ink) one.
 */
export function renderBold(text: string, tone: "light" | "dark" = "light"): ReactNode {
  const boldClassName = tone === "dark" ? "font-semibold text-gold-200" : "font-semibold text-ink";
  const parts = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className={boldClassName}>
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}
