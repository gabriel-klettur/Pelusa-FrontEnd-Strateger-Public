import { renderHook, act } from '@testing-library/react';
import useUpdateVisibleMonths from '../../../../../../Alarms/components/AlarmInfoPanel/AlarmsBarChart/hooks/useUpdateVisibleMonths';

describe('useUpdateVisibleMonths', () => {

  it('should return initial state when alarmsData is empty', () => {
    const { result } = renderHook(() => 
      useUpdateVisibleMonths({ 
        alarmsData: [], 
        monthsLabels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'] 
      })
    );

    expect(result.current.visibleMonths).toEqual(Array(12).fill(false));
  });

  it('should correctly update visible months based on alarmsData', () => {
    const alarmsData = [
      { Time_Alert: '2024-01-15T10:30:00Z', Interval: '5m' }, // Enero
      { Time_Alert: '2024-03-20T08:45:00Z', Interval: '15m' }, // Marzo
      { Time_Alert: '2024-12-25T12:00:00Z', Interval: '1h' }, // Diciembre
    ];

    const monthsLabels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    const { result } = renderHook(() => 
      useUpdateVisibleMonths({ 
        alarmsData, 
        monthsLabels 
      })
    );

    expect(result.current.visibleMonths).toEqual([
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

  it('should return initial state if alarmsData is null', () => {
    const { result } = renderHook(() => 
      useUpdateVisibleMonths({ 
        alarmsData: null, 
        monthsLabels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'] 
      })
    );

    expect(result.current.visibleMonths).toEqual(Array(12).fill(false));
  });

  it('should return initial state if alarmsData is undefined', () => {
    const { result } = renderHook(() => 
      useUpdateVisibleMonths({ 
        alarmsData: undefined, 
        monthsLabels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'] 
      })
    );

    expect(result.current.visibleMonths).toEqual(Array(12).fill(false));
  });

  it('should toggle the visibility of a month when toggleMonth is called', () => {
    const alarmsData = [
      { Time_Alert: '2024-01-15T10:30:00Z', Interval: '5m' }, // Enero
    ];

    const monthsLabels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    const { result } = renderHook(() => 
      useUpdateVisibleMonths({ 
        alarmsData, 
        monthsLabels 
      })
    );

    expect(result.current.visibleMonths).toEqual([
      true,  // Enero
      false, // Febrero
      false, // Marzo
      false, // Abril
      false, // Mayo
      false, // Junio
      false, // Julio
      false, // Agosto
      false, // Septiembre
      false, // Octubre
      false, // Noviembre
      false  // Diciembre
    ]);

    // Actuar para alternar el mes de Enero (índice 0)
    act(() => {
      result.current.toggleMonth(0);
    });

    expect(result.current.visibleMonths).toEqual([
      false, // Enero (se alternó)
      false, // Febrero
      false, // Marzo
      false, // Abril
      false, // Mayo
      false, // Junio
      false, // Julio
      false, // Agosto
      false, // Septiembre
      false, // Octubre
      false, // Noviembre
      false  // Diciembre
    ]);

    // Alternar nuevamente el mes de Enero (índice 0)
    act(() => {
      result.current.toggleMonth(0);
    });

    expect(result.current.visibleMonths).toEqual([
      true,  // Enero (vuelve a su estado inicial)
      false, // Febrero
      false, // Marzo
      false, // Abril
      false, // Mayo
      false, // Junio
      false, // Julio
      false, // Agosto
      false, // Septiembre
      false, // Octubre
      false, // Noviembre
      false  // Diciembre
    ]);
  });
});
