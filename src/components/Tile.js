import React from 'react';
import { TEXT_COLORS } from '../constants';
import { getTileColor } from '../game/colors';

const Tile = ({ value }) => {
    return (
        <div
            className={`tile ${value === 0 ? 'empty' : 'filled'}`}
            style={{
                backgroundColor: getTileColor(value),
                color: value <= 4 ? TEXT_COLORS.LIGHT : TEXT_COLORS.DARK
            }}
        >
            {value !== 0 && value}
        </div>
    );
};

export default Tile;


