// Path: strateger-react/src/store.js

import { configureStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from '@redux-devtools/extension';
import alarmReducer from './slices/alarmSlice';
import orderReducer from './slices/orderSlice';
import chartReducer from './slices/chartSlice';
import strategyReducer from './slices/strategySlice';
import diaryReducer from './slices/diarySlice';
import accountReducer from './slices/accountSlice';
import backtestingReducer from './slices/backtestingSlice';
import tradingViewChartReducer from './slices/tradingViewChartSlice';

const store = configureStore({
  reducer: {
    alarms: alarmReducer,
    orders: orderReducer,
    chart: chartReducer,
    strategies: strategyReducer,
    diary: diaryReducer,
    account: accountReducer,
    backtesting: backtestingReducer,
    tradingViewChart: tradingViewChartReducer,
  },
  devTools: composeWithDevTools(),
});

export default store;
