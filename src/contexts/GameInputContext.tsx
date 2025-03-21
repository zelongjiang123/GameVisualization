import React, { createContext, useContext, useState } from "react";
import { GameType } from "../components/configs";

// Define the context type (optional but recommended)
export interface GameInputContextType {
  rewardMatrix: number[][][];
  setRewardMatrixCallback: (matrix: number[][][]) => void;
  crashValue: number;
  setCrashValueCallback: (value: number) => void;
  discountRate: number;
  setDiscountRateCallback: (value: number) => void;
  gameType: GameType;
  setGameTypeCallback: (value: GameType) => void;
}

// Create the context with a default value (null or default object)
export const GameInputContext = createContext<GameInputContextType>({
  rewardMatrix: [],
  setRewardMatrixCallback: () => {},
  crashValue: 10,
  setCrashValueCallback: () => {},
  discountRate: 0.9,
  setDiscountRateCallback: () => {},
  gameType: "Zero Sum",
  setGameTypeCallback: () => {},
});
