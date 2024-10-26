import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomeClient } from "./layout/HomeClient";
import { Register } from "./page/client/register";
import { ProductDetail } from "./page/client/productdetail";
import { Login } from "./page/client/login";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Cart } from "page/client/cart";
import { PrivateClient } from "layout/PrivateClient";
import { ChatClient } from "page/client/chat";
import { Payment } from "page/client/payment";
import { InfoAccount } from "page/client/infoaccount";
function App() {
  return (
    <div className="App">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <BrowserRouter>
          <Routes>
            <Route path="/register" element={<Register></Register>}></Route>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/" element={<HomeClient />}></Route>
            <Route path="/products/:id" element={<ProductDetail></ProductDetail>}></Route>
            <Route path="/cart" element={<Cart></Cart>}></Route>
            <Route path="/checkout" element={<Payment></Payment>}></Route>
            <Route path="/chat" element={<ChatClient></ChatClient>}></Route>
            <Route path="/customer/profile" element={<InfoAccount></InfoAccount>}></Route>
            {/* <Route path="/products/:id" element={<PrivateClient element={<ProductDetail />} />}></Route>
            <Route path="/cart" element={<PrivateClient element={<Cart />} />}></Route> */}
          </Routes>
        </BrowserRouter>
      </LocalizationProvider>
    </div>
  );
}

export default App;
