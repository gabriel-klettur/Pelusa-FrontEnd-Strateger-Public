// Path: strateger-react/src/components/Alarms/AlarmToolPanel/TypeButton.test.js

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TypeButton from './TypeButton';

test('renders the TypeButton with correct text', () => {
  const mockToggleType = jest.fn(); // Crear un mock de la función toggleType
  const type = 'Buy';
  const selectedTypes = [];

  render(<TypeButton type={type} selectedTypes={selectedTypes} toggleType={mockToggleType} />);

  // Verificar que el botón se renderiza con el texto correcto
  const buttonElement = screen.getByText(type);
  expect(buttonElement).toBeInTheDocument();
});

test('applies correct class when type is selected', () => {
  const mockToggleType = jest.fn();
  const type = 'Buy';
  const selectedTypes = ['Buy']; // Simular que el tipo está seleccionado

  render(<TypeButton type={type} selectedTypes={selectedTypes} toggleType={mockToggleType} />);

  const buttonElement = screen.getByText(type);
  
  // Verificar que se aplica la clase para un tipo seleccionado
  expect(buttonElement).toHaveClass('bg-african_violet-500 text-white');
});

test('calls toggleType with correct type on click', () => {
  const mockToggleType = jest.fn();
  const type = 'Buy';
  const selectedTypes = [];

  render(<TypeButton type={type} selectedTypes={selectedTypes} toggleType={mockToggleType} />);

  const buttonElement = screen.getByText(type);
  
  // Simular un clic en el botón
  fireEvent.click(buttonElement);

  // Verificar que toggleType fue llamado con el tipo correcto
  expect(mockToggleType).toHaveBeenCalledWith(type);
});
