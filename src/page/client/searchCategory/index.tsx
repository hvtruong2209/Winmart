import { ClientNav } from "component/clientnav";
import { useEffect, useState } from "react";
import { Footer } from "component/footer";
import { useNavigate, useParams } from "react-router-dom";
import { ProductService } from "api/Product";
import { ButtonCustom } from "component/button";
import { showToast } from "../../../redux/toastSlice";
import { onCartChange } from "../../../redux/cartSlice";
import { useDispatch } from "react-redux";
import { CartService } from "api/Cart";
import { getUnitProduct } from "Utils";
import { getFormatCurrencyVND, getUrlImage } from "Utils/Image";
import { AddShoppingCart } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";
export const SearchCategoryPage = () => {
  const { id } = useParams();
  const [products, setProducts] = useState<any[]>([]);
  const userId = localStorage.getItem("userId") || "";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");
  const getProducts = async () => {
    setLoading(true);
    const res = await ProductService.getProductByCate(id!);
    setProducts(res?.result || []);
    setCategory(res?.category.name || "category");
    setLoading(false);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    getProducts();
  }, [id]);

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
        dispatch(
          showToast({ open: true, type: "error", text: "Thêm thất bại!" })
        );
      }
    }
  };
  return (
    <>
      <ClientNav />
      <div className="flex flex-col items-center mt-1 bg-bgGray">
        <div className="container-wrap mt-5  text-[20px] font-semibold">
          <h1>{category}</h1>
        </div>
        <div className="advertisement flex justify-center">
          {loading ? (
            <div className="h-[240px] w-full flex items-center justify-center">
              <CircularProgress style={{ color: "red" }} />
            </div>
          ) : products.length <= 0 ? (
            <div className="w-full flex justify-centerpt-10 pb-10 by-white ">
              <div className="empty-cart flex flex-col items-center">
                <InventoryIcon
                  style={{ color: "red", height: 100, width: 100 }}
                />
                <div className="mt-5 mb-5">Tạm thời sản phẩm đã hết hàng.</div>
              </div>
            </div>
          ) : (
            <div className="container-wrap  list-product  mb-5">
              {products?.map((product: any, index) => {
                return (
                  <>
                    <div
                      className="product"
                      key={index}
                      onClick={() => navigate(`/products/${product.id}`)}
                    >
                      <div className="product-img">
                        <img src={product.imgUrl} alt="prod"></img>
                      </div>
                      <div className="w-full">{product.name}</div>
                      <div className="w-full mt-1">
                        ĐVT: {getUnitProduct(product.unit)}
                      </div>
                      <div className="w-full text-red mt-1 font-semibold">
                        {getFormatCurrencyVND(product.price)}
                      </div>
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
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};
