import Link from "next/link";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { loginUser, authActions, clearUser } from "../../app/authSlice";
import { AppDispatch, RootState } from "@/app/store";

const LoginInterface = (): JSX.Element => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(authActions.setUser({ user: null, token }));
    }
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogout = () => {
    dispatch(clearUser());
    router.push("/login");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      console.error("Email and password are required.");
      return;
    }

    try {
      const resultAction: any = await dispatch(loginUser(email, password));

      if (resultAction.error) {
        // Thunk was rejected with an error.
        const error = resultAction.error;
        if (error.message) {
          console.error("Login failed:", error.message);
        } else {
          console.error("Login failed. An error occurred.");
        }
      } else {
        // Thunk completed successfully and user is authenticated.
        router.push("/");
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
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
          LOGIN
        </button>
        <button type="button" className="button" onClick={handleLogout}>
          LOGOUT
        </button>
        <h3>
          Don't have an account yet? <Link href="/register">SIGN UP</Link>
        </h3>
      </form>
    </div>
  );
};

export default LoginInterface;
