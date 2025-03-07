import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCandlestickChartParameters } from 'reduxStore/charts';

const useChartsParameters = ({currentInterval, currentTicker, startDate, jumpToDate}) => {

    const dispatch = useDispatch();

    useEffect(() => {        
        const parameters = {
            interval: currentInterval,
            startDate: new Date(startDate).toISOString(),
            endDate: new Date(jumpToDate).toISOString(),
            ticker: currentTicker
        };
            
        const hasParametersChanged = () => {
            const previousParams = JSON.parse(localStorage.getItem('chartParameters')) || {};
            return (
                parameters.interval !== previousParams.interval ||
                parameters.startDate !== previousParams.startDate ||
                parameters.endDate !== previousParams.endDate ||
                parameters.ticker !== previousParams.ticker
            );
        };
    
        if (hasParametersChanged()) {            
            dispatch(setCandlestickChartParameters(parameters));            
            localStorage.setItem('chartParameters', JSON.stringify(parameters));
        }
    }, [currentInterval,currentTicker,  startDate, jumpToDate, dispatch]);
}

export default useChartsParameters;