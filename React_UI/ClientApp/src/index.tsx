//CreateReactApp Imports
import "bootstrap/dist/css/bootstrap.css";
import "./assets/scss/style.scss";
import { Configuration, PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { debounce } from "@mui/material";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
//Authentication Imports
import { msalConfig } from "./authConfig";
//Redux Imports
import { store } from "./redux/store";

//import registerServiceWorker from "./registerServiceWorker";
const msalInstance = new PublicClientApplication(msalConfig as Configuration);
const baseUrl = document.getElementsByTagName("base")[0].getAttribute("href") as string;
const rootElement = document.getElementById("root");

ReactDOM.render(

  <Provider store={store}>
    <MsalProvider instance={msalInstance}>
      <BrowserRouter basename={baseUrl}>
        <App />
      </BrowserRouter>
    </MsalProvider>
  </Provider>,
  rootElement);

//registerServiceWorker();

