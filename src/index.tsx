import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/index.scss";

ReactDOM.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="389772755937-09j0563t9ueuluev70fmosisvdltsb78.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
