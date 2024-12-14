

export const selectChartStochasticButton = (state) => state.interaction.Chart.ButtonsPanel.ChartButtons.stochasticButton;
export const selectChartEmasButton = (state) => state.interaction.Chart.ButtonsPanel.ChartButtons.emasButton;
export const selectChartCandleStickButton = (state) => state.interaction.Chart.ButtonsPanel.ChartButtons.candleStickButton;

export const selectAlarmButtons = (state) => state.interaction.Chart.ButtonsPanel.AlarmButtons.alarms;
export const selectSelectedAlarmsButton = (state) => state.interaction.Chart.ButtonsPanel.AlarmButtons.selected;
export const selectFilteredAlarmsButton = (state) => state.interaction.Chart.ButtonsPanel.AlarmButtons.filtered;

export const selectOrdersUsdtmButton = (state) => state.interaction.Chart.ButtonsPanel.OrderButtons.ordersUsdmButton;
export const selectOrdersCoinmButton = (state) => state.interaction.Chart.ButtonsPanel.OrderButtons.ordersCoinmButton;
export const selectOrdersSpotButton = (state) => state.interaction.Chart.ButtonsPanel.OrderButtons.ordersSpotButton;
export const selectOrdersStandardButton = (state) => state.interaction.Chart.ButtonsPanel.OrderButtons.ordersStandardButton;

export const selectAlarmTab = (state) => state.interaction.Alarms.Tabs.alarms;
export const selectSelectedAlarmTab = (state) => state.interaction.Alarms.Tabs.selected;
export const selectFilteredAlarmTab = (state) => state.interaction.Alarms.Tabs.filtered;

export const selectActiveRadarDataset = (state) => state.interaction.activeRadarDataset;