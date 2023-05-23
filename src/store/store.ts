import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart/cartSlice";
import productReducer from "./products/productSlice";
import newOrdertReducer from "./newOrder/newOrderSlice";
const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    newOrder: newOrdertReducer
  },
  devTools: import.meta.env.DEV,
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;