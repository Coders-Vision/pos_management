import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Order } from "src/models/order.model";
import { Cart } from "src/models/cart.model";
import { numberFormat } from "src/utils/formatters";

type NewOrderPayload = {
  cart: Cart;
  paid: number;
};
const initialState: Order = {
  orderId: "",
  cart: {
    items: [],
    itemCount: 0,
    total: 0,
  },
  change: 0,
  paid: 0,
};
export const newOrderSlice = createSlice({
  name: "newOrder",
  initialState,
  reducers: {
    createOrder: (state, action: PayloadAction<NewOrderPayload>) => {
      const currentTime = new Date().toISOString();
      state.cart = action.payload.cart;
      state.orderId = `REACT-POS-${currentTime}`;
      state.date = currentTime;
      state.paid = action.payload.paid;
      state.change = numberFormat(
        action.payload.paid - action.payload.cart.total
      );
    },
    clearOrder: (state) => {
      state.orderId = initialState.orderId;
      state.cart = initialState.cart;
      state.change = initialState.change;
      state.date = initialState.date;
      state.paid = initialState.paid;
    },
  },
  // extraReducers: {},
});

export const { createOrder, clearOrder } = newOrderSlice.actions;
export const getNewOrder = (state: RootState) => state.newOrder;
export default newOrderSlice.reducer;
