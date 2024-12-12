// Path: strateger-react/src/components/Alarms/__tests__/components/AlarmInfoPanel/AlarmsGraphByMonth/AlarmsGraphByMonth.test.jsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import AlarmsGraphByMonth from '../../../../components/AlarmInfoPanel/AlarmsGraphByMonth/AlarmsGraphByMonth';
import alarmReducer from '../../../../../../redux/alarm/alarmSlice';

jest.mock('../../../../components/AlarmInfoPanel/AlarmsGraphByMonth/hooks/useUpdateVisibleMonths', () => jest.fn());
jest.mock('../../../../components/AlarmInfoPanel/AlarmsGraphByMonth/hooks/useGenerateChartData', () => jest.fn());

// **1. Estado inicial de Redux**
const initialState = {
    alarms: {
      alarms: {
        data: [],
        length: 0,
        page: 0,
        offset: 0,
        hasMore: true,
      },      
    },
};

// **2. Datos de ejemplo (fakeData)**
const fakeAlarmsData = [
  { id: 1, Ticker: 'BTC', Interval: '15m', Price_Alert: 30000, Time_Alert: '2024-12-10', Order: 'Long', Strategy: 'Test' },
  { id: 2, Ticker: 'ETH', Interval: '5m', Price_Alert: 2000, Time_Alert: '2024-12-11', Order: 'Short', Strategy: 'Demo' },
  { id: 3, Ticker: 'BNB', Interval: '1h', Price_Alert: 500, Time_Alert: '2024-12-12', Order: 'Long', Strategy: 'Test' },
];

// Estado con datos para el test
const testState = {
    ...initialState,
    alarms: {
      ...initialState.alarms,
      alarms: {
        ...initialState.alarms.alarms,
        data: fakeAlarmsData,      
      },
    },
  };

// **3. Configuración de la store de Redux**
const storeWithTestState = configureStore({
    reducer: {
      alarms: alarmReducer,
    },
    preloadedState: testState,
});
  
jest.mock('react', () => {
    const originalReact = jest.requireActual('react');
    return {
      ...originalReact,
      useState: jest.fn(),
    };
});

describe('AlarmsGraphByMonth - Tests esenciales', () => {

    let useStateMock;

    beforeEach(() => {
        useStateMock = jest.fn()
        .mockImplementationOnce(() => [{ labels: [], datasets: [] }, jest.fn()])
        .mockImplementationOnce(() => [Array(12).fill(false), jest.fn()]);
        React.useState = useStateMock;
    });


    // **1. Renderización con datos**
    it('Debe renderizar el gráfico de barras y el panel de toggle de meses cuando hay datos de alarmas', () => {
        render(
        <Provider store={storeWithTestState}>
            <AlarmsGraphByMonth />
        </Provider>
        );

        // Verificar que el subcomponente MonthTogglePanel se renderiza
        const monthTogglePanel = screen.getByTestId('month-toggle-panel-container');
        expect(monthTogglePanel).toBeInTheDocument();

        // Verificar que el gráfico Bar se renderiza correctamente
        const barChart = screen.getByLabelText('bar-chart'); // Se espera que tenga aria-label="bar-chart"
        expect(barChart).toBeInTheDocument();
    });

    // **2. Hook useUpdateVisibleMonths**
    it('Debe llamar a useUpdateVisibleMonths con las props correctas', () => {
        const useUpdateVisibleMonthsMock = require('../../../../components/AlarmInfoPanel/AlarmsGraphByMonth/hooks/useUpdateVisibleMonths');
        render(
        <Provider store={storeWithTestState}>
            <AlarmsGraphByMonth />
        </Provider>
        );

        expect(useUpdateVisibleMonthsMock).toHaveBeenCalledWith(
        expect.objectContaining({
            alarmsData: fakeAlarmsData,
            allLabels: expect.any(Array),
            setVisibleMonths: expect.any(Function),
        })
        );
    });

    // **3. Hook useGenerateChartData**
    it('Debe llamar a useGenerateChartData con las props correctas', () => {
        const useGenerateChartDataMock = require('../../../../components/AlarmInfoPanel/AlarmsGraphByMonth/hooks/useGenerateChartData');
        render(
        <Provider store={storeWithTestState}>
            <AlarmsGraphByMonth />
        </Provider>
        );

        expect(useGenerateChartDataMock).toHaveBeenCalledWith(
        expect.objectContaining({
            alarmsData: fakeAlarmsData,
            visibleMonths: expect.any(Array),
            setChartData: expect.any(Function),
        })
        );
    });

    // **4. Verificación de subcomponentes**
    it('Debe renderizar el subcomponente MonthTogglePanel con las props correctas', () => {
        render(
        <Provider store={storeWithTestState}>
            <AlarmsGraphByMonth />
        </Provider>
        );

        const monthTogglePanel = screen.getByTestId('month-toggle-panel-container');
        expect(monthTogglePanel).toBeInTheDocument();
    });

    // **5. Renderización de gráfico**
    it('Debe renderizar el gráfico de barras correctamente cuando hay datos de chartData', () => {
        render(
        <Provider store={storeWithTestState}>
            <AlarmsGraphByMonth />
        </Provider>
        );

        const barChart = screen.getByLabelText('bar-chart'); 
        expect(barChart).toBeInTheDocument();
    });

    // **6. Estado inicial**
    it('Debe tener el estado inicial correcto para chartData y visibleMonths', () => {
        render(
        <Provider store={storeWithTestState}>
            <AlarmsGraphByMonth />
        </Provider>
        );

        // Verificamos que se haya llamado a useState con los valores iniciales correctos
        expect(useStateMock).toHaveBeenCalledWith({ labels: [], datasets: [] });
        expect(useStateMock).toHaveBeenCalledWith(Array(12).fill(false));
    });

});
