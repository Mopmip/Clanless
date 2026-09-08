interface Option {
  id: string;
  label: string;
  hint?: string;
}

interface Props {
  prompt: string;
  options: Option[];
  onChoose: (id: string) => void;
}

export function ChoiceList({ prompt, options, onChoose }: Props) {
  return (
    <div className="choice-panel">
      <div className="choice-prompt">{prompt}</div>
      <div className="choice-list">
        {options.map((opt) => (
          <button key={opt.id} className="choice-button" onClick={() => onChoose(opt.id)}>
            <span className="choice-label">{opt.label}</span>
            {opt.hint && <span className="choice-hint">{opt.hint}</span>}
          </button>
        ))}
      </div>
    </div>
  );
}
