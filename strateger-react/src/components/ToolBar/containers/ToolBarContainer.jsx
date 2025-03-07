//Path: strateger-react/src/components/ToolBar/containers/ToolBarContainer.jsx

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setCandlestickChartParameters } from 'reduxStore/charts';

import IntervalBarContainer from './IntervalBarContainer';
import RelojContainer from './RelojContainer';

import { selectTemporalidad, selectCurrentDate, selectStartDate } from 'reduxStore/toolBar';
import JumpInTimePanel from '../components/JumpInTimePanel';

import TickersPanel from '../components/TickersPanel';

const ToolBarContainer = () => {

    const dispatch = useDispatch();

    const initialTemporalidad = useSelector(selectTemporalidad);
    //!const initialTicker = useSelector(selectTicker);
    const startDate = useSelector(selectStartDate);
    const initialEndDate = useSelector(selectCurrentDate);

    const [currentInterval, setCurrentInterval] = useState(initialTemporalidad); 
    const [currentTicker, setCurrentTicker] = useState('BTC-USDT');
    const [jumpToDate, setJumpToDate] = useState(initialEndDate);
    
    useEffect(() => {        
        const parameters = {
            interval: currentInterval,
            startDate: new Date(startDate).toISOString(),
            endDate: new Date(jumpToDate).toISOString(),
            ticker: currentTicker
        };
            
        const hasParametersChanged = () => {
            const previousParams = JSON.parse(localStorage.getItem('chartParameters')) || {};
            return (
                parameters.interval !== previousParams.interval ||
                parameters.startDate !== previousParams.startDate ||
                parameters.endDate !== previousParams.endDate ||
                parameters.ticker !== previousParams.ticker
            );
        };
    
        if (hasParametersChanged()) {            
            dispatch(setCandlestickChartParameters(parameters));            
            localStorage.setItem('chartParameters', JSON.stringify(parameters));
        }
    }, [currentInterval,currentTicker,  startDate, jumpToDate, dispatch]);

    return(
        <div className="h-12 grid grid-flow-col auto-cols-auto gap-x-4 bg-african_violet-300">
            <div className="h-full flex justify-start items-center">
                <TickersPanel 
                    currentTicker={currentTicker}
                    setCurrentTicker={setCurrentTicker}
                />    
            </div>

            <div className="h-full flex justify-center items-center">
                <IntervalBarContainer
                    currentInterval={currentInterval}
                    setCurrentInterval={setCurrentInterval}
                />
            </div>

            <div className="h-full flex justify-center items-center">
                <JumpInTimePanel
                    jumpToDate={jumpToDate}
                    setJumpToDate={setJumpToDate}
                />
            </div>            

            <div className="h-full flex justify-end items-center">
                <RelojContainer />
            </div>
        </div>
    )
}

export default ToolBarContainer;