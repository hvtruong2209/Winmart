import AxiosAPI from "./axios";

class Category {
  service: any;
  uploadService: any;
  constructor() {
    this.service = AxiosAPI();
  }

  getCategory = async () => {
    try {
      const response = await this.service.get(`/Category/categories`);
      return response.data;
    } catch {
      return [];
    }
  };
}

export const CategoryService = new Category();
