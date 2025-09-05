// src/redux/slices/productSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../utils/axios.js";

// Fetch all products
export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/products");
      return res.data.data || res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message || "Failed to fetch products"
      );
    }
  }
);

// Fetch single product
export const fetchSingleProduct = createAsyncThunk(
  "products/fetchOne",
  async (id, { rejectWithValue }) => {
    try {
      const res = await API.get(`/products/${id}`);
      return res.data.data || res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message || "Failed to fetch product"
      );
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    selectedProduct: null,
    status: "idle",        // For all products
    productStatus: "idle", // For single product
    error: null,
  },
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
      state.productStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      // All products
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Single product
      .addCase(fetchSingleProduct.pending, (state) => {
        state.productStatus = "loading";
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.productStatus = "succeeded";
        state.selectedProduct = action.payload;
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.productStatus = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearSelectedProduct } = productSlice.actions;
export default productSlice.reducer;
