import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HouseIcon from "@mui/icons-material/House";
import logo from "assets/images/logo.svg";
import { TextInput } from "component/textfield";
import { ButtonCustom } from "component/button";

export const Login = () => {
  return (
    <div className="register">
      <div className="container">
        <div className="container-header">
          <ArrowBackIcon style={{ width: 30 }} />
          <img src={logo} style={{ height: 42 }}></img>
          <HouseIcon style={{ width: 30 }} />
        </div>
        <div className="container-body">
          <div style={{ marginTop: 10, marginBottom: 10 }}>Đăng nhập</div>
          <TextInput id="phone" label="Số điện thoại"></TextInput>
          <TextInput id="password" label="Mật khẩu"></TextInput>
          <ButtonCustom textButton="Đăng nhập"></ButtonCustom>
          <ButtonCustom textButton="Đăng kí" type="secondary"></ButtonCustom>
        </div>
      </div>
    </div>
  );
};
