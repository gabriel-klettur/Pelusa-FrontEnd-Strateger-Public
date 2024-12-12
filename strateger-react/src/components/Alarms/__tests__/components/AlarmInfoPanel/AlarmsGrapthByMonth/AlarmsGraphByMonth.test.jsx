// Importar el mock de HTMLCanvasElement.getContext

import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import AlarmsGraphByMonth from '../../../../../Alarms/components/AlarmInfoPanel/AlarmsGraphByMonth/AlarmsGraphByMonth';


const mockStore = configureStore([]);

// Estructura de la store inicial
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

const testStateWithData = {
    alarms: {
        alarms: {
        data: [
            { id: 1, Ticker: 'BTC', Interval: '15m', Price_Alert: 30000, Time_Alert: '2024-12-10T10:30:00Z', Order: 'Long', Strategy: 'Test' },
            { id: 2, Ticker: 'ETH', Interval: '5m', Price_Alert: 2000, Time_Alert: '2024-12-11T12:00:00Z', Order: 'Short', Strategy: 'Demo' },
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
      
describe('AlarmsGraphByMonth', () => {

  it('should render the container for alarms graph by month', () => {
    const store = mockStore(initialState);
    
    render(
      <Provider store={store}>
        <AlarmsGraphByMonth />
      </Provider>
    );

    const container = screen.getByTestId('alarms-graph-by-month-container');
    expect(container).toBeInTheDocument();
  });

  it('should render the loading message when there is no alarms data', () => {
    const store = mockStore(initialState);
    
    render(
      <Provider store={store}>
        <AlarmsGraphByMonth />
      </Provider>
    );

    const loadingMessage = screen.getByText(/Loading chart data.../i);
    expect(loadingMessage).toBeInTheDocument();
  });
});
