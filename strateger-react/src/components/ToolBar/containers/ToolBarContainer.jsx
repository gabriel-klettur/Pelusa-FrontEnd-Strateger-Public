//Path: strateger-react/src/components/ToolBar/containers/ToolBarContainer.jsx

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setCandlestickChartParameters } from 'reduxStore/charts';

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


    const dispatch = useDispatch();
    const handleIntervalChange = (newInterval) => {
        setCurrentInterval(newInterval);
        
        dispatch(setCandlestickChartParameters({
          interval: newInterval,
          startDate: new Date(startDate).toISOString(),
          endDate: new Date(endDate).toISOString(),
        }));
    };


    return(
        <div className="h-14 grid grid-flow-col auto-cols-auto gap-x-4 bg-african_violet-300">
            <div className="h-full flex justify-start items-center">
                <TickersPanel 
                    currentTicker={currentTicker}
                    setCurrentTicker={setCurrentTicker}
                />    
            </div>

            <div className="h-full flex justify-center items-center">
                <IntervalBarContainer
                    currentInterval={currentInterval}
                    handleIntervalChange={handleIntervalChange}
                />
            </div>

            <div className="h-full flex justify-center items-center">
                <IndicatorsPanel />
            </div>

            <div className="h-full flex justify-center items-center">
                <JumpInTimePanel
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