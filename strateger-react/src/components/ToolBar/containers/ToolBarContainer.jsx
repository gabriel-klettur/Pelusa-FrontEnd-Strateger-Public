//Path: strateger-react/src/components/ToolBar/containers/ToolBarContainer.jsx

import { useState } from 'react';
import { useSelector } from 'react-redux';

import IntervalBarContainer from './IntervalBarContainer';
import RelojContainer from './RelojContainer';

import { selectTemporalidad, selectCurrentDate, selectStartDate, selectTicker } from 'reduxStore/toolBar';
import JumpInTimePanel from '../components/JumpInTimePanel';

import TickersPanel from '../components/TickersPanel';
import useSetChartsParameters from '../hooks/useSetChartsParameters';

const ToolBarContainer = () => {
    

    const initialTemporalidad = useSelector(selectTemporalidad);
    const initialTicker = useSelector(selectTicker);
    const startDate = useSelector(selectStartDate);
    const initialEndDate = useSelector(selectCurrentDate);

    const [currentInterval, setCurrentInterval] = useState(initialTemporalidad); 
    const [currentTicker, setCurrentTicker] = useState(initialTicker);
    const [jumpToDate, setJumpToDate] = useState(initialEndDate);
    
    useSetChartsParameters({currentInterval, currentTicker, startDate, jumpToDate});

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