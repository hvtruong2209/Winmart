import axios from "axios";

const AxiosAPI = (fromData = false, client = false) => {
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
    baseURL: "",
    headers: header,
  });
  return instance;
};

export default AxiosAPI;
