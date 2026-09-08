import type { GameState } from "../types";
import { CAT_BY_ID } from "../data/cats";
import { describeRelationship } from "../systems/relationships";
import { SceneBackground } from "../components/SceneBackground";
import { PawIcon } from "../components/PawIcon";

interface Props {
  state: GameState;
  onRestart: () => void;
}

export function EndScreen({ state, onRestart }: Props) {
  const metCount = state.metCats.length;
  const closest = [...state.metCats]
    .sort((a, b) => {
      const ra = state.relationships[a];
      const rb = state.relationships[b];
      return (rb.affection + rb.trust) - (ra.affection + ra.trust);
    })
    .slice(0, 3);

  return (
    <SceneBackground file="Background-hollow-dusk.png" mood="dusk">
      <div className="end-panel">
        <h1>End of the Slice</h1>
        <p>
          Five days in, and the Hollow has quietly become home. This is where the vertical slice
          ends — there's no more scripted content past here yet.
        </p>
        <p className="end-stat">You met {metCount} of the Hollow's 20 cats.</p>
        {closest.length > 0 && (
          <div className="end-closest">
            <h3>You grew closest to:</h3>
            <ul>
              {closest.map((id) => (
                <li key={id}>
                  <strong>{CAT_BY_ID[id].name}</strong> — {describeRelationship(state.relationships[id])}
                </li>
              ))}
            </ul>
          </div>
        )}
        <button className="primary-button" onClick={onRestart}>
          <PawIcon /> Play again
        </button>
      </div>
    </SceneBackground>
  );
}
