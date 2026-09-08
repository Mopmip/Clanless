import { useState } from "react";
import type { SceneLine } from "../data/script";
import { PawIcon } from "./PawIcon";

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

  return (
    <div className="dialogue-box" onClick={advance} role="button" tabIndex={0}>
      {line.speaker && <div className="dialogue-speaker">{line.speaker}</div>}
      <div className="dialogue-text">{line.text}</div>
      <div className="dialogue-continue">
        {isLast ? doneLabel : "Continue"} <PawIcon />
      </div>
    </div>
  );
}
