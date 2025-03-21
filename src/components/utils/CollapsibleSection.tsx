import { useState } from "react";
import "./CollapsibleSection.less";

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="collapsible-container">
      {/* Clickable Header */}
      <div className="collapsible-header" onClick={() => setIsOpen(!isOpen)}>
        <strong>{title}</strong>
        <span className={`arrow ${isOpen ? "open" : ""}`}>&#9660;</span>
      </div>

      {/* Collapsible Content */}
      <div className={`collapsible-content ${isOpen ? "show" : ""}`}>
        {children}
      </div>
    </div>
  );
};

export default CollapsibleSection;
