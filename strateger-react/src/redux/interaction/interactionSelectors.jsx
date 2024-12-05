

export const selectChartStochasticButton = (state) => state.interaction.Chart.ButtonsPanel.StochasticButtons.stochasticButton;
export const selectChartEmasButton = (state) => state.interaction.Chart.ButtonsPanel.EmasButtons.emasButton;
export const selectChartCandleStickButton = (state) => state.interaction.Chart.ButtonsPanel.CandleStickButtons.candleStickButton;

export const selectAlarmButtons = (state) => state.interaction.Chart.ButtonsPanel.AlarmButtons.alarmsButton;
export const selectSelectedAlarmsButton = (state) => state.interaction.Chart.ButtonsPanel.AlarmButtons.selectedAlarmsButton;
export const selectFilteredAlarmsButton = (state) => state.interaction.Chart.ButtonsPanel.AlarmButtons.filteredAlarmsButton;

export const selectOrdersUsdtmButton = (state) => state.interaction.Chart.ButtonsPanel.OrderButtons.ordersUsdmButton;
export const selectOrdersCoinmButton = (state) => state.interaction.Chart.ButtonsPanel.OrderButtons.ordersCoinmButton;
export const selectOrdersSpotButton = (state) => state.interaction.Chart.ButtonsPanel.OrderButtons.ordersSpotButton;
export const selectOrdersStandardButton = (state) => state.interaction.Chart.ButtonsPanel.OrderButtons.ordersStandardButton;

export const selectAlarmTab = (state) => state.interaction.Alarms.alarmTab;
export const selectSelectedAlarmTab = (state) => state.interaction.Alarms.selectedAlarmTab;
export const selectFilteredAlarmTab = (state) => state.interaction.Alarms.filteredAlarmTab;