import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  initialized: false, // this is the REAL auth state
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.initialized = true;
    },
    clearUser: (state) => {
      state.user = null;
      state.initialized = true;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
