import React from 'react';

const Controls = ({ onNewGame }) => {
    return (
        <div className="controls">
            <button className="new-game-btn" onClick={onNewGame}>
                New Game
            </button>
        </div>
    );
};

export default Controls;


