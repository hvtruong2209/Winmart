import { createSlice } from "@reduxjs/toolkit";

interface CartState {
  products?: any[];
  cartAmountProduct: number;
}

const initialState: CartState = {
  products: localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")!) : [],
  cartAmountProduct: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    onCartChange: (state) => {
      state.cartAmountProduct = state.cartAmountProduct + 1;
    },
  },
});

export const { onCartChange } = cartSlice.actions;
export default cartSlice.reducer;
