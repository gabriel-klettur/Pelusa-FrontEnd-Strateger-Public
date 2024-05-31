// Path: strateger-react/src/slices/orderSlice.js

import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    selectedOrderId: 1, // Default value, you can change it accordingly
  },
  reducers: {
    setSelectedOrderId(state, action) {
      state.selectedOrderId = action.payload;
    },
  },
});

export const { setSelectedOrderId } = orderSlice.actions;
export default orderSlice.reducer;
