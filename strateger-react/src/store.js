// Path: strateger-react/src/store.js

import { configureStore } from '@reduxjs/toolkit';
import alarmReducer from './slices/alarmSlice';
import orderReducer from './slices/orderSlice';
import chartReducer from './slices/chartSlice';
import strategyReducer from './slices/strategySlice'; // Import the new reducer

const store = configureStore({
  reducer: {
    alarms: alarmReducer,
    orders: orderReducer,
    chart: chartReducer,
    strategies: strategyReducer // Add the strategy slice
  },
});

export default store;
