import { createSlice } from "@reduxjs/toolkit";

interface CartState {
  products?: any[];
}

const initialState: CartState = {
  products: localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")!) : [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {},
    removeProduct: (state, action) => {
      // const listProducts = [...state.products].filter((product) => product.id !== action.payload.id);
      // state.products = listProducts;
      // localStorage.setItem("products", JSON.stringify(listProducts));
    },
  },
});

export const { addProduct, removeProduct } = cartSlice.actions;
export default cartSlice.reducer;
