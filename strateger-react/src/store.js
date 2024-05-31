// Path: strateger-react/src/store.js

import { configureStore } from '@reduxjs/toolkit';
import alarmReducer from './slices/alarmSlice';
import orderReducer from './slices/orderSlice'


const store = configureStore({
  reducer: {
    alarms: alarmReducer, 
    orders: orderReducer, // Add the order slice   
  },
});

export default store;
