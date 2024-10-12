  //Path: src/components/Alarms/components/AlarmTable/handleSelectAlarmByClick.js

  
  import { setFilteredByClickAlarms } from '../../../../redux/slices/alarmSlice';

  /**
   * Handles the selection of an alarm by click.
   * 
   * @param {Object} alarm -  Es el objeto de alarma que se ha clicado
   * @param {Array} selectedAlarmsByClicks - Array que contiene todas las alarmas que han sido seleccionadas mediante click
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