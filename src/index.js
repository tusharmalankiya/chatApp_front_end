import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import LoginContextProvider from "./contexts/LoginContext";
import TokenContextProvider from "./contexts/TokenContext";
import { SocketContextProvider } from "./contexts/SocketContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
    <BrowserRouter>
      <SocketContextProvider>
        <TokenContextProvider>
          <LoginContextProvider>
            <App />
          </LoginContextProvider>
        </TokenContextProvider>
      </SocketContextProvider>
    </BrowserRouter>
  // </React.StrictMode>
);
