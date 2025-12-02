import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  store: null,
  loading: false,
  initialized: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
    setCart: (state, action) => {
      state.items = action.payload.items || [];
      state.store = action.payload.store || null;
      state.loading = false;
      state.initialized = true;
    },
    clearCart: (state) => {
      state.items = [];
      state.store = null;
      state.loading = false;
      state.initialized = true;
    },

    // ⭐ INSTANT UPDATE — NO REFRESH NEEDED
    updateItemQty: (state, action) => {
      const { productId, actionType } = action.payload;
      const item = state.items.find((i) => i.productId === productId);

      if (!item) return;

      if (actionType === "inc") {
        item.quantity += 1;
      } else if (actionType === "dec" && item.quantity > 1) {
        item.quantity -= 1;
      }
    },

    // ⭐ INSTANT REMOVE — NO REFRESH NEEDED
    removeItemLocal: (state, action) => {
      state.items = state.items.filter((i) => i.productId !== action.payload);
    },
  },
});

export const {
  startLoading,
  setCart,
  clearCart,
  updateItemQty,
  removeItemLocal,
} = cartSlice.actions;

export default cartSlice.reducer;
