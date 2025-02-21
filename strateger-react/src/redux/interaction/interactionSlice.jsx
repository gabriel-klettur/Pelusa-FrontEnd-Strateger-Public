// Path: src/redux/interaction/interactionslice.jsx

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  Chart: {
    ToolsPanel: {
      selectedChartTool: null,
    },
    ButtonsPanel: {
      ChartButtons: {
        stochasticButton: false,
        emasButton: false,
        candleStickButton: true,
        sqzMomentumButton: false,
        rsiButton: false,
        adxButton: false,
      },
      AlarmButtons: {
        alarms: true,
        selected: false,
        filtered: false,
      },
      OrderButtons: {
        ordersUsdmButton: false,
        ordersCoinmButton: false,
        ordersSpotButton: false,
        ordersStandardButton: false,
      },
    },
  },
  Alarms: {
    Tabs: {
      alarms: true,
      selected: false,
      filtered: false,
    },
  },
  activeRadarDataset: 'alarms',
};

const interactionSlice = createSlice({
  name: 'interaction',
  initialState,
  reducers: {
    setSelectedChartTool(state, action) {
      state.Chart.ToolsPanel.selectedChartTool = action.payload;
    },
    setActiveRadarDataset(state, action) {
      state.activeRadarDataset = action.payload;
    },    
    setToggleChartMainButtons(state, action) {
      const buttonReduxId = action.payload;
      state.Chart.ButtonsPanel.ChartButtons[buttonReduxId] =
        !state.Chart.ButtonsPanel.ChartButtons[buttonReduxId];
    },    
    setToggleChartAlarmButtons(state, action) {
      const buttonReduxId = action.payload;
      if (state.Chart.ButtonsPanel.AlarmButtons[buttonReduxId]) {        
        Object.keys(state.Chart.ButtonsPanel.AlarmButtons).forEach((key) => {
          state.Chart.ButtonsPanel.AlarmButtons[key] = false;
        });
      } else {        
        Object.keys(state.Chart.ButtonsPanel.AlarmButtons).forEach((key) => {
          state.Chart.ButtonsPanel.AlarmButtons[key] = false;
        });
        state.Chart.ButtonsPanel.AlarmButtons[buttonReduxId] = true;
      }
    },    
    setToggleOrderButton(state, action) {
      const buttonReduxId = action.payload;
      Object.keys(state.Chart.ButtonsPanel.OrderButtons).forEach((key) => {
        state.Chart.ButtonsPanel.OrderButtons[key] = false;
      });
      state.Chart.ButtonsPanel.OrderButtons[buttonReduxId] = true;
    },    
    setToggleAlarmTab(state, action) {
      const { tabReduxId } = action.payload;
      Object.keys(state.Alarms.Tabs).forEach((key) => {
        state.Alarms.Tabs[key] = false;
      });
      state.Alarms.Tabs[tabReduxId] = true;
    },    
    setActiveTab(state, action) {
      const { tabReduxId } = action.payload;
      Object.keys(state.Alarms.Tabs).forEach((key) => {
        state.Alarms.Tabs[key] = false;
      });
      state.Alarms.Tabs[tabReduxId] = true;
      Object.keys(state.Chart.ButtonsPanel.AlarmButtons).forEach((key) => {
        state.Chart.ButtonsPanel.AlarmButtons[key] = false;
      });
      state.Chart.ButtonsPanel.AlarmButtons[tabReduxId] = true;
    },    
    setActiveButton(state, action) {
      const { buttonReduxId } = action.payload;
      Object.keys(state.Chart.ButtonsPanel.AlarmButtons).forEach((key) => {
        state.Chart.ButtonsPanel.AlarmButtons[key] = false;
      });
      state.Chart.ButtonsPanel.AlarmButtons[buttonReduxId] = true;
      Object.keys(state.Alarms.Tabs).forEach((key) => {
        state.Alarms.Tabs[key] = false;
      });
      state.Alarms.Tabs[buttonReduxId] = true;
    },
  },
});

export const {
  setToggleChartMainButtons,
  setToggleChartAlarmButtons,
  setToggleOrderButton,
  setToggleAlarmTab,
  setActiveTab,
  setActiveButton,
  setActiveRadarDataset,
  setSelectedChartTool,
} = interactionSlice.actions;

export default interactionSlice.reducer;
