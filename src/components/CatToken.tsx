import type { Cat } from "../types";
import { CatPortrait } from "./CatPortrait";

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
  return (
    <button
      className={`cat-token${asleep ? " asleep" : ""}${met ? " met" : ""}`}
      style={{ ["--accent" as string]: cat.accent }}
      onClick={onClick}
      title={cat.name}
    >
      <CatPortrait cat={cat} variant="token" />
      <span className="cat-token-name">{cat.name}</span>
      {asleep && <span className="cat-token-tag">sleeping</span>}
    </button>
  );
}
