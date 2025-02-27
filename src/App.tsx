import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainComponent } from "./components/pages/MainComponents";
import { NotFound } from "./components/pages/NotFound";
import { Tree } from "./components/pages/tree/Tree";
import { InputTree } from "./components/pages/tree/InputTree";
import { LoginPage } from "./components/pages/LoginPage";
import { Register } from "./components/pages/Register";
import { ConfirmRegister } from "./components/pages/ConfirmRegister";


function App() {
  const ENDPOINT_BASE_PATH = "";

  return (
    <BrowserRouter basename={`${ENDPOINT_BASE_PATH}`}>
      <Routes>
        <Route path="">
          <Route index element={<MainComponent />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<Register />} />
          <Route path="confirm-register" element={<ConfirmRegister/>} />
          <Route path="input">
            <Route path={`:userId`} element={<InputTree />} />
          </Route>
          <Route path="trees">
            <Route path={`:userId`} element={<Tree />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
