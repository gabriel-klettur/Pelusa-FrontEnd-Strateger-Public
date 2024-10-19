
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';

import { setSelectedTab, selectSelectedTab } from '../redux/tab/tabSlice';
import Alarms from '../components/Alarms/Alarms';
import Orders from '../components/Orders/Orders';
import { StrategyCard } from '../components/Strategy';
import { Diary } from '../components/Diary';
import { Account } from '../components/Account';
import { Position } from '../components/Positions';
import { Backtesting } from '../components/Backtesting';

const NavBarContainer = () => {
    const dispatch = useDispatch();
  
    const selectedTab = useSelector(selectSelectedTab);

    const handleTabChange = (index) => {
        dispatch(setSelectedTab(index));
    };

    return (
        <>
            <TabGroup selectedIndex={selectedTab} onChange={handleTabChange}>
                <TabList className="flex bg-african_violet-200">
                    {[
                    'Alarmas',
                    'Órdenes',
                    'Estrategias',
                    'Diario',
                    'Account',
                    'Positions',
                    'Backtesting',
                    'Configuración',
                    ].map((tabName, index) => (
                    <Tab
                        key={index}
                        className={({ selected }) =>
                        `w-full h-14 text-sm font-medium transition-colors duration-200 ${
                            selected
                            ? 'bg-african_violet-400 shadow text-african_violet-900'
                            : 'text-african_violet-700 hover:bg-african_violet-200 hover:text-african_violet-900'
                        }`
                        }
                    >
                        {tabName}
                    </Tab>
                    ))}
                </TabList>
                <TabPanels className="">
                    <TabPanel className="pt-1 bg-african_violet-800">
                        <Alarms />
                    </TabPanel>
                    <TabPanel className="pt-1  bg-african_violet-800">
                        <Orders />
                    </TabPanel>
                    <TabPanel className="pt-1  bg-african_violet-800">
                        <StrategyCard />
                    </TabPanel>
                    <TabPanel className="pt-1  bg-african_violet-800">
                        <Diary />
                    </TabPanel>
                    <TabPanel className="pt-1  bg-african_violet-800">
                        <Account />
                    </TabPanel>
                    <TabPanel className="pt-1  bg-african_violet-800">
                        <Position />
                    </TabPanel>
                    <TabPanel className="pt-1  bg-african_violet-800">
                        <Backtesting />
                    </TabPanel>
                    <TabPanel className="pt-1  bg-african_violet-800">
                        Configuración
                    </TabPanel>
                </TabPanels>
            </TabGroup>
        </>
    );
};

export default NavBarContainer