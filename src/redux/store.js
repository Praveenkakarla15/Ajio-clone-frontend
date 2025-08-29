import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice.js";
import cartReducer from "./slices/cartSlice.js";
import authReducer from "./slices/authSlice.js";
import wishlistReducer from "./slices/wishlistSlice.js"; 

const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    auth: authReducer,
    wishlist: wishlistReducer, 
  },
});    
// Creates the Redux store and combines all reducers into one global state.

export default store;
