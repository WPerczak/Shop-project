import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import registrationReducer from "./registrationSlice"; // Import the registration reducer
import authSlice from './authSlice';

export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    // registration: registrationReducer, // Include the registration reducer
    // auth: authSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;