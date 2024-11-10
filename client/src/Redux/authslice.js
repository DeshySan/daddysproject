//setting up actions and reducers

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  token: null,
  user: null,
  loading: false,
  error: null,
};

// Check if there is any saved state in localStorage
const savedAuthState = localStorage.getItem("authState");
const initialAuthState = savedAuthState
  ? JSON.parse(savedAuthState) // If saved state exists, use it
  : initialState;
//Create the auth slice

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem("authState", JSON.stringify(state));
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      localStorage.removeItem("authState");
    },
  },
});

//export theactions
export const { loginRequest, loginSuccess, loginFailure, logout } =
  authSlice.actions;

//export the reducer
export default authSlice.reducer;
