import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Load from localStorage
const token = localStorage.getItem("token");
const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

const initialState = {
  isAuthenticated: !!token,
  isLoading: false,
  user,
  token,
  error: null,
  status: "idle",
};

// REGISTER ACTION
export const userRegisterAction = createAsyncThunk(
  "auth/register",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/register`,
        formData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Registration failed");
    }
  }
);

// LOGIN ACTION
export const userLoginAction = createAsyncThunk(
  "auth/login",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/login`,
        formData,
        { withCredentials: true }
      );

      const data = response.data;

      if (!data.success) return rejectWithValue(data.message || "Login failed");

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// SLICE
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userRegisterAction.pending, (state) => {
        state.isLoading = true;
        state.status = "pending";
        state.error = null;
      })
      .addCase(userRegisterAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(userRegisterAction.rejected, (state, action) => {
        state.isLoading = false;
        state.status = "failed";
        state.error = action.payload;
      })

      // LOGIN
      .addCase(userLoginAction.pending, (state) => {
        state.isLoading = true;
        state.status = "pending";
        state.error = null;
      })
      .addCase(userLoginAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(userLoginAction.rejected, (state, action) => {
        state.isLoading = false;
        state.status = "failed";
        state.error = action.payload;
        state.isAuthenticated = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
