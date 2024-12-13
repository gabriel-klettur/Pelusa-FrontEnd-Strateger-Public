import { renderHook } from '@testing-library/react';
import useUpdateVisibleMonths from '../../../../../../Alarms/components/AlarmInfoPanel/AlarmsBarChart/hooks/useUpdateVisibleMonths';

describe('useUpdateVisibleMonths', () => {
  it('should not call setVisibleMonths if alarmsData is empty', () => {
    const setVisibleMonths = jest.fn();
    
    renderHook(() => 
      useUpdateVisibleMonths({ 
        alarmsData: [], 
        setVisibleMonths, 
        monthsLabels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'] 
      })
    );

    expect(setVisibleMonths).not.toHaveBeenCalled();
  });

  it('should call setVisibleMonths with the correct visible months', () => {
    const setVisibleMonths = jest.fn();
    
    const alarmsData = [
      { Time_Alert: '2024-01-15T10:30:00Z', Interval: '5m' }, // Enero
      { Time_Alert: '2024-03-20T08:45:00Z', Interval: '15m' }, // Marzo
      { Time_Alert: '2024-12-25T12:00:00Z', Interval: '1h' }, // Diciembre
    ];

    const monthsLabels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    renderHook(() => 
      useUpdateVisibleMonths({ 
        alarmsData, 
        setVisibleMonths, 
        monthsLabels 
      })
    );

    expect(setVisibleMonths).toHaveBeenCalledWith([
      true,  // Enero
      false, // Febrero
      true,  // Marzo
      false, // Abril
      false, // Mayo
      false, // Junio
      false, // Julio
      false, // Agosto
      false, // Septiembre
      false, // Octubre
      false, // Noviembre
      true   // Diciembre
    ]);
  });

  it('should not call setVisibleMonths if alarmsData is null', () => {
    const setVisibleMonths = jest.fn();
    
    renderHook(() => 
      useUpdateVisibleMonths({ 
        alarmsData: null, 
        setVisibleMonths, 
        monthsLabels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'] 
      })
    );

    expect(setVisibleMonths).not.toHaveBeenCalled();
  });

  it('should not call setVisibleMonths if alarmsData is undefined', () => {
    const setVisibleMonths = jest.fn();
    
    renderHook(() => 
      useUpdateVisibleMonths({ 
        alarmsData: undefined, 
        setVisibleMonths, 
        monthsLabels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'] 
      })
    );

    expect(setVisibleMonths).not.toHaveBeenCalled();
  });

});
