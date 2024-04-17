import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// bara ejraye redux hamin import kardn kafiye
import "./store";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
