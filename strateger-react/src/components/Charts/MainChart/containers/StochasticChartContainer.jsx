import React, { useRef } from 'react';
import useInitializeStochasticSeries from '../hooks/useInitializeStochasticSeries';
import useSetStochasticSeriesData from '../hooks/useSetStochasticSeriesData';
import useInitializeChart from '../hooks/charts/useInitializeChart'; 

const StochasticChartContainer = ({ data, chartSettings }) => {

    const secondaryChartContainerRef = useRef();
    const secondChartRef = useInitializeChart(secondaryChartContainerRef);

    const { stochasticKSeriesRef, stochasticDSeriesRef } = useInitializeStochasticSeries(secondChartRef);

    //* Hooks
    useSetStochasticSeriesData(chartSettings.showStochasticSerie, data, stochasticKSeriesRef, stochasticDSeriesRef);

    return (
        <div
            ref={secondaryChartContainerRef}
            className="h-full rounded-b-lg overflow-hidden border-t-1 border-african_violet-700 mr-3"
        >            
        </div>
    );
};

export default StochasticChartContainer;
