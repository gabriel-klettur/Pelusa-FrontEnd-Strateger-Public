//Path: strateger-react/src/components/ToolBar/containers/IntervalBarContainer.jsx

import IntervalBar from '../components/IntervalBar';

const IntervalBarContainer = ({currentInterval, handleIntervalChange}) => {
    
    const intervals = ['1m', '5m', '15m', '30m', '1h', '4h', '1d', '1w', '1M'];

    return (
        <IntervalBar
            intervals={intervals}
            currentInterval={currentInterval}
            handleIntervalChange={handleIntervalChange}
        />
    );
};

export default IntervalBarContainer;