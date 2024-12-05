
//Path: src/redux/interaction/interactionslice.jsx

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  Chart: {
    ButtonsPanel: {
        ChartButtons:{
            stochasticButton: false,
            emasButton: false,
            candleStickButton: false,
        },
        AlarmButtons:{
            alarmsButton: true,
            selectedAlarmsButton: false,
            filteredAlarmsButton: false,
        },
        OrderButtons:{
            ordersUsdmButton: false,
            ordersCoinmButton: false,
            ordersSpotButton: false,
            ordersStandardButton: false,
        }
    },
  },
  Alarms: {
    alarmTab: true,
    selectedAlarmTab: false,
    filteredAlarmTab: false,
  },
};

const interactionSlice = createSlice({
  name: 'interaction',
  initialState,
  reducers: {    
    setToggleAlarmTab(state, action) {
        const { tabReduxId } = action.payload;
        // Desactiva todos los tabs
        Object.keys(state.Alarms).forEach((key) => {
          state.Alarms[key] = false;
        });
        // Activa solo el tab seleccionado
        state.Alarms[tabReduxId] = true;
      },
    setToggleChartAlarmButtons(state, action) {
      const { buttonReduxId } = action.payload;
      // Desactiva todos los AlarmButtons
      Object.keys(state.Chart.ButtonsPanel.AlarmButtons).forEach((key) => {
        state.Chart.ButtonsPanel.AlarmButtons[key] = false;
      });
      // Activa solo el botón seleccionado
      state.Chart.ButtonsPanel.AlarmButtons[buttonReduxId] = true;
    },
    setToggleOrderButton(state, action) {
      const { buttonReduxId } = action.payload;
      // Alterna el estado del botón especificado
      state.Chart.ButtonsPanel.OrderButtons[buttonReduxId] = !state.Chart.ButtonsPanel.OrderButtons[buttonReduxId];
    },
    
  },

});

export const { setToggleChartAlarmButtons, setToggleAlarmTab, setToggleOrderButton } = interactionSlice.actions;

export default interactionSlice.reducer;
