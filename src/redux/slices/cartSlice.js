import { createSlice } from "@reduxjs/toolkit";
// Imports a helper to easily create a Redux slice.

const cartSlice = createSlice({
  name: "cart", // The name of this slice in the Redux store.
  initialState: {
    items: [], // The cart starts empty; items will be added here.
  },
  reducers: {
    addToCart: (state, action) => {
      // Checks if the item is already in the cart.
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (existingItem) {
        // If yes, increases its quantity by 1.
        existingItem.quantity += 1;
      } else {
        // If not, adds the item to the cart with quantity 1.
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      // Removes the item whose id matches action.payload from the cart.
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    increaseQty: (state, action) => {
      // Finds the item and increases its quantity by 1.
      const item = state.items.find((i) => i.id === action.payload);
      if (item) item.quantity += 1;
    },
    decreaseQty: (state, action) => {
      // Finds the item and decreases its quantity by 1 if quantity > 1.
      const item = state.items.find((i) => i.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        // If quantity is 1, removes the item from the cart.
        state.items = state.items.filter((i) => i.id !== action.payload);
      }
    },
    clearCart: (state) => {
      // Removes all items from the cart.
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, increaseQty, decreaseQty, clearCart } =
  cartSlice.actions;
// Exports the action creators for use in components.

export default cartSlice.reducer;
// Exports the reducer to be added to the Redux store.