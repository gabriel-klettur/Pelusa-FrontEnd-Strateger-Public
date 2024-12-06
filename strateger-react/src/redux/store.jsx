// Path: src/redux/store.js

import { configureStore } from '@reduxjs/toolkit';
import alarmReducer from './alarm/alarmSlice';
import alarmFilterReducer from './alarm/filtersPanel/alarmFilterPanelSlice';
import orderReducer from './order/orderSlice';
import strategyReducer from './strategy/strategySlice';
import diaryReducer from './diary/diarySlice';
import accountReducer from './account/accountSlice';
import backtestingReducer from './backtesting/backtestingSlice';
import candlestickChartReducer from './charts/candlestickChartSlice';
import timeReducer from './time/timeSlice';
import tickerReducer from './ticker/tickerSlice';
import positionReducer from './position/positionSlice';
import tabReducer from './tab/tabSlice'; 
import toolBarReducer from './toolBar/toolBarSlice';
import interactionReducer from './interaction/interactionSlice';

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
    candlestickChart: candlestickChartReducer,
    ticker: tickerReducer, 
    positions: positionReducer,
    tab: tabReducer, 
    toolBar: toolBarReducer,
    interaction: interactionReducer
  },
  devTools: {
    actionsDenylist: ['time/updateTime'], // Ignorar la acción 'time/updateTime'
  },
});

export default store;
