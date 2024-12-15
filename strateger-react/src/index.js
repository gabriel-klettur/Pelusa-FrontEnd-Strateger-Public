// Path: strateger-react/src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';
import './index.css';
import './styles/global.css'; 
import reportWebVitals from './reportWebVitals';
import { eviromentDetection } from './config';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

//! ------------------------ Eviroment Detection --------------------
eviromentDetection();   //Print on the console the current mode of the app 'Development' or 'Production'

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

reportWebVitals();
