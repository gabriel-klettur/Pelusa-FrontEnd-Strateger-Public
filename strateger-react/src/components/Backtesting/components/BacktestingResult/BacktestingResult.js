import React, { useEffect } from 'react';
import { format } from 'date-fns'; 
import { useDispatch, useSelector } from 'react-redux';

import { updateChartData, setPositionMarkers } from '../../../../redux/slices/tradingViewChartSlice';
import { selectBacktestingResult, selectBacktestingStatus, selectBacktestingError } from '../../../../redux/slices/backtestingSlice';

import { mapPositionsToMarkers } from '../../../Charts/utils/markers/PositionsChart';
import CollapsibleSection from './CollapsibleSection';
import LoadingOverlay from '../../../common/LoadingOverlay/LoadingOverlay';


const BacktestingResult = () => {
    const dispatch = useDispatch();
    const result = useSelector(selectBacktestingResult);
    const status = useSelector(selectBacktestingStatus);
    const error = useSelector(selectBacktestingError);

    useEffect(() => {
        if (status === 'succeeded' && result) {
            const formattedKlineData = result.kline_data.map(item => [
                item.time, 
                item.open,                     
                item.high,                     
                item.low,                      
                item.close                     
            ]);

            console.log("Formatted Kline Data:", formattedKlineData);
            dispatch(updateChartData(formattedKlineData));

            const positionMarkers = mapPositionsToMarkers(result.positions);
            dispatch(setPositionMarkers(positionMarkers));
        }
    }, [status, result, dispatch]);

    if (status === 'failed') {
        return <p>Error: {error}</p>;
    }

    const formatPercentage = (value) => `${(value * 100).toFixed(2)}%`;

    const formatTimestamp = (timestamp) => {
        return format(new Date(timestamp), 'HH:mm:ss - dd/MM/yyyy');
    };

    const renderTable = (data, reverse = true) => {
        if (data.length === 0) return <p>No data available</p>;

        const headers = Object.keys(data[0]);

        // Condicional para invertir datos
        const displayedData = reverse ? [...data].reverse() : data;

        return (
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Índice</th>
                        {headers.map((header) => (
                            <th key={header} className="px-4 py-2">{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {displayedData.map((item, index) => (
                        <tr key={index}>
                            <td className="border px-4 py-2">{index + 0}</td>
                            {headers.map((header) => (
                                <td
                                    key={header}
                                    className={`border px-4 py-2 ${
                                        item[header] === true
                                            ? 'bg-green-500 text-white font-bold'
                                            : ''
                                    }`}
                                >
                                    {item[header] === null ? 'null' :
                                     item[header] === true ? 'true' :
                                     item[header] === false ? 'false' :
                                     header === 'time' ? formatTimestamp(item[header]) : item[header]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    const formatJsonData = (data, reverse = true) => {
        const total = data.length;
        const formattedData = data.map((item, index) => {
            const formattedItem = { ...item, index: reverse ? total - index : index + 0 };
            if (formattedItem.time) {
                formattedItem.time = formatTimestamp(formattedItem.time);
            }
            return formattedItem;
        });
        return reverse ? formattedData.reverse() : formattedData; // Condicional para invertir el orden
    };

    if (status === 'succeeded' && result) {
        return (
            <div className="backtesting-result">                                
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

                <div className='grid grid-cols-2 gap-4'>
                    <CollapsibleSection title="Balances Table" count={result.balances.length}>
                        {renderTable(result.balances, false)}  
                    </CollapsibleSection>
                    <CollapsibleSection title="Balances JSON" count={result.balances.length}>
                        <pre>{JSON.stringify(formatJsonData(result.balances, false), null, 2)}</pre>  
                    </CollapsibleSection>
                </div>

                <div className='grid grid-cols-2 gap-4'>
                    <CollapsibleSection title="Positions Table" count={result.positions.length}>                    
                        {renderTable(result.positions, false)}
                    </CollapsibleSection>
                    <CollapsibleSection title="Positions JSON" count={result.positions.length}>
                        <pre>{JSON.stringify(formatJsonData(result.positions, false), null, 2)}</pre>
                    </CollapsibleSection>
                </div>

                <div className='grid grid-cols-2 gap-4'>
                    <CollapsibleSection title="Kline Data Table" count={result.kline_data.length}>                    
                        {renderTable(result.kline_data)}
                    </CollapsibleSection>
                    <CollapsibleSection title="Kline Data JSON" count={result.kline_data.length}>                    
                        <pre>{JSON.stringify(formatJsonData(result.kline_data), null, 2)}</pre>                    
                    </CollapsibleSection>
                </div>

                <div className='grid grid-cols-2 gap-4'>
                    <CollapsibleSection title="Signals Table" count={result.signals.length}>                        
                        {renderTable(result.signals)}
                    </CollapsibleSection>
                    <CollapsibleSection title="Signals JSON" count={result.signals.length}>
                        <pre>{JSON.stringify(formatJsonData(result.signals), null, 2)}</pre>
                    </CollapsibleSection>
                </div>
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
