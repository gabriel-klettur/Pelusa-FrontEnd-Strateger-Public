// Path: src/thunks/loadSlices.js

//import { fetchAlarms } from '../slices/alarmSlice';
//import { fetchOrders } from '../slices/orderSlice';
import { fetchStrategies } from '../redux/strategy/strategySlice';
import { fetchDiaryEntries } from '../redux/diary';
//import { fetchPerpUSDTMBalance, fetchPerpCOINMBalance, fetchSpotBalance } from '../slices/accountSlice';
import { fetchPositionsCoinM, fetchPositionsUSDTM } from '../redux/position/positionSlice';
import { fetchTradingViewChartData } from '../redux/tradingViewChart/tradingViewChartSlice';
import { fetchTicker } from '../redux/ticker/tickerSlice'; // Importa fetchTicker

export const loadSlicesInOrder = () => async (dispatch) => {
  try {

    await Promise.all([
      dispatch(fetchTicker('ETH-USDT')),
      dispatch(fetchTicker('BTC-USDT'))
    ]);

    await dispatch(fetchTradingViewChartData({
      interval: '1d',
      startDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1000).toISOString(), // 1000 days ago
      endDate: new Date().toISOString()
    }));
    
    //await dispatch(fetchAlarms({ limit: 100, offset: 0 }));
    //await dispatch(fetchOrders({ limit: 100, offset: 0 }));

    await dispatch(fetchStrategies({ skip: 0, limit: 10 }));
    await dispatch(fetchDiaryEntries({ skip: 0, limit: 10 }));
    //await dispatch(fetchPerpUSDTMBalance()); // Dependent on tradingViewChartData
    //await dispatch(fetchPerpCOINMBalance()); // Dependent on tradingViewChartData
    //await dispatch(fetchSpotBalance());     // Dependent on tradingViewChartData
    await dispatch(fetchPositionsCoinM());
    await dispatch(fetchPositionsUSDTM());    
  } catch (error) {
    console.error('Error loading slices:', error);
  }
};
