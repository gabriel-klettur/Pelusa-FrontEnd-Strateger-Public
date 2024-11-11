import React from 'react';
import { useSelector } from 'react-redux';

import PerpUSDTMChart from '../components/AccountCharts/PerpUSDTMChart';
import SpotChart from '../components/AccountCharts/SpotChart';
import PerpCOINMChart from '../components/AccountCharts/PerpCOINMChart';

import { ChartComponent } from '../../Charts/LinealChart/TradingViewLineal';
import Legend from '../../Charts/LinealChart/Legend';

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { selectCoinMTimeData, selectUSDTMTimeData, selectSpotTimeData } from '../../../redux/account';

import Ventanita from '../../common/Ventanita';

const AccountChartsContainer = () => {
    const balanceCOINMAccount = useSelector(selectCoinMTimeData);
    const balanceUSDTMAccount = useSelector(selectUSDTMTimeData);    
    const balanceSpotAccount = useSelector(selectSpotTimeData);

    const uniqueAssetsCOINMAccount = new Set(Object.values(balanceCOINMAccount).map((item) => item.asset));

    // Agrupar los datos de COINM por asset
    const COINAccountGroupedByAsset = {};
    uniqueAssetsCOINMAccount.forEach(asset => {        
        COINAccountGroupedByAsset[asset] = Object.values(balanceCOINMAccount).filter(entry => entry.asset === asset);
    });    

    return (
      <div className="grid grid-cols-3 gap-4">
        <div className="">
          <Ventanita 
            titulo="Perpetual USDT-M" 
            contenido={
              <PerpUSDTMChart
                balanceUSDTMAccount={balanceUSDTMAccount}
                ChartComponent={ChartComponent}
                Legend={Legend}              
              />
            } 
          />
        </div>
        
        
        <Ventanita
          titulo="Spot"
          contenido={
            <SpotChart 
              balanceSpotAccount={balanceSpotAccount} 
              ChartComponent={ChartComponent} 
              Legend={Legend}               
            />
          }
        />
                    
        <Ventanita 
          titulo="Perpetual COIN-M"
          contenido={
            <TabGroup>
              <TabList className="flex p-1 space-x-1 bg-gray-200 rounded-xl">
                {Object.keys(COINAccountGroupedByAsset).map(asset => (
                  <Tab
                    key={asset}
                    className={({ selected }) =>
                      `w-full py-2.5 text-sm leading-5 font-medium text-gray-700 rounded-lg
                      ${selected ? 'bg-white shadow' : 'hover:bg-white/[0.12] hover:text-gray-900'}`
                    }
                  >
                    {asset}
                  </Tab>
                ))}
              </TabList>
              <TabPanels className="mt-2">
                {Object.entries(COINAccountGroupedByAsset).map(([asset, data]) => (
                  <TabPanel key={asset} className="p-4 bg-white rounded-xl shadow">
                    <PerpCOINMChart
                      asset={asset}
                      balanceCOINMAccount={data}                
                      ChartComponent={ChartComponent}
                      Legend={Legend}              
                    />
                  </TabPanel>
                ))}
              </TabPanels>
            </TabGroup>
          }
        />
        
      </div>
    );
}

export default AccountChartsContainer;
