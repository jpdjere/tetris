// 1. GRID 8 * 20
// 2. SHAPES
// 3. MOVEMENT - LEFT RIGHT
// 4. COLLISION DETECTION
// 5. TICK
// 6. FORM ROW - POINTS
// 7. LOSING MECHANISM
// 8. WINNING MECHANISM

import styles from "@/styles/Home.module.css";
import { useEffect } from "react";

// const useCalculatedGrid = () => {
//   const SHAPES = [
//     [1, 1, 1, 1],
//     [[0, 1, 0]
//   ]
// }

const useRepresentionalGrid = (grid) => {
  return grid.reduce((acc, current, index) => {
    const rowIndex = (index - (index % 8)) / 8;
    if (!acc[rowIndex]) {
      acc[rowIndex] = [current];
    } else {
      acc[rowIndex].push(current);
    }
    return acc;
  }, []);
};

const useGridWithPiece = (grid) => {
  const newGrid = Array.from(grid);
  const SHAPES = [
    [0, 1, 2, 3],
    [0, 1, 2, 9],
  ];

  const randomIndex = Math.floor(Math.random() * SHAPES.length);
  const randomShape = SHAPES[randomIndex];
  randomShape.forEach((cell) => {
    newGrid[cell] = { fill: 1, blocked: false };
  });

  return newGrid;
};

const handleKeydown = (e) => {
  if (e.key === "ArrowRight") {
  }
};

class TetrisBoard {
  constructor() {
    this.grid = Array.from({ length: 160 }).fill({ fill: 0, blocked: false });
  }

  getGrid() {
    return this.grid;
  }

  moveBlocks(direction) {
    if (direction === "down") {
      this.grid = this.grid.map((cell) => cell + 8);
    } else if (direction === "right") {
      this.grid = this.grid.map((cell) => cell + 1);
    } else if (direction === "left") {
      this.grid = this.grid.map((cell) => cell - 1);
    }
  }
}

const tetrisBoard = new TetrisBoard();

export const Tetris = () => {
  const gridWithPiece = useGridWithPiece(tetrisBoard.getGrid());

  const gridByRows = useRepresentionalGrid(gridWithPiece);

  console.log(gridWithPiece);
  console.log(gridByRows);

  useEffect(() => {
    document.addEventListener("keydown", handleKeydown);
  });

  return (
    <div>
      {gridByRows.map((row, i) => (
        <Row row={gridByRows[i]} key={i} />
      ))}
    </div>
  );
};

const Row = ({ row }) => {
  {
    return (
      <div className={`${styles.row}`}>
        {row.map((cell, i) => {
          return <Cell cell={cell} key={Math.random()} />;
        })}
      </div>
    );
  }
};

const Cell = ({ cell }) => {
  return (
    <div className={`${styles.cell} ${cell.fill ? styles.white : ""}`}></div>
  );
};
