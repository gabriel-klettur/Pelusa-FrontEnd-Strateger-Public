
export const selectAlarmTab = (state) => state.interaction.Alarms.alarmTab;
export const selectSelectedAlarmTab = (state) => state.interaction.Alarms.selectedAlarmTab;
export const selectFilteredAlarmTab = (state) => state.interaction.Alarms.filteredAlarmTab;

export const selectAlarmButtons = (state) => state.interaction.Chart.ButtonsPanel.AlarmButtons.alarmsButton;
export const selectSelectedAlarmsButton = (state) => state.interaction.Chart.ButtonsPanel.AlarmButtons.selectedAlarmsButton;
export const selectFilteredAlarmsButton = (state) => state.interaction.Chart.ButtonsPanel.AlarmButtons.filteredAlarmsButton;
