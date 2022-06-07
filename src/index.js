import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { createTheme , ThemeProvider } from "@mui/material/styles";
import App from './App';

const theme = createTheme({
  palette: {
    primary: {
      main: "#2c3680"
    },
    secondary: {
      main: "#14a7e0"
    }
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: "black",
          color: 'white'
        }
      }
    }
  },
  fontFamily: 'roboto' // as an aside, highly recommend importing roboto font for Material UI projects! Looks really nice
});

ReactDOM.render(
  <Suspense fallback={(<div></div>)}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </Suspense>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
