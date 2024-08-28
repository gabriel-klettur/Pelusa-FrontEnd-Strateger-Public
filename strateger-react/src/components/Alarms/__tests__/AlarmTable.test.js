import { render, screen } from '@testing-library/react';
import AlarmTable from '../components/AlarmTable/AlarmTable';

describe('AlarmTable component', () => {
  test('renders multiple rows correctly', () => {
    const alarms = [
      { id: '2381', Ticker: 'BTCUSDT.PS', Temporalidad: '5m', Entry_Price_Alert: '59965.21', Exit_Price_Alert: '', Time_Alert: '2024-8-28 13:15:0', Order: 'order open long', Strategy: 'Stochastic_v1' },
      { id: '2380', Ticker: 'BTCUSDT.PS', Temporalidad: '5m', Entry_Price_Alert: '', Exit_Price_Alert: '59194.33', Time_Alert: '2024-8-28 9:0:0', Order: 'order close long', Strategy: 'Stochastic_v1' },
      { id: '2379', Ticker: 'ETHUSDT.PS', Temporalidad: '1H', Entry_Price_Alert: '3995.00', Exit_Price_Alert: '4000.00', Time_Alert: '2024-8-28 12:30:0', Order: 'order open short', Strategy: 'Breakout' },
    ];

    render(<AlarmTable alarms={alarms} selectedAlarms={[]} handleSelectAlarm={() => {}} />);
    
    // Verificar que se han renderizado todas las filas correspondientes a las alarmas
    alarms.forEach(alarm => {
      expect(screen.getByText(alarm.id)).toBeInTheDocument();
      
      const tickerElements = screen.getAllByText(alarm.Ticker);
      expect(tickerElements.length).toBeGreaterThan(0);

      const temporalidadElements = screen.getAllByText(alarm.Temporalidad);
      expect(temporalidadElements.length).toBeGreaterThan(0);
    });
    
    // Verificar que efectivamente hay tres filas de datos en la tabla (excluyendo el encabezado)
    const rows = screen.getAllByRole('row');
    expect(rows.length).toBe(alarms.length + 1); // +1 para incluir la fila de encabezado
  });
});
