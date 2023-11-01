import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword } from "../firebaseAuth";
import { RootState, AppDispatch } from "./store";

interface User {
  token: string | null;
}

let logoutTimeout: NodeJS.Timeout | null = null;
let expirationCheckInterval: NodeJS.Timeout | null = null;

let localStorage: Storage | null = null;

if (typeof window === "undefined") {
  const { LocalStorage } = require("node-localstorage");
  localStorage = new LocalStorage("./scratch");
} else {
  localStorage = window.localStorage;
}

const initialState: {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null; // Change 'string | undefined' to 'string | null'
  tokenExpiration: number | null;
} = {
  user: null,
  isAuthenticated: false,
  token: localStorage?.getItem("token") || null, // Change 'undefined' to 'null'
  tokenExpiration: localStorage?.getItem("tokenExpiration")
    ? parseInt(localStorage.getItem("tokenExpiration")!)
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ user: User | null; token: string }>
    ) => {
      state.user = action.payload.user;
      state.isAuthenticated = !!action.payload.user;
      state.token = action.payload.token;
      state.tokenExpiration = Date.now() + 10000;
      localStorage?.setItem("token", action.payload.token);
      localStorage?.setItem(
        "tokenExpiration",
        state.tokenExpiration.toString()
      );
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
      state.tokenExpiration = null;
      localStorage?.removeItem("token");
      localStorage?.removeItem("tokenExpiration");
    },
  },
});

const tokenExpiration = parseInt(
  localStorage?.getItem("tokenExpiration") || ""
);
if (tokenExpiration && Date.now() >= tokenExpiration) {
  authSlice.actions.clearUser();
}

const clearLogoutTimer = () => {
  if (logoutTimeout) {
    clearTimeout(logoutTimeout);
  }
};

const checkTokenExpiration =
  () => (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();
    if (
      state.auth.tokenExpiration &&
      Date.now() >= state.auth.tokenExpiration
    ) {
      dispatch(authSlice.actions.clearUser());
    }
  };

const startTokenExpirationCheck = (dispatch: any) => {
  expirationCheckInterval = setInterval(() => {
    dispatch(checkTokenExpiration());
  }, 1000); // Check every second, adjust as needed
};

const stopTokenExpirationCheck = () => {
  if (expirationCheckInterval) {
    clearInterval(expirationCheckInterval);
  }
};

export const clearUser = () => (dispatch: any) => {
  clearLogoutTimer();
  stopTokenExpirationCheck();
  dispatch(authSlice.actions.clearUser());
};

export const loginUser =
  (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      const firebaseUser = await signInWithEmailAndPassword(email, password);
      const userToken: string = (await firebaseUser?.getIdToken()) || ""; // Provide a default value ('') here
      dispatch(
        authSlice.actions.setUser({
          user: null,
          token: userToken,
        })
      );

      const logoutTime = 3600000; // 1 hour in milliseconds
      if (logoutTimeout) {
        clearTimeout(logoutTimeout);
      }
      logoutTimeout = setTimeout(() => {
        dispatch(authSlice.actions.clearUser());
      }, logoutTime);

      startTokenExpirationCheck(dispatch);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

export const authActions = authSlice.actions;

export { checkTokenExpiration };
export default authSlice;
