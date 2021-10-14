import React from 'react';
import ReactDOM from 'react-dom';
//import { registerLocale, setDefaultLocale } from "react-datepicker";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import App from './App';


declare module '@mui/material/styles'{
interface ThemeOptions {
  generalTextColorInHTMLComponents?: "#FFF",
  firstColor?: "#EEDC00",
  secondColor?: "#0447BB",
  mainMenuItemTextColor?: "#0447BB",
  mainMenuItemBackgroundColor?: "#FFF",
  mainMenuPointingItemBackgroundColor?: "#0097e6",
  mainMenuSelectedItemTextColor?: "#FFF",
  mainMenuSelectedItemBackgroundColor?: "#0447BB",
  avatarBackgroundColor?: "#0447BB",
  avatarTextColor?: "#FFF",
  extraFilterBlockColor?: "#EEDC00",
  twoWaySelectorHeight?: 500
}
}

const theme = createTheme({
  generalTextColorInHTMLComponents: "#FFF",
  firstColor: "#EEDC00",
  secondColor: "#0447BB",
  mainMenuItemTextColor: "#0447BB",
  mainMenuItemBackgroundColor: "#FFF",
  mainMenuPointingItemBackgroundColor: "#0097e6",
  mainMenuSelectedItemTextColor: "#FFF",
  mainMenuSelectedItemBackgroundColor: "#0447BB",
  avatarBackgroundColor: "#0447BB",
  avatarTextColor: "#FFF",
  extraFilterBlockColor: "#EEDC00",
  twoWaySelectorHeight: 500
});


ReactDOM.render(
  <ThemeProvider theme={theme}>
  <React.StrictMode>  
   <App /> 
  </React.StrictMode>
 </ThemeProvider>,
  document.getElementById("app")
);

