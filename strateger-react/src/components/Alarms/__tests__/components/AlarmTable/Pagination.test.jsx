import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Pagination from '../../../../Alarms/components/AlarmTable/Pagination';

const mockStore = configureStore([]);

describe('Pagination', () => {
    let store;
    let mockDispatch;
  
    beforeEach(() => {
      store = mockStore({});
      mockDispatch = jest.fn();
      store.dispatch = mockDispatch; // Reemplazamos la función dispatch del store con jest.fn()
    });

    it('should render Previous and Next buttons correctly', () => {
        render(
        <Provider store={store}>
            <Pagination 
            page={1} 
            hasMore={true} 
            setHasMore={jest.fn()} 
            endIndex={20} 
            totalDataLength={100} 
            offset={0} 
            setPage={jest.fn()} 
            fetchData={jest.fn()} 
            />
        </Provider>
        );

        // Verificar que el botón Previous esté presente
        const previousButton = screen.getByText('Previous');
        expect(previousButton).toBeInTheDocument();

        // Verificar que el botón Next esté presente
        const nextButton = screen.getByText('Next');
        expect(nextButton).toBeInTheDocument();
    });

    it('should disable the Previous button when the page is 0', () => {
        render(
        <Provider store={store}>
            <Pagination 
            page={0} 
            hasMore={true} 
            setHasMore={jest.fn()} 
            endIndex={20} 
            totalDataLength={100} 
            offset={0} 
            setPage={jest.fn()} 
            fetchData={jest.fn()} 
            />
        </Provider>
        );

        // Verificar que el botón Previous esté presente y esté deshabilitado
        const previousButton = screen.getByText('Previous');
        expect(previousButton).toBeInTheDocument();
        expect(previousButton).toBeDisabled();
    });

    it('should call setPage with the previous page when clicking the Previous button', () => {
        render(
        <Provider store={store}>
            <Pagination 
            page={2} 
            hasMore={true} 
            setHasMore={jest.fn()} 
            endIndex={40} 
            totalDataLength={100} 
            offset={0} 
            setPage={(page) => ({ type: 'setPage', payload: page })} 
            fetchData={jest.fn()} 
            />
        </Provider>
        );

        // Obtener el botón Previous y hacer clic
        const previousButton = screen.getByText('Previous');
        fireEvent.click(previousButton);

        // Verificar que setPage fue llamado con la página anterior (2 - 1 = 1)
        expect(mockDispatch).toHaveBeenCalledWith({ type: 'setPage', payload: 1 });
    });

    it('should call fetchData and setPage when clicking the Next button', () => {
        render(
          <Provider store={store}>
            <Pagination 
              page={1} 
              hasMore={true} 
              setHasMore={jest.fn()} 
              endIndex={40} 
              totalDataLength={40}  // ⚠️ Ahora es 40 en lugar de 100
              offset={0} 
              setPage={(page) => ({ type: 'setPage', payload: page })} 
              fetchData={(payload) => ({ type: 'fetchData', payload })} 
            />
          </Provider>
        );
    
        // Obtener el botón Next y hacer clic
        const nextButton = screen.getByText('Next');
        fireEvent.click(nextButton);
    
        // Verificar que setPage fue llamado con la página siguiente (1 + 1 = 2)
        expect(mockDispatch).toHaveBeenCalledWith({ type: 'setPage', payload: 2 });
    
        // Verificar que fetchData fue llamado con el payload correcto
        expect(mockDispatch).toHaveBeenCalledWith({ 
          type: 'fetchData', 
          payload: { limit: 500, offset: 0 } 
        });
    });
});
