// Path: strateger-react/src/components/Alarms/__tests__/components/MonthToggleButton/MonthToggleButton.test.jsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MonthToggleButton from '../../../../../../Alarms/components/AlarmInfoPanel/AlarmsGraphByMonth/components/MonthToggleButton';

describe('MonthToggleButton - Tests esenciales', () => {
  
  // **Datos de prueba**
  const mockLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const mockVisibleMonths = [true, false, true, false, true, false, true, false, true, false, true, false];
  const mockToggleMonth = jest.fn();

  // **1. Renderización inicial**
  it('Debe renderizarse correctamente sin errores', () => {
    render(
      <MonthToggleButton 
        monthsLabels={mockLabels} 
        toggleMonth={mockToggleMonth} 
        visibleMonths={mockVisibleMonths} 
      />
    );

    const container = screen.getByTestId('month-toggle-button-container');
    expect(container).toBeInTheDocument();
  });

  it('Debe renderizar un botón por cada mes en monthsLabels', () => {
    render(
      <MonthToggleButton 
        monthsLabels={mockLabels} 
        toggleMonth={mockToggleMonth} 
        visibleMonths={mockVisibleMonths} 
      />
    );

    // Verifica que se renderiza un botón por cada mes
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(mockLabels.length);
  });

  it('Cada botón debe mostrar el nombre correcto del mes', () => {
    render(
      <MonthToggleButton 
        monthsLabels={mockLabels} 
        toggleMonth={mockToggleMonth} 
        visibleMonths={mockVisibleMonths} 
      />
    );

    mockLabels.forEach((month) => {
      const button = screen.getByText(month);
      expect(button).toBeInTheDocument();
    });
  });

  // **2. Interactividad**
  it('Debe llamar a la función toggleMonth con el índice correcto al hacer clic en un botón', () => {
    render(
      <MonthToggleButton 
        monthsLabels={mockLabels} 
        toggleMonth={mockToggleMonth} 
        visibleMonths={mockVisibleMonths} 
      />
    );

    // Simular clic en el botón del mes de Marzo (índice 2)
    const marchButton = screen.getByText('Mar');
    fireEvent.click(marchButton);

    // Verificar que toggleMonth se llama con el índice correcto
    expect(mockToggleMonth).toHaveBeenCalledWith(2);
  });

  // **3. Estados dinámicos**
  it('El botón debe tener la clase bg-african_violet-500 si el mes está visible (visibleMonths[index] === true)', () => {
    render(
      <MonthToggleButton 
        monthsLabels={mockLabels} 
        toggleMonth={mockToggleMonth} 
        visibleMonths={mockVisibleMonths} 
      />
    );

    // Verificar que los botones con visibleMonths[index] === true tienen la clase correcta
    const buttons = screen.getAllByRole('button');
    const visibleButtons = buttons.filter((button, index) => mockVisibleMonths[index]);
    visibleButtons.forEach((button) => {
      expect(button).toHaveClass('bg-african_violet-500');
    });
  });

  it('El botón debe tener la clase bg-african_violet-300 si el mes NO está visible (visibleMonths[index] === false)', () => {
    render(
      <MonthToggleButton 
        monthsLabels={mockLabels} 
        toggleMonth={mockToggleMonth} 
        visibleMonths={mockVisibleMonths} 
      />
    );

    // Verificar que los botones con visibleMonths[index] === false tienen la clase correcta
    const buttons = screen.getAllByRole('button');
    const invisibleButtons = buttons.filter((button, index) => !mockVisibleMonths[index]);
    invisibleButtons.forEach((button) => {
      expect(button).toHaveClass('bg-african_violet-300');
    });
  });

});
