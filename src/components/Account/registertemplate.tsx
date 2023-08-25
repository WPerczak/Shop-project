import Link from "next/link";
import React, { useState, ChangeEvent, FormEvent } from "react";

interface RegistrationFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const RegisterInterface = () => {
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
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
    } else if (formData.password.length < 6) {
      errors.push("Password must be at least 6 characters long.");
    }

    setFormErrors(errors);

    if (errors.length === 0) {
      console.log("Registration form is valid.");
      console.log("First Name:", formData.firstName);
      console.log("Last Name:", formData.lastName);
      console.log("Email:", formData.email);
      console.log("Password:", formData.password);
      // Perform further actions like submitting the form to the server here
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