// Importar el mock de HTMLCanvasElement.getContext

import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import AlarmsBarChart from '../../../../components/AlarmInfoPanel/AlarmsBarChart/AlarmsBarChart';


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
      
describe('AlarmsBarChart', () => {

  it('should render the container for alarms graph by month', () => {
    const store = mockStore(initialState);
    
    render(
      <Provider store={store}>
        <AlarmsBarChart />
      </Provider>
    );

    const container = screen.getByTestId('alarms-graph-by-month-container');
    expect(container).toBeInTheDocument();
  });

  it('should render the loading message when there is no alarms data', () => {
    const store = mockStore(initialState);
    
    render(
      <Provider store={store}>
        <AlarmsBarChart />
      </Provider>
    );

    const loadingMessage = screen.getByText(/Loading chart data.../i);
    expect(loadingMessage).toBeInTheDocument();
  });
});
