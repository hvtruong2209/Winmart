import { ClientNav } from "component/clientnav";
import { Footer } from "component/footer";
import { getUrlImage } from "Utils";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import RemoveIcon from "@mui/icons-material/Remove";
import "./index.scss";
import { ButtonCustom } from "component/button";
import { getFormatCurrencyVND } from "Utils/Image";
import { useEffect, useState } from "react";
import { CartService } from "api/Cart";
import { useNavigate } from "react-router-dom";
import { onCartChange } from "../../../redux/cartSlice";
import { useDispatch } from "react-redux";
import { CircularProgress } from "@mui/material";
import { OrderService } from "api/Order";
import { DeliveryStatus } from "model";
import { OrderListCart } from "./OrderListCart";

export const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId") || "";
  const [cart, setCart] = useState<any[]>([]);
  const [valueStatus, setValueStatus] = useState<number>(100);
  const [infoCart, setInfoCart] = useState({
    priceTotal: 0,
    originalTotal: 0,
    saleTotal: 0,
  });
  const [loadingCart, setLoadingCart] = useState<boolean>(true);
  useEffect(() => {
    window.scrollTo(0, 0);
    setLoadingCart(true);
    getCart();
    setLoadingCart(false);
  }, []);

  const onCheckout = () => {
    navigate("/checkout");
  };

  const getCart = async () => {
    const res = await CartService.getCart(userId);
    setCart(res);
    let priceTotal = 0;
    let originalTotal = 0;
    let saleTotal = 0;
    res.forEach((el: any) => {
      priceTotal += el.quantity * (el.items.salePrice || 0);
      originalTotal += el.quantity * el.items.price;
      saleTotal = originalTotal - priceTotal;
    });
    setInfoCart({
      ...infoCart,
      priceTotal,
      originalTotal,
      saleTotal,
    });
  };

  const amountChange = async (productId: string, amount: number, quantity?: number, productCartId?: string) => {
    const res = await CartService.addProduct({
      productId: productId,
      quantity: amount,
      userId: userId,
    });
    if (quantity === 1 && amount === -1 && !!productCartId) {
      await removeProduct(productCartId);
    }
    if (res) {
      getCart();
      dispatch(onCartChange());
    }
  };

  const removeProduct = async (id: string) => {
    const response = await CartService.removeProduct(id, userId);
    if (response) {
      getCart();
      dispatch(onCartChange());
    }
  };

  const removeAllCart = async () => {
    const response = await CartService.removeAll(userId);
    if (response) {
      getCart();
      dispatch(onCartChange());
    }
  };
  const renderStepOne = () => {
    return loadingCart ? (
      <div className="h-[240px] w-full flex items-center justify-center">
        <CircularProgress />
      </div>
    ) : (
      <>
        {cart.length > 0 ? (
          <>
            <div className="cart-left">
              {cart.length > 0 &&
                cart?.map((product: any, index: number) => {
                  return (
                    <div className="cart-item" key={index}>
                      <div className="flex flex-col items-center">
                        <img src={getUrlImage("delivery.jpg")} alt="none"></img>
                        <div className="flex flex-col">
                          <div>{product?.items?.name}</div>
                          <div>DVT: {product?.items?.unit}</div>
                        </div>
                      </div>
                      <div className="flex flex-col justify-center">
                        <span className="original-price">{getFormatCurrencyVND(product?.items?.price)}</span>
                        <span style={{ color: "#ed1c24" }}>{getFormatCurrencyVND(product?.items?.salePrice || 0)}</span>
                      </div>
                      <div className="flex items-center">
                        <div className="select-number">
                          <ButtonCustom
                            type="secondary"
                            style={{ color: "ed1c24", borderColor: "ed1c24" }}
                            aria-label="reduce"
                            onClick={() => {
                              amountChange(product?.items?.id, -1, product?.quantity, product.id!);
                              // setCount(Math.max(count - 1, 0));
                            }}
                          >
                            <RemoveIcon style={{ color: "ed1c24" }} fontSize="small" />
                          </ButtonCustom>
                          <div className="number">{product?.quantity}</div>
                          <ButtonCustom
                            type="secondary"
                            style={{ color: "ed1c24", borderColor: "ed1c24" }}
                            aria-label="increase"
                            onClick={() => {
                              amountChange(product?.items?.id, 1);
                              // setCount(count + 1);
                            }}
                          >
                            <AddIcon style={{ color: "ed1c24" }} fontSize="small" />
                          </ButtonCustom>
                        </div>
                        <CloseIcon
                          style={{ color: "ed1c24", marginLeft: 10 }}
                          onClick={() => {
                            removeProduct(product.id!);
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              {cart.length > 0 && (
                <div
                  className="footer-delete"
                  onClick={() => {
                    removeAllCart();
                  }}
                >
                  Xóa giỏ hàng
                </div>
              )}
            </div>
            <div className="cart-right">
              <div className="flex justify-between">
                <span className="text">Tạm tính giỏ hàng:</span>
                <span className="price">{getFormatCurrencyVND(infoCart.originalTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text">Tạm tính sản phẩm KM:</span>
                <span className="price">{getFormatCurrencyVND(infoCart.priceTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text">Tiết kiệm được:</span>
                <span className="price">{getFormatCurrencyVND(infoCart.saleTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text">Phí vận chuyển </span>
                <span className="price">{getFormatCurrencyVND(0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text">Khuyến mại</span>
                <span className="price">{getFormatCurrencyVND(0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text">Thành tiền:</span>
                <span className="price">{getFormatCurrencyVND(infoCart.priceTotal)}</span>
              </div>
              <div className="text italic">(Giá đã bao gồm VAT)</div>
              <div className="text italic" style={{ color: "#ed1c24" }}>
                Miễn phí giao hàng
              </div>
              {/* <div className="flex discount">
                <DiscountIcon style={{ marginTop: 8 }} />
                <span className="discount-text text ">Khuyến mãi</span>
                <ButtonCustom fontSize={13} width={300}>
                  Chọn Mã Voucher
                </ButtonCustom>
              </div> */}
              <ButtonCustom
                fontWeight={500}
                fontSize={14}
                onClick={() => onCheckout()}
                isDisabled={infoCart.priceTotal <= 0}
              >
                <div>
                  <div>Thanh toán</div>
                  <div style={{ marginTop: "-4px" }}>{getFormatCurrencyVND(infoCart.priceTotal)}</div>
                </div>
              </ButtonCustom>
            </div>
          </>
        ) : (
          <div className="empty-cart">
            <img
              src={getUrlImage("findno.png")}
              style={{ width: 150, marginBottom: 16, display: "inline-block" }}
              alt="logo"
              onClick={() => {
                navigate("/");
              }}
            />
            <div>Giỏ hàng chưa có sản phẩm.</div>
          </div>
        )}
      </>
    );
  };

  const renderStep = () => {
    switch (valueStatus) {
      case 100:
        return renderStepOne();
      // case DeliveryStatus.PENDING:
      case DeliveryStatus.ON_DELIVERY:
      case DeliveryStatus.DELIVERED:
      case DeliveryStatus.CANCELLED:
        return <OrderListCart status={valueStatus}></OrderListCart>;
      default:
        return renderStepOne();
    }
  };

  return (
    <>
      <div className="bg-bgGray">
        <ClientNav />
        <div className="flex justify-center items-center">
          <div className="cart container-wrap flex bg-white">
            <div className="status-order">
              <div
                className={`${valueStatus === 100 ? "status-select" : ""}`}
                onClick={() => {
                  setValueStatus(100);
                }}
              >
                Giỏ hàng
              </div>

              <div
                className={`${valueStatus === DeliveryStatus.ON_DELIVERY ? "status-select" : ""}`}
                onClick={() => {
                  setValueStatus(DeliveryStatus.ON_DELIVERY);
                }}
              >
                Đang vận chuyển
              </div>
              <div
                className={`${valueStatus === DeliveryStatus.DELIVERED ? "status-select" : ""}`}
                onClick={() => {
                  setValueStatus(DeliveryStatus.DELIVERED);
                }}
              >
                Hoàn thành
              </div>
              <div
                className={`${valueStatus === DeliveryStatus.CANCELLED ? "status-select" : ""}`}
                onClick={() => {
                  setValueStatus(DeliveryStatus.CANCELLED);
                }}
              >
                Hủy
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center">
          <div className="cart container-wrap flex bg-white">{renderStep()}</div>
        </div>
        <div className="flex justify-center bg-white mt-10" style={{ borderTop: "3px solid #d42333" }}>
          <div className="container-wrap flex bg-white part-advertise">
            <div>
              <img src={getUrlImage("delivery.jpg")} alt="none"></img>
              <span>Miễn phí giao hàng từ 300.000 VNĐ</span>
            </div>
            <div>
              <img src={getUrlImage("2h.jpg")} alt="none"></img>
              <span>Giao hàng nhanh 2H</span>
            </div>
            <div>
              <img src={getUrlImage("location.jpg")} alt="none"></img>
              <span>62 Tỉnh thành</span>
            </div>
            <div>
              <img src={getUrlImage("win-mini.png")} alt="none"></img>
              <span>Giá độc quyền Hội viên WiN</span>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </div>
    </>
  );
};
