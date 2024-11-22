import AxiosAPI from "./axios";

class Checkout {
  service: any;
  uploadService: any;
  constructor() {
    this.service = AxiosAPI();
  }

  getCheckoutURL = async (body: any) => {
    try {
      const response = await this.service.post(`/VnPay/create-payment-url`, body);
      return response.data;
    } catch {
      return false;
    }
  };

  getCheckoutCOD = async (body: any) => {
    try {
      const response = await this.service.post(`/VnPay/create-cod-order`, body);
      return response.data;
    } catch {
      return false;
    }
  };

  getCheckoutCallback = async (orderId: string, isSuccess: boolean) => {
    try {
      const response = await this.service.get(
        `/VnPay/payment-callback?orderId=${orderId}&isSuccess=${isSuccess ? 1 : 0}`
      );
      return response;
    } catch {
      return false;
    }
  };
}

export const CheckoutService = new Checkout();
