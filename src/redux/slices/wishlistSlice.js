import { createSlice } from "@reduxjs/toolkit";

// Creates a Redux slice for wishlist functionality.
const wishlistSlice = createSlice({
  name: "wishlist", // Name of this slice in the Redux store.
  initialState: {
    items: [], // Wishlist starts empty.
  },
  reducers: {
    addToWishlist: (state, action) => {
      // Adds a product to wishlist only if it's not already there.
      const exists = state.items.find((item) => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    removeFromWishlist: (state, action) => {
      // Removes a product from wishlist by its id.
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearWishlist: (state) => {
      // Empties the wishlist.
      state.items = [];
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions; // Export actions for use in components.

export default wishlistSlice.reducer; // Export reducer