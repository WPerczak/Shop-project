import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: number;
  title: string;
  quantity: number;
  total: number;
  price: number;
  image: string;
}

interface CartState {
  items: CartItem[];
  totalQuantity: number;
  changed: boolean;
  totalPrice: number;
}

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    changed: false,
    totalPrice: 0,
  } as CartState,
  reducers: {
    replaceCart(state, action: PayloadAction<CartState>) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },

    addItemToCart(state, action: PayloadAction<CartItem>) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      state.changed = true;
      state.totalPrice = state.totalPrice + newItem.price;

      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          title: newItem.title,
          quantity: 1,
          total: newItem.price,
          price: newItem.price,
          image: newItem.image,
        });
      } else {
        existingItem.quantity++;
        existingItem.total = existingItem.total + newItem.price;
      }
    },

    removeItemFromCart(state, action: PayloadAction<number>) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        state.totalQuantity--;
        state.changed = true;
        state.totalPrice = state.totalPrice - existingItem.price;

        if (existingItem.quantity === 1) {
          state.items = state.items.filter((item) => item.id !== id);
        } else {
          existingItem.quantity--;
          existingItem.total = existingItem.total - existingItem.price;
        }
      }
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
