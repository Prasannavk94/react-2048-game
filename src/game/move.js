import { BOARD_SIZE, DIRECTIONS } from '../constants';
import { addRandomTile } from './board';

const moveAndMergeLine = (line, reverse = false) => {
    const nonZeroValues = line.filter(value => value !== 0);
    if (reverse) nonZeroValues.reverse();

    const mergedValues = [];
    let score = 0;
    let merged = false;

    for (let i = 0; i < nonZeroValues.length; i++) {
        if (i < nonZeroValues.length - 1 && nonZeroValues[i] === nonZeroValues[i + 1]) {
            const mergedValue = nonZeroValues[i] * 2;
            mergedValues.push(mergedValue);
            score += mergedValue;
            merged = true;
            i++;
        } else {
            mergedValues.push(nonZeroValues[i]);
        }
    }

    const newLine = new Array(BOARD_SIZE).fill(0);
    if (reverse) {
        mergedValues.reverse();
        for (let i = 0; i < mergedValues.length; i++) {
            newLine[BOARD_SIZE - 1 - i] = mergedValues[mergedValues.length - 1 - i];
        }
    } else {
        for (let i = 0; i < mergedValues.length; i++) {
            newLine[i] = mergedValues[i];
        }
    }

    const moved = merged || JSON.stringify(line) !== JSON.stringify(newLine);
    return { newLine, moved, score };
};

export const moveTiles = (board, direction, addRandomTileAfterMove = true) => {
    const newBoard = board.map(row => [...row]);
    let totalMoved = false;
    let totalScore = 0;

    switch (direction) {
        case DIRECTIONS.LEFT:
            for (let i = 0; i < BOARD_SIZE; i++) {
                const { newLine, moved, score } = moveAndMergeLine(newBoard[i], false);
                newBoard[i] = newLine;
                if (moved) totalMoved = true;
                totalScore += score;
            }
            break;
        case DIRECTIONS.RIGHT:
            for (let i = 0; i < BOARD_SIZE; i++) {
                const { newLine, moved, score } = moveAndMergeLine(newBoard[i], true);
                newBoard[i] = newLine;
                if (moved) totalMoved = true;
                totalScore += score;
            }
            break;
        case DIRECTIONS.UP:
            for (let j = 0; j < BOARD_SIZE; j++) {
                const column = [];
                for (let i = 0; i < BOARD_SIZE; i++) column.push(newBoard[i][j]);
                const { newLine, moved, score } = moveAndMergeLine(column, false);
                if (moved) totalMoved = true;
                for (let i = 0; i < BOARD_SIZE; i++) newBoard[i][j] = newLine[i];
                totalScore += score;
            }
            break;
        case DIRECTIONS.DOWN:
            for (let j = 0; j < BOARD_SIZE; j++) {
                const column = [];
                for (let i = 0; i < BOARD_SIZE; i++) column.push(newBoard[i][j]);
                const { newLine, moved, score } = moveAndMergeLine(column, true);
                if (moved) totalMoved = true;
                for (let i = 0; i < BOARD_SIZE; i++) newBoard[i][j] = newLine[i];
                totalScore += score;
            }
            break;
        default:
            return { newBoard: board, moved: false, newScore: 0 };
    }

    if (totalMoved && addRandomTileAfterMove) addRandomTile(newBoard);
    return { newBoard, moved: totalMoved, newScore: totalScore };
};


