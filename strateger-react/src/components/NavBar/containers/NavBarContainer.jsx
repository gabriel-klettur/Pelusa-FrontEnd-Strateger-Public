
import { useDispatch, useSelector } from 'react-redux';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';

import { setSelectedTab, selectSelectedTab } from '../../../redux/tab/tabSlice';
import Alarms from '../../Alarms/Alarms';
import Orders from '../../Orders/Orders';
import { StrategyCard } from '../../Strategy';
import { Diary } from '../../Diary';
import { Account } from '../../Account';
import { Position } from '../../Positions';
import { Backtesting } from '../../Backtesting';

// Import or define your images
import AlarmsIcon from '../assets/icons/alarms.png';
import OrdersIcon from '../assets/icons/orders.png';
import StrategyIcon from '../assets/icons/strategy.png';
import DiaryIcon from '../assets/icons/diary.png';
import AccountIcon from '../assets/icons/account.png';
import PositionIcon from '../assets/icons/position.png';
import BacktestingIcon from '../assets/icons/backtesting.png';
import ConfigIcon from '../assets/icons/config.png'; // Example icon for Configuración

const NavBarContainer = () => {
    const dispatch = useDispatch();
    const selectedTab = useSelector(selectSelectedTab);

    const handleTabChange = (index) => {
        dispatch(setSelectedTab(index));
    };

    // Define the tabs and their corresponding icons
    const tabs = [
        { name: 'Alarmas', icon: AlarmsIcon },
        { name: 'Órdenes', icon: OrdersIcon },
        { name: 'Estrategias', icon: StrategyIcon },
        { name: 'Diario', icon: DiaryIcon },
        { name: 'Account', icon: AccountIcon },
        { name: 'Positions', icon: PositionIcon },
        { name: 'Backtesting', icon: BacktestingIcon },
        { name: 'Configuración', icon: ConfigIcon },
    ];

    return (
        <>
            <TabGroup selectedIndex={selectedTab} onChange={handleTabChange}>
                <div className="flex">                   
                    <TabPanels className="w-full h-screen">
                        <TabPanel>
                            <Alarms />
                        </TabPanel>
                        <TabPanel>
                            <Orders />
                        </TabPanel>
                        <TabPanel>
                            <StrategyCard />
                        </TabPanel>
                        <TabPanel>
                            <Diary />
                        </TabPanel>
                        <TabPanel>
                            <Account />
                        </TabPanel>
                        <TabPanel>
                            <Position />
                        </TabPanel>
                        <TabPanel>
                            <Backtesting />
                        </TabPanel>
                        <TabPanel>
                            Configuración
                        </TabPanel>
                    </TabPanels>
                     <TabList className="flex flex-col h-screen">
                        {tabs.map((tab, index) => (
                            <Tab
                                key={index}
                                className={({ selected }) =>
                                    `w-full h-full p-4 text-sm font-medium transition-colors duration-200
                                    ${
                                        selected
                                        ? 'bg-african_violet-400 text-african_violet-900'
                                        : 'bg-african_violet-200 text-african_violet-700 hover:text-african_violet-900'
                                    }`
                                }
                            >
                                <img 
                                    src={tab.icon} 
                                    alt={tab.name} 
                                    className="h-10 w-10 mx-auto filter invert"
                                />
                            </Tab>
                        ))}
                    </TabList>
                </div>
            </TabGroup>
        </>
    );
};

export default NavBarContainer;
