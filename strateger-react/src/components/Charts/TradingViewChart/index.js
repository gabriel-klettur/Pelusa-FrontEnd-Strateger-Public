// src/components/TradingViewChart/index.js
import LightweightChart from './LightweightChart';
import Toolbar from './Toolbar';
import { initializeChart } from './config/chartConfig';
import { setSeriesData, initializeSeries } from './series/seriesConfig';
import { formatChartData, sortAndRemoveDuplicates } from './data/chartData';
import { calculateEMA, createEMASeries } from './indicators/Indicators';
import { mapAlarmsToMarkers, sortAndFilterMarkers as sortAndFilterAlarmMarkers } from './markers/Alarms';
import { mapOrdersToMarkers, sortAndFilterMarkers as sortAndFilterOrderMarkers } from './markers/OrdersChart';

export {
  LightweightChart,
  Toolbar,
  initializeChart,
  setSeriesData,
  initializeSeries,
  formatChartData,
  sortAndRemoveDuplicates,
  calculateEMA,
  createEMASeries,
  mapAlarmsToMarkers,
  sortAndFilterAlarmMarkers,
  mapOrdersToMarkers,
  sortAndFilterOrderMarkers,
};
