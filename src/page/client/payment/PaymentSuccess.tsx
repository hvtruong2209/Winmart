import { CheckoutService } from "api/Checkout";
import { useEffect } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
export const PaymentSuccess = () => {
  const navigate = useNavigate();
  const getQueryParams = () => {
    const query = new URLSearchParams(window.location.search);
    return {
      vnpAmount: query.get("vnp_Amount"),
      vnpResponseCode: query.get("vnp_ResponseCode"),
      vnpTransactionStatus: query.get("vnp_TransactionStatus"),
      orderId: query.get("vnp_OrderInfo")?.split("-")[0],
    };
  };

  const { vnpAmount, vnpResponseCode, vnpTransactionStatus, orderId } = getQueryParams();

  const handlePaymentStatus = async () => {
    let isSuccess = false;
    if (vnpResponseCode === "00" && vnpTransactionStatus === "00") {
      isSuccess = true;
    }
    const res = await CheckoutService.getCheckoutCallback(orderId!, isSuccess);
  };

  useEffect(() => {
    handlePaymentStatus();
  }, []);

  return (
    <div className="payment-success">
      <div className="order-success">
        <CheckCircleIcon style={{ color: "#51cf66", height: 100, width: 100 }} />
        <h1>Đặt hàng thành công</h1>
        <p>
          {`Bạn đã đặt hàng thành công đơn hàng trị giá 300.000 VND.
          Sau khi Shop xác nhận đơn hàng, sản phẩm sẽ được giao đến địa chỉ H6 Hồ Chí Minh Hồ Chí Minh tại Dự kiến hiện tại Thứ năm 6 (23/04/2021). 
          Bạn có thể theo dõi đơn hàng tại mục Thông tin tài khoản > Theo dõi đơn hàng hoặc nhấp vào mục Chi tiết đơn hàng bên dưới.
          SHmarket rất vui được phục vụ bạn!`}
        </p>
        <div style={{ marginTop: 20 }}>
          <Button
            sx={{
              mr: 3,
              padding: "10px 20px",
              color: "rgb(237, 28, 36)",
              textTransform: "unset",
              backgroundColor: "white",
              borderRadius: "10px",
              border: "1px solid rgb(237, 28, 36)",
              "&:hover": {
                backgroundColor: "white",
              },
            }}
            onClick={() => {
              navigate("/");
            }}
          >
            <span> Tiếp tục mua hàng</span>
          </Button>
          <Button
            sx={{
              mr: 3,
              padding: "10px 20px",
              backgroundColor: "rgb(237, 28, 36)",
              textTransform: "unset",
              color: "white",
              borderRadius: "10px",
              "&:hover": {
                backgroundColor: "rgb(237, 28, 36)",
              },
            }}
            onClick={() => {
              navigate("/cart");
            }}
          >
            <span> Chi tiết đơn hàng</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
