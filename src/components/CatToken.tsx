import { useState } from "react";
import type { Cat } from "../types";

interface Props {
  cat: Cat;
  met: boolean;
  asleep?: boolean;
  onClick: () => void;
}

// Renders the real art if the user has dropped a matching PNG into
// /public/art/cats/<Name>.png; otherwise falls back to a themed placeholder
// token so the game is playable without any art at all.
export function CatToken({ cat, met, asleep, onClick }: Props) {
  const [artFailed, setArtFailed] = useState(false);

  return (
    <button
      className={`cat-token${asleep ? " asleep" : ""}${met ? " met" : ""}`}
      style={{ ["--accent" as string]: cat.accent }}
      onClick={onClick}
      title={cat.name}
    >
      <span className="cat-token-art">
        {!artFailed && (
          <img
            src={`/art/cats/${cat.name}.png`}
            alt=""
            onError={() => setArtFailed(true)}
          />
        )}
        {artFailed && <span className="cat-token-placeholder">{cat.initial}</span>}
      </span>
      <span className="cat-token-name">{cat.name}</span>
      {asleep && <span className="cat-token-tag">sleeping</span>}
    </button>
  );
}
