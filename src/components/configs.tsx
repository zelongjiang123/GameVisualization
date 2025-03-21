export interface Arrow {
    fromRow: number;
    fromCol: number;
    toRow: number;
    toCol: number;
    probability?: number;
}

export const player1Color = "red";
export const player2Color = "blue";

export type StrategiesGivenOpponentPosition = {
    opponentPos: number[],
    strategies: Arrow[],
}

export type Strategy = {
    position: number[];
    ratios: number[];
}

export type HighlightCell = {
  color: string;
  row: number;
  col: number;
}

export interface JointStrategy {
    positions: number[][],
    transitions: {positions: number[], nextPositions: number[], probability: number}[][]
}

export type GameType = "Zero Sum" | "General Sum";