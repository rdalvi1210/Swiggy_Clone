import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  initialized: false,
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

    updateUserAddress: (state, action) => {
      if (state.user) {
        state.user.addresses = [action.payload]; // only ONE address
      }
    },
  },
});

export const { setUser, clearUser, updateUserAddress } = userSlice.actions;
export default userSlice.reducer;
