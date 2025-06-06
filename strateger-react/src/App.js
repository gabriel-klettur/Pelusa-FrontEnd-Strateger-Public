// Path: strateger-react/src/App.js

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Route, Routes, Navigate  } from 'react-router-dom';

import { loadSlicesInOrder } from './dataLoaders/loadSlicesInOrder';
import MainContainer from './containers/MainContainer';
import ToastConfig from './utils/ToastConfig';


import Alarms from './components/Alarms/Alarms';
import Orders from './components/Orders/Orders';
import { Strategy } from './components/Strategy';
import { Diary } from './components/Diary';
import { Account } from './components/Account';
import { Position } from './components/Positions';
import { Backtesting } from './components/Backtesting';
import { Earnings } from './components/Earnings';
import { News } from './components/News';
import BattleField from './components/BattleField';
import ConfigComponent from './components/configComponent/ConfigComponent';
import Laboratory from './components/Laboratory';


const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadSlicesInOrder()); // Pasamos la función toast para mostrar mensajes
    }, [dispatch]);

    // Contenedor de toast
    return (        
      <Router>
        <>
          <ToastConfig />          
          <Routes>            
            <Route path="" element={<Navigate to="/alarms" replace />} />
            <Route path="" element={<MainContainer />}>              
              <Route path="alarms" element={<Alarms />} />
              <Route path="battlefield" element={<BattleField />} />
              <Route path="orders" element={<Orders />} /> 
              <Route path="strategy" element={<Strategy />} />
              <Route path="diary" element={<Diary />} />
              <Route path="account" element={<Account />} />
              <Route path="positions" element={<Position />} />
              <Route path="backtesting" element={<Backtesting />} />
              <Route path="earnings" element={<Earnings />} />
              <Route path="news" element={<News />} />
              <Route path="config" element={<ConfigComponent />} />
              <Route path="laboratory" element={<Laboratory />} />                          
            </Route>
          </Routes>
        </>
      </Router>
    );
};

export default App;
