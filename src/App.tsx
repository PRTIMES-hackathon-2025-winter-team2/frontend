import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainComponent } from "./components/pages/MainComponents";
import { NotFound } from "./components/pages/NotFound";
import { LoginPage } from "./components/pages/LoginPage";
import { Register } from "./components/pages/Register";

function App() {
  const ENDPOINT_BASE_PATH = "";

  return (
    <BrowserRouter basename={`${ENDPOINT_BASE_PATH}`}>
      <Routes>
        <Route path="">
          <Route index element={<MainComponent />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
