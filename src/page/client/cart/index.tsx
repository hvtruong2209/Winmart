import { ClientNav } from "component/clientnav";
import { Footer } from "component/footer";
import { getUrlImage } from "Utils";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import RemoveIcon from "@mui/icons-material/Remove";
import "./index.scss";
import { ButtonCustom } from "component/button";
import DiscountIcon from "@mui/icons-material/Discount";
import { getFormatCurrencyVND } from "Utils/Image";
export const Cart = () => {
  return (
    <>
      <div className="bg-bgGray">
        <ClientNav />
        <div className="flex justify-center items-center">
          <div className="cart container-wrap flex bg-white">
            <div className="cart-left">
              <div className="cart-item">
                <div className="flex flex-col items-center">
                  <img src={getUrlImage("delivery.jpg")} alt="none"></img>
                  <div className="flex flex-col">
                    <div>Nuoc sieu sach</div>
                    <div>DVT: Can</div>
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <span>{getFormatCurrencyVND(1000)}</span>
                  <span>{getFormatCurrencyVND(1000)}</span>
                </div>
                <div className="flex items-center">
                  <div className="select-number">
                    <ButtonCustom
                      type="secondary"
                      style={{ color: "ed1c24", borderColor: "ed1c24" }}
                      aria-label="reduce"
                      onClick={() => {
                        // setCount(Math.max(count - 1, 0));
                      }}
                    >
                      <RemoveIcon style={{ color: "ed1c24" }} fontSize="small" />
                    </ButtonCustom>
                    <div className="number">1</div>
                    <ButtonCustom
                      type="secondary"
                      style={{ color: "ed1c24", borderColor: "ed1c24" }}
                      aria-label="increase"
                      onClick={() => {
                        // setCount(count + 1);
                      }}
                    >
                      <AddIcon style={{ color: "ed1c24" }} fontSize="small" />
                    </ButtonCustom>
                  </div>
                  <CloseIcon style={{ color: "ed1c24", marginLeft: 10 }} />
                </div>
              </div>
              <div className="footer-delete">Xóa giỏ hàng</div>
            </div>
            <div className="cart-right">
              <div className="flex justify-between">
                <span className="text">Tạm tính giỏ hàng:</span>
                <span className="price">{getFormatCurrencyVND(1000)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text">Tạm tính sản phẩm KM:</span>
                <span className="price">{getFormatCurrencyVND(1000)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text">Tiết kiệm được:</span>
                <span className="price">{getFormatCurrencyVND(1000)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text">Phí vận chuyển </span>
                <span className="price">{getFormatCurrencyVND(1000)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text">Khuyến mại</span>
                <span className="price">{getFormatCurrencyVND(1000)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text">Thành tiền:</span>
                <span className="price">{getFormatCurrencyVND(1000)}</span>
              </div>
              <div className="text italic">(Giá đã bao gồm VAT)</div>
              <div className="text italic" style={{ color: "#ed1c24" }}>
                Miễn phí giao hàng
              </div>
              <div className="flex discount">
                <DiscountIcon style={{ marginTop: 8 }} />
                <span className="discount-text text ">Khuyến mãi</span>
                <ButtonCustom fontSize={13} width={300}>
                  Chọn Mã Voucher
                </ButtonCustom>
              </div>
              <ButtonCustom fontWeight={500} fontSize={14}>
                <div>
                  <div>Thanh toán</div>
                  <div style={{ marginTop: "-4px" }}>{getFormatCurrencyVND(1000)}</div>
                </div>
              </ButtonCustom>
            </div>
          </div>
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
