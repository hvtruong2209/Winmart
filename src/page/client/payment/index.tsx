import { ClientNav } from "component/clientnav";
import { Footer } from "component/footer";
import { TextInput } from "component/textfield";
import "./index.scss";
import { FormControl, FormControlLabel, FormLabel, MenuItem, Radio, RadioGroup, Select } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { getFormatCurrencyVND, getUrlImage } from "Utils/Image";
import { ButtonCustom } from "component/button";
import { CheckoutService } from "api/Checkout";
import { CartService } from "api/Cart";
import { getFormattedDate } from "Utils";
import { useDispatch } from "react-redux";
import { showToast } from "../../../redux/toastSlice";
import { useNavigate } from "react-router-dom";
import { GetAllDistrict, GetAllProvince, GetAllWard } from "Utils/addressAPI";
export const Payment = () => {
  const userId = localStorage.getItem("userId") || "";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dataProduct = useRef<{ [key: string]: number }>({});
  const [selectDate, setSelectDate] = useState<string>("today");
  const [cart, setCart] = useState<any>(undefined);
  const [info, setInfo] = useState<any>({
    userId: userId,
    orderType: "",
    amount: 0,
    orderDescription: getFormattedDate().formattedDate,
    name: "",
    phone: "",
    payMethod: 0,
    address: "",
    note: "",
    province: {
      id: "",
      name: "",
    },
    district: {
      id: "",
      name: "",
    },
    ward: {
      id: "",
      name: "",
    },
  });
  const [province, setProvince] = useState<any[]>([]);
  const [district, setDistrict] = useState<any[]>([]);
  const [ward, setWard] = useState<any[]>([]);
  const handleChange = (event: any) => {
    setInfo({ ...info, payMethod: event.target.value });
  };
  const getCart = async () => {
    const res = await CartService.getCart(userId);
    let priceTotal = 0;
    let originalTotal = 0;
    let saleTotal = 0;
    res.forEach((el: any) => {
      priceTotal += el.quantity * (el.items.salePrice || 0);
      originalTotal += el.quantity * el.items.price;
      saleTotal = originalTotal - priceTotal;
      dataProduct.current[el.items.id] = el.quantity;
    });
    setCart({ ...res, priceTotal, saleTotal, originalTotal });
    setInfo({ ...info, amount: priceTotal });
  };

  const getAllProvince = async () => {
    const response = await GetAllProvince();
    setProvince(response);
  };
  const getAllDistrict = async (id: string) => {
    const res = await GetAllDistrict(id);
    setDistrict(res);
  };
  const getAllWard = async (id: string) => {
    const response = await GetAllWard(id);
    setWard(response);
  };

  useEffect(() => {
    getCart();
    getAllProvince();
  }, []);

  useEffect(() => {
    if (!!info.province && !!info.province.id) {
      getAllDistrict(info.province.id);
    }
  }, [info.province.id]);

  useEffect(() => {
    if (!!info.district && !!info.district.id) {
      getAllWard(info.district.id);
    }
  }, [info.district.id]);

  const validate = () => {
    if (info.name?.length <= 0) {
      dispatch(showToast({ open: true, type: "error", text: "Bạn cần nhập tên!" }));
      return false;
    } else if (info.phone?.length <= 0) {
      dispatch(showToast({ open: true, type: "error", text: "Bạn cần nhập số điện thoại!" }));
      return false;
    } else if (info.address?.length <= 0) {
      dispatch(showToast({ open: true, type: "error", text: "Bạn cần nhập địa chỉ!" }));
      return false;
    } else if (info.province?.id <= 0) {
      dispatch(showToast({ open: true, type: "error", text: "Bạn cần nhập thành phố / tỉnh! " }));
      return false;
    } else if (info.district?.id <= 0) {
      dispatch(showToast({ open: true, type: "error", text: "Bạn cần nhập quận / huyện!" }));
      return false;
    } else if (info.ward?.id <= 0) {
      dispatch(showToast({ open: true, type: "error", text: "Bạn cần nhập phường / xã!" }));
      return false;
    }
    return true;
  };
  const convertRequest = () => {
    const wardAddress = ward.filter((w) => w.WardCode === info.ward.id)[0]?.WardName || "";
    const districtAddress = district.filter((w) => w.DistrictID === info.district.id)[0]?.DistrictName || "";
    const provinceAddress = province.filter((w) => w.ProvinceID === info.province.id)[0]?.ProvinceName || "";
    let address = [info.address, wardAddress, districtAddress, provinceAddress].filter((el) => !!el).join(", ");
    return {
      orderType: "100000",
      amount: cart.priceTotal || 0,
      orderDescription: info.orderDescription?.slice(-10),
      name: info.name,
      url: "https://localhost:44361/api/VnPay/payment-callback/",
      orderModel: {
        productAndQuantity: dataProduct.current,
        userId: userId,
        customerName: info.name,
        customerPhone: info.phone,
        customerAddress: address,
        payMethod: 0,
        note: info.note,
      },
    };
  };

  const onCheckout = async () => {
    if (!cart || !validate()) return;
    const request = convertRequest();
    if (Number(info.payMethod) === 1) {
      const response = await CheckoutService.getCheckoutURL(request);
      if (response && response.paymentUrl) {
        window.location.href = response.paymentUrl;
      }
    } else {
      const response = await CheckoutService.getCheckoutCOD(request);
      if (!!response) {
        dispatch(showToast({ open: true, type: "success", text: "Đặt hàng thành công!" }));
        navigate("/cart");
      } else {
        dispatch(showToast({ open: true, type: "error", text: "Đặt hàng thất bại!" }));
      }
    }
  };

  const selectDateShip = (date: string) => {
    if (date === "today") {
      setInfo({ ...info, orderDescription: getFormattedDate().formattedDate });
      setSelectDate("today");
    } else {
      setInfo({ ...info, orderDescription: getFormattedDate().formattedDayOfWeek });
      setSelectDate("other");
    }
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
                <TextInput
                  className="right"
                  value={info.name}
                  onChange={(e: any) => {
                    setInfo({ ...info, name: e.target.value });
                  }}
                />
              </div>
              <div className="info-row">
                <div className="left">
                  Số điện thoại<span>*</span>
                </div>
                <TextInput
                  className="right"
                  value={info.phone}
                  onChange={(e: any) => {
                    setInfo({ ...info, phone: e.target.value });
                  }}
                />
              </div>
              <div className="info-row">
                <div className="left">
                  <strong>Khu vực giao hàng</strong> *
                </div>
                <div className="select-address grid grid-cols-3 gap-3">
                  <FormControl sx={{ width: 180 }}>
                    <Select
                      value={info.province.id}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                      onChange={(e: any) => {
                        setInfo({ ...info, province: { id: e.target.value }, district: { id: "" }, ward: { id: "" } });
                      }}
                    >
                      {province?.map((el: any) => {
                        return (
                          <MenuItem key={el.ProvinceID} value={el.ProvinceID}>
                            {el.ProvinceName}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                  <FormControl sx={{ width: 180 }}>
                    <Select
                      value={info.district.id}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                      onChange={(e: any) => {
                        setInfo({ ...info, district: { id: e.target.value }, ward: { id: "" } });
                      }}
                      disabled={!info.province.id}
                    >
                      {district?.map((el: any) => {
                        return (
                          <MenuItem key={el.DistrictID} value={el.DistrictID}>
                            {el.DistrictName}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                  <FormControl sx={{ width: 180 }}>
                    <Select
                      value={info.ward.id}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                      onChange={(e: any) => {
                        setInfo({ ...info, ward: { id: e.target.value } });
                      }}
                      disabled={!info.district.id}
                    >
                      {ward?.map((el: any) => {
                        return (
                          <MenuItem key={el.WardCode} value={el.WardCode}>
                            {el.WardName}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className="info-row">
                <div className="left">Địa chỉ*</div>
                <TextInput
                  className="right"
                  value={info.address}
                  onChange={(e: any) => {
                    setInfo({ ...info, address: e.target.value });
                  }}
                />
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
                <div
                  className={`date ${selectDate === "today" ? "chose-box" : ""}`}
                  onClick={() => {
                    selectDateShip("today");
                  }}
                >
                  {getFormattedDate().formattedDate}
                </div>
                <div
                  className={`date ${selectDate !== "today" ? "chose-box" : ""}`}
                  onClick={() => {
                    selectDateShip("other");
                  }}
                >
                  {getFormattedDate().formattedDayOfWeek}
                </div>
              </div>
              {/* <p>Chọn thời gian giao hàng</p>
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
              </div> */}
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
                  defaultValue={0}
                  name="radio-buttons-group"
                  onChange={handleChange}
                >
                  <FormControlLabel
                    control={<Radio sx={{ color: "black", "&.Mui-checked": { color: "black" } }} />}
                    value={0}
                    label="Tiền mặt (COD)"
                  />
                  <FormControlLabel
                    value={1}
                    control={<Radio sx={{ color: "black", "&.Mui-checked": { color: "black" } }} />}
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
              <textarea
                className="text-area-note"
                value={info.note}
                onChange={(e: any) => {
                  setInfo({ ...info, note: e.target.value });
                }}
              />
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
                <ButtonCustom
                  style={{ boxShadow: "rgba(153, 153, 153, 0.6) 0px 0px 5px" }}
                  onClick={() => {
                    onCheckout();
                  }}
                >
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
