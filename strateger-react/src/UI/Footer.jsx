import React from 'react';
import Alarms from '../components/Alarms/Alarms';
import Orders from '../components/Orders/Orders';
import { StrategyCard } from '../components/Strategy';
import { Diary } from '../components/Diary';
import { Account } from '../components/Account';
import { Position } from '../components/Positions';
import { Backtesting } from '../components/Backtesting';

const Footer = ({ selectedTab }) => {
  return (
    <div className="pt-1 bg-african_violet-600">
      {selectedTab === 0 && <Alarms />}
      {selectedTab === 1 && <Orders />}
      {selectedTab === 2 && <StrategyCard />}
      {selectedTab === 3 && <Diary />}
      {selectedTab === 4 && <Account />}
      {selectedTab === 5 && <Position />}
      {selectedTab === 6 && <Backtesting />}
      {selectedTab === 7 && <div>Configuración</div>}
    </div>
  );
};

export default Footer;
