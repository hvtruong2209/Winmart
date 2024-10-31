import axios from "axios";

const AxiosAPI = (fromData = false, baseURL?: string) => {
  var header: any = {};
  if (fromData) {
    header = {
      "Content-Type": "multipart/form-data",
    };
  } else {
    header = {
      "Content-Type": "application/json",
    };
  }
  if (localStorage.getItem("accessToken")) {
    header.Authorization = `Bearer ${sessionStorage.getItem("accessToken")}`;
  }
  // if (sessionStorage.getItem("token_customer") != null && client) {
  //   header.Authorization = `Bearer ${sessionStorage.getItem("token_customer")}`;
  // }
  const instance = axios.create({
    baseURL: baseURL || "https://localhost:44361/api/",
    headers: header,
  });
  return instance;
};

export default AxiosAPI;
