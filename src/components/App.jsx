import React from "react";
import DataProvider from "../providers/dataProvider.js";
import PreviewBox from "./PreviewBox.jsx";
import TodoBoxes from "./TodoBoxes.jsx";

const App = () => (
  <div className="app">
    <DataProvider>
      <PreviewBox />
      <TodoBoxes />
    </DataProvider>
  </div>
);

export default App;
