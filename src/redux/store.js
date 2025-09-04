import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice.js";
import cartReducer from "./slices/cartSlice.js";
import authReducer from "./slices/authSlice.js";
import wishlistReducer from "./slices/wishlistSlice.js";
import cartMiddleware from "./middleware/cartMiddleware.js";

// Middleware to sync wishlist to localStorage
const wishlistMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  if (action.type.startsWith("wishlist/")) {
    const { wishlist } = store.getState();
    localStorage.setItem("wishlist", JSON.stringify(wishlist.items));
  }

  return result;
};

const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    auth: authReducer,
    wishlist: wishlistReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cartMiddleware, wishlistMiddleware),
});

export default store;
