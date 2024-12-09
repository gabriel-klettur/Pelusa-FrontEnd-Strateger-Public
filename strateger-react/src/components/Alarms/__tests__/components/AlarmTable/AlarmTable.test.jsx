// Importaciones necesarias
import { render, screen } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import AlarmTable from '../../../components/AlarmTable/AlarmTable';
import alarmReducer from '../../../../../redux/alarm/alarmSlice';

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

// Crear el store con el estado inicial
const store = configureStore({
  reducer: {
    alarms: alarmReducer,
  },
  preloadedState: initialState, // Usar el estado inicial
});

describe('Pruebas del componente AlarmTable', () => {
  
  test('Debería renderizar la tabla con las columnas correctas', () => {
    // Renderiza el componente
    render(
      <Provider store={store}>
        <AlarmTable data={[]} page={0} hasMore={false} offset={0} />
      </Provider>
    );

    // Verificar si las columnas están presentes
    const columnHeaders = ['ID', 'Ticker', 'T', 'Entry Price', 'Exit Price', 'Time', 'Type', 'Estrategia'];
    columnHeaders.forEach((header) => {
      const columnElement = screen.getByText(header);
      expect(columnElement).toBeInTheDocument();
    });
  });

});
