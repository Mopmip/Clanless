import { useEffect, useReducer, useState } from "react";
import type { GameState } from "./types";
import { reducer, newGame } from "./state";
import { INTRO_BEATS } from "./data/script";
import { loadGame, saveGame, hasSave, clearSave } from "./systems/saveGame";
import { StartScreen } from "./screens/StartScreen";
import { IntroScreen } from "./screens/IntroScreen";
import { HollowScreen } from "./screens/HollowScreen";
import { EndScreen } from "./screens/EndScreen";
import { Journal } from "./components/Journal";
import "./game.css";

function initialState(): GameState {
  const saved = loadGame();
  return saved ?? newGame();
}

export default function App() {
  const [screen, setScreen] = useState<"start" | "game">("start");
  const [state, dispatch] = useReducer(reducer, undefined, initialState);
  const [journalOpen, setJournalOpen] = useState(false);

  useEffect(() => {
    if (screen === "game" && state.phase !== "intro") {
      saveGame(state);
    }
  }, [state, screen]);

  function begin() {
    dispatch({ type: "LOAD", state: newGame() });
    setScreen("game");
  }

  function resumeSave() {
    const saved = loadGame();
    if (saved) dispatch({ type: "LOAD", state: saved });
    setScreen("game");
  }

  function restart() {
    clearSave();
    dispatch({ type: "LOAD", state: newGame() });
    setScreen("game");
  }

  function introAdvance() {
    if (state.introStep + 1 >= INTRO_BEATS.length) {
      dispatch({
        type: "LOAD",
        state: { ...state, day: 1, time: "morning", phase: "hub" },
      });
    } else {
      dispatch({ type: "INTRO_NEXT" });
    }
  }

  function setName(mode: "remember" | "choose" | "unknown", name: string) {
    const resolvedName = mode === "unknown" ? "Nameless" : name;
    dispatch({ type: "SET_NAME", mode, name: resolvedName });
    dispatch({ type: "INTRO_NEXT" });
  }

  if (screen === "start") {
    return <StartScreen hasSave={hasSave()} onBegin={begin} onContinue={resumeSave} />;
  }

  return (
    <>
      {state.phase === "intro" && (
        <IntroScreen state={state} onAdvance={introAdvance} onSetName={setName} />
      )}
      {state.phase === "hub" && (
        <HollowScreen state={state} dispatch={dispatch} onOpenJournal={() => setJournalOpen(true)} />
      )}
      {state.phase === "end" && <EndScreen state={state} onRestart={restart} />}
      {journalOpen && <Journal state={state} onClose={() => setJournalOpen(false)} />}
    </>
  );
}
