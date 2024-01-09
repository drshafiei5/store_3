import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource/vazirmatn";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";

import { store } from "./store";
import App from "./App";
import "./index.css";
import { theme } from "./theme";
import RTL from "./components/RTL";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RTL>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </RTL>
    </ThemeProvider>
  </Provider>,
  // </React.StrictMode>,
);
