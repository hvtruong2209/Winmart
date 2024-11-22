import { ClientNav } from "component/clientnav";
import "./index.scss";
import { TextInput } from "component/textfield";
import { ButtonCustom } from "component/button";
import { LoginService } from "api/Login";
import { useEffect, useRef, useState } from "react";
import { FormControl, MenuItem, Select } from "@mui/material";
import { GetAllDistrict, GetAllProvince, GetAllWard } from "Utils/addressAPI";
import { useDispatch } from "react-redux";
import { showToast } from "../../../redux/toastSlice";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
export const InfoAccount = () => {
  const userId = localStorage.getItem("userId") || "";
  const originalProfile = useRef<any>(undefined);
  const dispatch = useDispatch();
  const [profile, setProfile] = useState<any>({
    firstName: "",
    lastName: "",
    fullName: "",
    cityId: "",
    districtId: "",
    wardId: "",
    email: "",
    gender: 0,
    birthday: null,
  });
  const [province, setProvince] = useState<any[]>([]);
  const [district, setDistrict] = useState<any[]>([]);
  const [ward, setWard] = useState<any[]>([]);

  const getProfile = async () => {
    const res = await LoginService.getProfile(userId);
    setProfile({
      firstName: res.firstName,
      lastName: res.lastName,
      fullName: `${res.firstName} ${res.lastName}`,
      cityId: res.city,
      districtId: res.district,
      wardId: res.ward,
      email: res.email,
      gender: res.gender,
      phoneNumber: res.phoneNumber,
      birthday: "0001-01-01T00:00:00" === res.birthday ? null : dayjs(res.birthday),
    });
    originalProfile.current = res;
  };

  const updateProfile = async () => {
    const request = {
      userId: userId,
      firstName: profile.fullName.substring(0, profile.fullName.lastIndexOf(" ")),
      lastName: profile.fullName.substring(profile.fullName.lastIndexOf(" ") + 1),
      phoneNumber: profile.phoneNumber,
      gender: profile.gender,
      birthday: profile.birthday,
      city: `${profile.cityId}`,
      district: `${profile.districtId}`,
      ward: `${profile.wardId}`,
    };

    const response = await LoginService.updateProfile(request);
    if (!!response) {
      dispatch(showToast({ open: true, type: "success", text: "Cập nhập thành công!" }));
    } else {
      dispatch(showToast({ open: true, type: "error", text: "Cập nhập thất bại!" }));
    }
  };

  const getAllProvince = async () => {
    const response = await GetAllProvince();
    setProvince(response);
  };
  const getAllDistrict = async (id: string) => {
    const res = await GetAllDistrict(id);
    setDistrict(res);
  };
  const getAllWard = async (id: string) => {
    const response = await GetAllWard(id);
    setWard(response);
  };

  useEffect(() => {
    getProfile();
    getAllProvince();
  }, []);

  useEffect(() => {
    if (profile.cityId) {
      getAllDistrict(profile.cityId);
    }
  }, [profile.cityId]);

  useEffect(() => {
    if (profile.districtId) {
      getAllWard(profile.districtId);
    }
  }, [profile.districtId]);

  return (
    <>
      <div className="bg-bgGray">
        <ClientNav />
        <div className="flex flex-col items-center mt-1 bg-bgGray">
          <div className="advertisement flex justify-center" style={{ height: "100vh" }}>
            <div className="container-wrap flex justify-center">
              <div className="profile">
                <div className="title">Thông tin tài khoản</div>
                <div className="profile-item">
                  <div className="profile-item-left">
                    Họ tên
                    <span className="red">
                      <span className="red">*</span>
                    </span>
                  </div>
                  <TextInput
                    className="profile-item-right"
                    value={profile.fullName}
                    onChange={(e: any) => {
                      setProfile({ ...profile, fullName: e.target.value });
                    }}
                  ></TextInput>
                </div>
                <div className="profile-item">
                  <div className="profile-item-left">
                    Email<span className="red">*</span>
                  </div>
                  <TextInput className="profile-item-right" value={profile.Email} isDisabled={true}></TextInput>
                </div>
                <div className="profile-item">
                  <div className="profile-item-left">Số điện thoại</div>
                  <TextInput
                    className="profile-item-right"
                    value={profile.phoneNumber}
                    onChange={(e: any) => {
                      setProfile({ ...profile, phoneNumber: e.target.value });
                    }}
                  ></TextInput>
                </div>

                <div className="profile-item">
                  <div className="profile-item-left">Giới tính</div>
                  <div className="profile-item-left">
                    <FormControl sx={{ width: 223 }}>
                      <Select
                        value={profile.gender}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        onChange={(e: any) => {
                          setProfile({ ...profile, gender: e.target.value });
                        }}
                      >
                        <MenuItem key={0} value={0}>
                          Nam
                        </MenuItem>
                        <MenuItem key={1} value={1}>
                          Nữ
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <div className="profile-item">
                  <div className="profile-item-left">
                    Ngày sinh<span className="red">*</span>
                  </div>
                  <DatePicker
                    // label="Basic date picker"
                    value={profile.birthday}
                    onChange={(value) => {
                      setProfile({ ...profile, birthday: value });
                    }}
                  />
                </div>
                <div className="profile-item">
                  <div className="profile-item-left">Thành phố</div>
                  <FormControl sx={{ width: 223 }}>
                    <Select
                      value={profile.cityId}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                      onChange={(e: any) => {
                        setProfile({
                          ...profile,
                          cityId: e.target.value,
                          districtId: "",
                          wardId: "",
                        });
                      }}
                    >
                      {province?.map((el: any) => {
                        return (
                          <MenuItem key={el.ProvinceID} value={el.ProvinceID}>
                            {el.ProvinceName}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </div>
                <div className="profile-item">
                  <div className="profile-item-left">Quận/Huyện</div>
                  <FormControl sx={{ width: 223 }}>
                    <Select
                      value={profile.districtId}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                      onChange={(e: any) => {
                        setProfile({ ...profile, districtId: e.target.value, ward: "" });
                      }}
                      disabled={!profile.cityId}
                    >
                      {district?.map((el: any) => {
                        return (
                          <MenuItem key={el.DistrictID} value={el.DistrictID}>
                            {el.DistrictName}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </div>
                <div className="profile-item">
                  <div className="profile-item-left">Phường/Xã</div>
                  <FormControl sx={{ width: 223 }}>
                    <Select
                      value={profile.wardId}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                      onChange={(e: any) => {
                        setProfile({ ...profile, wardId: e.target.value });
                      }}
                      disabled={!profile.districtId}
                    >
                      {ward?.map((el: any) => {
                        return (
                          <MenuItem key={el.WardCode} value={el.WardCode}>
                            {el.WardName}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </div>
                <ButtonCustom
                  style={{ width: 100, float: "right", marginTop: 30, marginRight: 10 }}
                  onClick={() => updateProfile()}
                >
                  Cập nhập
                </ButtonCustom>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
