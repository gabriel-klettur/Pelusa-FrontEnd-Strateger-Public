// src/components/TradingViewChart/IntervalPanelButtons.js

import React from 'react';

const IntervalPanelButtons = ({ activeInterval, onIntervalChange }) => {

    const intervals = ['1m', '5m', '15m', '30m', '1h', '4h', '1d', '1w', '1M'];

    const buttonClasses = (interval) =>
        `px-6 font-semibold transition-colors duration-300 ${
        activeInterval === interval
            ? 'bg-african_violet-500 text-white'
            : 'bg-african_violet-300 text-african_violet-900 hover:bg-african_violet-400'
        }`;

    return (
        <div className="flex w-full bg-african_violet-300 border-r-4 border-african_violet-500">
        {intervals.map((interval) => (
            <button
                key={interval}
                className={`${buttonClasses(interval)} flex-grow flex-basis-0`} // Asegura que los botones crezcan y ocupen el mismo espacio
                onClick={() => onIntervalChange(interval)}
            >
                {interval}
            </button>
        ))}
        </div>
    );
};

export default IntervalPanelButtons;
