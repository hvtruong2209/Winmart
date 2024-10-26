import { ILoginUser, IRegisterUser } from "model";
import AxiosAPI from "./axios";

class Category {
  service: any;
  uploadService: any;
  constructor() {
    this.service = AxiosAPI();
  }

  getCategory = async () => {
    try {
      const response = await this.service.get(`/categories`);
      return response;
    } catch {
      return [];
    }
  };
}

export const CategoryService = new Category();
