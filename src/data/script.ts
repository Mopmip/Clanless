import type { Relationship } from "../types";

export interface SceneLine {
  speaker?: string;
  text: string;
}

export type RelDeltaMap = Record<string, Partial<Relationship>>;

export interface IntroBeat {
  id: string;
  lines?: SceneLine[];
  nameChoice?: boolean;
}

// DAY 0 — "Found". Scenes 0.1 through 0.4 from 05_First_5_Days_Prototype_Script,
// condensed into a linear sequence of beats the player clicks through.
export const INTRO_BEATS: IntroBeat[] = [
  {
    id: "0.1a",
    lines: [
      { text: "You wake at the edge of the territory. Woods, cold ground, and no memory of how you got here." },
      { text: "No prophecy. No voice in your head. Just the ordinary, unglamorous fact of not knowing." },
    ],
  },
  {
    id: "0.1b",
    lines: [
      { text: "Three cats step out of the treeline. A pale, sharp-eyed tom in front; a big, quiet tom placing himself half between you and the others; a smaller she-cat hanging back, watching you far too closely." },
      { speaker: "Rookshade", text: "You're not from around here. And you're not doing a very good job of hiding that you're confused." },
      { speaker: "Wren", text: "That's not an act. Look at their eyes." },
      { speaker: "Redwood", text: "..." },
    ],
  },
  { id: "0.1-namechoice", nameChoice: true },
  {
    id: "0.1c",
    lines: [
      { speaker: "Rookshade", text: "All right. Whatever you are, you're not dangerous, and you're not going to survive out here alone." },
      { speaker: "Redwood", text: "We're not leaving them." },
      { speaker: "Wren", text: "...come on. It's this way." },
    ],
  },
  {
    id: "0.2a",
    lines: [
      { text: "The trees open into a hollow — sheltered, sun-warmed, and already full of noise and motion. This place existed long before you arrived." },
      { speaker: "Marigold", text: "We were NOT lost." },
      { speaker: "Lavender", text: "We did get lost. I simply knew where we were." },
    ],
  },
  {
    id: "0.2b",
    lines: [
      { text: "A lanky young tom studiously examines a pebble and does not look up." },
      { speaker: "Moss", text: "Not my problem." },
      { text: "Nearby, a she-cat performs something loud and unnecessary while another watches, delighted, unsurprised." },
      { speaker: "Daisydance", text: "DID YOU SEE THAT—" },
      { speaker: "Honeyglow", text: "I saw it." },
    ],
  },
  {
    id: "0.2c",
    lines: [
      { text: "Three kits notice you at almost the same moment." },
      { speaker: "Minnow", text: "Who's THAT." },
      { speaker: "Lynx", text: "..." },
      { speaker: "Robin", text: "Are you hurt? Where did you come from? Do you remember anything? What's it like not remembering anything—" },
      { speaker: "Briarheart", text: "Robin. Give them space." },
      { text: "Robin takes one exaggerated step back and keeps watching, undeterred." },
    ],
  },
  {
    id: "0.2d",
    lines: [
      { text: "A lean, deadpan tom has been watching the whole scene from a distance, unhurried. He crosses the clearing toward you last, once he's seen enough." },
    ],
  },
  {
    id: "0.3",
    lines: [
      { speaker: "Snowfall", text: "What do you remember?" },
      { text: "Not much. You tell him so." },
      { speaker: "Snowfall", text: "Is anyone looking for you? Hurt anywhere? Going to be a danger to anyone here?" },
      { text: "No, you don't think so, and no. He studies you a moment longer." },
      { speaker: "Snowfall", text: "You can stay tonight." },
      { text: "No ceremony. He's already turning to something else before you can answer." },
    ],
  },
  {
    id: "0.4a",
    lines: [
      { text: "A young she-cat with intense focus examines you, prodding at a sore spot with a directness that isn't quite gentle." },
      { speaker: "Tansy", text: "Does that hurt?" },
      { text: "Yes, unfortunately." },
      { speaker: "Tansy", text: "Good." },
      { speaker: "Fawn", text: "What she means is she's glad it's nothing worse. Her bedside manner needs work." },
      { speaker: "Tansy", text: "The problem was interesting." },
    ],
  },
  {
    id: "0.4b",
    lines: [
      { text: "You're given food and shown to a spare nest near the center of camp. Robin attempts one more round of questioning and is firmly intercepted by Briarheart." },
      { speaker: "Minnow", text: "You're taking the good nest. That was MY nest." },
      { speaker: "Briarheart", text: "Minnow." },
      { speaker: "Minnow", text: "...sorry. I didn't mean it like that. You can have it. It's a good nest, actually. I hope you like it." },
      { text: "The apology is aggressively sincere. You settle in. Tomorrow, the Hollow will still be here — and, apparently, so will you." },
    ],
  },
];

export interface ActivityOption {
  id: string;
  label: string;
  hint: string;
  lines: SceneLine[];
  relDelta?: RelDeltaMap;
  flag?: string;
  fact?: string;
}

export interface DayScript {
  day: number;
  title: string;
  morningLines: SceneLine[];
  prompt: string;
  options: ActivityOption[];
  eveningLines: SceneLine[];
  offscreenEvent?: SceneLine[];
}

export const DAY_SCRIPTS: DayScript[] = [
  {
    day: 1,
    title: "Existing Life",
    morningLines: [
      { text: "Morning in the Hollow. Nobody assigns you a task. Cats go about their routines around you — hunting, grooming, arguing quietly about the prey pile." },
      { text: "You can talk to whoever's nearby, or pick one thing to actually do with your day." },
    ],
    prompt: "What do you do today?",
    options: [
      {
        id: "prey",
        label: "Help with prey and nesting material",
        hint: "Make yourself useful around camp.",
        lines: [
          { text: "You spend the morning hauling moss and sorting the prey pile. Nobody thanks you extravagantly for it — it's just what gets done." },
          { speaker: "Thistle", text: "Not bad. You didn't even stack it wrong." },
        ],
        relDelta: { thistle: { comfort: 2, respect: 1 } },
        fact: "The Hollow shares one prey pile — no ranked feeding order.",
      },
      {
        id: "explore",
        label: "Explore the camp on your own",
        hint: "See how the Hollow is actually laid out.",
        lines: [
          { text: "You wander the edges of camp — sheltered sleeping hollows, a sunning rock, a den that smells of herbs. No rigid dens here; cats sleep wherever they like." },
          { text: "You find Willowstep's favorite basking spot completely by accident, and nearly step on her tail." },
          { speaker: "Willowstep", text: "Graceful. Truly." },
        ],
        relDelta: { willowstep: { affection: 1, comfort: 1 } },
        fact: "There are no assigned dens — cats choose where to sleep.",
      },
      {
        id: "spendtime",
        label: "Spend time with Fawn",
        hint: "See who actually seeks you out.",
        lines: [
          { text: "Fawn finds you before you find her, like she already knew you'd want the company." },
          { speaker: "Fawn", text: "You looked like you needed someone to just... talk to. Not about the amnesia. About anything else." },
          { text: "It's a small, easy conversation. It helps more than you expected." },
        ],
        relDelta: { fawn: { affection: 2, comfort: 2 } },
      },
    ],
    eveningLines: [
      { text: "Dusk. Cats drift back toward the Hollow, eat, groom, talk. Snowfall doesn't say anything, but you notice him quietly counting heads — and yours is one of them, now." },
      { text: "You're still, visibly, a guest. But it's a start." },
    ],
  },
  {
    day: 2,
    title: "Territory",
    morningLines: [
      { text: "Today, someone offers to show you the territory beyond the Hollow." },
    ],
    prompt: "Who do you go with?",
    options: [
      {
        id: "wren",
        label: "Wren — territory guide",
        hint: "Nervous, but she knows every path.",
        lines: [
          { text: "Wren leads you along a ridge trail, naming landmarks under her breath like a checklist that keeps her calm." },
          { speaker: "Wren", text: "That smell's BreezeClan, over the rise. You'll want to remember that scent-line." },
          { text: "You have no idea what BreezeClan is. Your question makes the gap in your memory suddenly, concretely real." },
          { speaker: "Wren", text: "...right. Sorry. I forget you don't know any of this yet." },
        ],
        relDelta: { wren: { trust: 2, comfort: 1 } },
        flag: "day2_wren",
        fact: "BreezeClan territory borders the Hollow to the west.",
      },
      {
        id: "honeydaisy",
        label: "Honeyglow & Daisydance — gathering",
        hint: "Loud, fun, faster than it should be.",
        lines: [
          { text: "Daisydance turns foraging into something like a competition you didn't agree to enter. Honeyglow narrates the whole thing with visible delight." },
          { speaker: "Daisydance", text: "Three herbs, one system of stones, and I only got mildly stuck in a bush." },
          { speaker: "Honeyglow", text: "It was very mild." },
        ],
        relDelta: { daisydance: { affection: 2 }, honeyglow: { affection: 1, comfort: 1 } },
        flag: "day2_honeydaisy",
      },
      {
        id: "redwood",
        label: "Redwood — boundary walk",
        hint: "Quiet, steady, watchful.",
        lines: [
          { text: "Redwood walks the boundary in near silence, only speaking to point out a scent mark or a place where the fence-line of scent needs refreshing." },
          { speaker: "Redwood", text: "You don't have to fill silence around me. Most people relax once they figure that out." },
        ],
        relDelta: { redwood: { trust: 2, comfort: 2 } },
        flag: "day2_redwood",
      },
      {
        id: "briarheart",
        label: "Briarheart — help around camp",
        hint: "Domestic, practical, no-nonsense.",
        lines: [
          { text: "Briarheart puts you to work reinforcing a den wall and doesn't stop talking the entire time — mostly about Firefly, occasionally about you." },
          { speaker: "Briarheart", text: "You listen better than most. That's rarer than it should be." },
        ],
        relDelta: { briarheart: { respect: 2, trust: 1 } },
        flag: "day2_briarheart",
      },
    ],
    eveningLines: [
      { text: "You return with sore paws and a slightly bigger picture of the world — the Hollow is not alone out here. There are other Clans, other borders, and you're only just starting to learn where they are." },
    ],
  },
  {
    day: 3,
    title: "Useful",
    morningLines: [
      { text: "Today you can actually contribute — nothing heroic, just ordinary Hollow life." },
    ],
    prompt: "What do you help with?",
    options: [
      {
        id: "hunt",
        label: "Simple hunt / prey delivery",
        hint: "Put yourself to use.",
        lines: [
          { text: "You manage one clean catch — beginner's luck, mostly — and carry it back for the pile. Small, unglamorous, genuinely useful." },
        ],
        relDelta: { willowstep: { respect: 1 } },
      },
      {
        id: "herbs",
        label: "Help Tansy carry herbs",
        hint: "Tag along on medicine business.",
        lines: [
          { text: "Tansy narrates the entire trip — what each herb does, what it smells like when it's gone bad, why Mallowleaf would disapprove of how you're holding it." },
          { speaker: "Tansy", text: "You're a surprisingly fast learner. Most people's eyes glaze over by now." },
        ],
        relDelta: { tansy: { affection: 1, respect: 2 } },
        fact: "Tansy trains in medicine with ShadeClan's Mallowleaf.",
      },
      {
        id: "missing",
        label: "Find the grans' 'missing' item",
        hint: "Lavender and Marigold insist something's gone.",
        lines: [
          { text: "Lavender insists something vital has vanished. Marigold is fairly sure it hasn't. You find it exactly where Moss quietly moved it — out of the kits' reach." },
          { speaker: "Moss", text: "It was going to end up in Robin's mouth otherwise. You're welcome. Don't tell them it was me." },
        ],
        relDelta: { moss: { trust: 2, affection: 1 } },
      },
      {
        id: "stranger",
        label: "Handle a testy stranger at the border",
        hint: "A small skill check — more than one way through.",
        lines: [
          { text: "A stranger at the border bristles the second you approach. You could push back, talk your way through, or just read the situation and wait." },
          { text: "You choose to wait him out instead of escalating — and it works. He grumbles, backs off, and leaves without incident." },
        ],
        relDelta: { redwood: { respect: 1 }, snowfall: { respect: 1 } },
      },
    ],
    eveningLines: [
      { text: "You get back to a camp that's already slightly different from the one you left." },
    ],
    offscreenEvent: [
      { text: "While you were gone, Oakshade and Thistle got into a very loud, very familiar argument about berry-picking technique. Everyone has an opinion. Nobody has stopped them." },
    ],
  },
];

export const DAY4_CHOICES: ActivityOption[] = [
  {
    id: "ask",
    label: "Ask what happened",
    hint: "Get the story straight.",
    lines: [
      { text: "You ask, directly. Briarheart, mid-fury, actually stops to explain: Oakshade let Firefly try a move that was too advanced and she got a scare, not a scratch — but scared was enough." },
      { speaker: "Briarheart", text: "He knows better. He's supposed to know better." },
    ],
    relDelta: { briarheart: { trust: 1 } },
  },
  {
    id: "side-briarheart",
    label: "Side with Briarheart, no questions asked",
    hint: "Loyalty first, details later.",
    lines: [
      { text: "You back her up without knowing the details. She notices, and it clearly means something to her, even mid-argument." },
      { speaker: "Briarheart", text: "...thank you. That's — thank you." },
    ],
    relDelta: { briarheart: { affection: 2, trust: 1 }, oakshade: { comfort: -1 } },
  },
  {
    id: "ask-oakshade",
    label: "Ask Oakshade his side",
    hint: "Hear the other half.",
    lines: [
      { text: "Oakshade, still bristling, insists Firefly begged him for the harder move and he underestimated how fast it'd go wrong." },
      { speaker: "Oakshade", text: "I'd never let anything actually happen to her. Briarheart knows that. She's just scared, and I'm the nearest thing to yell at." },
    ],
    relDelta: { oakshade: { trust: 1, comfort: 1 } },
  },
  {
    id: "watch-robin",
    label: "Sit beside Robin and watch",
    hint: "Some scenes aren't about you.",
    lines: [
      { text: "You sit with Robin, who is watching the whole spectacle with unhidden fascination." },
      { speaker: "Robin", text: "Grown-ups are SO dramatic." },
      { text: "You can't entirely disagree." },
    ],
    relDelta: { robin: { comfort: 2, affection: 1 } },
  },
  {
    id: "leave",
    label: "Leave it alone",
    hint: "Not every fire needs you standing in it.",
    lines: [
      { text: "You step back and let the Hollow handle its own noise. By evening it's already cooling into an old, familiar argument rather than a real rift." },
    ],
  },
];

export const DAY4_INTRO: SceneLine[] = [
  { text: "You arrive back at camp to raised voices already in progress." },
  {
    text: "Briarheart is furious at Oakshade. Firefly is trying not to laugh. Redwood is very deliberately pretending not to be involved. Robin is watching the whole thing, openly delighted by the drama.",
  },
];

export const DAY4_PROMPT = "What do you do?";

export const DAY5_MORNING: SceneLine[] = [
  { text: "Your fifth morning in the Hollow feels almost ordinary now — which is, itself, strange to notice." },
];

export const FINAL_EVENING: SceneLine[] = [
  { text: "You head back to your sleeping place at dusk and stop in the entrance." },
  { text: "The nest has been remade — fresh moss, a couple of small, deliberate gifts tucked into the edge. Nobody's waiting to see your reaction. Nobody's making it a ceremony." },
  { text: "Someone — you're not even sure who first — mentions tomorrow's plans and simply includes you in them, the way you'd include anyone who already belonged." },
  { text: "No reputation bar filled up. No induction. Just the quiet, accumulated fact of it: you live here now." },
];
