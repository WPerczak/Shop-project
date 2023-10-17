import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword } from "../firebaseAuth"; // Import the authentication function
import { RootState } from "./store";
import { useSelector } from "react-redux";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  error: string | null;
  isAuthenticated: boolean;
  token: string | null; // Add the token field
}

const initialState: AuthState = {
  user: null,
  error: null,
  isAuthenticated: false,
  token: typeof window !== 'undefined' ? localStorage.getItem("authToken") || null : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.error = null;
    },
    loginFailed(state, action: PayloadAction<string>) {
      state.user = null;
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    setToken(state, action: PayloadAction<string>) {
      // Set the token in the state
      state.token = action.payload;
      state.isAuthenticated = true;
    },
  },
});

export const loginUser = (email: string, password: string) => async (dispatch: any) => {
  try {
    const firebaseUser = await signInWithEmailAndPassword(email, password);
    if (firebaseUser) {
      console.log("Logged in!");
      
      alert("Logged in!");
      // Return the token
      return firebaseUser.getIdToken();

    }
  } catch (error: any) {
    dispatch(authActions.loginFailed(error.message));
  }
};

export const setAuthToken = (token: string) => (dispatch: any) => {
  // You can store the token in local storage here
  localStorage.setItem("authToken", token);

  // Dispatch an action to update the state
  dispatch(authActions.setToken(token));
};

export const authActions = {
  ...authSlice.actions,
  setToken: authSlice.actions.setToken, // Add a new action to set the token
};


// export const authActions = authSlice.actions;
export default authSlice;
