// Path: src/thunks/loadSlices.js

import { fetchStrategies } from '../redux/strategy';
import { fetchDiaryEntries } from '../redux/diary';
import { fetchPerpCOINMBalance,fetchPerpUSDTMBalance,fetchSpotBalance, fetchTrackRecordBingXAllAccounts } from '../redux/account';
import { fetchPositionsCoinM, fetchPositionsUSDTM } from '../redux/position';
import { fetchCandlestickChartData } from '../redux/charts';
import { fetchTicker } from '../redux/ticker';
import { fetchOrdersCoinm, fetchOrdersSpot, fetchOrdersStandard, fetchOrdersUsdtm } from '../redux/order';

export const loadSlicesInOrder = (setLoadingMessage) => async (dispatch) => {
  try {    
    setLoadingMessage('Loading minimun information');
    //TODO -------------- fetch Basics --------------------------------------
    await Promise.all([
      dispatch(fetchTicker('ETH-USDT')),
      dispatch(fetchTicker('BTC-USDT'))
    ]);    

    setLoadingMessage('Loading Charts information');
    //TODO -------------- fetch Charts --------------------------------------
    await dispatch(fetchCandlestickChartData({
      interval: '1d',
      startDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1000).toISOString(), // 1000 days ago
      endDate: new Date().toISOString()
    }));
      
    setLoadingMessage('Loading Orders information');
    //TODO -------------- fetch Orders --------------------------------------
    await dispatch(fetchOrdersCoinm({ limit: 500, offset: 0 }));
    await dispatch(fetchOrdersSpot({ limit: 500, offset: 0 }));
    await dispatch(fetchOrdersStandard({ limit: 500, offset: 0 }));
    await dispatch(fetchOrdersUsdtm({ limit: 500, offset: 0 }));

    setLoadingMessage('Loading Account information');
    //TODO -------------- fetch Account --------------------------------------
    await dispatch(fetchPerpCOINMBalance());
    await dispatch(fetchPerpUSDTMBalance());
    await dispatch(fetchSpotBalance());
    await dispatch(fetchTrackRecordBingXAllAccounts());

    setLoadingMessage('Loading Strategy information');
    //TODO -------------- fetch Strategies --------------------------------------
    await dispatch(fetchStrategies({ skip: 0, limit: 10 }));

    setLoadingMessage('Loading Diary information');
    //TODO -------------- fetch Diary --------------------------------------
    await dispatch(fetchDiaryEntries({ skip: 0, limit: 10 }));
    
    setLoadingMessage('Loading Positions information');
    //TODO -------------- fetch Positions --------------------------------------
    await dispatch(fetchPositionsCoinM());
    await dispatch(fetchPositionsUSDTM()); 

    setLoadingMessage('All Redux slices loaded');
  } catch (error) {
    setLoadingMessage('Error loading slices');
    console.error('Error loading slices:', error);
  }
};
