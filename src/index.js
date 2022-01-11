import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { SnakeProvider } from "./Components/Context/SnakeContext";

ReactDOM.render(
  <React.StrictMode>
    <SnakeProvider>
      <App />
    </SnakeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
