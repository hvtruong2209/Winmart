import { ClientNav } from "component/clientnav";
import { useEffect, useState } from "react";
import { Footer } from "component/footer";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ProductService } from "api/Product";
import { ButtonCustom } from "component/button";
import { showToast } from "../../../redux/toastSlice";
import { onCartChange } from "../../../redux/cartSlice";
import { useDispatch } from "react-redux";
import { CartService } from "api/Cart";
import { getUnitProduct } from "Utils";
import { getFormatCurrencyVND } from "Utils/Image";
import { AddShoppingCart } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";

export const SearchPageProduct = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");
  const [products, setProducts] = useState<any[]>([]);
  const userId = localStorage.getItem("userId") || "";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const getProducts = async () => {
    setLoading(true);
    const res = await ProductService.getProducts({
      keyword: keyword,
      page: 0,
    });
    setProducts(res.data?.result || []);
    setLoading(false);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    getProducts();
  }, []);
  useEffect(() => {
    getProducts();
  }, [keyword]);
  const addProductToCart = async (id: string) => {
    if (!!userId && !!id) {
      const response = await CartService.addProduct({
        userId: userId,
        productId: id,
        quantity: 1,
      });
      if (response) {
        dispatch(showToast({ open: true, type: "success", text: "Đã thêm vào giỏ hàng." }));
        dispatch(onCartChange());
      } else {
        dispatch(showToast({ open: true, type: "error", text: "Thêm thất bại!" }));
      }
    }
  };
  return (
    <>
      <ClientNav />
      <div className="flex flex-col items-center mt-1 bg-bgGray">
        <div className="container-wrap mt-5  text-[20px] font-semibold">
          <h1>{`Kết quả tìm kiếm với "${keyword}"`} </h1>
        </div>
        <div className="advertisement flex justify-center">
          {loading ? (
            <div className="h-[240px] w-full flex items-center justify-center">
              <CircularProgress />
            </div>
          ) : products.length <= 0 ? (
            <div className="w-full flex justify-centerpt-10 pb-10 by-white mt-10">
              <div className="empty-cart flex flex-col items-center">
                <InventoryIcon style={{ color: "red", height: 100, width: 100 }} />
                <div className="mt-5 mb-5">Không tìm thấy sản phẩm nào.</div>
              </div>
            </div>
          ) : (
            <div className="container-wrap  list-product  mb-5">
              {products.map((product: any, index) => {
                return (
                  <>
                    <div className="product" key={index} onClick={() => navigate(`/products/${product.id}`)}>
                      <div className="product-img">
                        <img
                          src="https://hcm.fstorage.vn/images/2022/68031db6-9a93-4181-8700-7778326e90b6_20210908041149-og.png"
                          alt="prod"
                        ></img>
                      </div>
                      <div className="w-full">{product.name}</div>
                      <div className="w-full mt-1">ĐVT: {getUnitProduct(product.unit)}</div>
                      <div className="w-full text-red mt-1 font-semibold">{getFormatCurrencyVND(product.price)}</div>
                      <ButtonCustom
                        type="secondary"
                        style={{ boxShadow: "rgba(153, 153, 153, 0.6) 0px 0px 5px", ZIndex: 5 }}
                        onClick={(e: any) => {
                          e.stopPropagation();
                          addProductToCart(product.id);
                        }}
                      >
                        <AddShoppingCart style={{ color: "#ed1c24" }} />
                        <span className="font-semibold">Thêm vào giỏ</span>
                      </ButtonCustom>
                    </div>
                  </>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};
