import { ILoginUser, IRegisterUser } from "model";
import AxiosAPI from "./axios";

class Login {
  service: any;
  uploadService: any;
  constructor() {
    this.service = AxiosAPI();
  }

  login = async (user: ILoginUser) => {
    try {
      const response = await this.service.post(`/auth/login`, user);
      return response.data;
    } catch {
      return [];
    }
  };

  register = async (user: IRegisterUser) => {
    try {
      const response = await this.service.post(`/auth/register`, user);
      return response.data;
    } catch {
      return [];
    }
  };
}

export const LoginService = new Login();
