import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import ThemeApp from './utils/ThemeApp';

import App from './pages/App';

ReactDOM.render(
  <React.StrictMode>
    <ThemeApp component={App} />
  </React.StrictMode>,
  document.getElementById('root')
);
