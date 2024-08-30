// src/components/TradingViewChart/index.js
import LightweightChart from './MainCharts';
import Toolbar from './Toolbar';
import { initializeChart } from './config/chartConfig';
import { setSeriesData, initializeSeries } from './utils/series/seriesConfig';
import { formatChartData, sortAndRemoveDuplicates } from './data/chartData';
import { calculateEMA, createEMASeries } from './utils/indicators/Indicators';
import { mapAlarmsToMarkers, sortAndFilterMarkers as sortAndFilterAlarmMarkers } from './utils/markers/Alarms';
import { mapOrdersToMarkers, sortAndFilterMarkers as sortAndFilterOrderMarkers } from './utils/markers/OrdersChart';

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
