import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { UserAuthContextProvider } from "./context/UserAuthContext.jsx";
import { UserContextProvider } from "./context/UserContext.jsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserAuthContextProvider>
      <UserContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UserContextProvider>
    </UserAuthContextProvider>
  </React.StrictMode>
);
