import { useMemo, useState } from "react";
import "./App.css";
import {
  boad3X3,
  Boad3X3,
  Cell,
  Player,
  Result,
  SquareIds,
  winningCombination,
} from "./types";

function App() {
  let player1: Player = "X",
    player2: Player = "O";

  const [squareIdOHistory, setSquareIdOHistory] = useState<SquareIds[]>([]);
  const [selectedIds, setSelectedIds] = useState<SquareIds | undefined>(
    undefined
  );
  const [squareIdXHistory, setSquareIdXHistory] = useState<SquareIds[]>([]);
  const [boad, setBoad] = useState(boad3X3);
  const [combination, setCombination] = useState<Result>({
    combinations: null,
    gameOver: false,
    player: null,
  });
  const [moveCount, setMoveCount] = useState(0);

  const player = useMemo(() => {
    // if (combination?.gameOver === true) return null;
    return moveCount % 2 === 0 ? player1 : player2;
    // }
  }, [moveCount]);
  console.log(player, moveCount);

  const getFlatBoad = (boad: Boad3X3): Player[] => {
    return boad.flat().map((cell) => cell.value);
  };

  // const gameValidation = (boad: Boad3X3): boolean => {
  //   const flatBoad = getFlatBoad(boad);
  //   return winningCombination.some((combination) => {
  //     return combination.every((index) => {
  //       return flatBoad[index] === player;
  //     });
  //   });
  // };

  const gameValidation = (boad: Boad3X3): Result => {
    const flatBoad = getFlatBoad(boad);
    for (let combinations of winningCombination) {
      if (
        combinations.every((ePossibility) => flatBoad[ePossibility] === player)
      )
        return { combinations, gameOver: true, player };
    }
    return { combinations: null, gameOver: false, player };
  };

  const handleBoard = (id: SquareIds) => {
    if (combination?.gameOver === true) return;
    setBoad((prev) => {
      let rowIndex = Math.floor(Number(id) / 3);
      let colIndex = Number(id) % 3;
      let cell = prev[rowIndex][colIndex];
      if (cell.value || combination?.gameOver === true) return prev;

      const updateBoad = prev.map((row, rIdx) =>
        row.map((cell, cIdx) =>
          rIdx === rowIndex && cIdx === colIndex
            ? { ...cell, value: player }
            : cell
        )
      );
      if (moveCount >= 4) {
        const winningCombinations = gameValidation(updateBoad);
        if (winningCombinations) {
          setCombination(winningCombinations);
        }
      }
      return updateBoad;
    });
    setMoveCount((prev) => prev + 1);
    setSelectedIds(id);
    moveCount % 2 === 0
      ? setSquareIdXHistory((prev) => [id, ...prev])
      : setSquareIdOHistory((prev) => [id, ...prev]);
  };
  return (
    <>
      <div className="container">
        {` ${
          combination?.gameOver === true
            ? `Winner is: ${combination?.player}`
            : ""
        } ${moveCount===0 ? "Start Game":""}`}
        <div className="squareLayout">
          {(boad || []).map((boad) =>
            (boad || []).map((square) => {
              const combo = combination?.combinations?.includes(
                Number(square?.id) ?? false
              );
              return (
                <div
                  key={square?.id}
                  className={`square ${combo ? "green" : ""}`}
                  onClick={() => {
                    handleBoard(square?.id);
                  }}
                >
                  <span
                    className={`squareValue ${
                      square?.value === "X" ? "blue" : "pink"
                    }`}
                  >
                    {square?.value}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}

export default App;
