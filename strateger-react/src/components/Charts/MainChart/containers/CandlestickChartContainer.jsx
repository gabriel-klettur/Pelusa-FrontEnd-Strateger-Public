// Path: strateger-react/src/components/Charts/CandlestickChartChart/containers/CandlestickChartContainer.js
import useChart from '../hooks/charts/useChart';
import useIndicators from '../hooks/indicators/useIndicators';
import useDrawing from '../hooks/drawing/useDrawing';


//!---- Markers ----!//
import useSetupMarkers from '../hooks/markers/useSetupMarkers';


const CandlestickChartContainer = ({ data, chartSettings, chartInterval }) => { 
  
  

  const { mainChartContainerRef, chartRef, candlestickSeriesRef } = useChart({chartSettings, data});
  useIndicators({chartSettings, chartRef, data});
  useDrawing({mainChartContainerRef, chartRef, candlestickSeriesRef, data})



  //!----------------- Hooks de Marcadores -----------------//

  useSetupMarkers(
    candlestickSeriesRef, chartInterval, 
    chartSettings.showAlarmsMarkers,
    chartSettings.showAlarmsSelectedMarkers,
    chartSettings.showAlarmsFilteredMarkers,
    chartSettings.showOrdersUsdmMarkers,
    chartSettings.showOrdersCoinmMarkers,
    chartSettings.showOrdersSpotMarkers,
    chartSettings.showOrdersStandardMarkers
  );            

  


  return (
    <div className="chart-container relative">
      
      {/* Contenedor principal del gráfico */}
      <div
        ref={mainChartContainerRef}
        style={{ height: '593px', width: '100%' }}
        className="overflow-hidden"
      ></div>
    </div>
  );
};

export default CandlestickChartContainer;
