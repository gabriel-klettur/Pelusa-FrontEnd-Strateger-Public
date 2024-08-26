  
  
  import { setSelectedAlarms } from '../../../../redux/slices/alarmSlice';

  const handleSelectAlarm = (alarm, selectedAlarms, dispatch) => {

    let newSelectedAlarms;    
    const isSelected = selectedAlarms.some((a) => a.id === alarm.id);
    if (isSelected) {
      newSelectedAlarms = selectedAlarms.filter((a) => a.id !== alarm.id);
    } else {
      newSelectedAlarms = [...selectedAlarms, alarm];
    }
    dispatch(setSelectedAlarms(newSelectedAlarms));
  };

  export default handleSelectAlarm;