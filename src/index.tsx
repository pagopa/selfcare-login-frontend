import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import { registerLocale, setDefaultLocale } from "react-datepicker";
import { ThemeProvider } from '@mui/material/styles';
import theme from '@pagopa/mui-italia/theme';
import App from './App';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ThemeProvider>,
  document.getElementById('root')
);
