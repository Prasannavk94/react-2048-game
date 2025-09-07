// Game board constants
export const BOARD_SIZE = 4;
export const WIN_VALUE = 2048;

// Tile generation probabilities
export const TILE_2_PROBABILITY = 0.9;
export const TILE_4_PROBABILITY = 0.1;

// Tile values
export const TILE_2 = 2;
export const TILE_4 = 4;

// Direction constants
export const DIRECTIONS = {
    LEFT: 'left',
    RIGHT: 'right',
    UP: 'up',
    DOWN: 'down'
};

// Arrow key mappings
export const ARROW_KEYS = {
    ArrowLeft: DIRECTIONS.LEFT,
    ArrowRight: DIRECTIONS.RIGHT,
    ArrowUp: DIRECTIONS.UP,
    ArrowDown: DIRECTIONS.DOWN
};

// Touch swipe threshold
export const SWIPE_THRESHOLD = 50;

// Tile colors for different values
export const TILE_COLORS = {
    0: '#cdc1b4',    // Empty tile
    2: '#eee4da',
    4: '#ede0c8',
    8: '#f2b179',
    16: '#f59563',
    32: '#f67c5f',
    64: '#f65e3b',
    128: '#edcf72',
    256: '#edcc61',
    512: '#edc850',
    1024: '#edc53f',
    2048: '#edc22e'
};

// Text colors for tiles
export const TEXT_COLORS = {
    LIGHT: '#776e65',  // For tiles 2 and 4
    DARK: '#f9f6f2'   // For tiles 8 and above
};

// Local storage keys
export const STORAGE_KEYS = {
    BEST_SCORE: '2048-best-score'
};

// Initial values
export const INITIAL_SCORE = 0;
export const INITIAL_BEST_SCORE = 0;
