// src/components/TradingViewChart/config/chartConfig.js
import { createChart } from 'lightweight-charts';

export const initializeChart = (container) => {
  const chart = createChart(container, {
    autoSize: true,
    layout: {
      background:{
        color: '#000',
      },
      textColor: '#fff',
    },
    grid: {
      vertLines: {
        color: '#252525',
      },
      horzLines: {
        color: '#252525',
      },
    },
    timeScale: {
      timeVisible: true,
      secondsVisible: false,
    }
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
