import { WIN_VALUE, BOARD_SIZE } from '../constants';

export const checkWin = (board, winValue = WIN_VALUE) => {
    return board.some(row => row.includes(winValue));
};

export const hasEmptyCells = (board) => {
    return board.some(row => row.some(cell => cell === 0));
};

export const canMergeAdjacent = (board) => {
    for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE - 1; j++) {
            if (board[i][j] !== 0 && board[i][j] === board[i][j + 1]) {
                return true;
            }
        }
    }
    for (let i = 0; i < BOARD_SIZE - 1; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
            if (board[i][j] !== 0 && board[i][j] === board[i + 1][j]) {
                return true;
            }
        }
    }
    return false;
};

export const checkGameOver = (board) => {
    return !hasEmptyCells(board) && !canMergeAdjacent(board);
};


