export const getAllCellsNotAgainstRightBorder = (activeCells) =>
  activeCells.every((cell) => {
    const indexInRow = cell.index % 8;
    return indexInRow < 7;
  });

export const getAllCellsHaveNoBlockedPiecesToTheirRight = (activeCells, grid) =>
  activeCells.every(
    // Is the next cell to the right blocked? If checking the border,
    // the previous check allCellsNotAgainstRightBorder will already be false,
    // so no need to correct his calculation
    (cell) => {
      const safeCell = Math.min(cell.index + 1, grid.length - 1);

      return !grid[safeCell].blocked;
    }
  );

export const getAllCellsNotAgainstLeftBorder = (activeCells) =>
  activeCells.every((cell) => {
    const indexInRow = cell.index % 8;
    return indexInRow > 0;
  });

export const getAllCellsHaveNoBlockedPiecesToTheirLeft = (activeCells, grid) =>
  activeCells.every(
    // Is the next cell to the right blocked? If checking the border,
    // the previous check allCellsNotAgainstRightBorder will already be false,
    // so no need to correct his calculation
    (cell) => !grid[Math.max(0, cell.index - 1)].blocked
  );

export const getAllCellsNotAgainstBottomBorder = (activeCells) =>
  activeCells.every((cell) => {
    return cell.index < 152;
  });

export const getAllCellsHaveNoBlockedPiecesBelow = (activeCells, grid) =>
  activeCells.every(
    // Is the next cell to the right blocked? If checking the border,
    // the previous check allCellsNotAgainstRightBorder will already be false,
    // so no need to correct his calculation
    (cell) => !grid[Math.min(cell.index + 8, 159)].blocked
  );
