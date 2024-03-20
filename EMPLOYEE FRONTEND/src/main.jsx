import React from 'react'
import App from './App.jsx'
import './index.css'
import { store } from './App/store.js';
import { Provider } from 'react-redux'; // Import Provider
import ReactDOM from 'react-dom'


ReactDOM.render(
  <Provider store={store}> 
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);