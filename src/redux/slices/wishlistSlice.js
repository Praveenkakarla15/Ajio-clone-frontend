import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchWishlist = createAsyncThunk("wishlist/fetch", async () => {
  const { data } = await axios.get("/api/favorites");
  return data;
});

export const saveWishlist = createAsyncThunk("wishlist/save", async (items) => {
  const { data } = await axios.post("/api/favorites", { items });
  return data;
});

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: { items: [] },
  reducers: {
    addToWishlist(state, action) {
      const id = action.payload.id || action.payload._id;
      const exists = state.items.find((i) => i.id === id);
      if (!exists) state.items.push({ ...action.payload, id });
    },
    removeFromWishlist(state, action) {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    toggleWishlist(state, action) {
      const id = action.payload.id || action.payload._id;
      const exists = state.items.find((i) => i.id === id);
      if (exists) state.items = state.items.filter((i) => i.id !== id);
      else state.items.push({ ...action.payload, id });
    },
    clearWishlist(state) {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWishlist.fulfilled, (state, action) => {
      state.items = action.payload || [];
    });
    builder.addCase(saveWishlist.fulfilled, (state, action) => {
      state.items = action.payload || [];
    });
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  toggleWishlist,
  clearWishlist,
} = wishlistSlice.actions;
export const selectWishlistItems = (state) => state.wishlist.items;
export const selectWishlistCount = (state) => state.wishlist.items.length;
export default wishlistSlice.reducer;
