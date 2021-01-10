import React from 'react';
import ReactDOM from 'react-dom';
import App from './global/App';
import {RecoilRoot} from 'recoil';
import 'components/styles/WebVersion.css';
import 'components/styles/MobileVersion.css';

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);


