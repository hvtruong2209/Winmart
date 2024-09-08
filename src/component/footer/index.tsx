import { getUrlImage } from "Utils";

export const Footer = () => {
  return (
    <div className="flex flex-col items-center py-10" style={{ backgroundColor: "#2c2c2c" }}>
      <div className="container-wrap flex text-white text-xs gap-2 justify-between">
        <div className="flex flex-col gap-2" style={{ width: 500 }}>
          <img src={getUrlImage("logowhite.svg")} alt="Logo" style={{ width: 150, height: 45 }} />
          <div>Công Ty Cổ Phần Dịch Vụ Thương Mại Tổng Hợp WinCommerce</div>
          <div>
            Mã số doanh nghiệp: 0104918404 Đăng ký lần đầu ngày 20 tháng 09 năm 2010, đăng ký thay đổi lần thứ 48, ngày
            30 tháng 06 năm 2023
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h5>Về chúng tôi</h5>
          <a>Giới thiệu về WinMart</a>
          <a>Danh sách cửa hàng</a>
          <a>Quản lý chất lượng</a>
          <a>Chính sách bảo mật</a>
          <a>Điều khoản và điều kiện giao dịch</a>
        </div>
        <div className="flex flex-col gap-2">
          <h5>Hỗ trợ khách hàng</h5>
          <a>Chính sách giao hàng</a>
          <a>Chính sách thanh toán</a>
          <a>Chính sách đổi trả</a>
          <a>Đánh giá góp ý</a>
          <a>Danh sách trúng thưởng</a>
        </div>
        <div className="flex flex-col gap-2">
          <h5>Chăm sóc khách hàng</h5>
          <a>Mua online: 0247 1066866</a>
          <a>Email: cskh@winmart.massagroup.com</a>
          <h5>Kết nối với chúng tôi</h5>
          <a>Đánh giá góp ý</a>
          <a>Danh sách trúng thưởng</a>
        </div>
      </div>
      <div style={{ border: "1px solid rgba(255, 255, 255, 0.1)", width: "100%", margin: "40px 0px" }}></div>
      <div className="container-wrap grid grid-cols-3 gap-8 text-white text-xs ">
        <div className="py-6 px-5" style={{ background: " hsla(0, 0%, 55%, .1)", borderRadius: 8 }}>
          <h3 className="text-textBrown mb-4" style={{ fontSize: 16 }}>
            Địa chỉ giao dịch Hà Nội:
          </h3>
          <div className="mb-2">Công Ty Cổ Phần Dịch Vụ Thương Mại Tổng Hợp WinCommerce</div>
          <div>
            Tầng 6, Toà nhà trung tâm Quốc tế, số 17 Ngô Quyền, Phường Tràng Tiền, Quận Hoàn Kiếm, Thành Phố Hà Nội
          </div>
        </div>
        <div className="py-6 px-5" style={{ background: " hsla(0, 0%, 55%, .1)", borderRadius: 8 }}>
          <h3 className="text-textBrown mb-4" style={{ fontSize: 16 }}>
            Trụ sở chính:
          </h3>
          <div className="mb-2">Công Ty Cổ Phần Dịch Vụ Thương Mại Tổng Hợp WinCommerce</div>
          <div>Số 23 Lê Duẩn, Phường Bến Nghé, Quận 1, Thành phố Hồ Chí Minh, Việt Nam</div>
        </div>
        <div className="py-6 px-5" style={{ background: " hsla(0, 0%, 55%, .1)", borderRadius: 8 }}>
          <h3 className="text-textBrown mb-4" style={{ fontSize: 16 }}>
            Địa chỉ giao dịch Tp.HCM:
          </h3>
          <div className="mb-2">Công Ty Cổ Phần Dịch Vụ Thương Mại Tổng Hợp WinCommerce</div>
          <div>Tầng 12, Tòa nhà Mplaza SaiGon, số 39 Lê Duẩn, Phường Bến Nghé, Quận 1, TP Hồ Chí Minh, Việt Nam</div>
        </div>
      </div>
    </div>
  );
};
