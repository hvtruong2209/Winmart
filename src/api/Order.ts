import AxiosAPI from "./axios";

class Order {
  service: any;
  uploadService: any;
  constructor() {
    this.service = AxiosAPI();
  }

  getOrders = async () => {
    try {
      const response = await this.service.get(`/order/get-all-orders`);
      return response.data;
    } catch {
      return [];
    }
  };

  getOrdersByStatus = async (userId: string, status: number) => {
    try {
      const response = await this.service.get(`/order/get-order-by-status?userId=${userId}&status=${status}`);
      return response.data;
    } catch {
      return null;
    }
  };

  getOrdersByUserId = async (userId: String) => {
    try {
      const response = await this.service.get(`/order/get-order-by-status?userId=${userId}`);
      return response.data;
    } catch {
      return null;
    }
  };
}

export const OrderService = new Order();
