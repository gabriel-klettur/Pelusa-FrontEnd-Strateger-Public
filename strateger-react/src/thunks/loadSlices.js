// src/thunks/loadSlices.js
//import { fetchAlarms } from '../slices/alarmSlice';
//import { fetchOrders } from '../slices/orderSlice';
import { fetchStrategies } from '../slices/strategySlice';
import { fetchDiaryEntries } from '../slices/diarySlice';
import { fetchPerpUSDTMBalance, fetchPerpCOINMBalance, fetchSpotBalance } from '../slices/accountSlice';
import { fetchPositionsCoinM, fetchPositionsUSDTM, fetchSpotDepositRecords } from '../slices/positionSlice';
//import { fetchTradingViewChartData } from '../slices/tradingViewChartSlice';

export const loadSlicesInOrder = () => async (dispatch) => {
  try {
    //await dispatch(fetchTradingViewChartData({
    //  interval: '1d',
    //  startDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1000).toISOString(), // 1000 days ago
    //  endDate: new Date().toISOString()
    //}));
    //await dispatch(fetchAlarms({ limit: 100, offset: 0 }));
    //await dispatch(fetchOrders({ limit: 100, offset: 0 }));
    await dispatch(fetchStrategies({ skip: 0, limit: 10 }));
    await dispatch(fetchDiaryEntries({ skip: 0, limit: 10 }));
    await dispatch(fetchPerpUSDTMBalance());
    await dispatch(fetchPerpCOINMBalance());
    await dispatch(fetchSpotBalance());
    await dispatch(fetchPositionsCoinM());
    await dispatch(fetchPositionsUSDTM());
    await dispatch(fetchSpotDepositRecords());
  } catch (error) {
    console.error('Error loading slices:', error);
  }
};
