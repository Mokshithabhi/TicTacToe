export type Square = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
export type SquareIds = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8";

export type Player = "X" | "O" | "Game Over" | null;

export interface Cell {
  square: Square;
  id: SquareIds;
  value: Player;
}

export type Boad3X3 = Cell[][];

export let boad3X3: Boad3X3 = [
  [
    { square: "1", id: "0", value: null },
    { square: "2", id: "1", value: null },
    { square: "3", id: "2", value: null },
  ],
  [
    { square: "4", id: "3", value: null },
    { square: "5", id: "4", value: null },
    { square: "6", id: "5", value: null },
  ],
  [
    { square: "7", id: "6", value: null },
    { square: "8", id: "7", value: null },
    { square: "9", id: "8", value: null },
  ],
];

export const winningCombination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export type Result = {
  combinations: number[]|null;
  gameOver: boolean;
  player:Player
}
