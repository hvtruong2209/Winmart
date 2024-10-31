import AxiosAPI from "./axios";

class Product {
  service: any;
  uploadService: any;
  constructor() {
    this.service = AxiosAPI();
  }

  getProducts = async () => {
    try {
      const response = await this.service.get(`/product/getProducts`);
      return response;
    } catch {
      return [];
    }
  };
}

export const ProductService = new Product();
