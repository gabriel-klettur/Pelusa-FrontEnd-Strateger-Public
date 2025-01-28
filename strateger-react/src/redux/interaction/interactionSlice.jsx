
//Path: src/redux/interaction/interactionslice.jsx

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  Chart: {
    ButtonsPanel: {
        ChartButtons:{
            stochasticButton: false,
            emasButton: false,
            candleStickButton: true,
            sqzMomentumButton: false,
            rsiButton: false,
            adxButton: false,
        },
        AlarmButtons:{
            alarms: true,
            selected: false,
            filtered: false,
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
    Tabs:{
      alarms: true,
      selected: false,
      filtered: false,
    },
  },
  activeRadarDataset: 'alarms', // Valores posibles: 'alarms', 'selected', 'filtered'
};

const interactionSlice = createSlice({
  name: 'interaction',
  initialState,
  reducers: {  

    //TODO ------------ Radar Dataset ------------//
    setActiveRadarDataset(state, action) {
      state.activeRadarDataset = action.payload;
    },  
    //TODO ------------ Chart Buttons ------------//

    setToggleChartMainButtons(state, action){
      const  buttonReduxId  = action.payload;      
      state.Chart.ButtonsPanel.ChartButtons[buttonReduxId] = !state.Chart.ButtonsPanel.ChartButtons[buttonReduxId];
    },

    setToggleChartAlarmButtons(state, action) {
      const buttonReduxId = action.payload;      
    
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
      Object.keys(state.Alarms.Tabs).forEach((key) => {
        state.Alarms.Tabs[key] = false;
      });
      //! Activa solo el tab seleccionado
      state.Alarms.Tabs[tabReduxId] = true;
    },

    //! ---------------- Syncronize Chart Buttons with Alarm Tabs ---------------- //
    setActiveTab(state, action) {  
      const { tabReduxId } = action.payload;

      // Desactiva todos los tabs
      Object.keys(state.Alarms.Tabs).forEach((key) => {
        state.Alarms.Tabs[key] = false;
      });

      // Activa el tab seleccionado
      state.Alarms.Tabs[tabReduxId] = true;

      // Sincroniza el botón correspondiente
      Object.keys(state.Chart.ButtonsPanel.AlarmButtons).forEach((key) => {
        state.Chart.ButtonsPanel.AlarmButtons[key] = false;
      });
      state.Chart.ButtonsPanel.AlarmButtons[tabReduxId] = true;
    },

    //! ---------------- Syncronize Alarm Tabs with Chart Buttons ---------------- //
    setActiveButton(state, action) {      
      const { buttonReduxId } = action.payload;

      // Desactiva todos los botones
      Object.keys(state.Chart.ButtonsPanel.AlarmButtons).forEach((key) => {
        state.Chart.ButtonsPanel.AlarmButtons[key] = false;
      });

      // Activa el botón seleccionado
      state.Chart.ButtonsPanel.AlarmButtons[buttonReduxId] = true;

      // Sincroniza el tab correspondiente
      Object.keys(state.Alarms.Tabs).forEach((key) => {
        state.Alarms.Tabs[key] = false;
      });
      state.Alarms.Tabs[buttonReduxId] = true;
    },    
  },

});

export const { setToggleChartMainButtons, setToggleChartAlarmButtons, setToggleOrderButton, setToggleAlarmTab, setActiveTab, setActiveButton, setActiveRadarDataset } = interactionSlice.actions;

export default interactionSlice.reducer;
