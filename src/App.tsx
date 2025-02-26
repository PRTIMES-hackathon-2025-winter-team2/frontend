import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainComponent } from "./components/pages/MainComponents";
import { NotFound } from "./components/pages/NotFound";
import { Login } from "./components/pages/SignUp";


function App() {
  const ENDPOINT_BASE_PATH = "";

  return (
    <BrowserRouter basename={`${ENDPOINT_BASE_PATH}`}>
      <Routes>
        <Route path="">
          <Route index element={<MainComponent />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
