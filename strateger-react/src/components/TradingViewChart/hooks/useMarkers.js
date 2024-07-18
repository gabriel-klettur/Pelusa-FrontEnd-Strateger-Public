// src/components/TradingViewChart/hooks/useMarkers.js
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { mapAlarmsToMarkers, sortAndFilterMarkers as sortAndFilterAlarmMarkers } from '../markers/Alarms';
import { mapOrdersToMarkers, sortAndFilterMarkers as sortAndFilterOrderMarkers } from '../markers/OrdersChart';
import { selectStrategyFilteredAlarms, selectAllSelectedAlarms } from '../../../slices/alarmSlice';
import { selectFilteredOrders } from '../../../slices/orderSlice';

const useMarkers = (candlestickSeriesRef, chartInterval) => {
  const strategyFilteredAlarms = useSelector(selectStrategyFilteredAlarms);
  const allSelectedAlarms = useSelector(selectAllSelectedAlarms);
  const filteredOrders = useSelector(selectFilteredOrders);

  useEffect(() => {
    if (candlestickSeriesRef.current) {
      let alarmMarkers = [];
      if (strategyFilteredAlarms.length > 0) {
        alarmMarkers = mapAlarmsToMarkers(strategyFilteredAlarms, chartInterval);
      } else if (allSelectedAlarms.length > 0) {
        alarmMarkers = mapAlarmsToMarkers(allSelectedAlarms, chartInterval);
      }
      const sortedAlarmMarkers = sortAndFilterAlarmMarkers(alarmMarkers);

      let orderMarkers = [];
      if (filteredOrders.length > 0) {
        orderMarkers = mapOrdersToMarkers(filteredOrders, chartInterval);
      }
      const sortedOrderMarkers = sortAndFilterOrderMarkers(orderMarkers);

      candlestickSeriesRef.current.setMarkers([...sortedAlarmMarkers, ...sortedOrderMarkers]);
    }
  }, [strategyFilteredAlarms, allSelectedAlarms, filteredOrders, chartInterval, candlestickSeriesRef]);
};

export default useMarkers;
