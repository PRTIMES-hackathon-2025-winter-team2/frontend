import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NotFound } from "./components/pages/NotFound";
import { Tree } from "./components/pages/tree/Tree";
import { InputTree } from "./components/pages/tree/InputTree";
import { LoginPage } from "./components/pages/LoginPage";
import { Register } from "./components/pages/Register";
import { ConfirmRegister } from "./components/pages/ConfirmRegister";
import { MainComponent } from "./components/pages/MainComponents";
import { TreeComponent } from './components/pages/tree/TreeComponent';

function App() {
  const ENDPOINT_BASE_PATH = "";

  return (
    <BrowserRouter basename={`${ENDPOINT_BASE_PATH}`}>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<Register />} />
        <Route path="confirm-register" element={<ConfirmRegister />} />
        <Route path="home">
          <Route path=":userId" element={<MainComponent />} />
        </Route>
        <Route path="input">
          <Route path=":userId" element={<InputTree />} />
        </Route>
        <Route path="trees">
          <Route path=":userId">
            <Route path=":treeId" element={<Tree />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
        <Route path="/trees/:treeId" element={<TreeComponent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
