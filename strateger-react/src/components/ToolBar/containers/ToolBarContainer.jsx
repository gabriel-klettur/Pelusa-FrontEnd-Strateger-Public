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
                localDate={localDate}
            />      
        </div>
    )
}

export default ToolBarContainer;