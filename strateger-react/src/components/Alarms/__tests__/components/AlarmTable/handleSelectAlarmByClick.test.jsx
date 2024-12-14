import handleSelectAlarm from '../../../../Alarms/components/AlarmTable/handleSelectAlarm';
import { setFilteredByClickAlarms } from '../../../../../redux/alarm/alarmSlice';

// 🔥 Simular la acción de Redux
jest.mock('../../../../../redux/alarm/alarmSlice', () => ({
  setFilteredByClickAlarms: jest.fn()
}));

describe('handleSelectAlarm', () => {
  let dispatch;

  beforeEach(() => {
    dispatch = jest.fn(); // Simular la función dispatch
    jest.clearAllMocks(); // Limpiar los mocks antes de cada prueba
  });

  it('should add an alarm to the selected alarms array when it is not already selected', () => {
    const alarm = { id: 1, name: 'Test Alarm' };
    const selectedAlarmsByClicks = []; // 🔥 El array está vacío al principio
    
    handleSelectAlarm(alarm, selectedAlarmsByClicks, dispatch);
    
    // Verificar que setFilteredByClickAlarms fue llamado con el array que contiene la nueva alarma
    expect(dispatch).toHaveBeenCalledWith(setFilteredByClickAlarms([{ id: 1, name: 'Test Alarm' }]));
  });

  it('should remove an alarm from the selected alarms array when it is already selected', () => {
    const alarm = { id: 1, name: 'Test Alarm' };
    const selectedAlarmsByClicks = [{ id: 1, name: 'Test Alarm' }, { id: 2, name: 'Another Alarm' }]; // 🔥 El array ya contiene la alarma
    
    handleSelectAlarm(alarm, selectedAlarmsByClicks, dispatch);
    
    // Verificar que setFilteredByClickAlarms fue llamado con el array que no contiene la alarma eliminada
    expect(dispatch).toHaveBeenCalledWith(setFilteredByClickAlarms([{ id: 2, name: 'Another Alarm' }]));
  });

  it('should dispatch an action with a new array containing only the clicked alarm if selectedAlarmsByClicks is empty', () => {
    const alarm = { id: 1, name: 'Test Alarm' };
    const selectedAlarmsByClicks = []; // 🔥 Array vacío
    
    handleSelectAlarm(alarm, selectedAlarmsByClicks, dispatch);
    
    // Verificar que setFilteredByClickAlarms fue llamado con un array que contiene la alarma seleccionada
    expect(dispatch).toHaveBeenCalledWith(setFilteredByClickAlarms([{ id: 1, name: 'Test Alarm' }]));
  });

  it('should remove the alarm from the array if it is already in selectedAlarmsByClicks', () => {
    const alarm = { id: 1, name: 'Test Alarm' };
    const selectedAlarmsByClicks = [{ id: 1, name: 'Test Alarm' }, { id: 2, name: 'Another Alarm' }]; // 🚀 La alarma ya está en la lista
    
    handleSelectAlarm(alarm, selectedAlarmsByClicks, dispatch);
    
    // Verificar que setFilteredByClickAlarms fue llamado con un array que ya no contiene la alarma seleccionada
    expect(dispatch).toHaveBeenCalledWith(setFilteredByClickAlarms([{ id: 2, name: 'Another Alarm' }]));
  });

});
