import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const LOGIN_URL = "http://localhost:3003/api/login";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  "/login/loginUser",
  async (userData) => {
    const response = await axios.post(LOGIN_URL, userData);
    window.localStorage.setItem(
      "loggedDiaryUser",
      JSON.stringify({ ...response.data })
    );
    return response.data;
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    alreadyLogged: (state, action) => {
      state.user = action.payload;
      console.log("ALREADY LOGGED", state.user);
    },
    logout: (state) => {
      state.user = null; // obrisati localstorage u logout handleru, kad se napravi
      console.log("LOGOUT", state.user);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = { ...action.payload };
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export function selectLoggedUser(state) {
  return state.login.user;
}

export function selectLoginLoading(state) {
  return state.login.loading;
}

export function selectLoginError(state) {
  return state.login.error;
}

export function selectToken(state) {
  return state.login.user?.token;
}

export const { alreadyLogged, logout } = loginSlice.actions;

export default loginSlice.reducer;
