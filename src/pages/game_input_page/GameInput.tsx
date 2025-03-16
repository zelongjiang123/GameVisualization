import React, { useContext, useState } from "react";
import "./GameInput.less"
import { GameInputContext } from "../../contexts/GameInputContext";
import CollapsibleSection from "../../components/CollapsibleSection";

interface GameInputProps {
  onFetchData: () => void,
};


const GameInput: React.FC<GameInputProps> = ({
  onFetchData,
}) => {

  const context = useContext(GameInputContext);

  const handleInputChange = (row: number, col: number, index: number, value: string) => {
    const numericValue = value ? parseInt(value) : 0;
    const newMatrix = context.rewardMatrix.map((r, rIdx) =>
      r.map((c, cIdx) =>
        rIdx === row && cIdx === col ? [index === 0 ? numericValue : c[0], index === 1 ? numericValue : c[1]] : c
      )
    );
    context.setRewardMatrixCallback(newMatrix);
  };

  const handleCrashValueChange = (value: string) => {
    const numericValue = value ? parseInt(value) : 0;
    context.setCrashValueCallback(numericValue);
  }

  const handleDiscountRateChange = (value: string) => {
    let numericValue = value ? parseInt(value) : 0;
    if(numericValue >= 1){
      numericValue = 0.9;
    }
    context.setDiscountRateCallback(numericValue);
  }

  return (
    <CollapsibleSection title="Game Input">
      <div className="game-input">
        <div className="game-input-textbox-container">
          <div className="game-input-textbox">
            <label>Crash Value</label>
            <input
              type="number"
              step="1"
              value={context.crashValue}
              onChange={(e) => handleCrashValueChange(e.target.value)}
              style={{ width: "40px", textAlign: "center" }}
            />
          </div>

          <div className="game-input-textbox">
            <label>Discount Rate</label>
            <input
              type="number"
              step="1"
              value={context.discountRate}
              onChange={(e) => handleDiscountRateChange(e.target.value)}
              style={{ width: "40px", textAlign: "center" }}
            />
          </div>
        </div>
        <label>Reward Matrix</label>
        <div className="game-input-container">
          {context.rewardMatrix.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className="game-input-content"
              >
                <input
                  type="number"
                  step="1"
                  value={cell[0]}
                  onChange={(e) => handleInputChange(rowIndex, colIndex, 0, e.target.value)}
                  style={{ width: "30px", textAlign: "center" }}
                />
                {" , "/* Comma separator */}
                <input
                  type="number"
                  step="1"
                  value={cell[1]}
                  onChange={(e) => handleInputChange(rowIndex, colIndex, 1, e.target.value)}
                  style={{ width: "30px", textAlign: "center" }}
                />
              </div>
            ))
          )}
        </div>

        <button onClick={()=>{onFetchData();}}>Fetch Data</button>
      </div>
    </CollapsibleSection>
  );
};

export default GameInput;
