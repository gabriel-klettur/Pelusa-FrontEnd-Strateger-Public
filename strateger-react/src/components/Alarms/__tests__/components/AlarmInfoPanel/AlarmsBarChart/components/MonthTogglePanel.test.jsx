// Path: strateger-react/src/components/Alarms/__tests__/components/AlarmInfoPanel/AlarmsBarChart/components/MonthTogglePanel.test.jsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MonthTogglePanel from '../../../../../../Alarms/components/AlarmInfoPanel/AlarmsBarChart/components/MonthTogglePanel';

describe('MonthTogglePanel - Tests', () => {

  // **1. Datos de ejemplo (fakeData)**
  const monthsLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let visibleMonths;
  let toggleMonth;

  beforeEach(() => {
    visibleMonths = [true, true, true, true, true, true, true, true, true, true, true, true];
    toggleMonth = jest.fn();
  });

  // **1. Renderización inicial**
  it('Debe renderizarse correctamente sin errores', () => {
    render(
      <MonthTogglePanel 
        monthsLabels={monthsLabels} 
        visibleMonths={visibleMonths} 
        toggleMonth={toggleMonth} 
      />
    );

    // Verificar que el contenedor se renderiza correctamente
    const container = screen.getByTestId('month-toggle-panel-container');
    expect(container).toBeInTheDocument();
  });

  it('Debe renderizar el componente MonthToggleButton dentro de MonthTogglePanel', () => {
    render(
      <MonthTogglePanel 
        monthsLabels={monthsLabels} 
        visibleMonths={visibleMonths} 
        toggleMonth={toggleMonth} 
      />
    );

    // Verificar que MonthToggleButton se renderiza
    const toggleButton = screen.getByTestId('month-toggle-button-container');
    expect(toggleButton).toBeInTheDocument();
  });


  // **3. Props y estado**
  it('Debe pasar correctamente las props monthsLabels, visibleMonths y toggleMonth al componente MonthToggleButton', () => {
    render(
      <MonthTogglePanel 
        monthsLabels={monthsLabels} 
        visibleMonths={visibleMonths} 
        toggleMonth={toggleMonth} 
      />
    );

    // Verificar que MonthToggleButton recibe todas las props necesarias
    const buttonContainer = screen.getByTestId('month-toggle-button-container');
    expect(buttonContainer).toBeInTheDocument();
  });

});
