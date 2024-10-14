import { ButtonCustom } from "component/button";
import { AddShoppingCart } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { getFormatCurrencyVND } from "Utils/Image";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartSlice";

export const ListProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const AddToCart = (item: any) => {
    dispatch(addProduct(item));
    navigate(`/products/${item.id}`);
  };

  return (
    <>
      <div className="container-wrap list-product">
        <div className="product">
          <div className="product-img">
            <img
              src="https://hcm.fstorage.vn/images/2022/68031db6-9a93-4181-8700-7778326e90b6_20210908041149-og.png"
              alt="prod"
            ></img>
          </div>
          <div className="w-full">Thùng Mì gói</div>
          <div className="w-full mt-1">ĐVT: Thùng</div>
          <div className="w-full text-red mt-1 font-semibold">{getFormatCurrencyVND(10000)}</div>
          <ButtonCustom
            type="secondary"
            style={{ boxShadow: "rgba(153, 153, 153, 0.6) 0px 0px 5px" }}
            onClick={() => {
              AddToCart({ id: 1 });
            }}
          >
            <AddShoppingCart style={{ color: "#ed1c24" }} />
            <span className="font-semibold">Thêm vào giỏ</span>
          </ButtonCustom>
        </div>
        <div className="product">
          <div className="product-img">
            <img
              src="https://hcm.fstorage.vn/images/2022/68031db6-9a93-4181-8700-7778326e90b6_20210908041149-og.png"
              alt="prod"
            ></img>
          </div>
          <div className="w-full">Thùng Mì gói</div>
          <div className="w-full mt-1">ĐVT: Thùng</div>
          <div className="w-full text-red mt-1 font-semibold">{getFormatCurrencyVND(10000)}</div>
          <ButtonCustom type="secondary" style={{ boxShadow: "rgba(153, 153, 153, 0.6) 0px 0px 5px" }}>
            <AddShoppingCart style={{ color: "#ed1c24" }} />
            <span className="font-semibold" onClick={() => AddToCart({ id: 1 })}>
              Thêm vào giỏ
            </span>
          </ButtonCustom>
        </div>
        <div className="product">
          <div className="product-img">
            <img
              src="https://hcm.fstorage.vn/images/2022/68031db6-9a93-4181-8700-7778326e90b6_20210908041149-og.png"
              alt="prod"
            ></img>
          </div>
          <div className="w-full">Thùng Mì gói</div>
          <div className="w-full mt-1">ĐVT: Thùng</div>
          <div className="w-full text-red mt-1 font-semibold">{getFormatCurrencyVND(10000)}</div>
          <ButtonCustom type="secondary" style={{ boxShadow: "rgba(153, 153, 153, 0.6) 0px 0px 5px" }}>
            <AddShoppingCart style={{ color: "#ed1c24" }} />
            <span className="font-semibold">Thêm vào giỏ</span>
          </ButtonCustom>
        </div>
        <div className="product">
          <div className="product-img">
            <img
              src="https://hcm.fstorage.vn/images/2022/68031db6-9a93-4181-8700-7778326e90b6_20210908041149-og.png"
              alt="prod"
            ></img>
          </div>
          <div className="w-full">Thùng Mì gói</div>
          <div className="w-full mt-1">ĐVT: Thùng</div>
          <div className="w-full text-red mt-1 font-semibold">{getFormatCurrencyVND(10000)}</div>
          <ButtonCustom type="secondary" style={{ boxShadow: "rgba(153, 153, 153, 0.6) 0px 0px 5px" }}>
            <AddShoppingCart style={{ color: "#ed1c24" }} />
            <span className="font-semibold">Thêm vào giỏ</span>
          </ButtonCustom>
        </div>
        <div className="product">
          <div className="product-img">
            <img
              src="https://hcm.fstorage.vn/images/2022/68031db6-9a93-4181-8700-7778326e90b6_20210908041149-og.png"
              alt="prod"
            ></img>
          </div>
          <div className="w-full">Thùng Mì gói</div>
          <div className="w-full mt-1">ĐVT: Thùng</div>
          <div className="w-full text-red mt-1 font-semibold">{getFormatCurrencyVND(10000)}</div>
          <ButtonCustom type="secondary" style={{ boxShadow: "rgba(153, 153, 153, 0.6) 0px 0px 5px" }}>
            <AddShoppingCart style={{ color: "#ed1c24" }} />
            <span className="font-semibold">Thêm vào giỏ</span>
          </ButtonCustom>
        </div>
      </div>
    </>
  );
};
