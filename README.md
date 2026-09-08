# The Hollow — pre-alpha vertical slice

A playable prototype of the character-driven cat life RPG described in the
project's game bible: an amnesiac player wakes near a small, non-Clan cat
community (the Hollow) and, over five in-game days, decides who to spend
time with while the community decides whether to make room for them.

This is the "Prototype scope" from `06_Prototype_Production_and_Code_Plan`
— the first five days, built to prove the hub feels good to click around,
cats feel distinct, and coming home at evening feels earned.

## Running it

```sh
npm install
npm run dev
```

Then open the printed local URL. `npm run build` produces a static
production build in `dist/`.

## What's implemented

- Day 0 "Found" intro sequence (waking at the territory edge, the name
  choice, arrival at the Hollow, meeting Snowfall, the first night).
- A clickable Hollow hub with all 20 named cats from the character bible,
  each with a few personality-flavored barks.
- A day loop (Morning/Day → Evening → Night) with a scripted activity choice
  each day for Days 1–4, taken directly from `05_First_5_Days_Prototype_Script`
  (including the Day 4 group scene and an off-screen event on Day 3).
- A hidden affection/trust/respect/comfort relationship model per cat,
  surfaced in the Journal as qualitative descriptors rather than numbers.
- A Day 5 callback to whichever cat the player grew closest to, and the
  scripted final-evening "you live here now" beat.
- Save/continue via `localStorage`.

Explicitly out of scope for this slice (per the production plan): combat,
hunting minigames, romance mechanics, the character creator, and the
ancient-Clan mystery.

## Art

The game plays entirely on themed CSS/SVG placeholders — no binary art is
checked into this repo. Backgrounds and cat portraits load from
`/public/art/backgrounds/` and `/public/art/cats/` if present, falling back
to the placeholder automatically when a file is missing. See
`public/art/README.md` for the exact filenames expected (they match the
Drive export names 1:1, so dropping in the real art from the project's
Drive folder needs no code changes).

## Project structure

```
src/
  data/       cats.ts (roster), script.ts (intro + day scripts)
  systems/    relationships.ts, saveGame.ts
  components/ DialogueBox, CatToken, ChoiceList, Journal, SceneBackground, PawIcon
  screens/    StartScreen, IntroScreen, HollowScreen, EndScreen
  state.ts    game state + reducer
```
