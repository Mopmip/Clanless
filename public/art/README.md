# Dropping in the real art

The game runs on themed CSS placeholders out of the box. To swap in the real
art from the project's Google Drive folder, export files with these **exact
filenames** (matching the Drive filenames) into these folders — no code
changes needed, the app picks them up automatically:

```
public/art/backgrounds/Background-hollow-day.png
public/art/backgrounds/Background-hollow-dusk.png
public/art/backgrounds/Background-hollow-night.png
public/art/backgrounds/Background-ridge-day.png
public/art/backgrounds/Background-ridge-dusk.png
public/art/backgrounds/Background-ridge-night.png
public/art/backgrounds/Background-den-player.png
public/art/backgrounds/Background-den-warriors.png

public/art/cats/Snowfall.png
public/art/cats/Wren.png
public/art/cats/Rookshade.png
public/art/cats/Redwood.png
public/art/cats/Briarheart.png
public/art/cats/Robin.png
public/art/cats/Tansy.png
public/art/cats/Fawn.png
public/art/cats/Rye.png
public/art/cats/Moss.png
... (one PNG per cat in src/data/cats.ts, named after the "name" field)
```

Each `<CatToken>` requests `/art/cats/<Name>.png` and each `<SceneBackground>`
requests `/art/backgrounds/<file>.png`; if the file 404s it silently falls
back to the painted placeholder, so partial art drops work fine too.
