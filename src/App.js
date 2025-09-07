import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import { ARROW_KEYS, SWIPE_THRESHOLD, INITIAL_SCORE, INITIAL_BEST_SCORE, WIN_VALUE } from './constants';
import { initializeBoard } from './game/board';
import { checkGameOver, checkWin } from './game/state';
import { moveTiles } from './game/move';
import { getBestScore } from './game/storage';
import Header from './components/Header';
import Board from './components/Board';
import Controls from './components/Controls';
import { WonMessage, GameOverMessage } from './components/GameMessage';

const App = () => {
    const [board, setBoard] = useState([]);
    const [score, setScore] = useState(INITIAL_SCORE);
    const [bestScore, setBestScore] = useState(INITIAL_BEST_SCORE);
    const [gameOver, setGameOver] = useState(false);
    const [won, setWon] = useState(false);
    const [continuePlaying, setContinuePlaying] = useState(false);

    // Handle keyboard events
    const handleKeyDown = useCallback((event) => {
        if (gameOver) return;

        const direction = ARROW_KEYS[event.key];
        if (!direction) return;

        event.preventDefault();
        const { newBoard, moved, newScore } = moveTiles(board, direction);

        if (moved) {
            setBoard(newBoard);
            setScore(prev => prev + newScore);

            if (score + newScore > bestScore) {
                const newBestScore = score + newScore;
                setBestScore(newBestScore);
            }

            if (checkWin(newBoard) && !won) {
                setWon(true);
            }

            if (checkGameOver(newBoard)) {
                setGameOver(true);
            }
        }
    }, [board, gameOver, won, score, bestScore]);

    // Handle touch events for mobile
    const [touchStart, setTouchStart] = useState({ x: INITIAL_SCORE, y: INITIAL_SCORE });
    const [touchEnd, setTouchEnd] = useState({ x: INITIAL_SCORE, y: INITIAL_SCORE });

    const handleTouchStart = (e) => {
        setTouchStart({
            x: e.targetTouches[0].clientX,
            y: e.targetTouches[0].clientY
        });
    };

    const handleTouchMove = (e) => {
        setTouchEnd({
            x: e.targetTouches[0].clientX,
            y: e.targetTouches[0].clientY
        });
    };

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distanceX = touchStart.x - touchEnd.x;
        const distanceY = touchStart.y - touchEnd.y;

        // Only process swipes that meet the minimum threshold
        if (Math.abs(distanceX) < SWIPE_THRESHOLD && Math.abs(distanceY) < SWIPE_THRESHOLD) return;

        const isHorizontalSwipe = Math.abs(distanceX) > Math.abs(distanceY);

        let direction = '';
        if (isHorizontalSwipe) {
            if (distanceX > 0) {
                // Swipe left
                direction = 'left';
            } else {
                // Swipe right
                direction = 'right';
            }
        } else {
            if (distanceY > 0) {
                // Swipe up
                direction = 'up';
            } else {
                // Swipe down
                direction = 'down';
            }
        }
        if (direction) {
            const { newBoard, moved, newScore } = moveTiles(board, direction);
            if (moved) {
                setBoard(newBoard);
                setScore(prev => prev + newScore);
                const newBestScore = score + newScore;
                if (newBestScore > bestScore) {
                    setBestScore(newBestScore);
                }
                if (checkWin(newBoard) && !won) setWon(true);
                if (checkGameOver(newBoard)) setGameOver(true);
            }
        }

        setTouchStart({ x: INITIAL_SCORE, y: INITIAL_SCORE });
        setTouchEnd({ x: INITIAL_SCORE, y: INITIAL_SCORE });
    };

    // Reset the game
    const resetGame = () => {
        setBoard(initializeBoard());
        setScore(INITIAL_SCORE);
        setGameOver(false);
        setWon(false);
    };

    // Initialize game on component mount
    useEffect(() => {
        const savedBestScore = getBestScore();
        if (savedBestScore) {
            setBestScore(savedBestScore);
        }
        setBoard(initializeBoard());
    }, []);

    // Add keyboard event listener
    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    return (
        <div className="App">
            <div className="game-container">
                <Header score={score} bestScore={bestScore} />
                <Board board={board} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd} />
                <Controls onNewGame={resetGame} />

                {won && !continuePlaying && !gameOver && (
                    <WonMessage onContinue={() => setContinuePlaying(true)} onNew={() => setWon(false)} />
                )}

                {gameOver && (
                    <GameOverMessage score={score} onPlayAgain={resetGame} />
                )}

                <div className="instructions">
                    <p>Use arrow keys or swipe to move tiles. Combine tiles to reach {WIN_VALUE}!</p>
                </div>
            </div>
        </div>
    );
};

export default App;
