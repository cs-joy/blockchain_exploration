import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BlockchainProvider } from './contexts/BlockchainContext';

ReactDOM.render(
  <BlockchainProvider>
    <App />
  </BlockchainProvider>,
  document.getElementById('root')
);
