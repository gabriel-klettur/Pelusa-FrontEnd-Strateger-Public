import { renderHook } from '@testing-library/react';
import useGenerateChartData from '../../../../../components/AlarmInfoPanel/AlarmsBarChart/hooks/useGenerateChartData';

describe('useGenerateChartData', () => {
  it('should not call setChartData when alarmsData is empty', () => {
    const setChartData = jest.fn();
    
    renderHook(() => 
      useGenerateChartData({ 
        alarmsData: [], 
        visibleMonths: Array(12).fill(true), 
        setChartData, 
        monthsLabels: [] 
      })
    );

    expect(setChartData).not.toHaveBeenCalled();
  });

  it('should call setChartData with the correct chart data', () => {
    const setChartData = jest.fn();
    
    const alarmsData = [
      { Time_Alert: '2024-01-15T10:30:00Z', Interval: '5m' },
      { Time_Alert: '2024-02-20T12:00:00Z', Interval: '15m' },
      { Time_Alert: '2024-03-10T08:45:00Z', Interval: '1h' },
      { Time_Alert: '2024-03-15T08:45:00Z', Interval: '1h' }, // Otro en el mismo mes
      { Time_Alert: '2024-03-25T08:45:00Z', Interval: '1h' }, // Otro en el mismo mes
      { Time_Alert: '2024-12-10T08:45:00Z', Interval: '4h' },
    ];
    
    const visibleMonths = Array(12).fill(true);
    const monthsLabels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    
    renderHook(() => 
      useGenerateChartData({ 
        alarmsData, 
        visibleMonths, 
        setChartData, 
        monthsLabels 
      })
    );

    expect(setChartData).toHaveBeenCalledTimes(1);
    
    const expectedChartData = {
      labels: monthsLabels,
      datasets: expect.arrayContaining([
        expect.objectContaining({
          label: '5m',
          data: expect.any(Array),
        }),
        expect.objectContaining({
          label: '15m',
          data: expect.any(Array),
        }),
        expect.objectContaining({
          label: '1h',
          data: expect.any(Array),
        }),
        expect.objectContaining({
          label: '4h',
          data: expect.any(Array),
        }),
      ]),
    };

    expect(setChartData).toHaveBeenCalledWith(expectedChartData);
  });

  it('should not call setChartData if alarmsData is null', () => {
    const setChartData = jest.fn();
    
    renderHook(() => 
      useGenerateChartData({ 
        alarmsData: null, 
        visibleMonths: Array(12).fill(true), 
        setChartData, 
        monthsLabels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'] 
      })
    );

    expect(setChartData).not.toHaveBeenCalled();
  });

  it('should not call setChartData if alarmsData is undefined', () => {
    const setChartData = jest.fn();
    
    renderHook(() => 
      useGenerateChartData({ 
        alarmsData: undefined, 
        visibleMonths: Array(12).fill(true), 
        setChartData, 
        monthsLabels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'] 
      })
    );

    expect(setChartData).not.toHaveBeenCalled();
  });

  it('should filter labels and datasets according to visibleMonths', () => {
    const setChartData = jest.fn();
    
    const alarmsData = [
      { Time_Alert: '2024-01-15T10:30:00Z', Interval: '5m' },
      { Time_Alert: '2024-02-20T12:00:00Z', Interval: '15m' },
      { Time_Alert: '2024-03-10T08:45:00Z', Interval: '1h' },
      { Time_Alert: '2024-12-10T08:45:00Z', Interval: '4h' },
    ];
    
    const visibleMonths = [true, false, true, false, false, false, false, false, false, false, false, true]; // Solo Enero, Marzo y Diciembre son visibles
    const monthsLabels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    
    renderHook(() => 
      useGenerateChartData({ 
        alarmsData, 
        visibleMonths, 
        setChartData, 
        monthsLabels 
      })
    );

    const expectedChartData = {
      labels: ['Enero', 'Marzo', 'Diciembre'], // Solo los meses visibles
      datasets: expect.arrayContaining([
        expect.objectContaining({
          label: '5m',
          data: expect.any(Array),
        }),
        expect.objectContaining({
          label: '15m',
          data: expect.any(Array),
        }),
        expect.objectContaining({
          label: '1h',
          data: expect.any(Array),
        }),
        expect.objectContaining({
          label: '4h',
          data: expect.any(Array),
        }),
      ]),
    };

    expect(setChartData).toHaveBeenCalledWith(expectedChartData);
  });

  it('should handle alarms with invalid or malformed data', () => {
    const setChartData = jest.fn();
    
    const alarmsData = [
      { Time_Alert: '2024-01-15T10:30:00Z', Interval: '5m' }, // válida
      { Time_Alert: 'invalid-date', Interval: '15m' }, // fecha inválida
      { Time_Alert: '2024-02-20T12:00:00Z', Interval: 'unsupported-interval' }, // intervalo no soportado
      { Time_Alert: undefined, Interval: '1h' }, // sin fecha de Time_Alert
      { Interval: '1h' }, // falta Time_Alert
      { Time_Alert: '2024-03-10T08:45:00Z' }, // falta Interval
      null, // alarma nula
      undefined, // alarma indefinida
    ];
    
    const visibleMonths = Array(12).fill(true); // Todos los meses visibles
    const monthsLabels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    
    renderHook(() => 
      useGenerateChartData({ 
        alarmsData, 
        visibleMonths, 
        setChartData, 
        monthsLabels 
      })
    );

    const expectedChartData = {
      labels: monthsLabels, // Deben ser los 12 meses
      datasets: expect.arrayContaining([
        expect.objectContaining({
          label: '5m',
          data: expect.any(Array),
        }),
        expect.objectContaining({
          label: '1h',
          data: expect.any(Array),
        }),
      ]),
    };

    expect(setChartData).toHaveBeenCalledWith(expectedChartData);
  });

});