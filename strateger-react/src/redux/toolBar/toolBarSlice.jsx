// Path: redux/ToolBarSlice.js

import { createSlice } from '@reduxjs/toolkit';

// Definir el estado inicial
const initialTemporalidad = '1d'; // Define el intervalo inicial como '1d'

// Obtener la fecha actual y formatearla
const currentDate = new Date();
const formattedCurrentDate = currentDate.toISOString();

// Calcular la fecha de inicio (1000 días antes de la fecha actual)
const startDate = new Date();
startDate.setDate(currentDate.getDate() - 1000);
const formattedStartDate = startDate.toISOString();

// Slice de Redux
const toolBarSlice = createSlice({
  name: 'toolBar',
  initialState: {
    temporalidad: initialTemporalidad,
    currentDate: formattedCurrentDate,
    startDate: formattedStartDate,
  },
  reducers: {
    setTemporalidad: (state, action) => {
      state.temporalidad = action.payload;
    },
    setCurrentDate: (state, action) => {
      state.currentDate = action.payload;
    },
    setStartDate: (state, action) => {
      state.startDate = action.payload;
    },
  },
});

// Exportar las acciones
export const { setTemporalidad, setCurrentDate, setStartDate } = toolBarSlice.actions;

// Exportar el reducer
export default toolBarSlice.reducer;
