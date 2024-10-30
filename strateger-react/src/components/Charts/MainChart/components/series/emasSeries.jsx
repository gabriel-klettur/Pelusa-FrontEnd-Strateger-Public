
import { calculateEMA, createEMASeries } from '../indicators/emas';

export const initializeEmasSeries = (chart) => {

    const ema10Series = createEMASeries(chart, 'blue');
    const ema55Series = createEMASeries(chart, 'orange');
    const ema200Series = createEMASeries(chart, 'red');

    return { ema10Series, ema55Series, ema200Series };
};

export const setEmasSeriesData = (ema10Series, ema55Series, ema200Series, sortedData) => {    
    const ema10Data = calculateEMA(sortedData, 10);
    const ema55Data = calculateEMA(sortedData, 55);
    const ema200Data = calculateEMA(sortedData, 200);

    ema10Series.setData(ema10Data);
    ema55Series.setData(ema55Data);
    ema200Series.setData(ema200Data);
};

