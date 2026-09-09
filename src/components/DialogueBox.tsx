import { useState } from "react";
import type { SceneLine } from "../data/script";
import { PawIcon } from "./PawIcon";
import { CatPortrait } from "./CatPortrait";
import { CATS } from "../data/cats";

interface Props {
  lines: SceneLine[];
  onDone: () => void;
  doneLabel?: string;
}

export function DialogueBox({ lines, onDone, doneLabel = "Continue" }: Props) {
  const [index, setIndex] = useState(0);
  const line = lines[index];
  const isLast = index >= lines.length - 1;

  function advance() {
    if (isLast) {
      onDone();
    } else {
      setIndex((i) => i + 1);
    }
  }

  if (!line) return null;

  const speakerCat = line.speaker ? CATS.find((c) => c.name === line.speaker) : undefined;

  return (
    <div className="dialogue-box" onClick={advance} role="button" tabIndex={0}>
      {speakerCat && <CatPortrait key={speakerCat.id} cat={speakerCat} variant="zoom" />}
      <div className="dialogue-content">
        {line.speaker && <div className="dialogue-speaker">{line.speaker}</div>}
        <div className="dialogue-text">{line.text}</div>
        <div className="dialogue-continue">
          {isLast ? doneLabel : "Continue"} <PawIcon />
        </div>
      </div>
    </div>
  );
}
