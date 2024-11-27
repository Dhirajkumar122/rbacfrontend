import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import '../styles/LoginForm.css';

const LoginForm = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false); // Track login state
  const [userData, setUserData] = useState(null); // Store user data
  const [forgotPassword, setForgotPassword] = useState(false); // Track if forgot password is triggered
  const [resetEmail, setResetEmail] = useState(""); // Store email for password reset
  const [resetMessage, setResetMessage] = useState(""); // Store reset message

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/api/login", {
        email,
        password,
      });

      // Assuming the response contains a JWT token and user data
      const { token, user } = response.data;

      // Store the token in localStorage for future requests
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Store user data in state
      setUser(user); 
      setUserData(user); 
      setLoggedIn(true); // Set the login state to true
      setError(""); // Clear any previous errors
    } catch (error) {
      setError("Invalid credentials, please try again.");
    }
  };

  const handleLogout = () => {
    // Clear the stored token and user data
    localStorage.removeItem("authToken");
    setUser(null);
    setUserData(null);
    setLoggedIn(false); // Set logged-in state to false
  };

  const handleForgotPassword = async () => {
    if (!resetEmail) {
      setResetMessage("Please enter your email.");
      return;
    }

    try {
      // Make an API call to request a password reset
      const response = await axios.post("http://localhost:8080/api/forgotPassword", { email: resetEmail });

      // Assuming the response has a success message
      setResetMessage("Password reset link sent! Please check your email.");
    } catch (error) {
      setResetMessage("Error sending reset link. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="login-header"
      >
        Login
      </motion.h2>
      
      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="error-message"
        >
          {error}
        </motion.div>
      )}

      {!loggedIn ? (
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="login-form"
        >
          <motion.input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input-field"
            whileFocus={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          />

          <motion.input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input-field"
            whileFocus={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          />

          <motion.button
            type="submit"
            className="login-button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Login
          </motion.button>
        </motion.form>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="welcome-message"
        >
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="welcome-header"
          >
            Welcome, 
            <motion.span
              className="typing-effect"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              {userData.firstName}
            </motion.span>!
          </motion.h2>
          <p className="welcome-subtext">We're excited to have you back. Here's a quick overview of what you can do:</p>

          <div className="user-options">
            <motion.button
              className="dashboard-button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Go to Dashboard 🚀
            </motion.button>
            <motion.button
              className="settings-button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Account Settings ⚙️
            </motion.button>
          </div>
        </motion.div>
      )}

      {!loggedIn && (
        <div className="forgot-password-section">
          <motion.button
            onClick={() => setForgotPassword(!forgotPassword)}
            className="forgot-password-button"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Forgot Password?
          </motion.button>

          {forgotPassword && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="forgot-password-form"
            >
              <input
                type="email"
                placeholder="Enter your email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                className="input-field"
              />
              <motion.button
                onClick={handleForgotPassword}
                className="reset-password-button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Reset Password
              </motion.button>

              {resetMessage && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="reset-message"
                >
                  {resetMessage}
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
};

export default LoginForm;
