
//Path: strateger-react/src/components/Alarms/__tests__/components/AlarmInfoPanel/AlarmOverviewPanel/AlarmOverviewPanel.test.jsx

// Importaciones necesarias
import { render, screen, within } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import AlarmOverviewPanel from '../../../../components/AlarmInfoPanel/AlarmOverviewPanel/AlarmOverviewPanel';
import alarmReducer from '../../../../../../redux/alarm/alarmSlice';

// **1. Estado inicial**
const initialState = {
  alarms: {
    alarms: {
      data: [],
      length: 0,
      page: 0,
      offset: 0,
      hasMore: true,
    },
    filteredByClickAlarms: {
      data: [],
      length: 0,
      page: 0,
      hasMore: true,
    },
    filteredByOptions: {
      data: [],
      length: 0,
      page: 0,
      hasMore: true,
    },
  },
};

// **2. Datos de ejemplo (fakeData)**
const fakeData = [
    { id: 1, Ticker: 'BTC', Interval: '15m', Price_Alert: 30000, Time_Alert: '2024-12-10', Order: 'Long', Strategy: 'Test' },
    { id: 2, Ticker: 'ETH', Interval: '5m', Price_Alert: 2000, Time_Alert: '2024-12-11', Order: 'Short', Strategy: 'Demo' },
    { id: 3, Ticker: 'BNB', Interval: '1h', Price_Alert: 500, Time_Alert: '2024-12-12', Order: 'Long', Strategy: 'Test' },
    { id: 4, Ticker: 'ADA', Interval: '4h', Price_Alert: 1, Time_Alert: '2024-12-13', Order: 'Short', Strategy: 'Demo' },
    { id: 5, Ticker: 'XRP', Interval: '1d', Price_Alert: 0.5, Time_Alert: '2024-12-14', Order: 'Long', Strategy: 'Test' },
    { id: 6, Ticker: 'DOGE', Interval: '15m', Price_Alert: 0.1, Time_Alert: '2024-12-15', Order: 'Short', Strategy: 'Scalping' },
    { id: 7, Ticker: 'DOT', Interval: '1h', Price_Alert: 30, Time_Alert: '2024-12-16', Order: 'Long', Strategy: 'Swing' },
    { id: 8, Ticker: 'SOL', Interval: '4h', Price_Alert: 200, Time_Alert: '2024-12-17', Order: 'Short', Strategy: 'Breakout' },
    { id: 9, Ticker: 'MATIC', Interval: '1d', Price_Alert: 1.5, Time_Alert: '2024-12-18', Order: 'Long', Strategy: 'Test' },
    { id: 10, Ticker: 'AVAX', Interval: '15m', Price_Alert: 90, Time_Alert: '2024-12-19', Order: 'Short', Strategy: 'Reversal' },
    { id: 11, Ticker: 'LINK', Interval: '5m', Price_Alert: 10, Time_Alert: '2024-12-20', Order: 'Long', Strategy: 'Trend' },
    { id: 12, Ticker: 'ATOM', Interval: '1h', Price_Alert: 15, Time_Alert: '2024-12-21', Order: 'Short', Strategy: 'Scalping' },
    { id: 13, Ticker: 'UNI', Interval: '4h', Price_Alert: 6, Time_Alert: '2024-12-22', Order: 'Long', Strategy: 'Breakout' },
];

// **3. Estado del Store para los tests**
const testState = {
  ...initialState,
  alarms: {
    ...initialState.alarms,
    alarms: {
      ...initialState.alarms.alarms,
      data: fakeData,
      length: fakeData.length,
    },
  },
};

// **4. Configuración de la store de Redux**

const storeWithTestState = configureStore({
  reducer: {
    alarms: alarmReducer,
  },
  preloadedState: testState,
});


// **5. Ejemplo Completo de Tests**
describe('AlarmOverviewPanel - Renderización (UI)', () => {
  
  it('debe renderizar correctamente el componente AlarmOverviewPanel', () => {
    render(
      <Provider store={storeWithTestState}>
        <AlarmOverviewPanel />
      </Provider>
    );

    // Verificar que se muestra el título principal
    expect(screen.getByText(/Total Alarms/i)).toBeInTheDocument();

    // Verificar que se muestran las secciones principales
    expect(screen.getByText(/Tickers/i)).toBeInTheDocument();
    expect(screen.getByText(/Intervals/i)).toBeInTheDocument();
    expect(screen.getByText(/Orders/i)).toBeInTheDocument();
    expect(screen.getByText(/4 Least Active Hours/i)).toBeInTheDocument();
    expect(screen.getByText(/4 Most Active Hours/i)).toBeInTheDocument();
  });

  it('debe mostrar las listas de tickers', () => {
    render(
      <Provider store={storeWithTestState}>
        <AlarmOverviewPanel />
      </Provider>
    );

    // Comprobar que se muestran los tickers
    expect(screen.getByText(/BTC/i)).toBeInTheDocument();
    expect(screen.getByText(/ETH/i)).toBeInTheDocument();
    expect(screen.getByText(/BNB/i)).toBeInTheDocument();    
  });

  it('debe mostrar las listas de Intervalos', () => {    
    render(
      <Provider store={storeWithTestState}>
        <AlarmOverviewPanel />
      </Provider>
    );
    
    // Buscar dentro del contenedor específico
    const intervalsList = screen.getByTestId('AlarmOverviewPanel-intervals-list');
    expect(intervalsList).toBeInTheDocument();    

    // Limitar las búsquedas a este contenedor
    const { getByText } = within(intervalsList);
  
    // Comprobar que contiene los intervalos específicos
    expect(getByText(/15m/i)).toBeInTheDocument();    
    expect(getByText(/1h/i)).toBeInTheDocument();
    expect(getByText(/4h/i)).toBeInTheDocument();
    expect(getByText(/1d/i)).toBeInTheDocument();    
  });

  it('debe renderizar los contenedores de las 4 horas menos y más activas', () => {
    render(
      <Provider store={storeWithTestState}>
        <AlarmOverviewPanel />
      </Provider>
    );

    // Comprobar que los títulos de "Least Active Hours" y "Most Active Hours" están presentes
    expect(screen.getByText(/4 Least Active Hours/i)).toBeInTheDocument();
    expect(screen.getByText(/4 Most Active Hours/i)).toBeInTheDocument();
  });

  it('debe renderizar los contenedores de Orders', () => {
    render(
      <Provider store={storeWithTestState}>
        <AlarmOverviewPanel />
      </Provider>
    );

    // Comprobar que se muestran las 4 órdenes principales
    expect(screen.getByText(/order open long/i)).toBeInTheDocument();
    expect(screen.getByText(/order close short/i)).toBeInTheDocument();
    expect(screen.getByText(/order open short/i)).toBeInTheDocument();
    expect(screen.getByText(/order close long/i)).toBeInTheDocument();
  });

  it('debe mostrar la cantidad correcta de alarmas totales y del día actual', () => {
    render(
      <Provider store={storeWithTestState}>
        <AlarmOverviewPanel />
      </Provider>
    );

    // Comprobar la cantidad total de alarmas
    const totalAlarmsElement = screen.getByText(`Total Alarms: ${fakeData.length}`);
    expect(totalAlarmsElement).toBeInTheDocument();

    // Filtrar alarmas de hoy
    const today = new Date();
    const todayAlarms = fakeData.filter(alarm => {
      const alarmDate = new Date(alarm.Time_Alert);
      return (
        alarmDate.getDate() === today.getDate() &&
        alarmDate.getMonth() === today.getMonth() &&
        alarmDate.getFullYear() === today.getFullYear()
      );
    });

    // Comprobar la cantidad de alarmas de hoy
    const todayAlarmsElement = screen.getByText(`(Today: ${todayAlarms.length})`);
    expect(todayAlarmsElement).toBeInTheDocument();
  });
});
