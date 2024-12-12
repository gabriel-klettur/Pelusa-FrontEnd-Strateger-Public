import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import AlarmsGraphByTime from '../../../../components/AlarmInfoPanel/AlarmsGraphByTime/ChartAlarmsByTime';

// 🔥 Mockear react-chartjs-2
jest.mock('react-chartjs-2', () => ({
  Radar: () => <div data-testid="mocked-radar-chart" /> // Simulamos la creación de un Radar
}));

const mockStore = configureStore([]);

describe('AlarmsGraphByTime', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      interaction: {
        activeRadarDataset: 'alarms',
      }
    });
  });

  it('should render AlarmsGraphByTime correctly', () => {
    render(
      <Provider store={store}>
        <AlarmsGraphByTime 
          alarmsByHour={[10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220, 230, 240]} 
          alarmsByHourFilteredByClick={[]} 
          alarmsByHourFilteredByOptions={[]} 
        />
      </Provider>
    );

    // Verificar que el contenedor principal esté presente
    expect(screen.getByTestId('alarms-graph-container')).toBeInTheDocument();

    // 🔥 Verificar que el radar gráfico simulado esté presente
    expect(screen.getByTestId('mocked-radar-chart')).toBeInTheDocument();
  });
});