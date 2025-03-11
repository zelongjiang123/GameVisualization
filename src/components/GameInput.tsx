import React, { useContext, useState } from "react";
import "./GameInput.less"
import { GameInputContext } from "../contexts/GameInputContext";

const GameInput: React.FC = () => {

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

  return (
    <div className="game-input">
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
  );
};

export default GameInput;
