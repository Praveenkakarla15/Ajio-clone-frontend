// src/redux/slices/wishlistSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../utils/axios";

// Fetch wishlist
export const fetchWishlist = createAsyncThunk("wishlist/fetch", async () => {
  const { data } = await API.get("/favorites");
  return data; // Always full wishlist
});

// Add to wishlist
export const addWishlistItem = createAsyncThunk(
  "wishlist/add",
  async ({ productId }) => {
    const { data } = await API.post("/favorites", { productId });
    return data; // Full wishlist after add
  }
);

// Remove from wishlist
export const removeWishlistItem = createAsyncThunk(
  "wishlist/remove",
  async (productId) => {
    const { data } = await API.delete(`/favorites/${productId}`);
    return data; // Full wishlist after remove
  }
);

// Clear wishlist
export const clearWishlistBackend = createAsyncThunk("wishlist/clear", async () => {
  await API.delete("/favorites");
  return []; // Empty wishlist
});

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: { items: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch wishlist
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.items = action.payload || [];
      })
      // Add item
      .addCase(addWishlistItem.fulfilled, (state, action) => {
        state.items = action.payload || [];
      })
      // Remove item
      .addCase(removeWishlistItem.fulfilled, (state, action) => {
        state.items = action.payload || [];
      })
      // Clear wishlist
      .addCase(clearWishlistBackend.fulfilled, (state) => {
        state.items = [];
      });
  },
});

export const selectWishlistItems = (state) => state.wishlist.items;
export const selectWishlistCount = (state) => state.wishlist.items.length;
export default wishlistSlice.reducer;
