// Path: strateger-react/src/store.js

import { configureStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from '@redux-devtools/extension';
import alarmReducer from './slices/alarmSlice';
import orderReducer from './slices/orderSlice';
import strategyReducer from './slices/strategySlice';
import diaryReducer from './slices/diarySlice';
import accountReducer from './slices/accountSlice';
import backtestingReducer from './slices/backtestingSlice';
import tradingViewChartReducer from './slices/tradingViewChartSlice';
import timeReducer from './slices/timeSlice';
import tickerReducer from './slices/tickerSlice';
import positionReducer from './slices/positionSlice';
import tabReducer from './slices/tabSlice'; 

const store = configureStore({
  reducer: {
    time: timeReducer,
    alarms: alarmReducer,
    orders: orderReducer,
    strategies: strategyReducer,
    diary: diaryReducer,
    account: accountReducer,      
    backtesting: backtestingReducer,
    tradingViewChart: tradingViewChartReducer,
    ticker: tickerReducer, 
    positions: positionReducer,
    tab: tabReducer, 
  },
  devTools: composeWithDevTools(),
});

export default store;
