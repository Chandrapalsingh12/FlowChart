import { useState } from "react";
import "./App.css";

import {BrowserRouter, Routes,Route} from "react-router-dom"
import {Homepage,WorkflowDesigner} from "./page/index"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="https://flowchartss.netlify.app" element={<Homepage />} />
        <Route path="https://flowchartss.netlify.app/workflow/:id" element={<WorkflowDesigner />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
