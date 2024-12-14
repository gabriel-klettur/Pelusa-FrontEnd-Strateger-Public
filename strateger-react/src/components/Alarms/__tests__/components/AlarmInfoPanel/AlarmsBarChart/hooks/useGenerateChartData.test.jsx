import { renderHook } from '@testing-library/react';
import useGenerateBarChartData from '../../../../../components/AlarmInfoPanel/AlarmsBarChart/hooks/useGenerateBarChartData';

describe('useGenerateBarChartData', () => {

  it('should return initial state when alarmsData is empty', () => {
    const { result } = renderHook(() => 
      useGenerateBarChartData({ 
        alarmsData: [], 
        visibleMonths: Array(12).fill(true), 
        monthsLabels: [] 
      })
    );

    expect(result.current).toEqual({ labels: [], datasets: [] });
  });

  it('should generate correct chart data when alarmsData is provided', () => {
    const alarmsData = [
      { Time_Alert: '2024-01-15T10:30:00Z', Interval: '5m' },
      { Time_Alert: '2024-02-20T12:00:00Z', Interval: '15m' },
      { Time_Alert: '2024-03-10T08:45:00Z', Interval: '1h' },
      { Time_Alert: '2024-03-15T08:45:00Z', Interval: '1h' },
      { Time_Alert: '2024-03-25T08:45:00Z', Interval: '1h' },
      { Time_Alert: '2024-12-10T08:45:00Z', Interval: '4h' },
    ];

    const visibleMonths = Array(12).fill(true);
    const monthsLabels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    const { result } = renderHook(() => 
      useGenerateBarChartData({ 
        alarmsData, 
        visibleMonths, 
        monthsLabels 
      })
    );

    expect(result.current.labels).toEqual(monthsLabels);
    expect(result.current.datasets).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ label: '5m', data: expect.any(Array) }),
        expect.objectContaining({ label: '15m', data: expect.any(Array) }),
        expect.objectContaining({ label: '1h', data: expect.any(Array) }),
        expect.objectContaining({ label: '4h', data: expect.any(Array) }),
      ])
    );
  });

  it('should return initial state if alarmsData is null', () => {
    const { result } = renderHook(() => 
      useGenerateBarChartData({ 
        alarmsData: null, 
        visibleMonths: Array(12).fill(true), 
        monthsLabels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'] 
      })
    );

    expect(result.current).toEqual({ labels: [], datasets: [] });
  });

  it('should return initial state if alarmsData is undefined', () => {
    const { result } = renderHook(() => 
      useGenerateBarChartData({ 
        alarmsData: undefined, 
        visibleMonths: Array(12).fill(true), 
        monthsLabels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'] 
      })
    );

    expect(result.current).toEqual({ labels: [], datasets: [] });
  });

  it('should filter labels and datasets according to visibleMonths', () => {
    const alarmsData = [
      { Time_Alert: '2024-01-15T10:30:00Z', Interval: '5m' },
      { Time_Alert: '2024-02-20T12:00:00Z', Interval: '15m' },
      { Time_Alert: '2024-03-10T08:45:00Z', Interval: '1h' },
      { Time_Alert: '2024-12-10T08:45:00Z', Interval: '4h' },
    ];

    const visibleMonths = [true, false, true, false, false, false, false, false, false, false, false, true]; 
    const monthsLabels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    const { result } = renderHook(() => 
      useGenerateBarChartData({ 
        alarmsData, 
        visibleMonths, 
        monthsLabels 
      })
    );

    expect(result.current.labels).toEqual(['Enero', 'Marzo', 'Diciembre']);
    expect(result.current.datasets).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ label: '5m', data: expect.any(Array) }),
        expect.objectContaining({ label: '15m', data: expect.any(Array) }),
        expect.objectContaining({ label: '1h', data: expect.any(Array) }),
        expect.objectContaining({ label: '4h', data: expect.any(Array) }),
      ])
    );
  });

  it('should handle alarms with invalid or malformed data', () => {
    const alarmsData = [
      { Time_Alert: '2024-01-15T10:30:00Z', Interval: '5m' },
      { Time_Alert: 'invalid-date', Interval: '15m' },
      { Time_Alert: '2024-02-20T12:00:00Z', Interval: 'unsupported-interval' },
      { Time_Alert: undefined, Interval: '1h' },
      { Interval: '1h' },
      { Time_Alert: '2024-03-10T08:45:00Z' },
      null,
      undefined,
    ];

    const visibleMonths = Array(12).fill(true); 
    const monthsLabels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    const { result } = renderHook(() => 
      useGenerateBarChartData({ 
        alarmsData, 
        visibleMonths, 
        monthsLabels 
      })
    );

    expect(result.current.labels).toEqual(monthsLabels);
    expect(result.current.datasets).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ label: '5m', data: expect.any(Array) }),
        expect.objectContaining({ label: '1h', data: expect.any(Array) }),
      ])
    );
  });

});
