import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomeClient } from "./layout/HomeClient";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { Toast } from "component/toast";
import { useSelector } from "react-redux";
function App() {
  const toastData = useSelector((state: any) => state.toast);

  return (
    <div className="App">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <BrowserRouter>
          <HomeClient />
        </BrowserRouter>
      </LocalizationProvider>
      <Toast open={toastData.open} handleClose={toastData.handleClose} type={toastData.type} text={toastData.text} />
    </div>
  );
}

export default App;
