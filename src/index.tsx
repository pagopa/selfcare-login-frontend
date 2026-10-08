import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '@pagopa/selfcare-common-frontend/index.css';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@pagopa/mui-italia';
import App from './App';
import { configureConsent } from './consentAndAnalyticsConfiguration';
import './locale';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const bootstrap = async () => {
  await configureConsent();
  root.render(
    <ThemeProvider theme={theme}>
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    </ThemeProvider>
  );
};

void bootstrap();
