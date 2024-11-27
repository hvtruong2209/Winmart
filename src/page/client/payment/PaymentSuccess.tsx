import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getFormatCurrencyVND } from "Utils/Image";
export const PaymentSuccess = () => {
  const navigate = useNavigate();
  const getQueryParams = () => {
    const query = new URLSearchParams(window.location.search);
    return {
      amount: query.get("amount"),
    };
  };

  const { amount } = getQueryParams();

  return (
    <div className="payment-success">
      <div className="order-success">
        <CheckCircleIcon style={{ color: "#51cf66", height: 100, width: 100 }} />
        <h1>Đặt hàng thành công</h1>
        <p>
          {`Bạn đã đặt hàng thành công đơn hàng trị giá ${getFormatCurrencyVND(Number(amount))}.
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
