// Path: strateger-react/src/store.js

import { configureStore } from '@reduxjs/toolkit';
import alarmReducer from './slices/alarmSlice';


const store = configureStore({
  reducer: {
    alarms: alarmReducer,
    
  },
});

export default store;
