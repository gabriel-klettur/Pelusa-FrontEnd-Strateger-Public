// Path: src/components/Alarms/containers/__tests__/AlarmInfoPanel.test.jsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import AlarmInfoPanelContainer from '../../containers/AlarmInfoPanelContainer';

// Mock de los subcomponentes para controlar la salida de los componentes
jest.mock('../../components/AlarmInfoPanel/AlarmsRadarChart/AlarmsRadarChart', () => () => <div data-testid="alarms-graph-container"></div>);
jest.mock('../../components/AlarmInfoPanel/AlarmOverviewPanel/AlarmOverviewPanel', () => () => <div data-testid="general-statistics"></div>);
jest.mock('../../components/AlarmInfoPanel/AlarmsBarChart/AlarmsBarChart', () => () => <div data-testid="alarms-graph-by-month-container"></div>);
jest.mock('../../components/AlarmTab', () => ({ tabName }) => <button data-testid={`alarm-tab-${tabName}`}>{tabName}</button>);

describe('AlarmInfoPanel', () => {
    it('should render the AlarmInfoPanel component and its child components', () => {
        // Datos de prueba
        const alarmsData = [
        { Time_Alert: '2024-12-10T10:00:00Z' },
        { Time_Alert: '2024-12-10T15:00:00Z' }
        ];
        const filteredByClickAlarmsData = [
        { Time_Alert: '2024-12-10T12:00:00Z' }
        ];
        const filteredByOptionsAlarmsData = [
        { Time_Alert: '2024-12-10T14:00:00Z' }
        ];

        // Renderizar el componente con los datos de prueba
        render(
        <AlarmInfoPanelContainer 
            alarmsData={alarmsData} 
            filteredByClickAlarmsData={filteredByClickAlarmsData} 
            filteredByOptionsAlarmsData={filteredByOptionsAlarmsData} 
        />
        );

        // ✅ Verificar que el contenedor principal de AlarmInfoPanel está presente
        const containerElement = screen.getByTestId('alarm-info-panel-container');
        expect(containerElement).toBeInTheDocument();

        // ✅ Verificar que los 3 tabs están presentes
        const tabNames = ['Alarms By Time', 'Overview', 'Alarms By Month'];
        tabNames.forEach((tabName) => {
        const tabElement = screen.getByTestId(`alarm-tab-${tabName}`);
        expect(tabElement).toBeInTheDocument();
        });
    });

    it('should render the tabs with the correct names', () => {
        // Datos de prueba
        const alarmsData = [];
        const filteredByClickAlarmsData = [];
        const filteredByOptionsAlarmsData = [];
    
        // Renderizar el componente
        render(
          <AlarmInfoPanelContainer 
            alarmsData={alarmsData} 
            filteredByClickAlarmsData={filteredByClickAlarmsData} 
            filteredByOptionsAlarmsData={filteredByOptionsAlarmsData} 
          />
        );
    
        // ✅ Verificar que los 3 tabs están presentes
        const tabNames = ['Alarms By Time', 'Overview', 'Alarms By Month'];
        tabNames.forEach((tabName) => {
          const tabElement = screen.getByTestId(`alarm-tab-${tabName}`);
          expect(tabElement).toBeInTheDocument();
          expect(tabElement).toHaveTextContent(tabName);
        });
    });

});
