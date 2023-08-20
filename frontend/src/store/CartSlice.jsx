import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [], totalAmount: 0, changed: false },
  reducers: {
    replaceCart(state, action) {
      state.totalAmount = action.payload.totalAmount;
      state.items = action.payload.items;
    },
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.changed = true;

      const newItemPrice = parseFloat(newItem.price);

      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItemPrice,
          title: newItem.title,
          image: newItem.image,
          quantity: 1,
          totalPrice: newItemPrice,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += newItemPrice;
      }
      state.totalAmount += newItemPrice;
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.changed = true;

      if (existingItem && existingItem.quantity === 1) {
        const existingItemPrice = parseFloat(existingItem.price);

        state.items = state.items.filter((item) => item.id !== id);
        state.totalAmount -= existingItemPrice;
      } else if (existingItem) {
        existingItem.quantity--;

        const existingItemPrice = parseFloat(existingItem.price);

        existingItem.totalPrice -= existingItemPrice;
        state.totalAmount -= existingItemPrice;
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalAmount = 0;
      state.changed = true;
    },
  },
});

export default cartSlice;

export const cartActions = cartSlice.actions;
