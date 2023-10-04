import { auth } from './firebase'; // Import the Firebase auth object

export const signInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    return userCredential.user; // Return the authenticated user
  } catch (error) {
    throw error; // Handle login errors
  }
};

