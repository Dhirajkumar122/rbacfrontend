import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { motion } from "framer-motion"; // Import Framer Motion
import axios from "axios";
import '../styles/Navbar.css';

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate(); // Hook to navigate to another route

  // Function to handle "Manage Users" click, make API request, and redirect
  const handleManageUsersClick = async () => {
    try {
      // Make the API request to fetch user data
      const response = await axios.get("http://localhost:8080/api/admin/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Include JWT token
        },
      });
    //   console.log(response.data.users);
      navigate("/manage-users", {
        state: { users: response.data.users }, // Passing data to the ManageUsers page
      });
    } catch (error) {
      console.error("Error fetching manage users data:", error);
      // Handle error (show a message, etc.)
    }
  };

  const handleLogout = () => {
    setUser(null); // Log the user out
    localStorage.removeItem("authToken"); // Remove token from local storage
  };

  return (
    <motion.nav
      className="navbar"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }} // Fade-in effect for navbar
    >
      <motion.div
        className="logo"
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }} // Logo slide-in effect
      >
        MyApp
      </motion.div>

      <motion.ul 
        className="nav-links"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.li
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Link to="/">Home</Link>
        </motion.li>

        {!user ? (
          <>
            <motion.li 
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link to="/login">Login</Link>
            </motion.li>
            <motion.li 
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link to="/register">Register</Link>
            </motion.li>
          </>
        ) : (
          <>
            <motion.li 
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link to="/profile">Profile</Link>
            </motion.li>

            {/* Conditionally show the "Manage Users" link if the user is an admin */}
            {user.role === "admin" && (
              <motion.li
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link to="#" onClick={handleManageUsersClick}>Manage Users</Link> {/* Add click handler */}
              </motion.li>
            )}

            <motion.li 
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <button onClick={handleLogout} className="logout-button">Logout</button>
            </motion.li>
          </>
        )}
      </motion.ul>
    </motion.nav>
  );
};

export default Navbar;
