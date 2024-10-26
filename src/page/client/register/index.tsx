import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HouseIcon from "@mui/icons-material/House";
import "./index.scss";
import { TextInput } from "component/textfield";
import { DatePickerInput } from "component/datepicker";
import Radio from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import { ButtonCustom } from "component/button";
import { getUrlImage } from "Utils";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { IRegisterUser } from "model";
import { LoginService } from "api/Login";
export const Register = () => {
  const navigate = useNavigate();
  const [errorPassword, setErrorPassword] = useState<boolean>(false);
  const [registerUser, setRegisterUser] = useState<IRegisterUser>({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });
  const [fullName, setFullName] = useState<string>("");
  const [errorTextField, setErrorTextField] = useState<boolean[]>([false, false, false, false]);
  const handleRegister = async () => {
    if (
      registerUser.email.length === 0 ||
      registerUser.firstName.length === 0 ||
      registerUser.password.length === 0 ||
      registerUser.confirmPassword.length === 0
    ) {
      setErrorTextField([
        registerUser.email.length === 0,
        registerUser.firstName.length === 0,
        registerUser.password.length === 0,
        registerUser.confirmPassword.length === 0,
      ]);
      return;
    }
    if (registerUser.password.length !== registerUser.confirmPassword.length) {
      setErrorPassword(true);
      return;
    }

    const response = await LoginService.register(registerUser);
    console.log("response", response);
  };

  return (
    <div className="register">
      <div className="container">
        <div className="container-header">
          <ArrowBackIcon style={{ width: 30 }} />
          <img src={getUrlImage("logo.svg")} style={{ height: 42 }} alt="avatar"></img>
          <HouseIcon style={{ width: 30 }} />
        </div>
        <div className="container-body">
          <div style={{ marginTop: 10, marginBottom: 10 }}>Đăng kí hội viên</div>
          <TextInput
            required
            id="name"
            label="Họ tên"
            value={fullName}
            className={errorTextField[0] ? "border-red" : ""}
            onChange={(e: any) => {
              const parts = e.target.value.split(" ");
              const firstName = parts.shift();
              const lastName = parts.join(" ");
              setFullName(e.target.value);
              setErrorTextField([false, errorTextField[1], errorTextField[2], errorTextField[3]]);
              setRegisterUser({ ...registerUser, firstName, lastName });
            }}
          ></TextInput>
          <TextInput
            required
            id="email"
            label="Email"
            className={errorTextField[1] ? "border-red" : ""}
            value={registerUser.email}
            onChange={(e: any) => {
              const email = e.target.value;
              setErrorTextField([errorTextField[0], false, errorTextField[2], errorTextField[3]]);
              setRegisterUser({ ...registerUser, email });
            }}
          ></TextInput>
          <TextInput
            required
            id="password"
            label="Mật khẩu"
            className={errorTextField[2] ? "border-red" : ""}
            type="password"
            value={registerUser.password}
            onChange={(e: any) => {
              const password = e.target.value;
              setErrorTextField([errorTextField[0], errorTextField[1], false, errorTextField[3]]);
              setRegisterUser({ ...registerUser, password });
            }}
          ></TextInput>
          <TextInput
            required
            id="confirm-password"
            label="Nhập lại mật khẩu"
            value={registerUser.confirmPassword}
            className={errorTextField[3] ? "border-red" : ""}
            type="password"
            onChange={(e: any) => {
              const confirmPassword = e.target.value;
              setErrorPassword(false);
              setErrorTextField([errorTextField[0], errorTextField[1], errorTextField[2], false]);
              setRegisterUser({ ...registerUser, confirmPassword });
            }}
          ></TextInput>
          {errorPassword && <div className="text-error">Mật khẩu không khớp</div>}
          <ButtonCustom
            textButton="Đăng kí"
            onClick={() => {
              handleRegister();
            }}
          ></ButtonCustom>
          <ButtonCustom
            textButton="Đăng nhập"
            type="secondary"
            onClick={() => {
              navigate("/login");
            }}
          ></ButtonCustom>
        </div>
      </div>
    </div>
  );
};
