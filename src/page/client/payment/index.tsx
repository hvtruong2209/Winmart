import { ClientNav } from "component/clientnav";
import { Footer } from "component/footer";
import { TextInput } from "component/textfield";
import "./index.scss";
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import { useState } from "react";
import { getFormatCurrencyVND, getUrlImage } from "Utils/Image";
import { ButtonCustom } from "component/button";
export const Payment = () => {
  const [value, setValue] = useState("female");
  const handleChange = (event: any) => {
    setValue(event.target.value);
  };

  return (
    <div className="bg-bgGray">
      <ClientNav />
      <div className="payment">
        <div className="d-flex container-wrap mb-4 mt-6">
          <div className="flex bg-white">
            <div className="info">
              <label>Thông tin đơn hàng</label>
              <div className="info-row">
                <div className="left">
                  Họ tên người nhận<span>*</span>
                </div>
                <TextInput className="right" />
              </div>
              <div className="info-row">
                <div className="left">
                  Số điện thoại<span>*</span>
                </div>
                <TextInput className="right" />
              </div>
              <div className="info-row">
                <div className="left">
                  <strong>Khu vực giao hàng</strong> *
                </div>
                <TextInput className="right" />
              </div>
              <div className="info-row">
                <div className="left">Địa chỉ*</div>
                <TextInput className="right" />
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex container-wrap mb-4">
          <div className="flex bg-white">
            <div className="time-ship">
              <label>Chọn thời gian giao hàng</label>
              <p>Chọn ngày giao hàng</p>
              <div className="time-ship-box">
                <div className="date">Hôm nay 20/10/2024</div>
                <div className="date">Thứ 2 21/10/2024</div>
              </div>
              <p>Chọn thời gian giao hàng</p>
              <div className="choose-time">
                <p>Sáng</p>
                <div className="select-time">08:00 - 10:00</div>
                <div className="select-time">10:00 - 12:00</div>
              </div>
              <div className="choose-time">
                <p>Chiều</p>
                <div className="select-time">12:00 - 14:00</div>
                <div className="select-time">14:00 - 16:00</div>
                <div className="select-time">16:00 - 18:00</div>
              </div>
              <div className="choose-time">
                <p>Tối</p>
                <div className="select-time">18:00 - 20:00</div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex container-wrap mb-4">
          <div className=" flex bg-white">
            <div className="method">
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label" sx={{ color: "black !important", fontWeight: 600 }}>
                  Phương thức thanh toán
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                  onChange={handleChange}
                >
                  <FormControlLabel
                    control={
                      <Radio
                        sx={{ color: value === "female" ? "black" : "default", "&.Mui-checked": { color: "black" } }}
                      />
                    }
                    value="COD"
                    label="Tiền mặt (COD)"
                  />
                  <FormControlLabel
                    value="ONLINE"
                    control={
                      <Radio
                        sx={{ color: value === "COD" ? "black" : "default", "&.Mui-checked": { color: "black" } }}
                      />
                    }
                    label="Thanh toán trực tiếp (Online)"
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </div>
        </div>
        <div className="d-flex container-wrap mb-4">
          <div className=" flex bg-white">
            <div className="note">
              <div className="note-left">Ghi chú (Nếu có)</div>
              <TextInput className="right" multiline rows={3} />
            </div>
          </div>
        </div>
        <div className="d-flex container-wrap mb-4">
          <div className=" flex bg-white">
            <div className="total-payment">
              <div className="total-payment-container">
                <div className="total-payment-row">
                  <div className="total-payment-row-left">Tổng tiền hàng</div>
                  <div className="total-payment-row-right">{getFormatCurrencyVND(190000)}</div>
                </div>
                <div className="total-payment-row">
                  <div className="total-payment-row-left">Phí vận chuyển</div>
                  <div className="total-payment-row-right">{getFormatCurrencyVND(0)}</div>
                </div>
                <div className="total-payment-row">
                  <div className="total-payment-row-left">Khuyến mãi</div>
                  <div className="total-payment-row-right">{getFormatCurrencyVND(0)}</div>
                </div>
                <div className="total-payment-row">
                  <div className="total-payment-row-left">Tổng thanh toán</div>
                  <div className="total-payment-row-right-total">{getFormatCurrencyVND(190000)}</div>
                </div>
                <ButtonCustom style={{ boxShadow: "rgba(153, 153, 153, 0.6) 0px 0px 5px" }}>
                  <span className="font-semibold">Xác nhận đặt hàng</span>
                </ButtonCustom>
              </div>
            </div>
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
      <Footer />
    </div>
  );
};
