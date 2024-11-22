export interface ICartAddProduct {
  userId: string;
  productId: string;
  quantity: number;
}

export interface ICartAddQuantity {
  productId: string;
  amount: number;
}

export enum UnitProduct {
  Unknown = 0,
  Chai = 1,
  Goi = 2,
  Goi_4 = 3,
  Goi_6 = 4,
  KG = 5,
  Thung = 6,
}

export enum OrderState {
  NOT_PAID = 0,
  PAID = 1,
  FAILED = 2,
}
export enum DeliveryStatus {
  PENDING = 0,
  ON_DELIVERY = 1,
  DELIVERED = 2,
  CANCELLED = 3,
}
