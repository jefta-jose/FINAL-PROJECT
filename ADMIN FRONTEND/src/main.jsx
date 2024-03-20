import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux'; // Import Provider
import { store } from './App/store.js';

ReactDOM.render(
  <Provider store={store}> 
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
