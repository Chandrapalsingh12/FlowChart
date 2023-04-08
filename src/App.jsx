import { useState } from "react";
import "./App.css";

import {BrowserRouter, Routes,Route} from "react-router-dom"
import {Homepage,WorkflowDesigner} from "./page/index"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/workflow/:id" element={<WorkflowDesigner />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
