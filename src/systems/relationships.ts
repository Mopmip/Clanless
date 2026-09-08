import type { Relationship, Relationships } from "../types";

export const BLANK_RELATIONSHIP: Relationship = {
  affection: 0,
  trust: 0,
  respect: 0,
  comfort: 0,
};

export function ensure(rels: Relationships, catId: string): Relationships {
  if (rels[catId]) return rels;
  return { ...rels, [catId]: { ...BLANK_RELATIONSHIP } };
}

export function adjust(
  rels: Relationships,
  catId: string,
  delta: Partial<Relationship>,
): Relationships {
  const base = rels[catId] ?? BLANK_RELATIONSHIP;
  const next: Relationship = {
    affection: clamp(base.affection + (delta.affection ?? 0)),
    trust: clamp(base.trust + (delta.trust ?? 0)),
    respect: clamp(base.respect + (delta.respect ?? 0)),
    comfort: clamp(base.comfort + (delta.comfort ?? 0)),
  };
  return { ...rels, [catId]: next };
}

function clamp(n: number): number {
  return Math.max(-10, Math.min(10, n));
}

// Translates hidden numbers into journal-friendly descriptors, per the
// design bible's "translate numbers into descriptors" rule.
export function describeRelationship(rel: Relationship | undefined): string {
  if (!rel) return "A stranger to you.";
  const { affection, trust, respect, comfort } = rel;
  const bits: string[] = [];

  if (affection >= 5) bits.push("fond of you");
  else if (affection >= 2) bits.push("warming up to you");
  else if (affection <= -2) bits.push("wary of you");
  else bits.push("still getting used to you");

  if (trust >= 4) bits.push("trusts you");
  else if (trust <= -2) bits.push("doesn't entirely trust you");

  if (respect >= 4) bits.push("respects your judgment");

  if (comfort >= 4) bits.push("relaxed around you");

  return capitalize(bits.join(", ") + ".");
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
