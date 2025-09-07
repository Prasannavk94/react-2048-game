import React from 'react';
import Tile from './Tile';

const Board = ({ board, onTouchStart, onTouchMove, onTouchEnd }) => {
    return (
        <div className="game-board" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
            {board.map((row, rowIndex) => (
                <div key={rowIndex} className="board-row">
                    {row.map((cell, colIndex) => (
                        <Tile key={`${rowIndex}-${colIndex}`} value={cell} />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Board;


