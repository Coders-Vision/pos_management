import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@store/store";
import { Order } from "@models/order.model";
import { Cart } from "@models/cart.model";
import { numberFormat } from "@utils/formatters";

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
      const date = new Date();
      const dateFormat = date.toLocaleString();
      const dateEpoch = date.getTime().toString();

      state.cart = action.payload.cart;
      state.orderId = `REACT-POS-${dateEpoch}`;
      state.date = dateFormat;
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
