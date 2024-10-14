import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HouseIcon from "@mui/icons-material/House";
import { TextInput } from "component/textfield";
import { ButtonCustom } from "component/button";
import { getUrlImage } from "Utils";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="register">
      <div className="container">
        <div className="container-header">
          <ArrowBackIcon style={{ width: 30 }} />
          <img src={getUrlImage("logo.svg")} style={{ height: 42 }} alt="logo"></img>
          <HouseIcon style={{ width: 30 }} />
        </div>
        <div className="container-body">
          <div style={{ marginTop: 10, marginBottom: 10 }}>Đăng nhập</div>
          <TextInput id="phone" label="Số điện thoại"></TextInput>
          <TextInput id="password" label="Mật khẩu"></TextInput>
          <ButtonCustom textButton="Đăng nhập"></ButtonCustom>
          <ButtonCustom
            textButton="Đăng kí"
            type="secondary"
            onClick={() => {
              navigate("/register");
            }}
          ></ButtonCustom>
        </div>
      </div>
    </div>
  );
};
