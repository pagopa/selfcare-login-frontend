import React from 'react';
import ReactDOM from 'react-dom';
// import { registerLocale, setDefaultLocale } from "react-datepicker";
import { ThemeProvider } from '@mui/material/styles';
import App from './App';
import theme from './theme';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ThemeProvider>,
  document.getElementById('root')
);
