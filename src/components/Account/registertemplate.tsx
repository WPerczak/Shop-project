import { useDispatch } from "react-redux";
import Link from "next/link";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { registerUser } from "../../app/registrationSlice";
import { firestore, auth } from "../../firebase"; // Import Firebase Firestore and Authentication
import { RegistrationFormData } from "../../types"; // Import the type
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "@/app/store";
import { AnyAction } from "redux";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/router";

const RegisterInterface = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [formData, setFormData] = useState<RegistrationFormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState<string[]>([]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors: string[] = [];

    if (!formData.firstName.trim()) {
      errors.push("First Name is required.");
    }

    if (!formData.lastName.trim()) {
      errors.push("Last Name is required.");
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      errors.push("Email is required.");
    } else if (!emailPattern.test(formData.email)) {
      errors.push("Invalid email format.");
    }

    if (!formData.password) {
      errors.push("Password is required.");
    } else if (
      formData.password.length < 6 &&
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(formData.password)
    ) {
      errors.push(
        "Password must be at least 6 characters long and must contain at least one lowercase letter, one uppercase letter, and one digit. "
      );
    } else if (formData.password.length < 6) {
      errors.push("Password must be at least 6 characters long.");
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(formData.password)) {
      errors.push(
        "Password must contain at least one lowercase letter, one uppercase letter, and one digit."
      );
    }
    setFormErrors(errors);

    if (errors.length === 0) {
      console.log("Registration form is valid.");
      console.log("First Name:", formData.firstName);
      console.log("Last Name:", formData.lastName);
      console.log("Email:", formData.email);
      console.log("Password:", formData.password);

      try {
        // Create a user with Firebase Authentication
        const response = await auth.createUserWithEmailAndPassword(
          formData.email,
          formData.password
        );

        if (response.user) {
          // Store additional user data in Firebase Firestore
          await firestore.collection("users").doc(response.user.uid).set({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
            // Add any other user data you want to store
          });

          router.push("/login"); // Redirect to login page after successful registration

          // Dispatch the registerUser action with the registration data
          (dispatch as ThunkDispatch<RootState, void, AnyAction>)(
            registerUser(formData)
          );
        } else {
          console.error("User not found in the response.");
        }
      } catch (error) {
        console.error("Error during registration:", error);
      }
    } else {
      console.error("Registration form has the following errors:");
      errors.forEach((error) => console.error(`- ${error}`));
    }
  };

  return (
    <div className="register-page">
      <h2>Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="button">
          Register
        </button>
        <h3>
          Already a user? <Link href="/login">SIGN IN</Link>
        </h3>
      </form>

      {formErrors.length > 0 && (
        <div className="error-message">
          <p>Registration form has the following errors:</p>
          <ul>
            {formErrors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RegisterInterface;
