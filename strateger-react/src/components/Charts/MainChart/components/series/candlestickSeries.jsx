export const initialCandlestickSeries = (chart) => {
    const candlestickSeries = chart.addCandlestickSeries();
    
    return { candlestickSeries };
};

export const setCandlestickSeriesData = (candlestickSeries, sortedData) => {
    candlestickSeries.setData(sortedData);
}