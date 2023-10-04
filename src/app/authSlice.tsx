import {
    createSlice,
    PayloadAction,
    createAsyncThunk,
    ActionReducerMapBuilder,
  } from "@reduxjs/toolkit";
  import { signInWithEmailAndPassword } from "../firebaseAuth"; // Import the authentication function
  import firebase from 'firebase/compat/app';
  
  interface User {
    id: string;
    name: string;
    email: string;
  }
  
  interface AuthState {
    user: User | null;
    error: string | null;
    isAuthenticated: boolean;
  }
  
  const initialState: AuthState = {
    user: null as User | null,
    error: null as string | null,
    isAuthenticated: false,
  };
  
  export const loginUser = createAsyncThunk(
      "auth/loginUser",
      async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
        try {
          const user = await signInWithEmailAndPassword(email, password);
          console.log("Logged in!"); // Add this line
          alert("Logged in!"); // Add this line to log success
          return user;
        } catch (error: any) { // Specify the type of 'error'
          return rejectWithValue(error.message);
        }
      }
    );
    
    
  const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      loginSuccess(state, action: PayloadAction<User>) {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null; // Set error to null on successful login
      },
      loginFailed(state, action: PayloadAction<string>) {
        state.error = action.payload;
        state.isAuthenticated = false;
      },
      // other reducers
    },
    extraReducers: (builder) => {
      builder
      .addCase(loginUser.fulfilled, (state, action) => {
          if (state.user && action.payload) {
            state.user.id = action.payload.uid || "";
            state.user.name = action.payload.displayName || "";
            state.user.email = action.payload.email || "";
          }
          state.isAuthenticated = true;
          state.error = null;
        })
        .addCase(loginUser.rejected, (state, action) => {
          state.user = null;
          state.isAuthenticated = false;
          state.error = action.payload as string; // Cast action.payload to string
        })
    },
  });
  
  export const authActions = authSlice.actions;
  export default authSlice;
  