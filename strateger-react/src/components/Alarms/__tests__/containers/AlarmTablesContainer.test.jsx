import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import AlarmTablesContainer from '../../containers/AlarmTablesContainer';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn()
}));

const mockStore = configureStore([]);

describe('AlarmTablesContainer', () => {
    let store;
    let mockDispatch;

    beforeEach(() => {
        store = mockStore({
        alarms: { // La clave correcta es "alarms", no "alarm"
            alarms: {
            data: [{ id: 1, name: 'Alarm 1' }],
            loading: false,
            error: null,
            length: 1,
            page: 1,
            offset: 10,
            hasMore: true
            },
            filteredByClickAlarms: {
            data: [],
            loading: false,
            error: null,
            length: 0,
            page: 1,
            offset: 0,
            hasMore: true
            },
            filteredByOptions: {
            data: [],
            loading: false,
            error: null,
            length: 0,
            page: 1,
            offset: 0,
            hasMore: true
            }
        },
        interaction: { 
            Alarms: { Tabs: { alarms: true, selected: false, filtered: false } } 
        }
        });

        // Simular el useDispatch para que sea una función simulada
        mockDispatch = jest.fn();
        require('react-redux').useDispatch.mockReturnValue(mockDispatch);

        // Simular useSelector para devolver el estado correcto
        require('react-redux').useSelector.mockImplementation((selector) => selector(store.getState()));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render AlarmTablesContainer correctly', () => {
        render(
        <Provider store={store}>
            <AlarmTablesContainer />
        </Provider>
        );

        // Verificar que el contenedor principal esté presente
        expect(screen.getByTestId('alarm-tables-container')).toBeInTheDocument();
        
        // Verificar que el TabList esté presente
        expect(screen.getByTestId('tab-list')).toBeInTheDocument();

        // Verificar la presencia de los 3 tabs
        expect(screen.getByText('Alarms (1)')).toBeInTheDocument();
        expect(screen.getByText('Filtered by Click (0)')).toBeInTheDocument();
        expect(screen.getByText('Filtered by Options (0)')).toBeInTheDocument();
        
        // Verificar la presencia de AlarmFiltersPanelContainer
        expect(screen.getByTestId('alarm-filters-panel-container')).toBeInTheDocument();
        
        // Verificar que el TabPanels esté presente
        expect(screen.getByTestId('tab-panels')).toBeInTheDocument();
    });

    it('should dispatch setActiveTab when clicking on a tab', () => {
        store = mockStore({
        alarms: { 
            alarms: {
            data: [{ id: 1, name: 'Alarm 1' }],
            loading: false,
            error: null,
            length: 1,
            page: 1,
            offset: 10,
            hasMore: true
            },
            filteredByClickAlarms: {
            data: [{ id: 2, name: 'Filtered Alarm 1' }], // 🚀 Cambiar aquí
            loading: false,
            error: null,
            length: 1, // 🚀 Cambiar de 0 a 1
            page: 1,
            offset: 0,
            hasMore: true
            },
            filteredByOptions: {
            data: [],
            loading: false,
            error: null,
            length: 0,
            page: 1,
            offset: 0,
            hasMore: true
            }
        },
        interaction: { 
            Alarms: { Tabs: { alarms: true, selected: false, filtered: false } } 
        }
        });
    
        render(
        <Provider store={store}>
            <AlarmTablesContainer />
        </Provider>
        );
    
        // Obtener el botón de la pestaña "Filtered by Click"
        const filteredByClickTab = screen.getByRole('tab', { name: /Filtered by Click/i });
    
        // Simular clic en el tab de "Filtered by Click"
        fireEvent.click(filteredByClickTab);
    
        // Verificar que la acción setActiveTab fue despachada
        expect(mockDispatch).toHaveBeenCalledWith({
        type: 'interaction/setActiveTab',
        payload: { tabReduxId: 'selected' }
        });
    });   
    
    it('should render ErrorMessage if there is an error', () => {
        // Reconfigurar el store con un error
        store = mockStore({
          alarms: { 
            alarms: {
              data: [],
              loading: false,
              error: 'Error loading alarms', // ⚠️ Configurar el error aquí
              length: 0,
              page: 0,
              offset: 0,
              hasMore: true
            },
            filteredByClickAlarms: {
              data: [],
              loading: false,
              error: null,
              length: 0,
              page: 1,
              offset: 0,
              hasMore: true
            },
            filteredByOptions: {
              data: [],
              loading: false,
              error: null,
              length: 0,
              page: 1,
              offset: 0,
              hasMore: true
            }
          },
          interaction: { 
            Alarms: { Tabs: { alarms: true, selected: false, filtered: false } } 
          }
        });
      
        render(
          <Provider store={store}>
            <AlarmTablesContainer />
          </Provider>
        );
      
        // Verificar que el mensaje de error esté presente
        expect(screen.getByTestId('error-message')).toBeInTheDocument();
        expect(screen.getByText('Error loading alarms')).toBeInTheDocument();
    });
    
});
