import { useState, useEffect } from 'react';

import IntervalBarContainer from './IntervalBarContainer';
import RelojContainer from './RelojContainer';
import DatePickerContainer from './DatePickerContainer';

const ToolBarContainer = ({ initialTemporalidad, startDate, endDate, onDateChange }) => {
    const [currentInterval, setCurrentInterval] = useState(initialTemporalidad); 
    const [localDate, setLocalDate] = useState(startDate);
  
    useEffect(() => {
      setLocalDate(startDate);
    }, [startDate]);
   
    return(
        <div className="flex">
            <IntervalBarContainer
            currentInterval={currentInterval}
            setCurrentInterval={setCurrentInterval}
            startDate={startDate}
            endDate={endDate}
            />      
            <RelojContainer />
            <DatePickerContainer
            setLocalDate={setLocalDate}
            currentInterval={currentInterval}
            onDateChange={onDateChange}
            localDate={localDate}
            />      
        </div>
    )
}

export default ToolBarContainer;