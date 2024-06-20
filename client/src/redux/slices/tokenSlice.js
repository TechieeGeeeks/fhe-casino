// userSlice.js

import { createSlice } from "@reduxjs/toolkit";

const tokenSlice = createSlice({
  name: "token",
  initialState: {
    token: '0',
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      console.log("token", state.token);
    },
    resetToken: (state) => {
      state.token = '0';
    },
  },
});

export const { setToken, resetToken } = tokenSlice.actions;
export default tokenSlice.reducer;
