import { render, screen, fireEvent } from '@testing-library/react';
import NavBar from '../components/NavBar';

describe('NavBar', () => {
    const mockTabs = [
        { name: 'Alarmas', icon: 'AlarmsIcon', route: '/alarms', disabled: false },
        { name: 'Battle Field', icon: 'battleFieldIcon', route: '/battleField', disabled: true },
        { name: 'Órdenes', icon: 'OrdersIcon', route: '/Orders', disabled: true },
        { name: 'Estrategias', icon: 'StrategyIcon', route: '/Strategy', disabled: true },
        { name: 'Diario', icon: 'DiaryIcon', route: '/Diary', disabled: true },
        { name: 'Account', icon: 'AccountIcon', route: '/Account', disabled: true },
        { name: 'Positions', icon: 'PositionIcon', route: '/Position', disabled: true },
        { name: 'Backtesting', icon: 'BacktestingIcon', route: '/Backtesting', disabled: true },
        { name: 'Earnings', icon: 'EarningsIcon', route: '/Earnings', disabled: true },
        { name: 'News', icon: 'NewsIcon', route: '/News', disabled: true },
        { name: 'Divisas', icon: 'DivisasIcon', route: '/Divisas', disabled: true },
        { name: 'Reina', icon: 'ReinaIcon', route: '/Share', disabled: true },
        { name: 'Laboratorio', icon: 'LaboratoryIcon', route: '/Lav', disabled: true },
        { name: 'Configuración', icon: 'ConfigIcon', route: '/Config', disabled: true },
    ];
    const mockHandleTabChange = jest.fn();

    it('should render the correct number of tabs', () => {
        render(<NavBar selectedTab={0} handleTabChange={mockHandleTabChange} tabs={mockTabs} />);

        const tabs = screen.getAllByRole('tab');
        expect(tabs).toHaveLength(mockTabs.length);
    });

    it('should render the correct tab icons and alt texts', () => {
        render(<NavBar selectedTab={0} handleTabChange={mockHandleTabChange} tabs={mockTabs} />);

        mockTabs.forEach((tab) => {
            expect(screen.getByAltText(tab.name)).toBeInTheDocument();
            expect(screen.getByAltText(tab.name)).toHaveAttribute('src', tab.icon);
        });
    });

    it('should apply the correct class for a disabled tab', () => {
        render(<NavBar selectedTab={0} handleTabChange={mockHandleTabChange} tabs={mockTabs} />);

        const disabledTab = screen.getByRole('tab', { name: /Battle Field/i });
        expect(disabledTab).toHaveClass('cursor-not-allowed bg-gray-500 text-gray-500');
        expect(disabledTab).toBeDisabled();
    });

    it('should apply the correct class for a selected tab', () => {
        render(<NavBar selectedTab={0} handleTabChange={mockHandleTabChange} tabs={mockTabs} />);

        const selectedTab = screen.getByRole('tab', { name: /Alarmas/i });
        expect(selectedTab).toHaveClass('bg-african_violet-400 text-african_violet-900');
    });

    it('should apply the correct class for a non-selected tab', () => {
        render(<NavBar selectedTab={0} handleTabChange={mockHandleTabChange} tabs={mockTabs} />);

        const nonSelectedTab = screen.getByRole('tab', { name: /Órdenes/i });
        expect(nonSelectedTab).not.toHaveClass('bg-african_violet-200 text-african_violet-700 hover:text-african_violet-900');
    });

    it('should call handleTabChange when a tab is clicked', () => {
        render(<NavBar selectedTab={0} handleTabChange={mockHandleTabChange} tabs={mockTabs} />);

        const secondTab = screen.getByRole('tab', { name: /Órdenes/i });
        fireEvent.click(secondTab);

        expect(mockHandleTabChange).not.toHaveBeenCalledTimes(1);
    });

    it('should not call handleTabChange when a disabled tab is clicked', () => {
        render(<NavBar selectedTab={0} handleTabChange={mockHandleTabChange} tabs={mockTabs} />);

        const disabledTab = screen.getByRole('tab', { name: /Battle Field/i });
        fireEvent.click(disabledTab);

        expect(mockHandleTabChange).not.toHaveBeenCalled();
    });
});
