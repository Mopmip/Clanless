import { PawIcon } from "../components/PawIcon";

interface Props {
  hasSave: boolean;
  onBegin: () => void;
  onContinue: () => void;
}

export function StartScreen({ hasSave, onBegin, onContinue }: Props) {
  return (
    <div className="start-screen">
      <div className="start-card">
        <h1>The Hollow</h1>
        <p className="start-subtitle">A pre-alpha vertical slice</p>
        <p className="start-blurb">
          You wake with no memory of who you are, and a small, living community
          decides — day by day — whether to make room for you.
        </p>
        <div className="start-buttons">
          <button className="primary-button" onClick={onBegin}>
            <PawIcon /> Begin
          </button>
          {hasSave && (
            <button className="secondary-button" onClick={onContinue}>
              Continue
            </button>
          )}
        </div>
        <p className="start-footnote">Days 0–5 · a playable slice, not a finished game.</p>
      </div>
    </div>
  );
}
