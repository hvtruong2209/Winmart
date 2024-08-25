import logo from "assets/images/logo.svg";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HouseIcon from "@mui/icons-material/House";
import "./index.scss";
import { TextInput } from "component/textfield";
import { DatePickerInput } from "component/datepicker";
import Radio from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import { ButtonCustom } from "component/button";
export const Register = () => {
  return (
    <div className="register">
      <div className="container">
        <div className="container-header">
          <ArrowBackIcon style={{ width: 30 }} />
          <img src={logo} style={{ height: 42 }}></img>
          <HouseIcon style={{ width: 30 }} />
        </div>
        <div className="container-body">
          <div style={{ marginTop: 10, marginBottom: 10 }}>Đăng kí hội viên</div>
          <TextInput id="phone" label="Số điện thoại"></TextInput>
          <TextInput id="password" label="Mật khẩu"></TextInput>
          <TextInput id="name" label="Họ tên"></TextInput>
          <DatePickerInput label="Ngày sinh" />
          <RadioGroup defaultValue="outlined" name="radio-buttons-group" sx={{ mt: 2 }}>
            <Radio
              value="outlined"
              label="Nam"
              slotProps={{
                root: {
                  sx: {
                    fontSize: "14px",
                  },
                },
                label: {
                  sx: {
                    fontSize: "14px",
                  },
                },
              }}
            />
            <Radio
              value="outlined"
              label="Nữ"
              slotProps={{
                root: {
                  sx: {
                    fontSize: "14px",
                  },
                },
                label: {
                  sx: {
                    fontSize: "14px",
                  },
                },
              }}
            />
          </RadioGroup>
          <ButtonCustom textButton="Tiếp tục"></ButtonCustom>
          <ButtonCustom textButton="Đăng nhập" type="secondary"></ButtonCustom>
        </div>
      </div>
    </div>
  );
};
