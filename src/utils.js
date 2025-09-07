// Legacy file: re-export modules to avoid breaking tests/imports during migration
export { initializeBoard, createEmptyBoard, addRandomTile, findEmptyCells } from './game/board';
export { checkWin, hasEmptyCells, canMergeAdjacent, checkGameOver } from './game/state';
export { moveTiles } from './game/move';
export { getTileColor } from './game/colors';
export { getBestScore, setBestScore } from './game/storage';
