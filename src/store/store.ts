import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "@store/cart/cartSlice";
import productReducer from "@store/products/productSlice";
import ordertReducer from "@store/orders/orderSlice";
import newOrdertReducer from "@store/newOrder/newOrderSlice";
const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    orders: ordertReducer,
    newOrder: newOrdertReducer,
  },
  devTools: import.meta.env.DEV,
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
