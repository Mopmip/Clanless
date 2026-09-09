import { useState } from "react";
import type { Cat } from "../types";

interface Props {
  cat: Cat;
  variant: "token" | "zoom";
}

// Shared art-with-fallback renderer. "token" shows the whole portrait small
// (used in the hub grid); "zoom" crops the same file to a face/bust close-up
// via CSS (object-position: top) — no separate close-up asset needed, since
// the source art is a full-body standing portrait with the face at the top.
export function CatPortrait({ cat, variant }: Props) {
  const [failed, setFailed] = useState(false);

  return (
    <span
      className={`cat-portrait cat-portrait-${variant}`}
      style={{ ["--accent" as string]: cat.accent }}
    >
      {!failed ? (
        <img src={`/art/cats/${cat.name}.png`} alt="" onError={() => setFailed(true)} />
      ) : (
        <span className="cat-portrait-placeholder">{cat.initial}</span>
      )}
    </span>
  );
}
