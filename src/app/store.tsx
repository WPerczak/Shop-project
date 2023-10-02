// import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
// import cartSlice from "./cartSlice";

// import logger from "redux-logger";
// import thunk from "redux-thunk";
// // ...

// const middleware = [thunk];

// if(process.env.NODE_ENV === "development") {
//   middleware.push(logger)
// }

// export const store = configureStore({
//   reducer: {
//     cart: cartSlice.reducer,
//   },
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// store.tsx
import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import registrationReducer from "./registrationSlice"; // Import the registration reducer

export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    registration: registrationReducer, // Include the registration reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


