import { ICartAddProduct, ICartAddQuantity, IRegisterUser } from "model";
import AxiosAPI from "./axios";

class Cart {
  service: any;
  constructor() {
    this.service = AxiosAPI();
  }

  getCart = async (userId: string) => {
    try {
      const response = await this.service.get(`/Cart/getcart?currentUser=${userId}`);
      return response;
    } catch {
      return [];
    }
  };

  removeProduct = async (id: string) => {
    try {
      const response = await this.service.delete(`/Cart/removeproduct?productId=${id}`);
      return response;
    } catch {
      return [];
    }
  };

  addProduct = async (product: ICartAddProduct) => {
    try {
      const response = await this.service.post(`/Cart/addproduct`, product);
      return response;
    } catch {
      return [];
    }
  };

  removeAll = async (product: ICartAddProduct) => {
    try {
      const response = await this.service.delete(`/Cart/removeall`);
      return response;
    } catch {
      return [];
    }
  };

  addQuantity = async (product: ICartAddQuantity) => {
    try {
      const response = await this.service.post(`/Cart/addquantity`, product);
      return response;
    } catch {
      return [];
    }
  };
}

export const CartService = new Cart();
