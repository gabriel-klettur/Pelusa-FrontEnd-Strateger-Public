import { useDispatch } from 'react-redux';
import { setFilteredByClickAlarms } from 'reduxStore/alarm';

/**
 * Custom hook to handle alarm selection by click.
 * 
 * @param {Array} selectedAlarmsByClicks - Array of alarms selected by click.
 * @returns {Function} A function to handle the selection of an alarm.
 */
const useHandleSelectAlarm = (selectedAlarmsByClicks) => {
  const dispatch = useDispatch();

  const handleSelectAlarm = (alarm) => {
    const isSelected = selectedAlarmsByClicks.some((a) => a.id === alarm.id);
    const newSelectedAlarms = isSelected
      ? selectedAlarmsByClicks.filter((a) => a.id !== alarm.id)
      : [...selectedAlarmsByClicks, alarm];

    dispatch(setFilteredByClickAlarms(newSelectedAlarms));
  };

  return handleSelectAlarm;
};

export default useHandleSelectAlarm;
