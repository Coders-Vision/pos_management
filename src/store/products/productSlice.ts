import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@store/store";
import { Product, Products } from "@models/product.model";

const initialState: Products = {
  products: [],
};
export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      const products = action.payload;
      state.products = products;
    },
  },

});

export const { setProducts } = productSlice.actions;
export const getProducts = (state: RootState) => state.product;
export default productSlice.reducer;
