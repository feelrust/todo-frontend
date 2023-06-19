import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// const ApiUrl = import.meta.env.VITE_API_URL;

const initalState = {
  user: JSON.parse(localStorage.getItem("user")),
  error: null,
  loading: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initalState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      const user = action.payload;

      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem("user", JSON.stringify(user));
      state.user = user;
      state.loading = false;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export default authSlice.reducer;

export const login = createAsyncThunk("auth/login", async (user) => {
  const { email, password } = user;
  const payload = JSON.stringify({ userName: email, password });
  const response = await fetch(
    "https://fardanirizkitodoapi.azurewebsites.net/auth/v1/login",
    {
      method: "POST",
      body: payload,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  );
  const data = await response.json();
  return data;
});

export const register = createAsyncThunk("auth/register", async (user) => {
  const { email, password } = user;
  const payload = JSON.stringify({ userName: email, password });
  const response = await fetch(
    `https://fardanirizkitodoapi.azurewebsites.net/auth/v1/register`,
    {
      method: "POST",
      body: payload,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  );
  const data = await response.json();
  return data;
});
