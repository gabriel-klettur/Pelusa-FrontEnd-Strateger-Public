import { render, screen, fireEvent } from '@testing-library/react';
import AlarmRow from '../components/AlarmTable/AlarmRow';

// Renderiza correctamente los datos de la alarma
describe('AlarmRow component', () => {
  test('renders correctly with complete alarm data', () => {
    const alarm = {
      id: '123',
      Ticker: 'AAPL',
      Temporalidad: '1H',
      Entry_Price_Alert: '150.00',
      Exit_Price_Alert: '155.00',
      Time_Alert: '10:30 AM',
      Order: 'Buy',
      Strategy: 'Breakout',
    };

    render(
      <table>
        <tbody>
          <AlarmRow alarm={alarm} isSelected={false} handleSelectAlarm={() => {}} />
        </tbody>
      </table>
    );

    // verifica que los datos de la alarma se rendericen correctamente
    expect(screen.getByText('123')).toBeInTheDocument();
    expect(screen.getByText('AAPL')).toBeInTheDocument();
    expect(screen.getByText('1H')).toBeInTheDocument();
    expect(screen.getByText('150.00')).toBeInTheDocument();
    expect(screen.getByText('155.00')).toBeInTheDocument();
    expect(screen.getByText('10:30 AM')).toBeInTheDocument();
    expect(screen.getByText('Buy')).toBeInTheDocument();
    expect(screen.getByText('Breakout')).toBeInTheDocument();
  });

  // Renderiza correctamente con datos de alarma incompletos
  test('renders correctly with incomplete alarm data', () => {
    const alarm = {
      id: '123',
      Ticker: 'AAPL',
      // Falta el resto de los datos
    };

    render(
      <table>
        <tbody>
          <AlarmRow alarm={alarm} isSelected={false} handleSelectAlarm={() => {}} />
        </tbody>
      </table>
    );

    expect(screen.getByText('123')).toBeInTheDocument();
    expect(screen.getByText('AAPL')).toBeInTheDocument();
  });

  // Aplica correctamente la clase CSS cuando isSelected es true
  test('applies selected class when isSelected is true', () => {
    const alarm = { id: '123' };

    render(
      <table>
        <tbody>
          <AlarmRow alarm={alarm} isSelected={true} handleSelectAlarm={() => {}} />
        </tbody>
      </table>
    );
    
    const row = screen.getByRole('row'); 
    expect(row).toHaveClass('bg-african_violet-400 text-white');
  });

  // Aplica correctamente la clase CSS cuando isSelected es false
  test('applies unselected class when isSelected is false', () => {
    const alarm = { id: '123' };

    render(
      <table>
        <tbody>
          <AlarmRow alarm={alarm} isSelected={false} handleSelectAlarm={() => {}} />
        </tbody>
      </table>
    );
    
    const row = screen.getByRole('row'); 
    expect(row).toHaveClass('bg-white text-african_violet-400');
  });

  // Llama a handleSelectAlarm con la alarma correcta cuando se hace clic
  test('calls handleSelectAlarm with the correct alarm when clicked', () => {
    const alarm = { id: '123' };
    const handleSelectAlarm = jest.fn();

    render(
      <table>
        <tbody>
          <AlarmRow alarm={alarm} isSelected={false} handleSelectAlarm={handleSelectAlarm} />
        </tbody>
      </table>
    );

    fireEvent.click(screen.getByText('123'));

    expect(handleSelectAlarm).toHaveBeenCalledWith(alarm);
  });

  // Verifica que la fila es clicable (cursor-pointer)
  test('row has cursor-pointer class', () => {
    const alarm = { id: '123' };

    render(
      <table>
        <tbody>
          <AlarmRow alarm={alarm} isSelected={false} handleSelectAlarm={() => {}} />
        </tbody>
      </table>
    );

    const row = screen.getByRole('row');
    expect(row).toHaveClass('cursor-pointer');
  });

  // Simula múltiples clics y verifica que handleSelectAlarm se llama con el argumento correcto cada vez
  test('calls handleSelectAlarm multiple times correctly', () => {
    const alarm = { id: '123' };
    const handleSelectAlarm = jest.fn();

    render(
      <table>
        <tbody>
          <AlarmRow alarm={alarm} isSelected={false} handleSelectAlarm={handleSelectAlarm} />
        </tbody>
      </table>
    );

    fireEvent.click(screen.getByText('123'));
    fireEvent.click(screen.getByText('123'));

    expect(handleSelectAlarm).toHaveBeenCalledTimes(2);
    expect(handleSelectAlarm).toHaveBeenCalledWith(alarm);
  });

  // Cambia la selección al hacer clic en diferentes filas
  test('selects different alarms on click', () => {
    const alarm1 = { id: '123' };
    const alarm2 = { id: '456' };
    const handleSelectAlarm = jest.fn();

    const { rerender } = render(
      <table>
        <tbody>
          <AlarmRow alarm={alarm1} isSelected={false} handleSelectAlarm={handleSelectAlarm} />
        </tbody>
      </table>
    );

    fireEvent.click(screen.getByText('123'));
    expect(handleSelectAlarm).toHaveBeenCalledWith(alarm1);

    rerender(
      <table>
        <tbody>
          <AlarmRow alarm={alarm2} isSelected={false} handleSelectAlarm={handleSelectAlarm} />
        </tbody>
      </table>
    );

    fireEvent.click(screen.getByText('456'));
    expect(handleSelectAlarm).toHaveBeenCalledWith(alarm2);
  });

  // Verifica que la clase CSS de hover se aplica correctamente
  test('applies hover class correctly', () => {
    const alarm = { id: '123' };

    render(
      <table>
        <tbody>
          <AlarmRow alarm={alarm} isSelected={false} handleSelectAlarm={() => {}} />
        </tbody>
      </table>
    );

    const row = screen.getByRole('row'); // Selecciona la fila de la tabla

    expect(row).toHaveClass('hover:bg-african_violet-700');
  });
});
