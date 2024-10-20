// src/components/TradingViewChart/index.js
import LightweightChart from './CandlestickChart';
import Toolbar from './components/Toolbar';
import { initializeChart } from './config/chartConfig';
import { setSeriesData, initializeSeries } from './components/series/seriesConfig';
import { formatChartData, sortAndRemoveDuplicates } from './utils/chartData';
import { calculateEMA, createEMASeries } from './indicators/Indicators';
import { mapAlarmsToMarkers, sortAndFilterMarkers as sortAndFilterAlarmMarkers } from './components/markers/Alarms';
import { mapOrdersToMarkers, sortAndFilterMarkers as sortAndFilterOrderMarkers } from './components/markers/OrdersChart';

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
