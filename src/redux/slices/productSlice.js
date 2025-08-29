import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// Imports helpers from Redux Toolkit for creating slices and async actions.

export const fetchProducts = createAsyncThunk("products/fetchAll", async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  return res.json();
});
// Defines an async action to fetch all products from an API.
// When dispatched, it makes a GET request and returns the product list.

export const fetchSingleProduct = createAsyncThunk("products/fetchOne", async (id) => {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  return res.json();
});
// Defines an async action to fetch details for a single product by its id.

const productSlice = createSlice({
  name: "products", // Name of this slice in the Redux store.
  initialState: {
    products: [],         // Array to hold all products.
    selectedProduct: null,// Holds details of a single selected product.
    status: "idle",       // Tracks loading status: "idle", "loading", "succeeded".
  },
  reducers: {},           // No regular reducers here; only async actions are handled.
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      // When fetchProducts is dispatched and still loading, set status to "loading".
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      // When fetchProducts finishes successfully, set status to "succeeded" and store products.
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.selectedProduct = action.payload;
      });
      // When fetchSingleProduct finishes, store the product details in selectedProduct.
  },
});

export default productSlice.reducer;
// Exports the reducer so it can be added to the Redux store.