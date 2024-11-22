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

export const ProductDetail = () => {
  const { id } = useParams();
  const userId = localStorage.getItem("userId");
  const dispatch = useDispatch();
  const [detail, setDetail] = useState<any>(undefined);
  const addProductToCart = async () => {
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
              <img alt="none" src="https://hcm.fstorage.vn/images/2024/02/333-20240201020407.png"></img>
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
                <div className="item-left">Số lượng</div>
                <div className="item-right">{detail?.quantity || 0}</div>
              </div>
              <div className="flex item">
                <div className="item-left">Đơn vị tính</div>
                <div className="item-right">{getUnitProduct(detail?.unit)}</div>
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
          <div className="description">
            Sữa uống Milo ít đường Nestle lốc 4 hộp x 180ml Được nghiên cứu và phát triển bởi Nestlé Thụy Sĩ – công ty
            giải khát hàng đầu thế giới. Sản phẩm có hương vị thơm ngon, giúp trẻ bổ sung năng lượng và dưỡng chất mọi
            lúc mọi nơi cho trẻ năng động và vươn xa. Sữa uống Milo ít đường Nestle lốc 4 hộp x 180ml với hợp chất
            ACTIV-GO Vươn Xa là sự kết hợp độc đáo của PROTOMALT – chiết xuất từ mầm lúa mạch – và tổ hợp các vitamin
            cùng khoáng chất thiết yếu, đóng vai trò quan trọng trong việc giải phóng năng lượng, tăng cường chức năng
            cơ và hệ xương, hỗ trợ tích cực cho các hoạt động thể chất và não bộ của trẻ Hương vị MILO thơm ngon với sự
            hòa quyện của cacao, sữa và lúa mạch nay đã có thêm lựa chọn ít đường phù hợp cho ý thích và khẩu vị đa dạng
            của các bé Uống Nestlé MILO ít đường giúp bổ sung năng lượng và dưỡng chất thiết yếu, cho trẻ năng động mỗi
            ngày. Sữa uống Milo ít đường Nestle lốc 4 hộp x 180ml sử dụng cho trẻ từ 6 tuổi trở lên với 2 khẩu phần
            (180ml) MILO mỗi ngày. Sản phẩm được đóng hộp dễ dàng để trong túi xách balo đi học hay đi du lịch vô cùng
            tiện lợi Cách bảo quản: Bảo quản sản phẩm nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp. Hạn sử dụng: 8
            tháng kể từ ngày sản xuất Cách sử dụng: Lắc đều trước khi sử dụng. Ngon hơn khi uống lạnh Lưu ý: - Hạn sử
            dụng thực tế quý khách vui lòng xem trên bao bì. - Hình sản phẩm chỉ mang tính chất minh họa, hình thực tế
            bao bì của sản phẩm tùy thời điểm sẽ khác so với thực tế.
          </div>
          <div className="detail">
            <div className="detail-item">
              <div className="detail-left">Xuất xứ</div>
              <div>Vietnam</div>
            </div>

            <div className="detail-item">
              <div className="detail-left">Hướng Dẫn Sử Dụng</div>
              <div>Dùng trực tiếp</div>
            </div>
            <div className="detail-item">
              <div className="detail-left">Bảo Quản</div>
              <div>Nơi khô ráo</div>
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
