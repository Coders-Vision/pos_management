import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Product } from "src/models/product.model";
import { Cart, Item } from "src/models/cart.model";

type ItemQty = {
    id: number;
}
const initialState: Cart = {
    items: [],
    itemCount: 0,
    total: 0
}
export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {
            const check = state.items.some((item) => item.id === action.payload.id);
            if (check === false) {
                const items = [...state.items]
                const item: Item = { ...action.payload, qty: 1, price: action.payload.itemPrice }
                let price = state.total + item.price
                let count = state.itemCount + item.qty;
                items.push(item)
                state.items = items
                state.total = price
                state.itemCount = count
            }
        },
        addQty: (state, action: PayloadAction<ItemQty>) => {
            const getQty = state.items.find((item) => item.id === action.payload.id)!.qty;
            let qty = getQty + 1;
            const updated = state.items.map((item) =>
                item.id === action.payload.id
                    ? { ...item, price: item.itemPrice * qty, qty }
                    : item
            );
            let newItemCount = updated.reduce((val, index) => val + index.qty, 0);
            let newTotalAmount = updated.reduce((val, index) => val + index.price, 0);

            state.items = updated
            state.itemCount = newItemCount
            state.total = newTotalAmount

        },
        removeQty: (state, action: PayloadAction<ItemQty>) => {
            const getQty = state.items.find((item) => item.id === action.payload.id)!.qty;
            let qty = getQty - 1;
            if (qty > 0) {
                const updated = state.items.map((item) =>
                    item.id === action.payload.id
                        ? { ...item, price: item.itemPrice * qty, qty }
                        : item
                );
                let newItemCount = updated.reduce((val, index) => val + index.qty, 0);
                let newTotalAmount = updated.reduce((val, index) => val + index.price, 0
                );
                state.items = updated,
                    state.itemCount = newItemCount
                state.total = newTotalAmount
            }
        },
        removeItem: (state, action: PayloadAction<ItemQty>) => {
            const cart = [...state.items];
            const removed = cart.filter((cart) => cart.id !== action.payload.id);
            let newItemCount = removed.reduce((val, index) => val + index.qty, 0);
            let newTotalAmount = removed.reduce(
                (val, index) => val + index.price,
                0
            );
            state.items = removed
            state.itemCount = newItemCount
            state.total = newTotalAmount

        },
        clearCart: (state) => {
            state.items = []
            state.itemCount = 0,
                state.total = 0
        },
    },
    extraReducers: {},
});

export const { addToCart, addQty, removeQty, removeItem, clearCart } = cartSlice.actions;
export const cart = (state: RootState) => state.cart;
export default cartSlice.reducer;