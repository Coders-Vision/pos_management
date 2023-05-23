import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { NewOrder } from "src/models/order.model";
import { Cart } from "src/models/cart.model";


type NewOrderPayload = {
    cart: Cart
    paid: number
}
const initialState: NewOrder = {
    orderId: '',
    cart: {
        items: [],
        itemCount: 0,
        total: 0
    },
    change: 0,
    paid: 0
}
export const newOrderSlice = createSlice({
    name: "newOrder",
    initialState,
    reducers: {
        createOrder: (state, action: PayloadAction<NewOrderPayload>) => {
            state.cart = action.payload.cart
            state.orderId = `REACT-POS-${new Date().toISOString()}`
            state.date = new Date()
            state.paid = action.payload.paid
            state.change = action.payload.paid - action.payload.cart.total
        },
        clearOrder: (state) => {
            state = initialState
        },
    },
    extraReducers: {},
});

export const { createOrder } = newOrderSlice.actions;
export const getOrder = (state: RootState) => state.newOrder;
export default newOrderSlice.reducer;