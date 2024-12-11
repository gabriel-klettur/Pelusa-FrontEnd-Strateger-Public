// Importaciones necesarias
import { render, screen, fireEvent } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import AlarmTable from '../../../components/AlarmTable/AlarmTable';
import alarmReducer, { setFilteredByClickAlarms } from '../../../../../redux/alarm/alarmSlice';
import { jest } from '@jest/globals';

// Estado inicial para Redux
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
    { id: 14, Ticker: 'LTC', Interval: '1d', Price_Alert: 70, Time_Alert: '2024-12-23', Order: 'Short', Strategy: 'Test' },
    { id: 15, Ticker: 'FIL', Interval: '15m', Price_Alert: 7, Time_Alert: '2024-12-24', Order: 'Long', Strategy: 'Swing' },
    { id: 16, Ticker: 'AAVE', Interval: '5m', Price_Alert: 80, Time_Alert: '2024-12-25', Order: 'Short', Strategy: 'Reversal' },
    { id: 17, Ticker: 'FTT', Interval: '1h', Price_Alert: 1, Time_Alert: '2024-12-26', Order: 'Long', Strategy: 'Trend' },
    { id: 18, Ticker: 'EGLD', Interval: '4h', Price_Alert: 35, Time_Alert: '2024-12-27', Order: 'Short', Strategy: 'Breakout' },
    { id: 19, Ticker: 'CAKE', Interval: '1d', Price_Alert: 3, Time_Alert: '2024-12-28', Order: 'Long', Strategy: 'Test' },
    { id: 20, Ticker: 'SHIB', Interval: '15m', Price_Alert: 0.00001, Time_Alert: '2024-12-29', Order: 'Short', Strategy: 'Scalping' },
    { id: 21, Ticker: 'BTC', Interval: '5m', Price_Alert: 31000, Time_Alert: '2024-12-30', Order: 'Long', Strategy: 'Swing' },
    { id: 22, Ticker: 'ETH', Interval: '1h', Price_Alert: 2200, Time_Alert: '2024-12-31', Order: 'Short', Strategy: 'Reversal' },
    { id: 23, Ticker: 'BNB', Interval: '4h', Price_Alert: 520, Time_Alert: '2025-01-01', Order: 'Long', Strategy: 'Trend' },
    { id: 24, Ticker: 'ADA', Interval: '1d', Price_Alert: 1.2, Time_Alert: '2025-01-02', Order: 'Short', Strategy: 'Breakout' },
    { id: 25, Ticker: 'XRP', Interval: '15m', Price_Alert: 0.6, Time_Alert: '2025-01-03', Order: 'Long', Strategy: 'Test' },
    { id: 26, Ticker: 'SOL', Interval: '5m', Price_Alert: 210, Time_Alert: '2025-01-04', Order: 'Short', Strategy: 'Scalping' },
    { id: 27, Ticker: 'DOGE', Interval: '1h', Price_Alert: 0.12, Time_Alert: '2025-01-05', Order: 'Long', Strategy: 'Swing' },
    { id: 28, Ticker: 'DOT', Interval: '4h', Price_Alert: 33, Time_Alert: '2025-01-06', Order: 'Short', Strategy: 'Reversal' },
    { id: 29, Ticker: 'MATIC', Interval: '1d', Price_Alert: 2, Time_Alert: '2025-01-07', Order: 'Long', Strategy: 'Trend' },
    { id: 30, Ticker: 'AVAX', Interval: '15m', Price_Alert: 100, Time_Alert: '2025-01-08', Order: 'Short', Strategy: 'Breakout' },
    { id: 31, Ticker: 'LINK', Interval: '5m', Price_Alert: 11, Time_Alert: '2025-01-09', Order: 'Long', Strategy: 'Test' },
    { id: 32, Ticker: 'ATOM', Interval: '1h', Price_Alert: 16, Time_Alert: '2025-01-10', Order: 'Short', Strategy: 'Scalping' },
    { id: 33, Ticker: 'UNI', Interval: '4h', Price_Alert: 7, Time_Alert: '2025-01-11', Order: 'Long', Strategy: 'Swing' },
    { id: 34, Ticker: 'LTC', Interval: '1d', Price_Alert: 75, Time_Alert: '2025-01-12', Order: 'Short', Strategy: 'Reversal' },
    { id: 35, Ticker: 'FIL', Interval: '15m', Price_Alert: 8, Time_Alert: '2025-01-13', Order: 'Long', Strategy: 'Trend' },
    { id: 36, Ticker: 'AAVE', Interval: '5m', Price_Alert: 85, Time_Alert: '2025-01-14', Order: 'Short', Strategy: 'Breakout' },
    { id: 37, Ticker: 'FTT', Interval: '1h', Price_Alert: 1.5, Time_Alert: '2025-01-15', Order: 'Long', Strategy: 'Test' },
    { id: 38, Ticker: 'EGLD', Interval: '4h', Price_Alert: 40, Time_Alert: '2025-01-16', Order: 'Short', Strategy: 'Scalping' },
    { id: 39, Ticker: 'CAKE', Interval: '1d', Price_Alert: 4, Time_Alert: '2025-01-17', Order: 'Long', Strategy: 'Swing' },
    { id: 40, Ticker: 'SHIB', Interval: '15m', Price_Alert: 0.00002, Time_Alert: '2025-01-18', Order: 'Short', Strategy: 'Reversal' },
    { id: 41, Ticker: 'BTC', Interval: '5m', Price_Alert: 32000, Time_Alert: '2025-01-19', Order: 'Long', Strategy: 'Trend' },
    { id: 42, Ticker: 'ETH', Interval: '1h', Price_Alert: 2300, Time_Alert: '2025-01-20', Order: 'Short', Strategy: 'Breakout' },
    { id: 43, Ticker: 'BNB', Interval: '4h', Price_Alert: 530, Time_Alert: '2025-01-21', Order: 'Long', Strategy: 'Test' },
    { id: 44, Ticker: 'ADA', Interval: '1d', Price_Alert: 1.3, Time_Alert: '2025-01-22', Order: 'Short', Strategy: 'Scalping' },
    { id: 45, Ticker: 'XRP', Interval: '15m', Price_Alert: 0.7, Time_Alert: '2025-01-23', Order: 'Long', Strategy: 'Swing' },
    { id: 46, Ticker: 'SOL', Interval: '5m', Price_Alert: 220, Time_Alert: '2025-01-24', Order: 'Short', Strategy: 'Reversal' },
    { id: 47, Ticker: 'DOGE', Interval: '1h', Price_Alert: 0.15, Time_Alert: '2025-01-25', Order: 'Long', Strategy: 'Trend' },
    { id: 48, Ticker: 'DOT', Interval: '4h', Price_Alert: 35, Time_Alert: '2025-01-26', Order: 'Short', Strategy: 'Breakout' },
    { id: 49, Ticker: 'MATIC', Interval: '1d', Price_Alert: 2.5, Time_Alert: '2025-01-27', Order: 'Long', Strategy: 'Test' },
    { id: 50, Ticker: 'AVAX', Interval: '15m', Price_Alert: 110, Time_Alert: '2025-01-28', Order: 'Short', Strategy: 'Scalping' },
    { id: 51, Ticker: 'LINK', Interval: '5m', Price_Alert: 12, Time_Alert: '2025-01-29', Order: 'Long', Strategy: 'Swing' },
    { id: 52, Ticker: 'ATOM', Interval: '1h', Price_Alert: 17, Time_Alert: '2025-01-30', Order: 'Short', Strategy: 'Reversal' },
    { id: 53, Ticker: 'UNI', Interval: '4h', Price_Alert: 8, Time_Alert: '2025-01-31', Order: 'Long', Strategy: 'Trend' },
    { id: 54, Ticker: 'LTC', Interval: '1d', Price_Alert: 80, Time_Alert: '2025-02-01', Order: 'Short', Strategy: 'Breakout' },
    { id: 55, Ticker: 'FIL', Interval: '15m', Price_Alert: 9, Time_Alert: '2025-02-02', Order: 'Long', Strategy: 'Test' },
    { id: 56, Ticker: 'AAVE', Interval: '5m', Price_Alert: 90, Time_Alert: '2025-02-03', Order: 'Short', Strategy: 'Scalping' },
    { id: 57, Ticker: 'FTT', Interval: '1h', Price_Alert: 2, Time_Alert: '2025-02-04', Order: 'Long', Strategy: 'Swing' },
    { id: 58, Ticker: 'EGLD', Interval: '4h', Price_Alert: 45, Time_Alert: '2025-02-05', Order: 'Short', Strategy: 'Reversal' },
    { id: 59, Ticker: 'CAKE', Interval: '1d', Price_Alert: 5, Time_Alert: '2025-02-06', Order: 'Long', Strategy: 'Trend' },
    { id: 60, Ticker: 'SHIB', Interval: '15m', Price_Alert: 0.00003, Time_Alert: '2025-02-07', Order: 'Short', Strategy: 'Breakout' },
    { id: 61, Ticker: 'BTC', Interval: '5m', Price_Alert: 33000, Time_Alert: '2025-02-08', Order: 'Long', Strategy: 'Test' },
    { id: 62, Ticker: 'ETH', Interval: '1h', Price_Alert: 2400, Time_Alert: '2025-02-09', Order: 'Short', Strategy: 'Scalping' },
    { id: 63, Ticker: 'BNB', Interval: '4h', Price_Alert: 540, Time_Alert: '2025-02-10', Order: 'Long', Strategy: 'Swing' },
    { id: 64, Ticker: 'ADA', Interval: '1d', Price_Alert: 1.4, Time_Alert: '2025-02-11', Order: 'Short', Strategy: 'Reversal' },
    { id: 65, Ticker: 'XRP', Interval: '15m', Price_Alert: 0.8, Time_Alert: '2025-02-12', Order: 'Long', Strategy: 'Trend' },
    { id: 66, Ticker: 'SOL', Interval: '5m', Price_Alert: 230, Time_Alert: '2025-02-13', Order: 'Short', Strategy: 'Breakout' },
    { id: 67, Ticker: 'DOGE', Interval: '1h', Price_Alert: 0.18, Time_Alert: '2025-02-14', Order: 'Long', Strategy: 'Test' },
    { id: 68, Ticker: 'DOT', Interval: '4h', Price_Alert: 38, Time_Alert: '2025-02-15', Order: 'Short', Strategy: 'Scalping' },
    { id: 69, Ticker: 'MATIC', Interval: '1d', Price_Alert: 3, Time_Alert: '2025-02-16', Order: 'Long', Strategy: 'Swing' },
    { id: 70, Ticker: 'AVAX', Interval: '15m', Price_Alert: 120, Time_Alert: '2025-02-17', Order: 'Short', Strategy: 'Reversal' },
    { id: 71, Ticker: 'LINK', Interval: '5m', Price_Alert: 13, Time_Alert: '2025-02-18', Order: 'Long', Strategy: 'Trend' },
    { id: 72, Ticker: 'ATOM', Interval: '1h', Price_Alert: 18, Time_Alert: '2025-02-19', Order: 'Short', Strategy: 'Breakout' },
    { id: 73, Ticker: 'UNI', Interval: '4h', Price_Alert: 9, Time_Alert: '2025-02-20', Order: 'Long', Strategy: 'Test' },
    { id: 74, Ticker: 'LTC', Interval: '1d', Price_Alert: 85, Time_Alert: '2025-02-21', Order: 'Short', Strategy: 'Scalping' },
    { id: 75, Ticker: 'FIL', Interval: '15m', Price_Alert: 10, Time_Alert: '2025-02-22', Order: 'Long', Strategy: 'Swing' },
    { id: 76, Ticker: 'AAVE', Interval: '5m', Price_Alert: 95, Time_Alert: '2025-02-23', Order: 'Short', Strategy: 'Reversal' },
    { id: 77, Ticker: 'FTT', Interval: '1h', Price_Alert: 2.5, Time_Alert: '2025-02-24', Order: 'Long', Strategy: 'Trend' },
    { id: 78, Ticker: 'EGLD', Interval: '4h', Price_Alert: 50, Time_Alert: '2025-02-25', Order: 'Short', Strategy: 'Breakout' },
    { id: 79, Ticker: 'CAKE', Interval: '1d', Price_Alert: 6, Time_Alert: '2025-02-26', Order: 'Long', Strategy: 'Test' },
    { id: 80, Ticker: 'SHIB', Interval: '15m', Price_Alert: 0.00004, Time_Alert: '2025-02-27', Order: 'Short', Strategy: 'Scalping' },
];

// Estado con datos para el test
const testState = {
  ...initialState,
  alarms: {
    ...initialState.alarms,
    alarms: {
      ...initialState.alarms.alarms,
      data: fakeData,      
    },
  },
};

const storeWithTestState = configureStore({
  reducer: {
    alarms: alarmReducer,
  },
  preloadedState: testState,
});

describe('Pruebas Genericas del componente AlarmTable', () => {  
  test('Debería renderizar la tabla con las columnas correctas', () => {    
    render(
      <Provider store={storeWithTestState}>
        <AlarmTable data={[]} page={0} hasMore={false} offset={0} />
      </Provider>
    );

    // Verificar si las columnas están presentes
    const columnHeaders = ['ID', 'Ticker', 'Interval', 'Price', 'Time', 'Type', 'Strategy'];
    columnHeaders.forEach((header) => {
      const columnElement = screen.getByText(header);
      expect(columnElement).toBeInTheDocument();
    });
  });

  test('Debería ejecutar handleSelectAlarmByClick al hacer clic en una fila', () => {
  
    // Dispatch mock, this mock will be called when the component dispatches an action. With this mock we can check if the action was dispatched correctly.
    const mockDispatch = jest.fn();
    storeWithTestState.dispatch = mockDispatch;
      
    render(
      <Provider store={storeWithTestState}>        
        <AlarmTable data={testState.alarms.alarms.data} page={0} hasMore={true} offset={0} />
      </Provider>
    );
  
    // Simulate a click on the first row of data
    const rows = screen.getAllByRole('row'); // Get all rows with role 'row'.
    expect(rows).toHaveLength(rows.length);
  
    fireEvent.click(rows[4]); // Click on the first row of data.
  
    // Verificar que se llamó a setFilteredByClickAlarms con los datos correctos
    expect(mockDispatch).toHaveBeenCalledWith(
      setFilteredByClickAlarms([
        { id: 4, Ticker: 'ADA', Interval: '4h', Price_Alert: 1, Time_Alert: '2024-12-13', Order: 'Short', Strategy: 'Demo' },
      ])
    );
  });

  test('Debería mostrar un mensaje cuando no hay datos disponibles', () => {
    render(
      <Provider store={storeWithTestState}>
        <AlarmTable data={[]} page={0} hasMore={false} offset={0} />
      </Provider>
    );
    
    const noDataMessage = screen.getByText(/No data/i);
    expect(noDataMessage).toBeInTheDocument();
  });
});



describe('Pruebas del componente AlarmTable - Paginación', () => {

  test('Debería renderizar correctamente la primera página de datos', () => {
    render(
      <Provider store={storeWithTestState}>
        <AlarmTable data={testState.alarms.alarms.data} page={0} hasMore={true} offset={20} />
      </Provider>
    );

    // Verificar que se muestra la primera fila de la página
    const firstRowElement = screen.getByText((content) => content.includes('BTC')); // Ticker de la primera fila (ID 1)
    expect(firstRowElement).toBeInTheDocument();

    // Verificar que se muestra la última fila de la página
    const lastRowElement = screen.getByText((content) => content.includes('SHIB')); // Ticker de la última fila (ID 20)
    expect(lastRowElement).toBeInTheDocument();
  });

  test('Debería renderizar correctamente la segunda página de datos al cambiar de página', () => {
    render(
      <Provider store={storeWithTestState}>
        <AlarmTable data={testState.alarms.alarms.data} page={1} hasMore={true} offset={40} />
      </Provider>
    );

    // Verificar que se muestra la primera fila de la segunda página
    const firstRowElement = screen.getByText((content) => content.includes('BTC'));
    expect(firstRowElement).toBeInTheDocument();

    // Verificar que se muestra una fila intermedia de la página
    const midRowElement = screen.getByText('EGLD'); // Ticker de la fila intermedia (ID 38)
    expect(midRowElement).toBeInTheDocument();
  });

  test('Debería deshabilitar el botón de paginación cuando no hay más páginas', () => {
    render(
      <Provider store={storeWithTestState}>
        <AlarmTable data={initialState.alarms.alarms.data.slice(80, 100)} page={4} hasMore={false} offset={80} />
      </Provider>
    );
  
    // Check if the "Next" button is disabled
    const nextButton = screen.getByRole('button', { name: /Next/i });
    expect(nextButton).toBeDisabled();
  
    // Check if the "Previus" button is enabled
    const prevButton = screen.getByRole('button', { name: /Previous/i });
    expect(prevButton).not.toBeDisabled();
  });
});

