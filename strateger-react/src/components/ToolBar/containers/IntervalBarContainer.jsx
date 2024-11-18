//Path: strateger-react/src/components/ToolBar/containers/IntervalBarContainer.jsx

import { useDispatch } from 'react-redux';
import { setCandlestickChartParameters } from '../../../redux/charts';
import IntervalBar from '../components/IntervalBar';

const IntervalBarContainer = ({currentInterval, setCurrentInterval, startDate, endDate}) => {
    const dispatch = useDispatch();
    const intervals = ['1m', '5m', '15m', '30m', '1h', '4h', 'D', 'W', 'M'];

    const handleIntervalChange = (newInterval) => {
        setCurrentInterval(newInterval);
        
        dispatch(setCandlestickChartParameters({
          interval: newInterval,
          startDate: new Date(startDate).toISOString(),
          endDate: new Date(endDate).toISOString(),
        }));
    };

    return (
        <IntervalBar
            intervals={intervals}
            currentInterval={currentInterval}
            handleIntervalChange={handleIntervalChange}
        />
    );
};

export default IntervalBarContainer;