import '@pagopa/selfcare-common-frontend/lib/common-polyfill';
import React from 'react';
import ReactDOM from 'react-dom/client';
import '@pagopa/selfcare-common-frontend/index.css';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@pagopa/mui-italia';
import { CONFIG } from '@pagopa/selfcare-common-frontend/lib/config/env';
import App from './App';
import { ENV } from './utils/env';
import './consentAndAnalyticsConfiguration.ts';
import './locale';
import './index.css';

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
