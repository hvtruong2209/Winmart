import { ILoginUser, IRegisterUser } from "model";
import AxiosAPI from "./axios";
import { decodeJWT } from "Utils";

class Login {
  service: any;
  uploadService: any;
  constructor() {
    this.service = AxiosAPI();
  }

  login = async (user: ILoginUser, callback: any) => {
    try {
      const response = await this.service.post(`/auth/login`, user);
      const token = response.data;
      const decoded = decodeJWT(token);
      localStorage.setItem("profile", JSON.stringify(decoded));
      localStorage.setItem("roomId", decoded.RoomId);
      localStorage.setItem("userId", decoded.Id);
      localStorage.setItem("isAuth", JSON.stringify(true));
      localStorage.setItem("accessToken", token);
      callback && callback(decoded);
      return true;
    } catch {
      return false;
    }
  };

  register = async (user: IRegisterUser) => {
    try {
      const response = await this.service.post(`/auth/register`, user);
      return response.data;
    } catch (e: any) {
      return e.response.data;
    }
  };

  logout = (callback: any) => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("profile");
    localStorage.removeItem("isAuth");
    localStorage.removeItem("roomId");
    localStorage.removeItem("userId");
    callback && callback();
  };

  loginGoogle = () => {
    return "https://localhost:44361/api/Auth/loginGoogle";
  };
}

export const LoginService = new Login();
