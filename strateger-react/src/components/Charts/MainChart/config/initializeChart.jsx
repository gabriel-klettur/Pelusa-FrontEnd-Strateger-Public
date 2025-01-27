// Path: strateger-react/src/components/Charts/CandlestickChartChart/config/chartConfig.js
import { createChart } from 'lightweight-charts';
import { ColorType } from 'lightweight-charts';

export const initializeChart = (container) => {
  const chart = createChart(container, {
    autoSize: true, // Habilitar autoSize
    layout: {
      background: {
        type: ColorType.Solid,
        //color: '#181c27',
        color: '#ffffff',
    },
      textColor: '#9a9ea7',
    },
    grid: {
      vertLines: {
        //color: '#242733',
        color: '#e1e1e1',
      },
      horzLines: {        
        //color: '#242733',
        color: '#e1e1e1',
      },
    },
    timeScale: {
      timeVisible: true,
      secondsVisible: false,
    },
  });
  
  const updateTimeFormatter = () => {
    const visibleRange = chart.timeScale().getVisibleRange();
    if (!visibleRange) return;

    const startTime = visibleRange.from;
    const endTime = visibleRange.to;
    const timeDifference = endTime - startTime;

    let timeFormatter;
    if (timeDifference < 2 * 24 * 60 * 60) { // Menos de 2 días
      timeFormatter = (time) => new Date(time * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (timeDifference < 30 * 24 * 60 * 60) { // Menos de 30 días
      timeFormatter = (time) => new Date(time * 1000).toLocaleDateString(undefined, { day: 'numeric', month: 'short' });
    } else { // Más de 30 días
      timeFormatter = (time) => new Date(time * 1000).toLocaleDateString(undefined, { month: 'short', year: 'numeric' });
    }

    chart.applyOptions({
      timeScale: {
        timeFormatter: timeFormatter,
      },
    });
  };

  chart.timeScale().subscribeVisibleTimeRangeChange(updateTimeFormatter);

  // Inicializar el formateador de tiempo
  updateTimeFormatter();

  return chart;
};
