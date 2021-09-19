import ReactDOM from 'react-dom';
import './index.css';

import ThemeApp from './utils/ThemeApp';

import App from './pages/App';

ReactDOM.render(
  <ThemeApp component={App} />,
  document.getElementById('root')
);
