import React from 'react';
import { WIN_VALUE } from '../constants';

const Header = ({ score, bestScore }) => {
    return (
        <div className="header">
            <h1>{WIN_VALUE}</h1>
            <div className="scores">
                <div className="score-box">
                    <span className="score-label">Score</span>
                    <span className="score-value">{score}</span>
                </div>
                <div className="score-box">
                    <span className="score-label">Best</span>
                    <span className="score-value">{bestScore}</span>
                </div>
            </div>
        </div>
    );
};

export default Header;


