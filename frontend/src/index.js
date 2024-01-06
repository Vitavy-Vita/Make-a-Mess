import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import NavBarProvider from "./context/NavBarContext";
import DisplayPage from "./components/NavBar/DisplayNavBar";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <NavBarProvider>
      <DisplayPage />
    </NavBarProvider>
    <App />
  </React.StrictMode>
);
