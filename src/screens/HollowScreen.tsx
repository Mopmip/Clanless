import { useState } from "react";
import type { Dispatch } from "react";
import type { GameState } from "../types";
import type { Action } from "../state";
import { bestCatId } from "../state";
import { CATS, CAT_BY_ID } from "../data/cats";
import {
  DAY_SCRIPTS,
  DAY4_CHOICES,
  DAY4_INTRO,
  DAY4_PROMPT,
  DAY5_MORNING,
  FINAL_EVENING,
  type ActivityOption,
  type SceneLine,
} from "../data/script";
import { CatToken } from "../components/CatToken";
import { ChoiceList } from "../components/ChoiceList";
import { DialogueBox } from "../components/DialogueBox";
import { SceneBackground } from "../components/SceneBackground";
import { PawIcon } from "../components/PawIcon";

interface Props {
  state: GameState;
  dispatch: Dispatch<Action>;
  onOpenJournal: () => void;
}

function backgroundFor(time: GameState["time"]) {
  if (time === "evening") return { file: "Background-hollow-dusk.png", mood: "dusk" as const };
  if (time === "night") return { file: "Background-hollow-night.png", mood: "night" as const };
  return { file: "Background-hollow-day.png", mood: "day" as const };
}

interface Queue {
  lines: SceneLine[];
  onDone: () => void;
}

export function HollowScreen({ state, dispatch, onOpenJournal }: Props) {
  const [queue, setQueue] = useState<Queue | null>(null);
  const bg = backgroundFor(state.time);

  function playBark(catId: string) {
    const cat = CAT_BY_ID[catId];
    const bark = cat.barks[Math.floor(Math.random() * cat.barks.length)];
    setQueue({
      lines: [{ speaker: cat.name, text: bark }],
      onDone: () => {
        dispatch({ type: "MEET_CAT", id: catId });
        setQueue(null);
      },
    });
  }

  function chooseActivity(option: ActivityOption) {
    setQueue({
      lines: option.lines,
      onDone: () => {
        dispatch({ type: "CHOOSE_ACTIVITY", option });
        setQueue(null);
      },
    });
  }

  function goEvening() {
    const script = DAY_SCRIPTS.find((d) => d.day === state.day);
    const lines = [...(script?.eveningLines ?? []), ...(script?.offscreenEvent ?? [])];
    setQueue({
      lines: lines.length ? lines : [{ text: "Evening settles quietly over the Hollow." }],
      onDone: () => {
        dispatch({ type: "GO_EVENING" });
        setQueue(null);
      },
    });
  }

  function settleForNight() {
    dispatch({ type: "GO_NIGHT" });
  }

  function sleepUntilMorning() {
    setQueue({
      lines: [{ text: "You settle into your nest. Sleep comes quickly, and morning comes quicker." }],
      onDone: () => {
        dispatch({ type: "NEXT_DAY" });
        setQueue(null);
      },
    });
  }

  function finalNight() {
    setQueue({
      lines: FINAL_EVENING,
      onDone: () => {
        dispatch({ type: "FINISH" });
        setQueue(null);
      },
    });
  }

  if (queue) {
    return (
      <SceneBackground file={bg.file} mood={bg.mood}>
        <DialogueBox lines={queue.lines} onDone={queue.onDone} />
      </SceneBackground>
    );
  }

  return (
    <SceneBackground file={bg.file} mood={bg.mood}>
      <div className="hub-topbar">
        <div className="hub-daytime">
          Day {state.day} · {state.time[0].toUpperCase() + state.time.slice(1)}
        </div>
        <button className="secondary-button" onClick={onOpenJournal}>
          Journal
        </button>
      </div>

      {state.time === "night" ? (
        <NightView state={state} onSleep={sleepUntilMorning} />
      ) : (
        <DayView
          state={state}
          onBark={playBark}
          onChooseActivity={chooseActivity}
          onGoEvening={goEvening}
          onSettleForNight={state.day === 5 ? finalNight : settleForNight}
        />
      )}
    </SceneBackground>
  );
}

function DayView({
  state,
  onBark,
  onChooseActivity,
  onGoEvening,
  onSettleForNight,
}: {
  state: GameState;
  onBark: (id: string) => void;
  onChooseActivity: (option: ActivityOption) => void;
  onGoEvening: () => void;
  onSettleForNight: () => void;
}) {
  return (
    <>
      <div className="cat-grid">
        {CATS.map((cat) => (
          <CatToken
            key={cat.id}
            cat={cat}
            met={state.metCats.includes(cat.id)}
            onClick={() => onBark(cat.id)}
          />
        ))}
      </div>

      <div className="hub-bottom">
        {state.time === "evening" ? (
          <EveningControls day={state.day} onSettleForNight={onSettleForNight} />
        ) : !state.activityDoneToday ? (
          <MorningActivity day={state.day} state={state} onChoose={onChooseActivity} />
        ) : (
          <button className="primary-button" onClick={onGoEvening}>
            <PawIcon /> Let evening fall
          </button>
        )}
      </div>
    </>
  );
}

function EveningControls({ day, onSettleForNight }: { day: number; onSettleForNight: () => void }) {
  return (
    <button className="primary-button" onClick={onSettleForNight}>
      <PawIcon /> {day === 5 ? "Head back to your nest" : "Settle in for the night"}
    </button>
  );
}

function MorningActivity({
  day,
  state,
  onChoose,
}: {
  day: number;
  state: GameState;
  onChoose: (option: ActivityOption) => void;
}) {
  if (day >= 1 && day <= 3) {
    const script = DAY_SCRIPTS.find((d) => d.day === day)!;
    return (
      <div className="activity-panel">
        {script.morningLines.map((l, i) => (
          <p key={i} className="activity-narration">
            {l.text}
          </p>
        ))}
        <ChoiceList
          prompt={script.prompt}
          options={script.options}
          onChoose={(id) => onChoose(script.options.find((o) => o.id === id)!)}
        />
      </div>
    );
  }

  if (day === 4) {
    return (
      <div className="activity-panel">
        {DAY4_INTRO.map((l, i) => (
          <p key={i} className="activity-narration">
            {l.text}
          </p>
        ))}
        <ChoiceList
          prompt={DAY4_PROMPT}
          options={DAY4_CHOICES}
          onChoose={(id) => onChoose(DAY4_CHOICES.find((o) => o.id === id)!)}
        />
      </div>
    );
  }

  if (day === 5) {
    const best = bestCatId(state);
    const cat = best ? CAT_BY_ID[best] : null;
    const name = cat?.name ?? "someone in the Hollow";
    const option: ActivityOption = {
      id: "day5-callback",
      label: `Spend a quiet moment with ${name}`,
      hint: "",
      lines: cat
        ? [
            {
              text: `You end up spending a quiet afternoon with ${cat.name}. They've clearly noticed, these last few days, that you keep coming back to them.`,
            },
            { speaker: cat.name, text: "You're not really a stranger anymore, are you?" },
          ]
        : [{ text: "You spend a quiet, ordinary afternoon around camp." }],
      relDelta: cat ? { [cat.id]: { affection: 1, comfort: 1 } } : undefined,
    };
    return (
      <div className="activity-panel">
        {DAY5_MORNING.map((l, i) => (
          <p key={i} className="activity-narration">
            {l.text}
          </p>
        ))}
        <ChoiceList prompt="How do you spend the day?" options={[option]} onChoose={() => onChoose(option)} />
      </div>
    );
  }

  return null;
}

function NightView({ state, onSleep }: { state: GameState; onSleep: () => void }) {
  return (
    <div className="night-view">
      <p className="activity-narration">
        The Hollow has gone quiet. Everyone's settled in for the night — Snowfall included, though
        you notice he's the last to stop moving.
      </p>
      <ul className="sleeping-list">
        {CATS.filter((c) => state.metCats.includes(c.id)).map((c) => (
          <li key={c.id}>{c.name}</li>
        ))}
      </ul>
      <button className="primary-button" onClick={onSleep}>
        <PawIcon /> Sleep until morning
      </button>
    </div>
  );
}
