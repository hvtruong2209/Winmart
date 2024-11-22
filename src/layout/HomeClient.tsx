import { Home } from "page/client/home";
import "./index.scss";
import { Cart } from "page/client/cart";
import { PrivateClient } from "layout/PrivateClient";
import { ChatClient } from "page/client/chat";
import { Payment } from "page/client/payment";
import { InfoAccount } from "page/client/infoaccount";
import { Register } from "page/client/register";
import { ProductDetail } from "page/client/productdetail";
import { Login } from "page/client/login";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { LoginGoogle } from "page/client/login/google";
import { PaymentSuccess } from "page/client/payment/PaymentSuccess";
import { SearchCategoryPage } from "page/client/searchCategory";
import { SearchPageProduct } from "page/client/searchpage";

export const HomeClient = () => {
  const isAuth = useSelector((state: any) => state.auth.isAuth);
  return (
    <>
      <Routes>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/products/:id" element={<ProductDetail></ProductDetail>}></Route>
        <Route path="/cart" element={<PrivateClient element={<Cart />} />}></Route>
        <Route path="/checkout" element={<PrivateClient element={<Payment />} />}></Route>
        <Route path="/chat" element={<PrivateClient element={<ChatClient />} />}></Route>
        <Route path="/customer/profile" element={<PrivateClient element={<InfoAccount />} />}></Route>
        <Route path="/login/success" element={<LoginGoogle />}></Route>
        <Route path="/payment/success" element={<PaymentSuccess />}></Route>
        <Route path="/search" element={<SearchPageProduct />}></Route>
        <Route path="/category/:id" element={<SearchCategoryPage />}></Route>
      </Routes>
      {!!isAuth && <ChatClient />}
    </>
  );
};
