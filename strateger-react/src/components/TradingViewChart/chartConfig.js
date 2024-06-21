// src/components/TradingViewChart/chartConfig.js

import { createChart } from 'lightweight-charts';

export const initializeChart = (container) => {
  const chart = createChart(container, {
    width: container.clientWidth,
    height: container.clientHeight,
    layout: {
      backgroundColor: '#ffffff',
      textColor: '#000',
    },
    grid: {
      vertLines: {
        color: '#e1e1e1',
      },
      horzLines: {
        color: '#e1e1e1',
      },
    },
  });

  return chart;
};
