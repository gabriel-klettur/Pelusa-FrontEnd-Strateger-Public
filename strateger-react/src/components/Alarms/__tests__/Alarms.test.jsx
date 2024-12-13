// Path: src/components/Alarms/__tests__/Alarms.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import Alarms from '../Alarms';

//  Mock del componente AlarmsMainView
jest.mock('../containers/AlarmsMainView', () => () => <div data-testid="alarms-container"></div>);

describe('Alarms component', () => {
  it('should render the Alarms component and its child AlarmsContainer', () => {
    //  Renderizar el componente
    render(<Alarms />);
    
    //  Comprobar que se ha renderizado el contenedor principal
    const alarmsComponent = screen.getByTestId('alarms-component');
    expect(alarmsComponent).toBeInTheDocument();

    // ✅Comprobar que se ha renderizado el componente hijo AlarmsContainer
    const alarmsContainer = screen.getByTestId('alarms-container');
    expect(alarmsContainer).toBeInTheDocument();
  });
});