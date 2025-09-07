import {
    createEmptyBoard,
    findEmptyCells,
    addRandomTile,
    initializeBoard,
    checkWin,
    hasEmptyCells,
    canMergeAdjacent,
    checkGameOver,
    moveTiles,
    getTileColor,
    getBestScore,
    setBestScore
} from './utils';

import {
    BOARD_SIZE,
    WIN_VALUE,
    TILE_2,
    TILE_4,
    DIRECTIONS,
    STORAGE_KEYS
} from './constants';

// Mock localStorage
const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn()
};

// Mock localStorage globally
Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
    writable: true
});

// Also mock for Node.js environment
global.localStorage = localStorageMock;

describe('Board Management Functions', () => {
    describe('createEmptyBoard', () => {
        test('should create a board with correct dimensions', () => {
            const board = createEmptyBoard();

            expect(board).toHaveLength(BOARD_SIZE);
            board.forEach(row => {
                expect(row).toHaveLength(BOARD_SIZE);
                row.forEach(cell => expect(cell).toBe(0));
            });
        });

        test('should create a new board instance each time', () => {
            const board1 = createEmptyBoard();
            const board2 = createEmptyBoard();

            expect(board1).not.toBe(board2);
            expect(board1[0]).not.toBe(board2[0]);
        });
    });

    describe('findEmptyCells', () => {
        test('should find all empty cells in a board', () => {
            const board = [
                [2, 0, 4, 0],
                [0, 8, 0, 16],
                [32, 0, 0, 64],
                [0, 0, 128, 0]
            ];

            const emptyCells = findEmptyCells(board);

            expect(emptyCells).toHaveLength(9);
            // The actual result has 9 empty cells, not 8
            expect(emptyCells).toContainEqual({ row: 0, col: 1 });
            expect(emptyCells).toContainEqual({ row: 0, col: 3 });
            expect(emptyCells).toContainEqual({ row: 1, col: 0 });
            expect(emptyCells).toContainEqual({ row: 1, col: 2 });
            expect(emptyCells).toContainEqual({ row: 2, col: 1 });
            expect(emptyCells).toContainEqual({ row: 2, col: 2 });
            expect(emptyCells).toContainEqual({ row: 3, col: 0 });
            expect(emptyCells).toContainEqual({ row: 3, col: 1 });
            expect(emptyCells).toContainEqual({ row: 3, col: 3 });
        });

        test('should return empty array for full board', () => {
            const board = [
                [2, 4, 8, 16],
                [32, 64, 128, 256],
                [512, 1024, 2048, 4096],
                [8192, 16384, 32768, 65536]
            ];

            const emptyCells = findEmptyCells(board);
            expect(emptyCells).toHaveLength(0);
        });

        test('should return empty array for empty board', () => {
            const board = createEmptyBoard();
            const emptyCells = findEmptyCells(board);
            expect(emptyCells).toHaveLength(BOARD_SIZE * BOARD_SIZE);
        });
    });

    describe('addRandomTile', () => {
        test('should add a tile to an empty board', () => {
            const board = createEmptyBoard();
            const initialEmptyCount = findEmptyCells(board).length;

            addRandomTile(board);

            const finalEmptyCount = findEmptyCells(board).length;
            expect(finalEmptyCount).toBe(initialEmptyCount - 1);
        });

        test('should not add tile to full board', () => {
            const board = [
                [2, 4, 8, 16],
                [32, 64, 128, 256],
                [512, 1024, 2048, 4096],
                [8192, 16384, 32768, 65536]
            ];

            addRandomTile(board);

            // Board should remain unchanged
            expect(board).toEqual([
                [2, 4, 8, 16],
                [32, 64, 128, 256],
                [512, 1024, 2048, 4096],
                [8192, 16384, 32768, 65536]
            ]);
        });

        test('should add either 2 or 4', () => {
            const board = createEmptyBoard();

            addRandomTile(board);

            const nonZeroValues = board.flat().filter(value => value !== 0);
            expect(nonZeroValues).toHaveLength(1);
            expect([TILE_2, TILE_4]).toContain(nonZeroValues[0]);
        });
    });

    describe('initializeBoard', () => {
        test('should create board with two random tiles', () => {
            const board = initializeBoard();

            const nonZeroValues = board.flat().filter(value => value !== 0);
            expect(nonZeroValues).toHaveLength(2);
            nonZeroValues.forEach(value => {
                expect([TILE_2, TILE_4]).toContain(value);
            });
        });

        test('should return a new board instance', () => {
            const board1 = initializeBoard();
            const board2 = initializeBoard();

            expect(board1).not.toBe(board2);
        });
    });
});

describe('Game State Check Functions', () => {
    describe('checkWin', () => {
        test('should return true when 2048 is present', () => {
            const board = [
                [2, 4, 8, 16],
                [32, 64, 128, 256],
                [512, 1024, WIN_VALUE, 4096],
                [8192, 16384, 32768, 65536]
            ];

            expect(checkWin(board)).toBe(true);
        });

        test('should return false when 2048 is not present', () => {
            const board = [
                [2, 4, 8, 16],
                [32, 64, 128, 256],
                [512, 1024, 1024, 4096],
                [8192, 16384, 32768, 65536]
            ];

            expect(checkWin(board)).toBe(false);
        });

        test('should return false for empty board', () => {
            const board = createEmptyBoard();
            expect(checkWin(board)).toBe(false);
        });
    });

    describe('hasEmptyCells', () => {
        test('should return true when empty cells exist', () => {
            const board = [
                [2, 0, 4, 8],
                [16, 32, 64, 128],
                [256, 512, 1024, 2048],
                [4096, 8192, 16384, 32768]
            ];

            expect(hasEmptyCells(board)).toBe(true);
        });

        test('should return false when no empty cells', () => {
            const board = [
                [2, 4, 8, 16],
                [32, 64, 128, 256],
                [512, 1024, 2048, 4096],
                [8192, 16384, 32768, 65536]
            ];

            expect(hasEmptyCells(board)).toBe(false);
        });
    });

    describe('canMergeAdjacent', () => {
        test('should return true when horizontal merges are possible', () => {
            const board = [
                [2, 2, 4, 8],
                [16, 32, 64, 128],
                [256, 512, 1024, 2048],
                [4096, 8192, 16384, 32768]
            ];

            expect(canMergeAdjacent(board)).toBe(true);
        });

        test('should return true when vertical merges are possible', () => {
            const board = [
                [2, 4, 8, 16],
                [2, 64, 128, 256],
                [512, 1024, 2048, 4096],
                [8192, 16384, 32768, 65536]
            ];

            expect(canMergeAdjacent(board)).toBe(true);
        });

        test('should return false when no merges are possible', () => {
            const board = [
                [2, 4, 8, 16],
                [32, 64, 128, 256],
                [512, 1024, 2048, 4096],
                [8192, 16384, 32768, 65536]
            ];

            expect(canMergeAdjacent(board)).toBe(false);
        });

        test('should return false for empty board', () => {
            const board = createEmptyBoard();
            expect(canMergeAdjacent(board)).toBe(false);
        });
    });

    describe('checkGameOver', () => {
        test('should return true when no moves are possible', () => {
            const board = [
                [2, 4, 8, 16],
                [32, 64, 128, 256],
                [512, 1024, 2048, 4096],
                [8192, 16384, 32768, 65536]
            ];

            expect(checkGameOver(board)).toBe(true);
        });

        test('should return false when empty cells exist', () => {
            const board = [
                [2, 0, 4, 8],
                [16, 32, 64, 128],
                [256, 512, 1024, 2048],
                [4096, 8192, 16384, 32768]
            ];

            expect(checkGameOver(board)).toBe(false);
        });

        test('should return false when merges are possible', () => {
            const board = [
                [2, 2, 4, 8],
                [16, 32, 64, 128],
                [256, 512, 1024, 2048],
                [4096, 8192, 16384, 32768]
            ];

            expect(checkGameOver(board)).toBe(false);
        });
    });
});

describe('Tile Movement Functions', () => {
    describe('moveTiles - LEFT direction', () => {
        test('should move tiles to the left', () => {
            const board = [
                [0, 2, 0, 4],
                [8, 0, 16, 0],
                [0, 0, 32, 64],
                [128, 256, 0, 512]
            ];

            const result = moveTiles(board, DIRECTIONS.LEFT, false);

            expect(result.moved).toBe(true);
            expect(result.newBoard[0]).toEqual([2, 4, 0, 0]);
            expect(result.newBoard[1]).toEqual([8, 16, 0, 0]);
            expect(result.newBoard[2]).toEqual([32, 64, 0, 0]);
            expect(result.newBoard[3]).toEqual([128, 256, 512, 0]);
        });

        test('should merge adjacent equal tiles', () => {
            const board = [
                [2, 2, 4, 4],
                [8, 8, 16, 16],
                [32, 32, 64, 64],
                [128, 128, 256, 256]
            ];

            const result = moveTiles(board, DIRECTIONS.LEFT, false);

            expect(result.moved).toBe(true);
            expect(result.newScore).toBeGreaterThan(0);
            expect(result.newBoard[0]).toEqual([4, 8, 0, 0]);
            expect(result.newBoard[1]).toEqual([16, 32, 0, 0]);
            expect(result.newBoard[2]).toEqual([64, 128, 0, 0]);
            expect(result.newBoard[3]).toEqual([256, 512, 0, 0]);
        });

        test('should merge two rows of adjacent equal tiles on left', () => {
            const board = [
                [2, 2, 2, 16],
                [2, 4, 8, 16],
                [32, 64, 128, 256],
                [32, 64, 128, 256]
            ];

            const result = moveTiles(board, DIRECTIONS.DOWN, false);

            expect(result.moved).toBe(true);
            expect(result.newScore).toBeGreaterThan(0);
            expect(result.newBoard[0]).toEqual([4, 2, 16, 0]);
            expect(result.newBoard[1]).toEqual([2, 4, 8, 16]);
            expect(result.newBoard[2]).toEqual([32, 64, 128, 256]);
            expect(result.newBoard[3]).toEqual([32, 64, 128, 256]);
        });

        test('should not move when no movement is possible', () => {
            const board = [
                [2, 4, 8, 16],
                [32, 64, 128, 256],
                [512, 1024, 2048, 4096],
                [8192, 16384, 32768, 65536]
            ];

            const result = moveTiles(board, DIRECTIONS.LEFT, false);

            expect(result.moved).toBe(false);
            expect(result.newScore).toBe(0);
        });
    });

    describe('moveTiles - RIGHT direction', () => {
        test('should move tiles to the right', () => {
            const board = [
                [2, 0, 4, 0],
                [0, 8, 0, 16],
                [32, 64, 0, 0],
                [0, 128, 256, 512]
            ];

            const result = moveTiles(board, DIRECTIONS.RIGHT, false);

            expect(result.moved).toBe(true);
            expect(result.newBoard[0]).toEqual([0, 0, 2, 4]);
            expect(result.newBoard[1]).toEqual([0, 0, 8, 16]);
            expect(result.newBoard[2]).toEqual([0, 0, 32, 64]);
            expect(result.newBoard[3]).toEqual([0, 128, 256, 512]);
        });

        test('should merge adjacent equal tiles from right', () => {
            const board = [
                [2, 2, 4, 4],
                [8, 8, 16, 16],
                [32, 32, 64, 64],
                [128, 128, 256, 256]
            ];

            const result = moveTiles(board, DIRECTIONS.RIGHT, false);

            expect(result.moved).toBe(true);
            expect(result.newScore).toBeGreaterThan(0);
            expect(result.newBoard[0]).toEqual([0, 0, 4, 8]);
            expect(result.newBoard[1]).toEqual([0, 0, 16, 32]);
            expect(result.newBoard[2]).toEqual([0, 0, 64, 128]);
            expect(result.newBoard[3]).toEqual([0, 0, 256, 512]);
        });

        test('should merge two rows of adjacent equal tiles on right', () => {
            const board = [
                [16, 2, 2, 2],
                [2, 4, 8, 16],
                [32, 64, 128, 256],
                [32, 64, 128, 256]
            ];

            const result = moveTiles(board, DIRECTIONS.DOWN, false);

            expect(result.moved).toBe(true);
            expect(result.newScore).toBeGreaterThan(0);
            expect(result.newBoard[0]).toEqual([0, 16, 2, 4]);
            expect(result.newBoard[1]).toEqual([2, 4, 8, 16]);
            expect(result.newBoard[2]).toEqual([32, 64, 128, 256]);
            expect(result.newBoard[3]).toEqual([32, 64, 128, 256]);
        });
    });

    describe('moveTiles - UP direction', () => {
        test('should move tiles upward', () => {
            const board = [
                [0, 2, 0, 4],
                [8, 0, 16, 0],
                [0, 0, 32, 64],
                [128, 256, 0, 512]
            ];

            const result = moveTiles(board, DIRECTIONS.UP, false);

            expect(result.moved).toBe(true);
            expect(result.newBoard[0]).toEqual([8, 2, 16, 4]);
            expect(result.newBoard[1]).toEqual([128, 256, 32, 64]);
            expect(result.newBoard[2]).toEqual([0, 0, 0, 512]);
            expect(result.newBoard[3]).toEqual([0, 0, 0, 0]);
        });

        test('should merge adjacent equal tiles upward', () => {
            const board = [
                [2, 4, 8, 16],
                [2, 4, 8, 16],
                [32, 64, 128, 256],
                [32, 64, 128, 256]
            ];

            const result = moveTiles(board, DIRECTIONS.UP, false);

            expect(result.moved).toBe(true);
            expect(result.newScore).toBeGreaterThan(0);
            expect(result.newBoard[0]).toEqual([4, 8, 16, 32]);
            expect(result.newBoard[1]).toEqual([64, 128, 256, 512]);
            expect(result.newBoard[2]).toEqual([0, 0, 0, 0]);
            expect(result.newBoard[3]).toEqual([0, 0, 0, 0]);
        });

        test('should merge top two rows of adjacent equal tiles upward', () => {
            const board = [
                [2, 4, 8, 16],
                [2, 4, 8, 16],
                [32, 4, 128, 256],
                [32, 64, 128, 256]
            ];

            const result = moveTiles(board, DIRECTIONS.DOWN, false);

            expect(result.moved).toBe(true);
            expect(result.newScore).toBeGreaterThan(0);
            expect(result.newBoard[0]).toEqual([4, 8, 16, 32]);
            expect(result.newBoard[1]).toEqual([64, 4, 256, 512]);
            expect(result.newBoard[2]).toEqual([0, 64, 0, 0]);
            expect(result.newBoard[3]).toEqual([0, 0, 0, 0]);
        });
    });

    describe('moveTiles - DOWN direction', () => {
        test('should move tiles downward', () => {
            const board = [
                [2, 0, 4, 0],
                [0, 8, 0, 16],
                [32, 64, 0, 0],
                [0, 128, 256, 512]
            ];

            const result = moveTiles(board, DIRECTIONS.DOWN, false);

            expect(result.moved).toBe(true);
            expect(result.newBoard[0]).toEqual([0, 0, 0, 0]);
            expect(result.newBoard[1]).toEqual([0, 8, 0, 0]);
            expect(result.newBoard[2]).toEqual([2, 64, 4, 16]);
            expect(result.newBoard[3]).toEqual([32, 128, 256, 512]);
        });

        test('should merge adjacent equal tiles downward', () => {
            const board = [
                [2, 4, 8, 16],
                [2, 4, 8, 16],
                [32, 64, 128, 256],
                [32, 64, 128, 256]
            ];

            const result = moveTiles(board, DIRECTIONS.DOWN, false);

            expect(result.moved).toBe(true);
            expect(result.newScore).toBeGreaterThan(0);
            expect(result.newBoard[0]).toEqual([0, 0, 0, 0]);
            expect(result.newBoard[1]).toEqual([0, 0, 0, 0]);
            expect(result.newBoard[2]).toEqual([4, 8, 16, 32]);
            expect(result.newBoard[3]).toEqual([64, 128, 256, 512]);
        });

        test('should merge bottom two rows of adjacent equal tiles downward', () => {
            const board = [
                [2, 4, 8, 16],
                [2, 64, 8, 16],
                [32, 64, 128, 256],
                [32, 64, 128, 256]
            ];

            const result = moveTiles(board, DIRECTIONS.DOWN, false);

            expect(result.moved).toBe(true);
            expect(result.newScore).toBeGreaterThan(0);
            expect(result.newBoard[0]).toEqual([0, 0, 0, 0]);
            expect(result.newBoard[1]).toEqual([0, 4, 0, 0]);
            expect(result.newBoard[2]).toEqual([4, 64, 16, 32]);
            expect(result.newBoard[3]).toEqual([64, 128, 256, 512]);
        });
    });

    describe('moveTiles - Edge Cases', () => {
        test('should handle empty board', () => {
            const board = createEmptyBoard();

            const result = moveTiles(board, DIRECTIONS.LEFT, false);

            expect(result.moved).toBe(false);
            expect(result.newScore).toBe(0);
        });

        test('should handle board with only zeros', () => {
            const board = [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ];

            const result = moveTiles(board, DIRECTIONS.UP, false);

            expect(result.moved).toBe(false);
            expect(result.newScore).toBe(0);
        });

        test('should handle invalid direction', () => {
            const board = [
                [2, 4, 8, 16],
                [32, 64, 128, 256],
                [512, 1024, 2048, 4096],
                [8192, 16384, 32768, 65536]
            ];

            const result = moveTiles(board, 'invalid');

            expect(result.moved).toBe(false);
            expect(result.newScore).toBe(0);
            expect(result.newBoard).toBe(board);
        });
    });
});

describe('UI Utility Functions', () => {
    describe('getTileColor', () => {
        test('should return correct colors for known values', () => {
            expect(getTileColor(0)).toBe('#cdc1b4');   // Empty
            expect(getTileColor(2)).toBe('#eee4da');
            expect(getTileColor(4)).toBe('#ede0c8');
            expect(getTileColor(8)).toBe('#f2b179');
            expect(getTileColor(16)).toBe('#f59563');
            expect(getTileColor(32)).toBe('#f67c5f');
            expect(getTileColor(64)).toBe('#f65e3b');
            expect(getTileColor(128)).toBe('#edcf72');
            expect(getTileColor(256)).toBe('#edcc61');
            expect(getTileColor(512)).toBe('#edc850');
            expect(getTileColor(1024)).toBe('#edc53f');
            expect(getTileColor(2048)).toBe('#edc22e');
        });

        test('should return default color for unknown values', () => {
            expect(getTileColor(9999)).toBe('#3c3a32');
            expect(getTileColor(-1)).toBe('#3c3a32');
        });
    });
});

describe('Storage Utility Functions', () => {
    beforeEach(() => {
        localStorageMock.getItem.mockClear();
        localStorageMock.setItem.mockClear();
    });

    describe('getBestScore', () => {
        test('should return 0 when no score is stored', () => {
            localStorageMock.getItem.mockReturnValue(null);

            const result = getBestScore();

            expect(result).toBe(0);
            expect(localStorageMock.getItem).toHaveBeenCalledWith(STORAGE_KEYS.BEST_SCORE);
        });

        test('should return parsed score when stored', () => {
            localStorageMock.getItem.mockReturnValue('1024');

            const result = getBestScore();

            expect(result).toBe(1024);
            expect(localStorageMock.getItem).toHaveBeenCalledWith(STORAGE_KEYS.BEST_SCORE);
        });

        test('should handle invalid stored values', () => {
            localStorageMock.getItem.mockReturnValue('invalid');

            const result = getBestScore();

            expect(result).toBe(0);
        });
    });

    describe('setBestScore', () => {
        test('should store score as string', () => {
            setBestScore(2048);

            expect(localStorageMock.setItem).toHaveBeenCalledWith(STORAGE_KEYS.BEST_SCORE, '2048');
        });

        test('should handle zero score', () => {
            setBestScore(0);

            expect(localStorageMock.setItem).toHaveBeenCalledWith(STORAGE_KEYS.BEST_SCORE, '0');
        });
    });
});

describe('Game Rules Integration Tests', () => {
    test('should handle complete game flow', () => {
        // Start with empty board
        let board = createEmptyBoard();
        expect(findEmptyCells(board)).toHaveLength(BOARD_SIZE * BOARD_SIZE);

        // Add initial tiles
        addRandomTile(board);
        addRandomTile(board);
        expect(findEmptyCells(board)).toHaveLength(BOARD_SIZE * BOARD_SIZE - 2);

        // Check win condition
        expect(checkWin(board)).toBe(false);

        // Check game over condition
        expect(checkGameOver(board)).toBe(false);
    });

    test('should handle winning scenario', () => {
        const board = [
            [2, 4, 8, 16],
            [32, 64, 0, 256],
            [512, 1024, WIN_VALUE, 4096],
            [8192, 16384, 32768, 65536]
        ];

        expect(checkWin(board)).toBe(true);
        expect(checkGameOver(board)).toBe(false);
    });

    test('should handle game over scenario', () => {
        const board = [
            [2, 4, 8, 16],
            [32, 64, 128, 256],
            [512, 1024, 4, 4096],
            [8192, 16384, 32768, 65536]
        ];

        expect(checkWin(board)).toBe(false);
        expect(checkGameOver(board)).toBe(true);
    });

    test('should handle movement with no merges', () => {
        const board = [
            [2, 0, 4, 0],
            [0, 8, 0, 16],
            [32, 0, 0, 64],
            [0, 128, 256, 0]
        ];

        const result = moveTiles(board, DIRECTIONS.LEFT, false);

        expect(result.moved).toBe(true);
        expect(result.newScore).toBe(0); // No merges
    });

    test('should handle movement with merges', () => {
        const board = [
            [2, 2, 4, 4],
            [8, 8, 16, 16],
            [32, 32, 64, 64],
            [128, 128, 256, 256]
        ];

        const result = moveTiles(board, DIRECTIONS.LEFT, false);

        expect(result.moved).toBe(true);
        expect(result.newScore).toBeGreaterThan(0); // Has merges
    });
});
