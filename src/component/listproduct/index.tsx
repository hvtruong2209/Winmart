import { ButtonCustom } from "component/button";
import { AddShoppingCart } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { getFormatCurrencyVND } from "Utils/Image";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { ProductService } from "api/Product";
import { getUnitProduct } from "Utils";
import { CartService } from "api/Cart";
import { showToast } from "../../redux/toastSlice";
import { onCartChange } from "../../redux/cartSlice";

export const ListProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [products, setProducts] = useState<any[]>([]);
  const userId = localStorage.getItem("userId") || "";
  const getProducts = async () => {
    const res = await ProductService.getProducts({
      keyword: "",
      page: 0,
    });
    setProducts(res.data?.result || []);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const addProductToCart = async (id: string) => {
    if (!!userId && !!id) {
      const response = await CartService.addProduct({
        userId: userId,
        productId: id,
        quantity: 1,
      });
      if (response) {
        dispatch(
          showToast({
            open: true,
            type: "success",
            text: "Đã thêm vào giỏ hàng.",
          })
        );
        dispatch(onCartChange());
      } else {
        dispatch(showToast({ open: true, type: "error", text: "Thêm thất bại!" }));
      }
    }
  };
  return (
    <>
      <div className="container-wrap list-product">
        {products.map((product: any, index) => {
          return (
            <>
              <div
                className="product"
                key={product.id}
                onClick={() => {
                  navigate(`/products/${product.id}`);
                  window.scrollTo(0, 0);
                }}
              >
                {!!product.discount && <div className="sale-percent">-{Math.round(product.discount)}%</div>}
                <div className="product-img">
                  <img src={product.imgUrl} alt="prod"></img>
                </div>
                <div className="w-full">{product.name}</div>
                <div className="w-full mt-1">ĐVT: {getUnitProduct(product.unit)}</div>
                <div className="w-full text-red mt-1 font-semibold">{getFormatCurrencyVND(product.price)}</div>
                <ButtonCustom
                  type="secondary"
                  style={{
                    boxShadow: "rgba(153, 153, 153, 0.6) 0px 0px 5px",
                    ZIndex: 5,
                  }}
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
    </>
  );
};
