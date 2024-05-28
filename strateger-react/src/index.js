// Path: strateger-react/src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client'; // Importa la nueva API
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';

// Crea el root con la nueva API
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
