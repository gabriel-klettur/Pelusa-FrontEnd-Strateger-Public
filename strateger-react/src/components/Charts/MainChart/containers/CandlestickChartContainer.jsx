// Path: strateger-react/src/components/Charts/CandlestickChartChart/containers/CandlestickChartContainer.js

import useChart from '../hooks/charts/useChart';
import useIndicators from '../hooks/indicators/useIndicators';
import useDrawing from '../hooks/drawing/useDrawing';
import useMarkers from '../hooks/markers/useMarkers';
import useChartBoundaryLoader  from '../hooks/data/useChartBoundaryLoader';  // ✅ Importamos el nuevo hook

const CandlestickChartContainer = ({ data, chartSettings, chartInterval }) => {   
  
  const { mainChartContainerRef, chartRef, candlestickSeriesRef } = useChart({chartSettings, data});
  
  useIndicators({chartSettings, chartRef, data});  
  useMarkers({candlestickSeriesRef, chartInterval, chartSettings});            
  useDrawing({mainChartContainerRef, chartRef, candlestickSeriesRef, data})
  useChartBoundaryLoader(chartRef);  //! Cambiar nombre del hook

  return (
    <div className="chart-container relative">          
      <div
        ref={mainChartContainerRef}
        style={{ height: '593px', width: '100%' }}
        className="overflow-hidden"
      ></div>
    </div>
  );
};

export default CandlestickChartContainer;
