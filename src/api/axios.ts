import axios from "axios";

const AxiosAPI = (fromData = false, baseURL?: string) => {
  if (fromData) {
    var header = {
      "Content-Type": "multipart/form-data",
    };
  } else {
    var header = {
      "Content-Type": "application/json",
    };
  }
  // if (sessionStorage.getItem("token_admin") != null && !client) {
  //   header.Authorization = `Bearer ${sessionStorage.getItem("token_admin")}`;
  // }
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
