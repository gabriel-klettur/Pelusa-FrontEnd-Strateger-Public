import { render, screen, fireEvent } from '@testing-library/react';
import FiltersMenu from 'Alarms/components/FiltersMenu/FiltersMenu';
import { Provider } from 'react-redux';
import interactionReducer from 'reduxStore/interaction/interactionSlice';
import { configureStore } from '@reduxjs/toolkit';

const initialState = {
    interaction: {
        Chart: {
            ButtonsPanel: {
                ChartButtons: {
                    stochasticButton: false,
                    emasButton: false,
                    candleStickButton: true,
                },
                AlarmButtons: {
                    alarms: true,
                    selected: false,
                    filtered: false,
                },
                OrderButtons: {
                    ordersUsdmButton: false,
                    ordersCoinmButton: false,
                    ordersSpotButton: false,
                    ordersStandardButton: false,
                },
            },
        },
        Alarms: {
            Tabs: {
                alarms: true,
                selected: false,
                filtered: false,
            },
        },
        activeRadarDataset: 'alarms',
    },
};

const store = configureStore({
    reducer: {
        interaction: interactionReducer,
    },
    preloadedState: initialState,
});

describe('FiltersMenu - Initial Rendering', () => {
    test('Should render the filters button and filter icon', () => {
        render(
            <Provider store={store}>
            <FiltersMenu
                onApplyFilters={jest.fn()}
                onClear={jest.fn()}
                uniqueStrategies={['Strategy 1', 'Strategy 2']}
                uniqueTickers={['BTC', 'ETH']}
            />
            </Provider>
        );

        // Check if the "Filters" button is visible on the screen
        const filterButton = screen.getByText(/Filters/i);
        expect(filterButton).toBeInTheDocument();

        // Check if the filter icon is rendered correctly
        const filterIcon = screen.getByAltText(/filter icon/i);
        expect(filterIcon).toBeInTheDocument();
    });
});

describe('FiltersMenu - Menu Open and Close', () => {  
    test('Should display the menu when clicking the filters button', () => {
        render(
            <Provider store={store}>
            <FiltersMenu onApplyFilters={jest.fn()} onClear={jest.fn()} uniqueStrategies={[]} uniqueTickers={[]} />
            </Provider>
        );

        // Check that the menu is not visible initially
        expect(screen.queryByText('Intervals')).not.toBeInTheDocument();

        // Click on the "Filters" button
        const filterButton = screen.getByRole('button', { name: /filters/i });
        fireEvent.click(filterButton);

        // Check that the menu content is visible
        expect(screen.getByText('Intervals')).toBeInTheDocument();
    });
  
    test('Should close the menu when clicking outside the menu', () => {
        render(
            <Provider store={store}>
            <FiltersMenu onApplyFilters={jest.fn()} onClear={jest.fn()} uniqueStrategies={[]} uniqueTickers={[]} />
            </Provider>
        );

        // Click on the "Filters" button to open the menu
        const filterButton = screen.getByRole('button', { name: /filters/i });
        fireEvent.click(filterButton);

        // Check that the menu content is visible
        expect(screen.getByText('Intervals')).toBeInTheDocument();

        // Click outside the menu
        fireEvent.mouseDown(document);

        // Check that the menu content is no longer in the DOM
        expect(screen.queryByText('Intervals')).not.toBeInTheDocument();
    });  
});

describe('FiltersMenu - Checkbox State Changes', () => {    
    test('Should toggle the state of the "Intervals" section checkboxes when clicked', () => {
        render(
            <Provider store={store}>
                <FiltersMenu 
                    onApplyFilters={jest.fn()} 
                    onClear={jest.fn()} 
                    uniqueStrategies={[]} 
                    uniqueTickers={[]} 
                />
            </Provider>
        );

        // Open the menu
        const filterButton = screen.getByRole('button', { name: /filters/i });
        fireEvent.click(filterButton);

        // Click on the "1m" checkbox
        const intervalCheckbox = screen.getByText('1m');
        expect(intervalCheckbox).toBeInTheDocument();

        // Simulate clicking on the "1m" checkbox
        fireEvent.click(intervalCheckbox);

        // Check that the checkbox state has changed (validate background class)
        expect(intervalCheckbox).toHaveClass('text-african_violet-900');

        // Click again to uncheck
        fireEvent.click(intervalCheckbox);

        // Check that the background class has been removed
        expect(intervalCheckbox).toHaveClass('text-african_violet-900');
    });

    test('Should toggle the state of the "Order Types" section checkboxes when clicked', () => {
        render(
            <Provider store={store}>
                <FiltersMenu 
                    onApplyFilters={jest.fn()} 
                    onClear={jest.fn()} 
                    uniqueStrategies={[]} 
                    uniqueTickers={[]} 
                />
            </Provider>
        );

        // Open the menu
        const filterButton = screen.getByRole('button', { name: /filters/i });
        fireEvent.click(filterButton);

        // Click on the "Open Long" checkbox
        const orderTypeCheckbox = screen.getByText('Open Long');
        expect(orderTypeCheckbox).toBeInTheDocument();

        // Simulate clicking on the "Open Long" checkbox
        fireEvent.click(orderTypeCheckbox);

        // Check that the checkbox state has changed
        expect(orderTypeCheckbox).toHaveClass('text-african_violet-900');

        // Click again to uncheck
        fireEvent.click(orderTypeCheckbox);

        // Check that the background class has been removed
        expect(orderTypeCheckbox).toHaveClass('text-african_violet-900');
    });

    test('Should toggle the state of the "Strategies" section checkboxes when clicked', () => {
        render(
            <Provider store={store}>
                <FiltersMenu 
                    onApplyFilters={jest.fn()} 
                    onClear={jest.fn()} 
                    uniqueStrategies={['Scalping', 'Swing']} 
                    uniqueTickers={[]} 
                />
            </Provider>
        );

        // Open the menu
        const filterButton = screen.getByRole('button', { name: /filters/i });
        fireEvent.click(filterButton);

        // Click on the "Scalping" checkbox
        const strategyCheckbox = screen.getByText('Scalping');
        expect(strategyCheckbox).toBeInTheDocument();

        // Simulate clicking on the "Scalping" checkbox
        fireEvent.click(strategyCheckbox);

        // Check that the checkbox state has changed
        expect(strategyCheckbox).toHaveClass('text-african_violet-900');

        // Click again to uncheck
        fireEvent.click(strategyCheckbox);

        // Check that the background class has been removed
        expect(strategyCheckbox).toHaveClass('text-african_violet-900');
    });

    test('Should toggle the state of the "Tickers" section checkboxes when clicked', () => {
        render(
            <Provider store={store}>
                <FiltersMenu 
                    onApplyFilters={jest.fn()} 
                    onClear={jest.fn()} 
                    uniqueStrategies={[]} 
                    uniqueTickers={['BTC', 'ETH']} 
                />
            </Provider>
        );

        // Open the menu
        const filterButton = screen.getByRole('button', { name: /filters/i });
        fireEvent.click(filterButton);

        // Click on the "BTC" checkbox
        const tickerCheckbox = screen.getByText('BTC');
        expect(tickerCheckbox).toBeInTheDocument();

        // Simulate clicking on the "BTC" checkbox
        fireEvent.click(tickerCheckbox);

        // Check that the checkbox state has changed
        expect(tickerCheckbox).toHaveClass('text-african_violet-900');

        // Click again to uncheck
        fireEvent.click(tickerCheckbox);

        // Check that the background class has been removed
        expect(tickerCheckbox).toHaveClass('text-african_violet-900');
    });
});

describe('Apply and Clear Buttons', () => {
    test('Should call the onApplyFilters function with the selected filters', () => {
        const onApplyFiltersMock = jest.fn();

        render(
            <Provider store={store}>
                <FiltersMenu 
                    onApplyFilters={onApplyFiltersMock} 
                    onClear={jest.fn()} 
                    uniqueStrategies={['Scalping', 'Swing']} 
                    uniqueTickers={['BTC', 'ETH']} 
                />
            </Provider>
        );

        // Open the menu
        const filterButton = screen.getByRole('button', { name: /filters/i });
        fireEvent.click(filterButton);

        // Select filters "1m", "Open Long", "Scalping", and "BTC"
        fireEvent.click(screen.getByText('1m'));
        fireEvent.click(screen.getByText('Open Long'));
        fireEvent.click(screen.getByText('Scalping'));
        fireEvent.click(screen.getByText('BTC'));

        // Click the Apply button
        const applyButton = screen.getByText(/Apply/i);
        fireEvent.click(applyButton);

        // Verify that the onApplyFilters function was called with the correct filters
        expect(onApplyFiltersMock).toHaveBeenCalledWith({
            intervals: {
                '1m': true,
                '5m': false,
                '15m': false,
                '30m': false,
                '1h': false,
                '4h': false,
                D: false,
                W: false,
                M: false,
            },
            ordersType: {
                'Open Long': true,
                'Open Short': false,
                'Close Long': false,
                'Close Short': false,
            },
            strategies: {
                'Scalping': true,
                'Swing': false,
            },
            tickers: {
                'BTC': true,
                'ETH': false,
            },
        });
    });

    test('Should reset filters to their initial state and call the onClear function', () => {
        const onClearMock = jest.fn();

        render(
            <Provider store={store}>
                <FiltersMenu 
                    onApplyFilters={jest.fn()} 
                    onClear={onClearMock} 
                    uniqueStrategies={['Scalping', 'Swing']} 
                    uniqueTickers={['BTC', 'ETH']} 
                />
            </Provider>
        );

        // Open the menu
        const filterButton = screen.getByRole('button', { name: /filters/i });
        fireEvent.click(filterButton);

        // Select some filters
        fireEvent.click(screen.getByText('1m'));
        fireEvent.click(screen.getByText('Open Long'));
        fireEvent.click(screen.getByText('Scalping'));
        fireEvent.click(screen.getByText('BTC'));

        // Click the Clear button
        const clearButton = screen.getByText(/Clear/i);
        fireEvent.click(clearButton);

        // Verify that the filters are reset
        expect(screen.getByText('1m')).toBeInTheDocument();
        expect(screen.getByText('Open Long')).toBeInTheDocument();
        expect(screen.getByText('Scalping')).toBeInTheDocument();
        expect(screen.getByText('BTC')).toBeInTheDocument();

        // Verify that the onClear function was called
        expect(onClearMock).toHaveBeenCalled();
    });
});
