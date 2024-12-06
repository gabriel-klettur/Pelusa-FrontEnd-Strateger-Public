//Path: strateger-react/src/redux/slices/alarmSlice.js

import { createSlice } from '@reduxjs/toolkit';
import { fetchAlarms } from './alarmThunks';

const initialStates = {
  data: [],
  loading: false,
  error: null,
  length: 0,
  page: 0,
  offset: 0,
  hasMore: true,
};

const alarmSlice = createSlice({
  name: 'alarms',
  initialState: {
    alarms: initialStates,     
    filteredByClickAlarms: initialStates,       
    filteredByOptions: initialStates,    
  },
  reducers: {
    setActiveRadarDataset(state, action) {
      state.activeRadarDataset = action.payload;
    },
    //TODO ------------------------ Page setters ------------------------
    setPageAlarms(state, action) {
      state.alarms.page = action.payload;
    },
    setPageFilteredByClickAlarms(state, action) {
      state.filteredByClickAlarms.page = action.payload;
    },
    setPageFilteredByOptions(state, action) {
      state.filteredByOptions.page = action.payload;
    },
    //TODO ------------------------ HasMore setters ------------------------
    setHasMoreAlarms(state, action) {
      state.alarms.hasMore = action.payload;
    },
    setHasMoreFilteredByClickAlarms(state, action) {
      state.filteredByClickAlarms.hasMore = action.payload;
    },   
    setHasMoreFilteredByOptions(state, action) {
      state.filteredByOptions.hasMore = action.payload;
    },

    //TODO ------------------------ Filtered setters ------------------------
    setFilteredByClickAlarms(state, action) {
      const sortedAlarms = action.payload.sort((a, b) => b.id - a.id);
      state.filteredByClickAlarms.data = sortedAlarms;
      state.filteredByClickAlarms.length = sortedAlarms.length;
    },
    setFilteredByOptions(state, action) {
      const data = action.payload || []; // Asegúrate de que sea al menos un array vacío
      state.filteredByOptions.data = data;
      state.filteredByOptions.length = data.length;
    },
  },
  extraReducers: (builder) => {
    //! ------------------------ fetchAlarms ------------------------
    builder
    .addCase(fetchAlarms.pending, (state) => {
      state.alarms.loading = true;
      state.alarms.error = null;
    })
    .addCase(fetchAlarms.fulfilled, (state, action) => {
      if (action.payload.length < 500) {
        state.alarms.hasMore = false;
      }

      // Combinar datos existentes con nuevos datos
      const combinedData = [...state.alarms.data, ...action.payload];

      // Eliminar duplicados usando Set
      const uniqueData = Array.from(
        new Set(combinedData.map((alarm) => alarm.id)) // Crear un Set con IDs únicos
      ).map((id) => combinedData.find((alarm) => alarm.id === id)); // Mapear IDs únicos a objetos completos

      // Actualizar el estado con datos únicos y ordenados
      const sortedAlarms = uniqueData.sort((a, b) => b.id - a.id);
      state.alarms.data = sortedAlarms;
      state.alarms.length = sortedAlarms.length;
      state.alarms.loading = false;
      state.alarms.offset += action.payload.length; // Incrementar el offset con el tamaño de los datos recibidos
    })
    .addCase(fetchAlarms.rejected, (state, action) => {
      state.alarms.loading = false;
      state.alarms.error = action.error.message;
    });
  },
});

export const {
  setPageAlarms,
  setPageFilteredByClickAlarms,
  setPageFilteredByOptions,
  setHasMoreAlarms,
  setHasMoreFilteredByClickAlarms,
  setHasMoreFilteredByOptions,
  setFilteredByClickAlarms,  
  setFilteredByOptions,
} = alarmSlice.actions;



export default alarmSlice.reducer;
