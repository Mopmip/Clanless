export type AgeGroup = "kit" | "learner" | "adult" | "elder";

export type TimeBlock = "morning" | "day" | "evening" | "night";

export type Phase = "start" | "intro" | "hub" | "activity" | "end";

export interface Cat {
  id: string;
  name: string;
  role: string;
  age: AgeGroup;
  traits: string[];
  bio: string;
  accent: string; // CSS color used for the placeholder token + trim
  initial: string;
  barks: string[];
}

export interface Relationship {
  affection: number;
  trust: number;
  respect: number;
  comfort: number;
}

export type Relationships = Record<string, Relationship>;

export interface GameState {
  playerName: string;
  nameMode: "remember" | "choose" | "unknown" | null;
  day: number; // 0 = Found, 1-5 playable days, 6 = finished
  time: TimeBlock;
  phase: Phase;
  introStep: number;
  relationships: Relationships;
  metCats: string[];
  journal: string[];
  flags: Record<string, boolean>;
  activityDoneToday: boolean;
  eveningSeenToday: boolean;
  lastBark: Record<string, number>;
}
