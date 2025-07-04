import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@pagopa/mui-italia';
import '@pagopa/selfcare-common-frontend/index.css';
import '@pagopa/selfcare-common-frontend/lib/common-polyfill';
import { CONFIG } from '@pagopa/selfcare-common-frontend/lib/config/env';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './consentAndAnalyticsConfiguration.ts';
import './index.css';
import './locale';
import { ENV } from './utils/env';

// eslint-disable-next-line functional/immutable-data
CONFIG.URL_FE.LOGOUT = ENV.URL_FE.LOGOUT;
// eslint-disable-next-line functional/immutable-data
CONFIG.URL_FE.ASSISTANCE = ENV.URL_FE.ASSISTANCE;

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ThemeProvider>
);
