import React from 'react';
import { useSelector } from 'react-redux';
import { selectBacktestingResult, selectBacktestingStatus, selectBacktestingError } from '../../../slices/backtestingSlice';

const BacktestingResult = () => {
    const result = useSelector(selectBacktestingResult);
    const status = useSelector(selectBacktestingStatus);
    const error = useSelector(selectBacktestingError);

    if (status === 'loading') {
        return <p>Loading...</p>;
    }

    if (status === 'failed') {
        return <p>Error: {error}</p>;
    }

    if (status === 'succeeded' && result) {
        return (
            <div className="backtesting-result">
                <h2>Backtesting Result</h2>
                <pre>{JSON.stringify(result, null, 2)}</pre>
            </div>
        );
    }

    return <p>No results yet</p>;
};

export default BacktestingResult;
