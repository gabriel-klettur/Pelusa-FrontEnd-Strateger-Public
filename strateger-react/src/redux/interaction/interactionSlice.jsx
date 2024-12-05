
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
  },

});

export const { setToggleChartAlarmButtons, setToggleAlarmTab } = interactionSlice.actions;

export default interactionSlice.reducer;
