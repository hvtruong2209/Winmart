import { ICartAddProduct, ICartAddQuantity } from "model";
import AxiosAPI from "./axios";

class Cart {
  service: any;
  constructor() {
    this.service = AxiosAPI();
  }

  getCart = async (userId: string) => {
    try {
      const response = await this.service.get(`/Cart/getcart?currentUser=${userId}`);
      return response.data.result || [];
    } catch {
      return [];
    }
  };

  removeProduct = async (id: string, userId: string) => {
    try {
      const response = await this.service.delete(`/Cart/removeproduct?shoppingCartId=${id}&userId=${userId}`);
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
      return false;
    }
  };

  removeAll = async (userId: string) => {
    try {
      const response = await this.service.delete(`/Cart/removeall?userId=${userId}`);
      return response;
    } catch {
      return false;
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
