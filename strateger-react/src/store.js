// Path: strateger-react/src/store.js

import { configureStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from '@redux-devtools/extension';
import alarmReducer from './redux/slices/alarmSlice';
import orderReducer from './redux/slices/orderSlice';
import strategyReducer from './redux/slices/strategySlice';
import diaryReducer from './redux/slices/diarySlice';
import accountReducer from './redux/slices/accountSlice';
import backtestingReducer from './redux/slices/backtestingSlice';
import tradingViewChartReducer from './redux/slices/tradingViewChartSlice';
import timeReducer from './redux/slices/timeSlice';
import tickerReducer from './redux/slices/tickerSlice';
import positionReducer from './redux/slices/positionSlice';
import tabReducer from './redux/slices/tabSlice'; 

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
