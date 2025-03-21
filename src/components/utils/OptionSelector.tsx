import { useState } from "react";
import "./OptionSelector.less";

interface OptionSelectorProps {
  options: string[];
  onSelect: (selected: string) => void;
  defaultOption: string;
}

export default function OptionSelector({ options, onSelect, defaultOption }: OptionSelectorProps) {
  const [selected, setSelected] = useState<string>(defaultOption);

  const handleSelect = (option: string) => {
    setSelected(option);
    onSelect(option);
  };

  return (
    <div className="option-selector">
      {options.map((option) => (
        <label key={option} className="option-label">
          <span className="option-text">{option}</span>
          <span
            className={`option-circle ${selected === option ? "selected" : ""}`}
            onClick={() => handleSelect(option)}
          />
        </label>
      ))}
    </div>
  );
}
