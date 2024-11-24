import { AddShoppingCart } from "@mui/icons-material";
import { ButtonCustom } from "component/button";
import { ClientNav } from "component/clientnav";
import "./index.scss";
import { ListProduct } from "component/listproduct";
import { Footer } from "component/footer";
import { getUnitProduct, getUrlImage } from "Utils";
import { useParams } from "react-router-dom";
import { CartService } from "api/Cart";
import { showToast } from "../../../redux/toastSlice";
import { useDispatch } from "react-redux";
import { onCartChange } from "../../../redux/cartSlice";
import { ProductService } from "api/Product";
import { useEffect, useState } from "react";
import { AnyCnameRecord } from "dns";
import { getFormatCurrencyVND } from "Utils/Image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

// import "./styles.css";

// import required modules
import { Navigation } from "swiper/modules";
export const ProductDetail = () => {
  const { id } = useParams();
  const userId = localStorage.getItem("userId");
  const dispatch = useDispatch();
  const [detail, setDetail] = useState<any>(undefined);
  const [valueAmount, setValueAmount] = useState<number>(1);

  const addProductToCart = async () => {
    if (!!userId && !!id) {
      const response = await CartService.addProduct({
        userId: userId,
        productId: id,
        quantity: valueAmount,
      });
      if (response) {
        dispatch(showToast({ open: true, type: "success", text: "Đã thêm vào giỏ hàng." }));
        dispatch(onCartChange());
      } else {
        dispatch(showToast({ open: true, type: "error", text: "Thêm thất bại!" }));
      }
    }
  };
  const getDetail = async (id: string) => {
    const res = await ProductService.getDetailProduct(id);
    setDetail(res);
  };

  useEffect(() => {
    if (!!id) {
      getDetail(id);
    }
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-bgGray">
      <ClientNav />
      <div className="flex justify-center">
        <div className="product-detail container-wrap flex flex-col  bg-white">
          <div className="flex">
            <div className="img">
              {/* <img alt="none" src="https://hcm.fstorage.vn/images/2024/02/333-20240201020407.png"></img> */}
              <Swiper
                spaceBetween={50}
                slidesPerView={1}
                navigation
                loop={true}
                modules={[Navigation]}
                onSwiper={(swiper: any) => console.log(swiper)}
              >
                {detail?.images?.map((el: any) => {
                  return (
                      <SwiperSlide key={el.id}>
                        <img alt="none" src={el.url}></img>
                      </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
            <div className="right-detail flex-1">
              <h2>{detail?.name}</h2>
              <h5 className="mb-2">SKU: {detail?.id?.slice(0, 7)}</h5>
              <div className="price">
                <div className="flex item">
                  <div className="item-left">Giá bán lẻ</div>
                  <div className="item-right">{getFormatCurrencyVND(detail?.price || 0)}</div>
                </div>
                <div className="flex item">
                  <div className="item-left">Giá khuyến mại</div>
                  <div className="item-right">{getFormatCurrencyVND(detail?.salesPrice || 0)}</div>
                </div>
              </div>
              <div className="flex item">
                <div className="item-left">Tình trạng</div>
                <div className="item-right">{detail?.quantity > 0 ? "Còn hàng" : "Hết hàng"} </div>
              </div>

              <div className="flex item">
                <div className="item-left">Chọn loại</div>
                <div className="bg-red p-2 pr-4 pl-4 text-white">{getUnitProduct(detail?.unit).toUpperCase()}</div>
              </div>
              <div className="flex item">
                <div className="item-left">Số lượng</div>
                <div className="item-right flex">
                  <div
                    className="w-[30px] h-[30px] mr-1 text-center"
                    style={{ border: "1px solid #868e96", lineHeight: "28px", fontWeight: 600 }}
                    onClick={() => {
                      if (valueAmount > 1) setValueAmount(valueAmount - 1);
                    }}
                  >
                    -
                  </div>
                  <div
                    className="w-[30px] h-[30px] mr-1 text-center"
                    style={{ border: "1px solid #868e96", lineHeight: "28px" }}
                  >
                    {valueAmount}
                  </div>
                  <div
                    className="w-[30px] h-[30px] text-center"
                    style={{ border: "1px solid #868e96", lineHeight: "28px", fontWeight: 600 }}
                    onClick={() => {
                      setValueAmount(valueAmount + 1);
                    }}
                  >
                    +
                  </div>
                </div>
              </div>
              <ButtonCustom
                width={220}
                fontSize={11}
                onClick={(e: any) => {
                  e.stopPropagation();
                  addProductToCart();
                }}
                isDisabled={detail?.quantity <= 0}
              >
                <AddShoppingCart style={{ color: "white" }} />
                <span className="font-semibold">Thêm vào giỏ</span>
              </ButtonCustom>
            </div>
          </div>
          <div></div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="part-title-detail container-wrap flex">
          <div className="description">Mô tả</div>
          <div className="detail">Chi tiết</div>
        </div>
      </div>
      <div className="flex justify-center part-detail-product">
        <div className="product-detail container-wrap flex  bg-white">
          <div className="description">{detail?.descriptionProduct?.descriptions || "Không có mô tả!"}</div>
          <div className="detail">
            <div className="detail-item">
              <div className="detail-left">Xuất xứ</div>
              {detail?.descriptionProduct?.origin || "-"}
            </div>
            <div className="detail-item">
              <div className="detail-left">Thành phần</div>
              {detail?.descriptionProduct?.ingredients || "-"}
            </div>
            <div className="detail-item">
              <div className="detail-left">Hướng Dẫn Sử Dụng</div>
              {detail?.descriptionProduct?.instructionsForUse || "-"}
            </div>
            <div className="detail-item">
              <div className="detail-left">Bảo Quản</div>
              {detail?.descriptionProduct?.storage || "-"}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="part-title-detail container-wrap flex">
          <div className="description">Sản phẩm liên quan</div>
        </div>
      </div>
      <div className="flex justify-center">
        <ListProduct></ListProduct>
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
  );
};
