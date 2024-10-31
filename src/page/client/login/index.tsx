import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HouseIcon from "@mui/icons-material/House";
import { TextInput } from "component/textfield";
import { ButtonCustom } from "component/button";
import { getUrlImage, validateEmail } from "Utils";
import { useNavigate } from "react-router-dom";
import { ILoginUser } from "model";
import { useState } from "react";
import { LoginService } from "api/Login";
import { useDispatch } from "react-redux";
import { setIsAuth, setUserId } from "../../../redux/authSlice";

export const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<ILoginUser>({
    email: "",
    password: "",
  });
  const [errorTextField, setErrorTextField] = useState([false, false]);
  const [textErrorEmail, setTextErrorEmail] = useState("");
  const [textErrorPass, setTextErrorPass] = useState("");
  const dispatch = useDispatch();
  const handleLogin = async () => {
    if (user.email.length === 0 || user.password.length === 0) {
      setErrorTextField([user.email.length === 0, user.password.length === 0]);
      return;
    }
    if (!validateEmail(user.email)) {
      setTextErrorEmail("Email không hợp lệ");
      return;
    }
    const res = await LoginService.login(user, (data: any) => {
      dispatch(setIsAuth(true));
      dispatch(setUserId(data.UserId));
    });
    if (res === true) {
      navigate("/");
    } else {
      setTextErrorPass("Email hoặc mật khẩu không đúng");
    }
  };

  const loginGoogle = async () => {
    const url = LoginService.loginGoogle();
    window.location.href = url;
  };

  return (
    <div className="register">
      <div className="container">
        <div className="container-header">
          <ArrowBackIcon style={{ width: 30 }} onClick={() => navigate(-1)} />
          <img src={getUrlImage("logo.svg")} style={{ height: 42 }} alt="logo"></img>
          <HouseIcon style={{ width: 30 }} onClick={() => navigate("/")} />
        </div>
        <div className="container-body">
          <div style={{ marginTop: 10, marginBottom: 10 }}>Đăng nhập</div>
          <TextInput
            id="phone"
            required
            className={errorTextField[0] ? "border-red" : ""}
            label="Email"
            value={user.email}
            onChange={(e: any) => {
              setTextErrorEmail("");
              setErrorTextField([false, errorTextField[1]]);
              setUser({ ...user, email: e.target.value });
            }}
          ></TextInput>
          {textErrorEmail && (
            <div style={{ color: "#ed1c24", fontSize: 11, marginLeft: 2, marginTop: 4 }}>{textErrorEmail}</div>
          )}
          <TextInput
            required
            id="password"
            type="password"
            className={errorTextField[1] ? "border-red" : ""}
            label="Mật khẩu"
            value={user.password}
            onChange={(e: any) => {
              setErrorTextField([errorTextField[0], false]);
              setTextErrorPass("");
              setUser({ ...user, password: e.target.value });
            }}
          ></TextInput>
          {textErrorPass && (
            <div style={{ color: "#ed1c24", fontSize: 11, marginLeft: 2, marginTop: 4 }}>{textErrorPass}</div>
          )}
          <ButtonCustom textButton="Đăng nhập" onClick={() => handleLogin()}></ButtonCustom>
          <ButtonCustom
            textButton="Đăng kí"
            type="secondary"
            onClick={() => {
              navigate("/register");
            }}
          ></ButtonCustom>
          <img
            style={{ width: 50, height: 50, cursor: "pointer", margin: "10px auto" }}
            src={getUrlImage("google.jfif")}
            alt=""
            onClick={() => {
              loginGoogle();
            }}
          ></img>
        </div>
      </div>
    </div>
  );
};
