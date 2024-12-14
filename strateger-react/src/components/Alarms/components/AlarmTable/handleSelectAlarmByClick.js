  //Path: src/components/Alarms/components/AlarmTable/handleSelectAlarmByClick.js

  
  import { setFilteredByClickAlarms } from '../../../../redux/alarm';

  /**
   * Handles the selection of an alarm by click.
   * 
   * @param {Object} alarm -  The object that represents the alarm that was clicked.
   * @param {Array} selectedAlarmsByClicks - Array that contains the alarms that were selected by click.
   * @param {Function} dispatch - The dispatch function from Redux.
   * @returns {void}
   */
  const handleSelectAlarmByClick = (alarm, selectedAlarmsByClicks, dispatch) => {
    
    let newSelectedAlarms;    
    const isSelected = selectedAlarmsByClicks.some((a) => a.id === alarm.id);
    if (isSelected) {
      newSelectedAlarms = selectedAlarmsByClicks.filter((a) => a.id !== alarm.id);
    } else {
      newSelectedAlarms = [...selectedAlarmsByClicks, alarm];
    }    
    dispatch(setFilteredByClickAlarms(newSelectedAlarms));   
  };

  export default handleSelectAlarmByClick;