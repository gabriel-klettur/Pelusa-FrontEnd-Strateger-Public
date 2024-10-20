//Path: strateger-react/src/components/ToolBar/containers/IntervalBarContainer.jsx

import { useDispatch } from 'react-redux';
import { setTradingViewChartParameters } from '../../../redux/tradingViewChart';
import IntervalBar from '../components/IntervalBar';

const IntervalBarContainer = ({currentInterval, setCurrentInterval, startDate, endDate}) => {
    const dispatch = useDispatch();
    const intervals = ['1m', '5m', '15m', '30m', '1h', '4h', '1d', '1w', '1M'];

    const handleIntervalChange = (newInterval) => {
        setCurrentInterval(newInterval);
        
        dispatch(setTradingViewChartParameters({
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