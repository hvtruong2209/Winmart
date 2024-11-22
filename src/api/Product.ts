import AxiosAPI from "./axios";

class Product {
  service: any;
  uploadService: any;
  constructor() {
    this.service = AxiosAPI();
  }

  getProducts = async (body: any) => {
    try {
      const response = await this.service.post(`/product/getProducts`, body);
      return response;
    } catch {
      return [];
    }
  };

  getDetailProduct = async (id: string) => {
    try {
      const response = await this.service.get(`/product/detail?productId=${id}`);
      return response.data;
    } catch {
      return null;
    }
  };

  getProductByCate = async (categoryId: string) => {
    try {
      const response = await this.service.post(`/product/getProductsByCategory?categoryId=${categoryId}`);
      return response.data;
    } catch {
      return null;
    }
  };
}

export const ProductService = new Product();
