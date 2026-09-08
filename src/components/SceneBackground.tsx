import { useState, type ReactNode } from "react";

interface Props {
  file: string;
  mood: "day" | "dusk" | "night";
  children?: ReactNode;
}

// Loads the real background from /public/art/backgrounds/<file> if present
// (drop in the Drive export with the same filename, e.g.
// "Background-hollow-day.png"), otherwise falls back to a painted gradient
// in the same mood so the scene still reads correctly.
export function SceneBackground({ file, mood, children }: Props) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`scene-bg scene-bg-${mood}`}>
      {!failed && (
        <img
          className="scene-bg-image"
          src={`/art/backgrounds/${file}`}
          alt=""
          onError={() => setFailed(true)}
        />
      )}
      <div className="scene-bg-content">{children}</div>
    </div>
  );
}
