
//Path: src/redux/interaction/interactionslice.jsx

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  Chart: {
    ButtonsPanel: {
        ChartButtons:{
            stochasticButton: false,
            emasButton: false,
            candleStickButton: true,
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
    //TODO ------------ Chart Buttons ------------//

    setToggleChartMainButtons(state, action){
      const  buttonReduxId  = action.payload;      
      state.Chart.ButtonsPanel.ChartButtons[buttonReduxId] = !state.Chart.ButtonsPanel.ChartButtons[buttonReduxId];
    },

    setToggleChartAlarmButtons(state, action) {
      const buttonReduxId = action.payload;
      console.log('buttonReduxId', buttonReduxId);
    
      // Si el botón ya está activo, desactívalo
      if (state.Chart.ButtonsPanel.AlarmButtons[buttonReduxId]) {
        Object.keys(state.Chart.ButtonsPanel.AlarmButtons).forEach((key) => {
          state.Chart.ButtonsPanel.AlarmButtons[key] = false;
        });
        // El botón seleccionado también debe desactivarse
        state.Chart.ButtonsPanel.AlarmButtons[buttonReduxId] = false;
      } else {
        // Si el botón está inactivo, desactiva todos y activa solo el seleccionado
        Object.keys(state.Chart.ButtonsPanel.AlarmButtons).forEach((key) => {
          state.Chart.ButtonsPanel.AlarmButtons[key] = false;
        });
        state.Chart.ButtonsPanel.AlarmButtons[buttonReduxId] = true;
      }
    },
    
    setToggleOrderButton(state, action) {
      const buttonReduxId = action.payload;
      //! Desactiva todos los OrderButtons
      Object.keys(state.Chart.ButtonsPanel.OrderButtons).forEach((key) => {
        state.Chart.ButtonsPanel.OrderButtons[key] = false;
      });
      //! Activa solo el botón seleccionado
      state.Chart.ButtonsPanel.OrderButtons[buttonReduxId] = true;
    },

    //TODO ------------ Alarm Tabs ------------//
    setToggleAlarmTab(state, action) {
      const { tabReduxId } = action.payload;
      //! Desactiva todos los tabs
      Object.keys(state.Alarms).forEach((key) => {
        state.Alarms[key] = false;
      });
      //! Activa solo el tab seleccionado
      state.Alarms[tabReduxId] = true;
  },
    
  },

});

export const { setToggleChartMainButtons, setToggleChartAlarmButtons, setToggleOrderButton, setToggleAlarmTab } = interactionSlice.actions;

export default interactionSlice.reducer;
