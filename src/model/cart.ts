export interface ICartAddProduct {
  User_id: string;
  Product_id: string;
  Quantity: number;
}

export interface ICartAddQuantity {
  productId: string;
  amount: number;
}
