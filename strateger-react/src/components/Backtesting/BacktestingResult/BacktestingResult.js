import React from 'react';
import { useSelector } from 'react-redux';
import { selectBacktestingResult, selectBacktestingStatus, selectBacktestingError } from '../../../slices/backtestingSlice';
import CollapsibleSection from './CollapsibleSection';
import LoadingOverlay from '../../common/LoadingOverlay/LoadingOverlay';

const BacktestingResult = () => {
    const result = useSelector(selectBacktestingResult);
    const status = useSelector(selectBacktestingStatus);
    const error = useSelector(selectBacktestingError);

    const formatPercentage = (value) => `${(value * 100).toFixed(2)}%`;

    if (status === 'failed') {
        return <p>Error: {error}</p>;
    }

    if (status === 'succeeded' && result) {
        return (
            <div className="backtesting-result">                
                <h2 className="text-2xl font-bold mb-6">Backtesting Result</h2>
                <CollapsibleSection title="Summary">
                    <p>Initial Balance: {result.initial_balance}</p>
                    <p>Final Balance: {result.final_balance}</p>
                    <p>Cumulative Returns: {formatPercentage(result.cumulative_returns)}</p>
                    <p>Max Drawdown: {formatPercentage(result.max_drawdown)}</p>
                    <p>Volatility: {formatPercentage(result.volatility)}</p>
                    <p>Downside Risk: {formatPercentage(result.downside_risk)}</p>
                    <p>Sharpe Ratio: {result.sharpe_ratio.toFixed(2)}</p>
                    <p>Sortino Ratio: {result.sortino_ratio.toFixed(2)}</p>
                    <p>Win Rate: {formatPercentage(result.win_rate)}</p>
                    <p>Gain to Loss Ratio: {result.gain_to_loss_ratio.toFixed(2)}</p>
                </CollapsibleSection>
                <CollapsibleSection title="Balances" count={result.balances.length}>
                    <pre>{JSON.stringify(result.balances, null, 2)}</pre>
                </CollapsibleSection>
                <CollapsibleSection title="Positions" count={result.positions.length}>
                    <pre>{JSON.stringify(result.positions, null, 2)}</pre>
                </CollapsibleSection>
                <CollapsibleSection title="Kline Data" count={result.kline_data.length}>
                    <pre>{JSON.stringify(result.kline_data, null, 2)}</pre>
                </CollapsibleSection>
                <CollapsibleSection title="Signals" count={result.signals.length}>
                    <pre>{JSON.stringify(result.signals, null, 2)}</pre>
                </CollapsibleSection>
            </div>
        );
    }

    return( 
        <div className="relative w-100% h-40">
            <LoadingOverlay isLoading={status === 'loading'} />
        </div>
    );
};

export default BacktestingResult;
