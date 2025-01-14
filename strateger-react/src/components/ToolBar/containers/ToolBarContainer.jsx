//Path: strateger-react/src/components/ToolBar/containers/ToolBarContainer.jsx

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import IntervalBarContainer from './IntervalBarContainer';
import RelojContainer from './RelojContainer';

import { selectTemporalidad, selectCurrentDate, selectStartDate } from 'reduxStore/toolBar';
import JumpInTimePanel from '../components/JumpInTimePanel';
import IndicatorsPanel from '../components/IndicatorsPanel';
import TickersPanel from '../components/TickersPanel';

const ToolBarContainer = () => {

    const initialTemporalidad = useSelector(selectTemporalidad);
    //!const initialTicker = useSelector(selectTicker);
    const startDate = useSelector(selectStartDate);
    const endDate = useSelector(selectCurrentDate);

    const [currentInterval, setCurrentInterval] = useState(initialTemporalidad); 
    const [currentTicker, setCurrentTicker] = useState('BTCUSDT');
    const [jumpToDate, setJumpToDate] = useState(null);    

    
    
    useEffect(() => {
        console.log('currentInterval:', currentInterval);
        console.log('currentTicker:', currentTicker);
        console.log('jumpToDate:', jumpToDate);
    }, [currentInterval, currentTicker, jumpToDate]);




    return(
        <div className="h-14 grid grid-flow-col auto-cols-auto gap-x-4 bg-african_violet-300">
            <div className="h-full flex justify-start items-center border-yellow-500 border-4">
                <TickersPanel 
                    currentTicker={currentTicker}
                    setCurrentTicker={setCurrentTicker}
                />    
            </div>

            <div className="h-full flex justify-center items-center border-green-500 border-4">
                <IntervalBarContainer
                    currentInterval={currentInterval}
                    setCurrentInterval={setCurrentInterval}
                    startDate={startDate}
                    endDate={endDate}
                />   
            </div>

            <div className="h-full flex justify-center items-center border-blue-500 border-4">
                <JumpInTimePanel
                    setJumpToDate={setJumpToDate}
                />
            </div>

            <div className="h-full flex justify-center items-center border-red-500 border-4">
                <IndicatorsPanel />
            </div>

            <div className="h-full flex justify-end items-center border-cyan-500 border-4">
                <RelojContainer />
            </div>
        </div>
    )
}

export default ToolBarContainer;