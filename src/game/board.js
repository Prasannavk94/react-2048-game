import { BOARD_SIZE, TILE_2_PROBABILITY, TILE_2, TILE_4 } from '../constants';

export const createEmptyBoard = () => {
    return Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(0));
};

export const findEmptyCells = (board) => {
    const emptyCells = [];
    for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
            if (board[i][j] === 0) {
                emptyCells.push({ row: i, col: j });
            }
        }
    }
    return emptyCells;
};

export const addRandomTile = (board) => {
    const emptyCells = findEmptyCells(board);
    if (emptyCells.length === 0) return;
    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const tileValue = Math.random() < TILE_2_PROBABILITY ? TILE_2 : TILE_4;
    board[randomCell.row][randomCell.col] = tileValue;
};

export const initializeBoard = () => {
    const newBoard = createEmptyBoard();
    addRandomTile(newBoard);
    addRandomTile(newBoard);
    return newBoard;
};


