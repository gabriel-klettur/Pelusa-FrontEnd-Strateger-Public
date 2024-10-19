// Path: strateger-react/src/store.js

import { configureStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from '@redux-devtools/extension';
import alarmReducer from './alarm/alarmSlice';
import alarmFilterReducer from './alarm/alarmFilterSlice';
import orderReducer from './order/orderSlice';
import strategyReducer from './strategy/strategySlice';
import diaryReducer from './diary/diarySlice';
import accountReducer from './account/accountSlice';
import backtestingReducer from './backtesting/backtestingSlice';
import tradingViewChartReducer from './tradingViewChart/tradingViewChartSlice';
import timeReducer from './time/timeSlice';
import tickerReducer from './ticker/tickerSlice';
import positionReducer from './position/positionSlice';
import tabReducer from './tab/tabSlice'; 

const store = configureStore({
  reducer: {
    time: timeReducer,
    alarms: alarmReducer,
    alarmsFilter: alarmFilterReducer,
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
