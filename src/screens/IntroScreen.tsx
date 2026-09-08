import { useState } from "react";
import { INTRO_BEATS } from "../data/script";
import { DialogueBox } from "../components/DialogueBox";
import { SceneBackground } from "../components/SceneBackground";
import type { GameState } from "../types";

interface Props {
  state: GameState;
  onAdvance: () => void;
  onSetName: (mode: "remember" | "choose" | "unknown", name: string) => void;
}

export function IntroScreen({ state, onAdvance, onSetName }: Props) {
  const beat = INTRO_BEATS[state.introStep];
  const [customName, setCustomName] = useState("");
  const [pendingMode, setPendingMode] = useState<"remember" | "choose" | null>(null);

  if (!beat) return null;

  const isNight = beat.id.startsWith("0.4");
  const isRidge = beat.id.startsWith("0.1");
  const file = isRidge
    ? "Background-ridge-day.png"
    : isNight
      ? "Background-hollow-night.png"
      : "Background-hollow-day.png";
  const mood = isNight ? "night" : "day";

  return (
    <SceneBackground file={file} mood={mood}>
      {beat.nameChoice ? (
        <div className="name-choice-panel">
          {pendingMode ? (
            <>
              <p className="choice-prompt">
                {pendingMode === "remember" ? "What is it?" : "What would you like to be called?"}
              </p>
              <div className="name-input-row">
                <input
                  autoFocus
                  value={customName}
                  maxLength={16}
                  placeholder="Type a name..."
                  onChange={(e) => setCustomName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && customName.trim()) {
                      onSetName(pendingMode, customName.trim());
                    }
                  }}
                />
                <button
                  className="primary-button"
                  disabled={!customName.trim()}
                  onClick={() => onSetName(pendingMode, customName.trim())}
                >
                  Confirm
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="choice-prompt">What do you tell them?</p>
              <div className="choice-list">
                <button className="choice-button" onClick={() => setPendingMode("remember")}>
                  <span className="choice-label">I remember my name.</span>
                </button>
                <button className="choice-button" onClick={() => setPendingMode("choose")}>
                  <span className="choice-label">I'll choose a name.</span>
                </button>
                <button className="choice-button" onClick={() => onSetName("unknown", "")}>
                  <span className="choice-label">I don't know.</span>
                </button>
              </div>
            </>
          )}
        </div>
      ) : (
        <DialogueBox key={beat.id} lines={beat.lines ?? []} onDone={onAdvance} />
      )}
    </SceneBackground>
  );
}
