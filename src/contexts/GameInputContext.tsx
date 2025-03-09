import React, { createContext, useContext, useState } from "react";

// Define the context type (optional but recommended)
export interface GameInputContextType {
  rewardMatrix: number[][][];
  setRewardMatrixCallback: (matrix: number[][][]) => void;
}

// Create the context with a default value (null or default object)
export const GameInputContext = createContext<GameInputContextType>({
  rewardMatrix: [],
  setRewardMatrixCallback: () => {},
});
