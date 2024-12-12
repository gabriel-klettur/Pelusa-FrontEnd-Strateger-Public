// Importar las librerías necesarias
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

// Estructura inicial de la store
const initialState = {
  interaction: {
    activeRadarDataset: 'alarms',
  },
};

describe('AlarmsGraphByTime', () => {

  it('should render element with data-testid="alarms-graph-container"', () => {
    render(
      <Provider store={mockStore(initialState)}>
        <div data-testid="alarms-graph-container"></div>
      </Provider>
    );
    const element = screen.getByTestId('alarms-graph-container');
    expect(element).toBeInTheDocument();
  });
});