import React from 'react';
import ReactDOM from 'react-dom';
// import { registerLocale, setDefaultLocale } from "react-datepicker";
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import App from './App';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ThemeProvider>,
  document.getElementById('root')
);
