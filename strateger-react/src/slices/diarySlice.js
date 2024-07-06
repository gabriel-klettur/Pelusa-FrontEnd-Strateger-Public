import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid'; // Importamos uuid para generar IDs únicos

const initialState = {
  entries: [], // Lista de entradas del diario
};

const diarySlice = createSlice({
  name: 'diary',
  initialState,
  reducers: {
    addEntry: (state, action) => {
      const newEntry = { ...action.payload, id: uuidv4() }; // Asignar un ID único
      state.entries.push(newEntry);
    },
    updateEntry: (state, action) => {
      const index = state.entries.findIndex(entry => entry.id === action.payload.id);
      if (index !== -1) {
        state.entries[index] = action.payload;
      }
    },
    deleteEntry: (state, action) => {
      state.entries = state.entries.filter(entry => entry.id !== action.payload);
    },
  },
});

export const { addEntry, updateEntry, deleteEntry } = diarySlice.actions;
export default diarySlice.reducer;
