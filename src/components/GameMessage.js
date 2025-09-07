import React from 'react';
import { WIN_VALUE } from '../constants';

export const WonMessage = ({ onContinue, onNew }) => (
    <div className="game-message won">
        <h2>You Won!</h2>
        <p>You reached {WIN_VALUE}! Keep playing to get a higher score.</p>
        <button onClick={onContinue}>Continue Playing</button>
        <button onClick={onNew}>New Game</button>
    </div>
);

export const GameOverMessage = ({ score, onPlayAgain }) => (
    <div className="game-message game-over">
        <h2>Game Over!</h2>
        <p>Final Score: {score}</p>
        <button onClick={onPlayAgain}>Play Again</button>
    </div>
);


