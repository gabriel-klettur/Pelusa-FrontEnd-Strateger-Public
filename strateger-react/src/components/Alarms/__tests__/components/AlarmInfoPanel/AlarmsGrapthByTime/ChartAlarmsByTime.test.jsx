// Path: strateger-react/src/components/Alarms/__tests__/components/AlarmInfoPanel/AlarmsGraphByTime/AlarmsGraphByTime.test.jsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import AlarmsGraphByTime from '../../../../../Alarms/components/AlarmInfoPanel/AlarmsGraphByTime/ChartAlarmsByTime';
import interactionReducer from '../../../../../../redux/interaction/interactionSlice';

// **1. Estado inicial de Redux**
const initialState = {
  interaction: {
    activeRadarDataset: 'alarms',
  },
};

// **2. Datos de ejemplo (fakeData)**
const fakeData = {
  alarmsByHour: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
  alarmsByHourFilteredByClick: [2, 1, 0, 5, 0, 1, 2, 1, 3, 5, 6, 2, 1, 0, 2, 1, 2, 3, 4, 1, 2, 5, 0, 1],
  alarmsByHourFilteredByOptions: [0, 0, 1, 1, 0, 0, 2, 1, 0, 1, 0, 2, 1, 3, 0, 2, 1, 0, 1, 3, 0, 1, 2, 0],
};

// **3. Configuración de la store de Redux**
const storeWithTestState = configureStore({
  reducer: {
    interaction: interactionReducer,
  },
  preloadedState: initialState,
});

describe('AlarmsGraphByTime - Renderización inicial', () => {
  
  it('Debe renderizarse correctamente sin errores', () => {
    // Render del componente
    render(
      <Provider store={storeWithTestState}>
        <AlarmsGraphByTime 
          alarmsByHour={fakeData.alarmsByHour} 
          alarmsByHourFilteredByClick={fakeData.alarmsByHourFilteredByClick} 
          alarmsByHourFilteredByOptions={fakeData.alarmsByHourFilteredByOptions} 
        />
      </Provider>
    );

    // Verificar que se renderizó correctamente el contenedor principal

    const container = screen.getByTestId('alarms-graph-container');
    expect(container).toBeInTheDocument();
    
  });

  it('Debe mostrar el gráfico de tipo Radar', () => {
    // Render del componente
    render(
      <Provider store={storeWithTestState}>
        <AlarmsGraphByTime 
          alarmsByHour={fakeData.alarmsByHour} 
          alarmsByHourFilteredByClick={fakeData.alarmsByHourFilteredByClick} 
          alarmsByHourFilteredByOptions={fakeData.alarmsByHourFilteredByOptions} 
        />
      </Provider>
    );

    // Verificar que el Radar Chart de Chart.js está presente
    const radarChart = screen.getByLabelText('radar-chart'); 
    expect(radarChart).toBeInTheDocument();
    expect(radarChart.tagName).toBe('CANVAS'); // Asegurarse de que sea un <canvas>    
  });    
});
