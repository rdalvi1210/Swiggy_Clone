import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: true, // IMPORTANT: needed for ProtectedRoute to wait
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    clearUser: (state) => {
      state.user = null;
      state.loading = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
