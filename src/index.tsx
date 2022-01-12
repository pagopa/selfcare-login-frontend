import 'react-app-polyfill/ie11';
import 'core-js/es/object/values';
import 'core-js/es/promise';
import 'core-js/es/array';
import 'core-js/stable/string';
import 'core-js/stable/number';
import 'core-js/stable/url-search-params';
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
