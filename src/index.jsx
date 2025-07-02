import React from "react";
import ReactDOM from "react-dom/client";

import App from "./components/App.jsx";
import DataProvider from "./providers/dataProvider.js";

const mountNode = document.getElementById("root");
const root = ReactDOM.createRoot(mountNode);
root.render(
  <DataProvider>
    <App />
  </DataProvider>,
);
