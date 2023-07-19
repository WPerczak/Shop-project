import Link from "next/link";
import React, { useState, ChangeEvent, FormEvent } from "react";

const LoginInterface = (): JSX.Element => {
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
    // Add your login logic here, such as making an API call to authenticate the user
    console.log("Login clicked");
    console.log("Email:", email);
    console.log("Password:", password);
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