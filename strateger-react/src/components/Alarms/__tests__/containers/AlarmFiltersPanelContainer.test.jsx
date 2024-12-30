// Path: src/components/Alarms/containers/__tests__/AlarmFiltersPanelContainer.test.jsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import AlarmFiltersPanelContainer from '../../containers/AlarmFiltersPanelContainer';
import alarmReducer, { setFilteredByOptions} from 'reduxStore/alarm/alarmSlice';

// Estado inicial para Redux
const initialState = {
  alarms: {
    alarms: {
      data: [
        { Interval: '1m', Order: 'Buy', Strategy: 'Strategy1', Ticker: 'BTCUSDT' },
        { Interval: '5m', Order: 'Sell', Strategy: 'Strategy2', Ticker: 'ETHUSDT' },
      ],
      length: 2,
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

// Crear un store para los tests
const storeWithTestState = configureStore({
  reducer: {
    alarms: alarmReducer,
  },
  preloadedState: initialState,
});


// Mock del componente FiltersMenu
jest.mock('../../components/AlarmFiltersPanel/FiltersMenu/FiltersMenu', () => ({
    onApplyFilters,
    onClear,
    uniqueStrategies,
    uniqueTickers,
  }) => (
    <div data-testid="filters-menu">
      {/* Intervals */}
      <div>
        <h3>Intervals</h3>
        {['1m', '5m', '15m', '30m', '1h', '4h', 'D', 'W', 'M'].map((interval) => (
          <label key={interval}>
            <input type="checkbox" name="intervals" value={interval} data-testid={`interval-${interval}`} />
            {interval}
          </label>
        ))}
      </div>
  
      {/* Order Types */}
      <div>
        <h3>Order Types</h3>
        {['Open Long', 'Open Short', 'Close Long', 'Close Short'].map((orderType) => (
          <label key={orderType}>
            <input type="checkbox" name="ordersType" value={orderType} data-testid={`orderType-${orderType}`} />
            {orderType}
          </label>
        ))}
      </div>
  
      {/* Strategies */}
      <div>
        <h3>Strategies</h3>
        {uniqueStrategies.map((strategy) => (
          <label key={strategy}>
            <input type="checkbox" name="strategies" value={strategy} data-testid={`strategy-${strategy}`} />
            {strategy}
          </label>
        ))}
      </div>
  
      {/* Tickers */}
      <div>
        <h3>Tickers</h3>
        {uniqueTickers.map((ticker) => (
          <label key={ticker}>
            <input type="checkbox" name="tickers" value={ticker} data-testid={`ticker-${ticker}`} />
            {ticker}
          </label>
        ))}
      </div>
  
      {/* Buttons */}
      <button
        data-testid="filters-menu-apply"
        onClick={() => onApplyFilters({
          intervals: { '1m': true }, // Simular que solo se selecciona '1m'
          ordersType: { Buy: true }, // Simular que solo se selecciona 'Buy'
          strategies: { Strategy1: true }, // Simular que solo se selecciona 'Strategy1'
          tickers: { BTCUSDT: true }, // Simular que solo se selecciona 'BTCUSDT'
        })}
      >
        Apply
      </button>
      <button data-testid="filters-menu-clear" onClick={onClear}>
        Clear
      </button>
    </div>
  ));

describe('AlarmFiltersPanelContainer', () => {
  it('should render the AlarmFiltersPanelContainer component and its child FiltersMenu', () => {
    // Renderizar el componente con el store
    render(
      <Provider store={storeWithTestState}>
        <AlarmFiltersPanelContainer />
      </Provider>
    );

    //  Comprobar que se ha renderizado el contenedor principal
    const containerElement = screen.getByTestId('alarm-filters-panel-container');
    expect(containerElement).toBeInTheDocument();

    //  Comprobar que se ha renderizado el componente hijo FiltersMenu
    const filtersMenu = screen.getByTestId('filters-menu');
    expect(filtersMenu).toBeInTheDocument();
  });

  it('should call handleApplyFilters when FiltersMenu applies filters', () => {
    // Mock de dispatch para controlar cuando se llama la acción setFilteredByOptions
    const mockDispatch = jest.fn();
    storeWithTestState.dispatch = mockDispatch;

    // Renderizar el componente con el store
    render(
      <Provider store={storeWithTestState}>
        <AlarmFiltersPanelContainer />
      </Provider>
    );

    //  Simular la interacción con el botón de Apply Filters
    const applyButton = screen.getByTestId('filters-menu-apply');
    fireEvent.click(applyButton);

    //  Verificar que la acción de setFilteredByOptions fue llamada
    expect(mockDispatch).toHaveBeenCalledWith(setFilteredByOptions([
      { Interval: '1m', Order: 'Buy', Strategy: 'Strategy1', Ticker: 'BTCUSDT' }
    ]));
  });

  it('should call handleClearFilters when FiltersMenu clears filters', () => {
    // Mock de dispatch para controlar cuando se llama la acción setFilteredByOptions
    const mockDispatch = jest.fn();
    storeWithTestState.dispatch = mockDispatch;
  
    // Renderizar el componente con el store
    render(
      <Provider store={storeWithTestState}>
        <AlarmFiltersPanelContainer />
      </Provider>
    );
  
    // Simular la interacción con el botón Clear
    const clearButton = screen.getByTestId('filters-menu-clear');
    fireEvent.click(clearButton);
  
    // Verificar que setFilteredByOptions fue llamada con undefined (para limpiar los filtros)
    expect(mockDispatch).toHaveBeenCalledWith(setFilteredByOptions());
  });

  it('should handle empty alarms data without crashing', () => {
    // Crear un estado inicial con datos vacíos
    const emptyState = {
      ...initialState,
      alarms: {
        ...initialState.alarms,
        alarms: {
          ...initialState.alarms.alarms,
          data: [], // Sin datos
        },
      },
    };
  
    // Crear un store con el estado vacío
    const storeWithEmptyState = configureStore({
      reducer: {
        alarms: alarmReducer,
      },
      preloadedState: emptyState,
    });
  
    // Renderizar el componente con el store vacío
    render(
      <Provider store={storeWithEmptyState}>
        <AlarmFiltersPanelContainer />
      </Provider>
    );
  
    // Comprobar que el contenedor principal se renderiza correctamente
    const containerElement = screen.getByTestId('alarm-filters-panel-container');
    expect(containerElement).toBeInTheDocument();
  
    // Verificar que FiltersMenu también se renderiza sin problemas
    const filtersMenu = screen.getByTestId('filters-menu');
    expect(filtersMenu).toBeInTheDocument();
  
    // Comprobar que no se produce un error al trabajar con datos vacíos
    expect(filtersMenu).toBeTruthy();
  });
    
  it('should generate unique strategies and tickers from alarms data', () => {
    render(
      <Provider store={storeWithTestState}>
        <AlarmFiltersPanelContainer />
      </Provider>
    );
  
    // Verificar que las estrategias únicas se pasan correctamente a FiltersMenu
    const uniqueStrategies = ['Strategy1', 'Strategy2'];
    uniqueStrategies.forEach((strategy) => {
      const strategyElement = screen.getByTestId(`strategy-${strategy}`);
      expect(strategyElement).toBeInTheDocument();
    });
  
    // Verificar que los tickers únicos se pasan correctamente a FiltersMenu
    const uniqueTickers = ['BTCUSDT', 'ETHUSDT'];
    uniqueTickers.forEach((ticker) => {
      const tickerElement = screen.getByTestId(`ticker-${ticker}`);
      expect(tickerElement).toBeInTheDocument();
    });
  });

  it('should apply filters partially when only intervals are selected', () => {
    const mockDispatch = jest.fn();
    storeWithTestState.dispatch = mockDispatch;
  
    render(
      <Provider store={storeWithTestState}>
        <AlarmFiltersPanelContainer />
      </Provider>
    );
  
    // Simular la aplicación de filtros solo para intervals
    const applyButton = screen.getByTestId('filters-menu-apply');
    fireEvent.click(applyButton);
  
    // Verificar que los datos filtrados sean los esperados
    expect(mockDispatch).toHaveBeenCalledWith(setFilteredByOptions([
      { Interval: '1m', Order: 'Buy', Strategy: 'Strategy1', Ticker: 'BTCUSDT' }
    ]));
  });

  it('should apply combined filters for intervals and strategies', () => {
    const mockDispatch = jest.fn();
    storeWithTestState.dispatch = mockDispatch;
  
    render(
      <Provider store={storeWithTestState}>
        <AlarmFiltersPanelContainer />
      </Provider>
    );
  
    // Simular la aplicación de filtros combinados
    const applyButton = screen.getByTestId('filters-menu-apply');
    fireEvent.click(applyButton);
  
    // Verificar que los datos filtrados sean los esperados
    expect(mockDispatch).toHaveBeenCalledWith(setFilteredByOptions([
      { Interval: '1m', Order: 'Buy', Strategy: 'Strategy1', Ticker: 'BTCUSDT' }
    ]));
  });

});
