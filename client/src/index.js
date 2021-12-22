import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
// import { Auth0Provider } from "@auth0/auth0-react";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <Auth0Provider
    domain="dev-w5todwaf.us.auth0.com"
    clientId="Ej26vYpKDYv31la76m8RB5xugg5utyDJ"
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
