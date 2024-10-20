

import { useDispatch } from 'react-redux';
import { setTradingViewChartParameters } from '../../../redux/tradingViewChart';
import IntervalBar from '../components/IntervalBar';

const IntervalBarContainer = ({currentInterval, setCurrentInterval, startDate, endDate}) => {

    const dispatch = useDispatch();
    const intervals = ['1m', '5m', '15m', '30m', '1h', '4h', '1d', '1w', '1M'];

    const buttonClasses = (interval) =>
        `px-6 font-semibold transition-colors duration-300 ${
          currentInterval === interval
            ? 'bg-african_violet-500 text-white'
            : 'bg-african_violet-300 text-african_violet-900 hover:bg-african_violet-400'
        }`;

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
            buttonClasses={buttonClasses}
            handleIntervalChange={handleIntervalChange}
        />
    );
};

export default IntervalBarContainer;