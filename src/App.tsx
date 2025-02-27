import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainComponent } from "./components/pages/MainComponents";
import { NotFound } from "./components/pages/NotFound";
import { Tree } from "./components/pages/tree/Tree";
import { InputTree } from "./components/pages/tree/InputTree";

function App() {
  const ENDPOINT_BASE_PATH = "";

  return (
    <BrowserRouter basename={`${ENDPOINT_BASE_PATH}`}>
      <Routes>
        <Route path="">
          <Route index element={<MainComponent />} />
          <Route path="input" element={<InputTree />} />
          <Route path="tree" element={<Tree />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
