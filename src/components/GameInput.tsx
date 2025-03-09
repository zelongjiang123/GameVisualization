import React, { useContext, useState } from "react";
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
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        maxWidth: "300px",
        margin: "auto",
      }}
    >
      {context.rewardMatrix.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px",
              border: "1px solid black",
              minWidth: "80px",
              textAlign: "center",
            }}
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
