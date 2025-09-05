import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../utils/axios";

// Fetch cart from backend
export const fetchCart = createAsyncThunk("cart/fetch", async () => {
  const { data } = await API.get("/cart");
  return data;
});

// Add item to cart
export const addCartItem = createAsyncThunk(
  "cart/add",
  async ({ productId, quantity = 1 }) => {
    const { data } = await API.post("/cart", { productId, quantity });
    return data;
  }
);

// Update cart item quantity
export const updateCartItem = createAsyncThunk(
  "cart/update",
  async ({ id, quantity }) => {
    const { data } = await API.put(`/cart/${id}`, { quantity });
    return data;
  }
);

// Remove single item from cart
export const removeCartItem = createAsyncThunk(
  "cart/remove",
  async (id) => {
    await API.delete(`/cart/${id}`);
    return id; // Only return the removed item's ID
  }
);

// Clear entire cart
export const clearCartBackend = createAsyncThunk(
  "cart/clear",
  async () => {
    await API.delete("/cart");
    return [];
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [], status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload || [];
      })
      .addCase(addCartItem.fulfilled, (state, action) => {
        state.items = action.payload || [];
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.items = action.payload || [];
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item._id !== action.payload);
      })
      .addCase(clearCartBackend.fulfilled, (state) => {
        state.items = [];
      });
  },
});

export const selectCartItems = (state) => state.cart.items;
export const selectCartTotalQty = (state) =>
  state.cart.items.reduce((t, i) => t + i.quantity, 0);
export const selectCartTotalPrice = (state) =>
  state.cart.items.reduce((t, i) => t + i.product.price * i.quantity, 0);

export default cartSlice.reducer;
