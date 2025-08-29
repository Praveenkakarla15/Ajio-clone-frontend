import { createSlice } from "@reduxjs/toolkit";

// Load user info from localStorage if available
const storedUser = localStorage.getItem("user");

const initialState = {
  user: storedUser ? JSON.parse(storedUser) : null, // Set user from localStorage or null
};

const authSlice = createSlice({
  name: "auth", // Name of this slice in the Redux store
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload; // Set user info in state
      localStorage.setItem("user", JSON.stringify(action.payload)); // Save user info to localStorage
    },
    logout: (state) => {
      state.user = null; // Clear user info from state
      localStorage.removeItem("user"); // Remove user info from localStorage
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions; // Export actions for use in components
export default authSlice.reducer; // Export reducer for the Redux store