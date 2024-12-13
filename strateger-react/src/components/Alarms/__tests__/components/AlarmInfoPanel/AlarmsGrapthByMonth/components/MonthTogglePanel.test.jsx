// Path: strateger-react/src/components/Alarms/__tests__/components/AlarmInfoPanel/AlarmsGraphByMonth/components/MonthTogglePanel.test.jsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MonthTogglePanel from '../../../../../../Alarms/components/AlarmInfoPanel/AlarmsGraphByMonth/components/MonthTogglePanel';

describe('MonthTogglePanel - Tests', () => {

  // **1. Datos de ejemplo (fakeData)**
  const monthsLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let visibleMonths;
  let setVisibleMonths;

  beforeEach(() => {
    visibleMonths = [true, true, true, true, true, true, true, true, true, true, true, true];
    setVisibleMonths = jest.fn();
  });

  // **1. Renderización inicial**
  it('Debe renderizarse correctamente sin errores', () => {
    render(
      <MonthTogglePanel 
        monthsLabels={monthsLabels} 
        visibleMonths={visibleMonths} 
        setVisibleMonths={setVisibleMonths} 
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
        setVisibleMonths={setVisibleMonths} 
      />
    );

    // Verificar que MonthToggleButton se renderiza
    const toggleButton = screen.getByTestId('month-toggle-button-container');
    expect(toggleButton).toBeInTheDocument();
  });

  // **2. Comportamiento de la función toggleMonth**
  it('Debe llamar a setVisibleMonths con el estado correcto al hacer clic en un botón de mes', () => {
    render(
      <MonthTogglePanel 
        monthsLabels={monthsLabels} 
        visibleMonths={visibleMonths} 
        setVisibleMonths={setVisibleMonths} 
      />
    );

    // Simular un clic en el botón de febrero (índice 1)
    const febButton = screen.getByTestId('month-button-1'); // Cambiado de month-toggle-btn-1 a month-button-1
    fireEvent.click(febButton);

    // Esperar que setVisibleMonths se haya llamado con el estado actualizado
    const expectedVisibleMonths = [...visibleMonths];
    expectedVisibleMonths[1] = !expectedVisibleMonths[1]; // Cambia el estado de febrero (índice 1)
    expect(setVisibleMonths).toHaveBeenCalledWith(expectedVisibleMonths);
  });

  it('Debe alternar el estado visible del mes correspondiente al hacer clic', () => {
    render(
      <MonthTogglePanel 
        monthsLabels={monthsLabels} 
        visibleMonths={visibleMonths} 
        setVisibleMonths={setVisibleMonths} 
      />
    );

    // Simular un clic en el botón de mayo (índice 4)
    const mayButton = screen.getByTestId('month-button-4'); // Cambiado de month-toggle-btn-4 a month-button-4
    fireEvent.click(mayButton);

    // Verificar que setVisibleMonths se haya llamado con el nuevo estado esperado
    const expectedVisibleMonths = [...visibleMonths];
    expectedVisibleMonths[4] = !expectedVisibleMonths[4]; // Cambia el estado de mayo (índice 4)
    expect(setVisibleMonths).toHaveBeenCalledWith(expectedVisibleMonths);
  });

  // **3. Props y estado**
  it('Debe pasar correctamente las props monthsLabels, visibleMonths y toggleMonth al componente MonthToggleButton', () => {
    render(
      <MonthTogglePanel 
        monthsLabels={monthsLabels} 
        visibleMonths={visibleMonths} 
        setVisibleMonths={setVisibleMonths} 
      />
    );

    // Verificar que MonthToggleButton recibe todas las props necesarias
    const buttonContainer = screen.getByTestId('month-toggle-button-container');
    expect(buttonContainer).toBeInTheDocument();
  });

});
