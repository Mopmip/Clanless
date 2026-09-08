import type { GameState, TimeBlock } from "./types";
import type { ActivityOption } from "./data/script";
import { adjust } from "./systems/relationships";

export function newGame(): GameState {
  return {
    playerName: "",
    nameMode: null,
    day: 0,
    time: "morning",
    phase: "intro",
    introStep: 0,
    relationships: {},
    metCats: [],
    journal: [],
    flags: {},
    activityDoneToday: false,
    eveningSeenToday: false,
    lastBark: {},
  };
}

export type Action =
  | { type: "LOAD"; state: GameState }
  | { type: "INTRO_NEXT" }
  | { type: "SET_NAME"; mode: "remember" | "choose" | "unknown"; name: string }
  | { type: "MEET_CAT"; id: string }
  | { type: "CHOOSE_ACTIVITY"; option: ActivityOption }
  | { type: "GO_EVENING" }
  | { type: "GO_NIGHT" }
  | { type: "NEXT_DAY" }
  | { type: "FINISH" };

export function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case "LOAD":
      return action.state;

    case "INTRO_NEXT": {
      const nextStep = state.introStep + 1;
      return { ...state, introStep: nextStep };
    }

    case "SET_NAME":
      return { ...state, nameMode: action.mode, playerName: action.name };

    case "MEET_CAT": {
      if (state.metCats.includes(action.id)) return state;
      return {
        ...state,
        metCats: [...state.metCats, action.id],
        relationships: adjust(state.relationships, action.id, { affection: 1 }),
      };
    }

    case "CHOOSE_ACTIVITY": {
      let relationships = state.relationships;
      let metCats = state.metCats;
      const journal = [...state.journal];
      const flags = { ...state.flags };

      if (action.option.relDelta) {
        for (const [catId, delta] of Object.entries(action.option.relDelta)) {
          relationships = adjust(relationships, catId, delta);
          if (!metCats.includes(catId)) metCats = [...metCats, catId];
        }
      }
      if (action.option.flag) flags[action.option.flag] = true;
      if (action.option.fact && !journal.includes(action.option.fact)) {
        journal.push(action.option.fact);
      }

      return {
        ...state,
        relationships,
        metCats,
        journal,
        flags,
        activityDoneToday: true,
      };
    }

    case "GO_EVENING":
      return { ...state, time: "evening" as TimeBlock };

    case "GO_NIGHT":
      return { ...state, time: "night" as TimeBlock, eveningSeenToday: true };

    case "NEXT_DAY":
      return {
        ...state,
        day: state.day + 1,
        time: "morning" as TimeBlock,
        activityDoneToday: false,
        eveningSeenToday: false,
      };

    case "FINISH":
      return { ...state, phase: "end" };

    default:
      return state;
  }
}

export function bestCatId(state: GameState): string | null {
  let best: string | null = null;
  let bestScore = -Infinity;
  for (const [id, rel] of Object.entries(state.relationships)) {
    const score = rel.affection + rel.trust * 0.5;
    if (score > bestScore) {
      bestScore = score;
      best = id;
    }
  }
  return best;
}
