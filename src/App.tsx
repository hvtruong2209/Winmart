import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomeClient } from "./layout/HomeClient";
import { Register } from "./page/client/register";
import { Login } from "./page/client/login";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeClient></HomeClient>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
