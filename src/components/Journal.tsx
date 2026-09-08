import type { GameState } from "../types";
import { CAT_BY_ID } from "../data/cats";
import { describeRelationship } from "../systems/relationships";

interface Props {
  state: GameState;
  onClose: () => void;
}

export function Journal({ state, onClose }: Props) {
  return (
    <div className="journal-overlay" onClick={onClose}>
      <div className="journal-panel" onClick={(e) => e.stopPropagation()}>
        <div className="journal-header">
          <h2>Journal</h2>
          <button className="close-button" onClick={onClose} aria-label="Close journal">
            ✕
          </button>
        </div>

        <section>
          <h3>{state.playerName || "You"}</h3>
          <p className="journal-meta">
            Day {state.day} · {state.time[0].toUpperCase() + state.time.slice(1)}
          </p>
        </section>

        <section>
          <h3>Cats you've met</h3>
          {state.metCats.length === 0 && <p className="journal-empty">No one yet.</p>}
          <ul className="journal-cats">
            {state.metCats.map((id) => {
              const cat = CAT_BY_ID[id];
              if (!cat) return null;
              return (
                <li key={id}>
                  <strong>{cat.name}</strong>
                  <span>{describeRelationship(state.relationships[id])}</span>
                </li>
              );
            })}
          </ul>
        </section>

        <section>
          <h3>Things you've learned</h3>
          {state.journal.length === 0 && <p className="journal-empty">Nothing written down yet.</p>}
          <ul className="journal-facts">
            {state.journal.map((fact, i) => (
              <li key={i}>{fact}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
