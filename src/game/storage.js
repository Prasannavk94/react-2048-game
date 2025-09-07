import { STORAGE_KEYS } from '../constants';

export const getBestScore = () => {
    const savedBestScore = localStorage.getItem(STORAGE_KEYS.BEST_SCORE);
    if (!savedBestScore) return 0;
    const parsedScore = parseInt(savedBestScore, 10);
    return isNaN(parsedScore) ? 0 : parsedScore;
};

export const setBestScore = (score) => {
    localStorage.setItem(STORAGE_KEYS.BEST_SCORE, score.toString());
};


