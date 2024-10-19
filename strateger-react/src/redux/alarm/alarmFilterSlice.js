// Path: strateger-react/src/redux/slices/alarmFilterSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialFilteredTemporalidades = {
  '1m': 0, '5m': 0, '15m': 0, '30m': 0, '1h': 0, '4h': 0, 'D': 0, 'W': 0, 'M': 0
};

const alarmFilterSlice = createSlice({
  name: 'alarmFilters',
  initialState: {
    filteredTemporalidades: initialFilteredTemporalidades,
    selectedTemporalidad: '',
    selectedTypes: {},
  },
  reducers: {
    setSelectedTemporalidad(state, action) {
      state.selectedTemporalidad = action.payload;
    },
    incrementTemporalidad(state, action) {
      state.filteredTemporalidades[action.payload]++;
    },
    decrementTemporalidad(state, action) {
      if (state.filteredTemporalidades[action.payload] > 0) {
        state.filteredTemporalidades[action.payload]--;
      }
    },
    setSelectedTypes(state, action) {
      state.selectedTypes = {
        ...state.selectedTypes,
        [state.selectedTemporalidad]: action.payload,
      };
    },
    removeEmptySelectedTypes(state, action) {
      const temporalidad = action.payload;
      if (state.selectedTypes[temporalidad].length === 0) {
        delete state.selectedTypes[temporalidad];
      }
    },
  },
});

export const {
  setSelectedTemporalidad,
  incrementTemporalidad,
  decrementTemporalidad,
  setSelectedTypes,
  removeEmptySelectedTypes
} = alarmFilterSlice.actions;

export const selectSelectedTemporalidad = (state) => state.alarmsFilter.selectedTemporalidad;
export const selectSelectedTypes = (state) => state.alarmsFilter.selectedTypes;
export const selectFilteredTemporalidades = (state) => state.alarmsFilter.filteredTemporalidades;

export default alarmFilterSlice.reducer;
