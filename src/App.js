import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Profile from "./components/Profile";
import Home from './components/Home';
import ManageUsers from './components/ManageUsers'; // Import the ManageUsers component

function App() {
  const [user, setUser] = useState(null); // For storing logged-in user data

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={<LoginForm setUser={setUser} />}
        />
        <Route path="/register" element={<RegisterForm />} />
        <Route
          path="/profile"
          element={user ? <Profile user={user} /> : <p>Please log in to view your profile</p>}
        />
        
        {/* Route to Manage Users, only accessible for admin */}
        <Route
          path="/manage-users"
          element={user && user.role === "admin" ? <ManageUsers /> : <p>You do not have access to this page</p>}
        />
      </Routes>
    </Router>
  );
}

export default App;
