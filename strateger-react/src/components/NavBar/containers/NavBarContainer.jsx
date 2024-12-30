
import { useDispatch, useSelector } from 'react-redux';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';

import { setSelectedTab, selectSelectedTab } from 'reduxStore/tab/tabSlice';
import Alarms from '../../Alarms/Alarms';
import Orders from '../../Orders/Orders';
import { StrategyCard } from '../../Strategy';
import { Diary } from '../../Diary';
import { Account } from '../../Account';
import { Position } from '../../Positions';
import { Backtesting } from '../../Backtesting';
import { Earnings } from '../../Earnings';
import { News } from '../../News';
import BattleField from '../../BattleField';
import ConfigComponent from '../../configComponent/ConfigComponent';
import Laboratory from '../../Laboratory';

// Import or define your images
import battleFieldIcon from '../assets/icons/battleField.svg';
import AlarmsIcon from '../assets/icons/alarms.svg';
import OrdersIcon from '../assets/icons/orders.svg';
import StrategyIcon from '../assets/icons/strategy.svg';
import DiaryIcon from '../assets/icons/diary.svg';
import AccountIcon from '../assets/icons/account.svg';
import PositionIcon from '../assets/icons/positions.svg';
import BacktestingIcon from '../assets/icons/backtesting.svg';
import ConfigIcon from '../assets/icons/config.svg'; 
import NewsIcon from '../assets/icons/news.svg'; 
import EarningsIcon from '../assets/icons/earnings.svg'; 
import DivisasIcon from '../assets/icons/divisas.svg';
import ReinaIcon from '../assets/icons/reina.svg';
import LaboratoryIcon from '../assets/icons/lab.svg';

const NavBarContainer = () => {
    const dispatch = useDispatch();
    const selectedTab = useSelector(selectSelectedTab);

    const handleTabChange = (index) => {
        dispatch(setSelectedTab(index));
    };

    // Define the tabs and their corresponding icons
    const tabs = [    
        { name: 'Alarmas', icon: AlarmsIcon, disabled: false },
        { name: 'Battle Field', icon: battleFieldIcon, disabled: true },
        { name: 'Órdenes', icon: OrdersIcon, disabled: true },
        { name: 'Estrategias', icon: StrategyIcon, disabled: true },
        { name: 'Diario', icon: DiaryIcon, disabled: true },
        { name: 'Account', icon: AccountIcon, disabled: true },
        { name: 'Positions', icon: PositionIcon, disabled: true },
        { name: 'Backtesting', icon: BacktestingIcon, disabled: true },
        { name: 'Earnings', icon: EarningsIcon, disabled: true },
        { name: 'News', icon: NewsIcon, disabled: true },
        { name: 'Divisas', icon: DivisasIcon, disabled: true },
        { name: 'Reina', icon: ReinaIcon, disabled: true },
        { name: 'Laboratorio', icon: LaboratoryIcon, disabled: true },
        { name: 'Configuración', icon: ConfigIcon, disabled: true },
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
                            <BattleField />
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
                            <Earnings />
                        </TabPanel>
                        <TabPanel>
                            <News />
                        </TabPanel>
                        <TabPanel>
                            <>
                                DIVISAS 
                            </>
                        </TabPanel>
                        <TabPanel>
                            <>
                                REINA 
                            </>
                        </TabPanel>
                        <TabPanel>
                            <Laboratory />
                        </TabPanel>
                        <TabPanel>
                            <ConfigComponent />
                        </TabPanel>
                    </TabPanels>
                    <TabList className="flex flex-col h-screen mt-1">
                        {tabs.map((tab, index) => (
                            <Tab
                                key={index}
                                className={({ selected }) =>
                                    `w-full h-16 p-2 text-sm font-medium transition-colors duration-200 
                                    ${
                                        tab.disabled
                                            ? 'cursor-not-allowed bg-gray-500 text-gray-500'
                                            : `hover:bg-african_violet-300 ${
                                                selected
                                                    ? 'bg-african_violet-400 text-african_violet-900'
                                                    : 'bg-african_violet-200 text-african_violet-700 hover:text-african_violet-900'
                                            }`
                                    }`
                                }
                                disabled={tab.disabled}
                            >
                                <img 
                                    src={tab.icon} 
                                    alt={tab.name} 
                                    className={`h-8 w-8 mx-auto ${tab.disabled ? 'opacity-50' : ''}`}
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
