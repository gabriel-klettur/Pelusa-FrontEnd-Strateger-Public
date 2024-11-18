//Path: strateger-react/src/components/ToolBar/containers/ToolBarContainer.jsx

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import IntervalBarContainer from './IntervalBarContainer';
import RelojContainer from './RelojContainer';
import DatePickerContainer from './DatePickerContainer';

import { selectTemporalidad, selectCurrentDate, selectStartDate } from '../../../redux/toolBar';

const ToolBarContainer = () => {

    const initialTemporalidad = useSelector(selectTemporalidad);
    const startDate = useSelector(selectStartDate);
    const endDate = useSelector(selectCurrentDate);

    const [currentInterval, setCurrentInterval] = useState(initialTemporalidad); 
    const [localDate, setLocalDate] = useState(startDate);
  
    useEffect(() => {
      setLocalDate(startDate);
    }, [startDate]);
   
    return(
        <div className="h-14 grid grid-cols-3 gap-4 bg-african_violet-300">
            <div className="h-full flex justify-center items-center ">
                <IntervalBarContainer
                    currentInterval={currentInterval}
                    setCurrentInterval={setCurrentInterval}
                    startDate={startDate}
                    endDate={endDate}
                />   
            </div>             
            <div className="h-full flex justify-center items-center">
                <DatePickerContainer
                    setLocalDate={setLocalDate}
                    currentInterval={currentInterval}            
                    localDate={localDate}                
                />      
            </div>
            <div className="h-full flex justify-end items-center">
                <RelojContainer />
            </div>
        </div>
    )
}

export default ToolBarContainer;