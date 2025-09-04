import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch cart items for logged-in user
export const fetchCart = createAsyncThunk("cart/fetch", async () => {
  const { data } = await axios.get("/api/cart"); // backend returns user's cart
  return data;
});

// Save cart after add/remove
export const saveCart = createAsyncThunk("cart/save", async (items) => {
  const { data } = await axios.post("/api/cart", { items });
  return data;
});

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] },
  reducers: {
    addToCart(state, action) {
      const id = action.payload._id || action.payload.id;
      const item = state.items.find((i) => i.id === id);
      if (item) item.quantity += 1;
      else state.items.push({ ...action.payload, id, quantity: 1 });
    },
    removeFromCart(state, action) {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    increaseQty(state, action) {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) item.quantity += 1;
    },
    decreaseQty(state, action) {
      const item = state.items.find((i) => i.id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
      else state.items = state.items.filter((i) => i.id !== action.payload);
    },
    clearCart(state) {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.items = action.payload || [];
    });
    builder.addCase(saveCart.fulfilled, (state, action) => {
      state.items = action.payload || [];
    });
  },
});

export const { addToCart, removeFromCart, increaseQty, decreaseQty, clearCart } =
  cartSlice.actions;
export const selectCartItems = (state) => state.cart.items;
export const selectCartTotalQty = (state) =>
  state.cart.items.reduce((t, i) => t + i.quantity, 0);
export const selectCartTotalPrice = (state) =>
  state.cart.items.reduce((t, i) => t + i.price * i.quantity, 0);

export default cartSlice.reducer;
