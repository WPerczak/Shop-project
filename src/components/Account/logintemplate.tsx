import Link from "next/link";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useDispatch } from "react-redux";
import { authActions, loginUser, setAuthToken, removeAuthToken } from "../../app/authSlice"; // Import the loginUser action
import { AppDispatch, RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { useRouter } from 'next/router';




const LoginInterface = (): JSX.Element => {
  const dispatch: AppDispatch = useDispatch();
  const isAuth = useSelector((state: RootState) => state.auth.isAuthenticated);
  const router = useRouter();
  console.log(isAuth);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      // Dispatch an action to set the token in the Redux store
      dispatch(authActions.setToken(token));
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
    dispatch(removeAuthToken());
    // You can also redirect the user to a different page or perform other actions if needed.
    // For example, you can use the 'router' object to redirect the user.
    router.push('/login'); 
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (!email || !password) {
      // Handle empty email or password here, e.g., show an error message
      console.error("Email and password are required.");
      return;
    }
  
  dispatch(loginUser(email, password))
    .then((token) => {
      if (token) {
        dispatch(setAuthToken(token));

        
        // Redirect 
        router.push('/');      
      }
    });    
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
           you dont have account yet? <Link href="/register">SIGN UP</Link>
        </h3>
      </form>
    </div>
  );
};

export default LoginInterface;