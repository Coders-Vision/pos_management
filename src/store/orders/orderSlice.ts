import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Order, Orders } from "@models/order.model";

const initialState: Orders = {
  orders: [],
};
export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    saveOrder: (state, action: PayloadAction<Order>) => {
      const orders = [...state.orders];
      orders.push(action.payload);
      state.orders = orders;
    },
    // clearOrders: (state) => {
    //     state = initialState
    // },
  },
  // extraReducers: {},
});

export const { saveOrder } = ordersSlice.actions;
export const getOrders = (state: RootState) => state.orders;
export default ordersSlice.reducer;
