import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";  // Import Framer Motion
import { useNavigate } from "react-router-dom";  // Import useNavigate from react-router-dom
import '../styles/RegisterForm.css';

const RegisterForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // New state for success message

  const navigate = useNavigate(); // Initialize useNavigate hook

  const validateForm = () => {
    // Clear any previous error or success message
    setError("");
    setSuccessMessage("");

    if (!firstName || !lastName || !email || !password || !confirm_password) {
      return "All fields are required.";
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return "Please enter a valid email address.";
    }

    // Password length validation
    if (password.length < 6) {
      return "Password must be at least 6 characters long.";
    }

    // Password match validation
    if (password !== confirm_password) {
      return "Passwords do not match.";
    }

    return null; // No validation errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
  
    try {
      // Make the API request to register the user
      await axios.post("http://localhost:8080/api/register", {
        firstName,
        lastName,
        email,
        password,
        confirm_password,
      });
  
      // Show success message and clear the form
      setSuccessMessage("Registration successful.");
  
      // Clear form fields
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
  
      // Auto-hide the success message after 5 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 5000); // Hide success message after 5 seconds
  
      // Check if the user is already logged in (i.e., if a token exists)
      const token = localStorage.getItem("authToken");
  
      // If a token is found, navigate to the home page, else navigate to login
      if (token) {
        // If the user is already logged in, redirect them to the Home page
        setTimeout(() => {
          navigate("/"); 
        }, 1000);
      } else {
        // If no token, redirect to the login page
        setTimeout(() => {
          navigate("/login"); 
        }, 1000); 
      }
    } catch (error) {
      setError("Error registering user. Please try again.");
    }
  };
  

  return (
    <div className="register-container">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="register-header"
      >
        Register
      </motion.h2>
      
      {/* Success Message */}
      {successMessage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="success-message"
        >
          {successMessage}
        </motion.div>
      )}

      {/* Error Message */}
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

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="register-form"
      >
        <motion.input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          className="input-field"
          whileFocus={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        />
        
        <motion.input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          className="input-field"
          whileFocus={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        />

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

        <motion.input
          type="password"
          placeholder="Confirm Password"
          value={confirm_password}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="input-field"
          whileFocus={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        />

        <motion.button
          type="submit"
          className="register-button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Register
        </motion.button>
      </motion.form>
    </div>
  );
};

export default RegisterForm;
