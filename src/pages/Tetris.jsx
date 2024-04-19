// 1. GRID 8 * 20
// 2. SHAPES
// 3. MOVEMENT - LEFT RIGHT
// 4. COLLISION DETECTION
// 5. TICK
// 6. FORM ROW - POINTS
// 7. LOSING MECHANISM
// 8. WINNING MECHANISM

import styles from "@/styles/Home.module.css";
import { useEffect, useState, useCallback } from "react";

import { getAllCellsNotAgainstRightBorder,
  getAllCellsHaveNoBlockedPiecesToTheirRight, getAllCellsHaveNoBlockedPiecesBelow, getAllCellsHaveNoBlockedPiecesToTheirLeft, getAllCellsNotAgainstBottomBorder, getAllCellsNotAgainstLeftBorder } from "./utils";

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

const SHAPES = [
  // [0, 1, 2, 3],
  // [0, 1, 2, 9],
  [0,1,8,9]
  // [0]
  // [158, 159],
  // [0, 1, 2, 9].map(i => i + 3),
];
class TetrisBoard {
  constructor() {
    this.grid = Array.from({ length: 160 })
      .fill({ fill: 0, blocked: false })
      .map((cell, i) => ({ ...cell, index: i }));
    // this.grid[141] = { fill: 1, blocked: true, index: 141 };
    this.grid[19] = { fill: 1, blocked: true, index: 19 };
    this.grid[54] = { fill: 1, blocked: true, index: 54 };
    // this.grid[152] = { fill: 1, blocked: true, index: 152 };
    this.grid[154] = { fill: 1, blocked: true, index: 154 };
    this.grid[155] = { fill: 1, blocked: true, index: 155 };
    this.grid[156] = { fill: 1, blocked: true, index: 156 };
    this.grid[157] = { fill: 1, blocked: true, index: 157 };
    this.grid[158] = { fill: 1, blocked: true, index: 158 };
    this.grid[159] = { fill: 1, blocked: true, index: 159 };
    this.addShape();
    
  }

  getGrid() {
    return this.grid;
  }

  addShape() {
    const randomIndex = Math.floor(Math.random() * SHAPES.length);
    const randomShape = SHAPES[randomIndex];
    randomShape.forEach((cell) => {
      this.grid[cell] = { fill: 1, blocked: false, index: cell };
    });
  }

  checkEndTurn() {
    const activeCells = this.grid.filter(
      (cell) => cell.fill && !cell.blocked
    );

    const anyPieceBlocked = 
      !getAllCellsHaveNoBlockedPiecesBelow(activeCells, this.grid) ||
      !getAllCellsNotAgainstBottomBorder(activeCells);

    if(anyPieceBlocked) {
      activeCells.forEach(cell => {
        this.grid[cell.index] = {...cell, blocked: true}
      })

      this.endTurn();
      this.addShape();
    }

  }

  endTurn() {
    for(let i = 0; i <= 152 ; i = i + 8) {
      const row = this.grid.slice(i, i + 8);
      const everyCellInRowIsFilled = row.every(cell => cell.fill);

      if(everyCellInRowIsFilled) {
        // Remove line
        row.forEach(cell => {
          this.grid[cell.index] = {fill: 0, blocked: false, index: cell.index}
        })

        // Move all blocks above this row down. All cells from first 
        // until the first cell of the row we just removed (not including)
        const cellsToPullDown = this.grid.slice(0, row[0].index)

        cellsToPullDown.sort((a,b) => b.index - a.index).forEach(cell => {
          this.grid[cell.index + 8] = {...this.grid[cell.index], index: cell.index + 8};
        })


      }

    }
  }

  moveBlocks(direction) {
    const activeCells = this.grid.filter(
      (cell) => cell.fill && !cell.blocked
    );
    if (direction === "right") {
      // Check all unblocked cells. If any of them has a cell to its right that:
      // 1. goes over the right border
      // 2. collides against a blocked cell
      // then do nothing
      // Otherwise, move all unblocked cells to the right

      const allCellsNotAgainstRightBorder = getAllCellsNotAgainstRightBorder(activeCells);
      const allCellsHaveNoBlockedPiecesToTheirRight = getAllCellsHaveNoBlockedPiecesToTheirRight(activeCells, this.grid)

      if (
        allCellsNotAgainstRightBorder &&
        allCellsHaveNoBlockedPiecesToTheirRight
      ) {
        activeCells.sort((a, b) => b.index - a.index).forEach(cell => {
          this.grid[cell.index + 1] = {fill: 1, blocked: false, index: cell.index + 1};
          this.grid[cell.index] = {fill: 0, blocked: false, index: cell.index}
        })
   
      }

    } else if (direction === "left") {
      const allCellsNotAgainstLeftBorder = getAllCellsNotAgainstLeftBorder(activeCells)
      const allCellsHaveNoBlockedPiecesToTheirLeft = getAllCellsHaveNoBlockedPiecesToTheirLeft(activeCells, this.grid);

      if (
        allCellsNotAgainstLeftBorder &&
        allCellsHaveNoBlockedPiecesToTheirLeft
      ) {
        activeCells.forEach(cell => {
          this.grid[cell.index - 1] = {fill: 1, blocked: false, index: cell.index - 1};
          this.grid[cell.index] = {fill: 0, blocked: false, index: cell.index}
        })
      }
      
    } else if (direction === "down") {
      const allCellsNotAgainstBottomBorder = getAllCellsNotAgainstBottomBorder(activeCells);
      const allCellsHaveNoBlockedPiecesBelow = getAllCellsHaveNoBlockedPiecesBelow(activeCells, this.grid);

      if (
        allCellsNotAgainstBottomBorder &&
        allCellsHaveNoBlockedPiecesBelow
      ) {
        activeCells.sort((a,b) => b.index - a.index).forEach(cell => {
          this.grid[cell.index + 8] = {fill: 1, blocked: false, index: cell.index + 8};
          this.grid[cell.index] = {fill: 0, blocked: false, index: cell.index}
        })
      }



    }
  }
}

const tetrisBoard = new TetrisBoard();


const handleKeypress = (e) => {
  if (e.key === "ArrowRight") {
    tetrisBoard.moveBlocks("right");
  }
  if (e.key === "ArrowLeft") {
    tetrisBoard.moveBlocks("left");
  }
  if (e.key === "ArrowDown") {
    tetrisBoard.moveBlocks("down");
  }
};


export const Tetris = () => {
  const gridByRows = useRepresentionalGrid(tetrisBoard.getGrid());

  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      handleKeypress(e)
      forceUpdate();
    });

    return () => document.removeEventListener('keydown', () => {});
  }, []);

  // TICK
  useEffect(() => {
    const interval = setInterval(() => {
      tetrisBoard.moveBlocks("down");
      tetrisBoard.checkEndTurn();
      // tetrisBoard.addShape();
      forceUpdate();
    }, 1000)

    return () => clearInterval(interval)
  }, [])

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
    <div className={`${styles.cell} ${cell.fill ? styles.white : ""}`}>
      {cell.index}
    </div>
  );
};
