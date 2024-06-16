// Path: strateger-react/src/store.js

import { configureStore } from '@reduxjs/toolkit';
import alarmReducer from './slices/alarmSlice';
import orderReducer from './slices/orderSlice';
import chartReducer from './slices/chartSlice';
import strategyReducer from './slices/strategySlice';
import diaryReducer from './slices/diarySlice';
import accountReducer from './slices/accountSlice';
import backtestingReducer from './slices/backtestingSlice'; // Importar el nuevo slice

const store = configureStore({
  reducer: {
    alarms: alarmReducer,
    orders: orderReducer,
    chart: chartReducer,
    strategies: strategyReducer,
    diary: diaryReducer,
    account: accountReducer,
    backtesting: backtestingReducer, // Añadir el nuevo slice
  },
});

export default store;
