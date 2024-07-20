// src/components/TradingViewChart/hooks/useMarkers.js

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { mapAlarmsToMarkers, sortAndFilterMarkers as sortAndFilterAlarmMarkers } from '../markers/Alarms';
import { mapOrdersToMarkers, sortAndFilterMarkers as sortAndFilterOrderMarkers } from '../markers/OrdersChart';
import { selectStrategyFilteredAlarms, selectAllSelectedAlarms } from '../../../slices/alarmSlice';
import { selectFilteredOrders } from '../../../slices/orderSlice';
import { setAlarmMarkers, setOrderMarkers, selectAlarmMarkers, selectOrderMarkers } from '../../../slices/tradingViewChartSlice';

const useMarkers = (candlestickSeriesRef, chartInterval) => {
  const dispatch = useDispatch();
  const strategyFilteredAlarms = useSelector(selectStrategyFilteredAlarms);
  const allSelectedAlarms = useSelector(selectAllSelectedAlarms);
  const filteredOrders = useSelector(selectFilteredOrders);
  const alarmMarkers = useSelector(selectAlarmMarkers);
  const orderMarkers = useSelector(selectOrderMarkers);

  useEffect(() => {
    let newAlarmMarkers = [];
    if (strategyFilteredAlarms.length > 0) {
      newAlarmMarkers = mapAlarmsToMarkers(strategyFilteredAlarms, chartInterval);
    } else if (allSelectedAlarms.length > 0) {
      newAlarmMarkers = mapAlarmsToMarkers(allSelectedAlarms, chartInterval);
    }
    const sortedAlarmMarkers = sortAndFilterAlarmMarkers(newAlarmMarkers).sort((a, b) => a.time - b.time);
    dispatch(setAlarmMarkers(sortedAlarmMarkers));
  }, [strategyFilteredAlarms, allSelectedAlarms, chartInterval, dispatch]);

  useEffect(() => {
    let newOrderMarkers = [];
    if (filteredOrders.length > 0) {
      newOrderMarkers = mapOrdersToMarkers(filteredOrders, chartInterval);
    }
    const sortedOrderMarkers = sortAndFilterOrderMarkers(newOrderMarkers).sort((a, b) => a.time - b.time);
    dispatch(setOrderMarkers(sortedOrderMarkers));
  }, [filteredOrders, chartInterval, dispatch]);

  useEffect(() => {
    if (candlestickSeriesRef.current) {
      const combinedMarkers = [...alarmMarkers, ...orderMarkers].sort((a, b) => a.time - b.time);
      candlestickSeriesRef.current.setMarkers(combinedMarkers);
    }
  }, [alarmMarkers, orderMarkers, candlestickSeriesRef]);
};

export default useMarkers;

