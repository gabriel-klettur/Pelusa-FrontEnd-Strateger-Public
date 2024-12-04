import ItemChartButton from "../buttons/ItemChartButton";

const ButtonsPanel = ({ setShowStochasticSerie, setShowEmasSerie, setShowCandlestickSerie, 
                        setShowAlarmsMarkers, setShowAlarmsSelectedMarkers, setShowAlarmsFilteredByIntervalMarkers, setShowAlarmsFilteredByIntervalAndTypeMarkers,
                        setShowOrdersUsdmMarkers, setShowOrdersCoinmMarkers, setShowOrdersSpotMarkers, setShowOrdersStandardMarkers, 
                        showStochasticSerie, showEmasSerie, showCandlestickSerie, 
                        showAlarmsMarkers, showAlarmsSelectedMarkers, showAlarmsFilteredByIntervalMarkers, showAlarmsFilteredByIntervalAndTypeMarkers, 
                        showOrdersUsdmMarkers, showOrdersCoinmMarkers, showOrdersSpotMarkers, showOrdersStandardMarkers}) => {

    return(
        <div className="flex flex-col space-y-1">
            <div className='flex space-x-1'>
                <ItemChartButton setShow={setShowStochasticSerie} indicatorName='Stochastic' bgColor={showStochasticSerie ? 'bg-african_violet-300' : 'bg-african_violet-500'} />
                <ItemChartButton setShow={setShowEmasSerie} indicatorName='Emas' bgColor={showEmasSerie ? 'bg-african_violet-300' : 'bg-african_violet-500'} />
                <ItemChartButton setShow={setShowCandlestickSerie} indicatorName='Candlesticks' bgColor={showCandlestickSerie ? 'bg-african_violet-300' : 'bg-african_violet-500'} />
            </div>
            <div className='flex space-x-1'>
                <ItemChartButton setShow={setShowAlarmsMarkers} indicatorName='Alarms' bgColor={showAlarmsMarkers ? 'bg-african_violet-300' : 'bg-african_violet-500'} />
                <ItemChartButton setShow={setShowAlarmsSelectedMarkers} indicatorName='Selected Alarms' bgColor={showAlarmsSelectedMarkers ? 'bg-african_violet-300' : 'bg-african_violet-500'} />
                <ItemChartButton setShow={setShowAlarmsFilteredByIntervalMarkers} indicatorName='Alarms Filtered by Interval' bgColor={showAlarmsFilteredByIntervalMarkers ? 'bg-african_violet-300' : 'bg-african_violet-500'} />
                <ItemChartButton setShow={setShowAlarmsFilteredByIntervalAndTypeMarkers} indicatorName='Alarms Filtered by Interval and Type' bgColor={showAlarmsFilteredByIntervalAndTypeMarkers ? 'bg-african_violet-300' : 'bg-african_violet-500'} />
            </div>
            <div className='flex space-x-1'>
                <ItemChartButton setShow={setShowOrdersUsdmMarkers} indicatorName='Usdm Orders' bgColor={showOrdersUsdmMarkers ? 'bg-african_violet-300' : 'bg-african_violet-500'} />
                <ItemChartButton setShow={setShowOrdersCoinmMarkers} indicatorName='Coinm Orders' bgColor={showOrdersCoinmMarkers ? 'bg-african_violet-300' : 'bg-african_violet-500'} />
                <ItemChartButton setShow={setShowOrdersSpotMarkers} indicatorName='Spot Orders' bgColor={showOrdersSpotMarkers ? 'bg-african_violet-300' : 'bg-african_violet-500'} />
                <ItemChartButton setShow={setShowOrdersStandardMarkers} indicatorName='Standard Orders' bgColor={showOrdersStandardMarkers ? 'bg-african_violet-300' : 'bg-african_violet-500'} />
            </div>
        </div>
    )
}

export default ButtonsPanel;