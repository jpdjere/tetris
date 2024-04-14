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

const handleKeydown = (e) => {
  if (e.key === "ArrowRight") {
    console.log(e)
    tetrisBoard.addShape()
  }
};

const SHAPES = [
  [0, 1, 2, 3],
  [0, 1, 2, 9],
];
class TetrisBoard {

  constructor() {
    this.grid = Array.from({ length: 160 }).fill({ fill: 0, blocked: false });
    this.addShape()
  }

  getGrid() {
    return this.grid;
  }

  addShape() {
    const randomIndex = Math.floor(Math.random() * SHAPES.length);
    const randomShape = SHAPES[randomIndex];
    randomShape.forEach((cell) => {
      this.grid[cell] = { fill: 1, blocked: false };
    });
  }

  moveBlocks(direction) {
    if (direction === "down") {
      this.grid = this.grid.map((cell) => cell + 8);
    } else if (direction === "right") {
      this.grid = this.grid.map((cell) => cell + 1);
    } else if (direction === "right") {
      this.grid = this.grid.map((cell) => cell + 1);
    }
  }
}

const tetrisBoard = new TetrisBoard();

export const Tetris = () => {
  const gridByRows = useRepresentionalGrid(tetrisBoard.getGrid());

  console.log(gridByRows);

  useEffect(() => {
    document.addEventListener("keydown", handleKeydown);
  }, []);

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
