import { Button, Input } from "@mui/material";
import { ClientNav } from "component/clientnav";
import "./index.scss";
import { TextInput } from "component/textfield";
import { ButtonCustom } from "component/button";
export const InfoAccount = () => {
  return (
    <>
      <div className="bg-bgGray">
        <ClientNav />
        <div className="flex flex-col items-center mt-1 bg-bgGray">
          <div className="advertisement flex justify-center" style={{ height: "100vh" }}>
            <div className="container-wrap flex">
              <div className="profile">
                <div className="title">Thông tin tài khoản</div>
                <div className="profile-item">
                  <div className="profile-item-left">
                    Họ tên
                    <span className="red">
                      <span className="red">*</span>
                    </span>
                  </div>
                  <TextInput className="profile-item-right"></TextInput>
                </div>
                <div className="profile-item">
                  <div className="profile-item-left">
                    Số điện thoại<span className="red">*</span>
                  </div>
                  <TextInput className="profile-item-right"></TextInput>
                </div>
                <div className="profile-item">
                  <div className="profile-item-left">Email</div>
                  <TextInput className="profile-item-right"></TextInput>
                </div>
                <div className="profile-item">
                  <div className="profile-item-left">
                    Giới tính<span className="red">*</span>
                  </div>
                  <div className="profile-item-left"></div>
                </div>
                <div className="profile-item">
                  <div className="profile-item-left">
                    Ngày sinh<span className="red">*</span>
                  </div>
                  <TextInput className="profile-item-right"></TextInput>
                </div>
                <div className="profile-item">
                  <div className="profile-item-left">Thành phố</div>
                  <TextInput className="profile-item-right"></TextInput>
                </div>
                <div className="profile-item">
                  <div className="profile-item-left">Quận/Huyện</div>
                  <TextInput className="profile-item-right"></TextInput>
                </div>
                <div className="profile-item">
                  <div className="profile-item-left">Phường/Xã</div>
                  <TextInput className="profile-item-right"></TextInput>
                </div>
                <ButtonCustom style={{ width: 100, float: "right", marginRight: 10 }}>Cập nhập</ButtonCustom>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
