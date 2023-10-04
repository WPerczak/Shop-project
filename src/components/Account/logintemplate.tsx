import Link from "next/link";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../app/authSlice"; // Import the loginUser action
import { AppDispatch } from "@/app/store";



const LoginInterface = (): JSX.Element => {
  const dispatch: AppDispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (!email || !password) {
      // Handle empty email or password here, e.g., show an error message
      console.error("Email and password are required.");
      return;
    }
  
    dispatch(loginUser({ email, password }));
  };
  

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit" className="button">
          SIGN IN
        </button>
        <h3>
           you dont have account yet? <Link href="/register">SIGN UP</Link>
        </h3>
      </form>
    </div>
  );
};

export default LoginInterface;