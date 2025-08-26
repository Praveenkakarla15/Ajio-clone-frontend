// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice.js";
import cartReducer from "./slices/cartSlice.js";
import authReducer from "./slices/authSlice.js";
import wishlistReducer from "./slices/wishlistSlice.js"; // ✅ import

const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    auth: authReducer,
    wishlist: wishlistReducer, 
  },
});

export default store;
