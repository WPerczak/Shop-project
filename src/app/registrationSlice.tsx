// registrationSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../firebase";
import { RegistrationFormData } from "../types";



// Define the UserData type
interface UserData {
  uid: string;
  displayName?: string | null;
  email?: string | null;
  password?: string | null;
  // Add any other user properties you need
}

// Define your initial state here
const initialState = {
  user: null as UserData | null, // Initialize user as null
  loading: false,
  error: null as string | null, // Initialize error as null
};


// Define an async thunk for user registration
export const registerUser = createAsyncThunk(
  "registration/registerUser",
  async (userData: RegistrationFormData, { rejectWithValue }) => {
    try {
      // Create a new user with Firebase authentication
      const response = await auth.createUserWithEmailAndPassword(
        userData.email,
        userData.password
      );

      // You can update user profile information here if needed
      await response.user?.updateProfile({
        displayName: `${userData.firstName} ${userData.lastName}`,
      });

      // Return the user data
      return response.user;
    } catch (error) {
      // Handle any registration errors here
      return rejectWithValue(error as string);
    }
  }
);

// Create the registration slice using createSlice
const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    // Add any synchronous actions here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error when request is pending
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null; // Reset error upon successful registration
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Set the error message
      });
  },
});

// Export the reducer and actions
export default registrationSlice.reducer;
export const { /* synchronous actions if needed */ } = registrationSlice.actions;
