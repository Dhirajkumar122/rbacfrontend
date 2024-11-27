import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate hook
import axios from "axios"; // Import Axios for API calls
import "../styles/ManageUser.css";
import SuccessMessage from './SuccessMessage'; // Import the SuccessMessage component

const ManageUsers = () => {
  const location = useLocation(); // Get location data
  const { users } = location.state || {}; // Extract users from the state
  const [updatedUsers, setUpdatedUsers] = useState(users); // State to keep track of user updates
  const [filteredRole, setFilteredRole] = useState("All"); // State for role filter
  const [successMessage, setSuccessMessage] = useState(null); // State to manage success messages
  const [loading, setLoading] = useState(false); // State for loading state
  const [error, setError] = useState(null); // State for error messages
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Function to handle role change
  const handleRoleChange = (userId, newRole) => {
    const currentUserToken = localStorage.getItem('authToken');
    
    if (!currentUserToken) {
      alert("You are not logged in.");
      return;
    }

    const currentUser = JSON.parse(localStorage.getItem('user')) || {}; 
    const userToUpdate = updatedUsers.find(user => user.id === userId);
  
    if (currentUser.role === "admin" && userToUpdate.role === "admin" && newRole !== userToUpdate.role) {
      // Prevent an admin from changing another admin's role
      alert("Admin roles cannot be changed by another admin.");
      return;
    }
  
    setUpdatedUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId
          ? { ...user, newRole: newRole, isChanged: true }
          : user
      )
    );
  };

  // Function to handle delete user action
  const handleDeleteUser = async (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      await deleteUser(userId); // Calling deleteUser function after confirmation
      setSuccessMessage("User deleted successfully!"); // Show success message
    }
  };

  // Function to handle delete user API call
  const deleteUser = async (userId) => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.delete(`http://localhost:8080/api/user/delete/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setUpdatedUsers((prevUsers) =>
        prevUsers.filter((user) => user.id !== userId)
      );
    } catch (error) {
      console.error("Error deleting user:", error);
      setError("Error deleting user.");
    }
  };

  // Function to handle submit of updated user role
  const handleSubmit = async (userId) => {
    const userToUpdate = updatedUsers.find(user => user.id === userId);
    if (!userToUpdate.isChanged) return;

    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        alert('Please log in again.');
        return;
      }

      await axios.put("http://localhost:8080/api/user/updateRole", {
        id: userId,
        newRole: userToUpdate.newRole
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setUpdatedUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId
            ? { ...user, role: user.newRole, isChanged: false, newRole: "" }
            : user
        )
      );
      setSuccessMessage("User role updated successfully!"); // Show success message
    } catch (error) {
      console.error("Error updating user roles:", error);
      if (error.response && error.response.status === 401) {
        alert("Unauthorized: Please log in again.");
      } else {
        setError("Error updating user roles.");
      }
    }
  };

  // Filter users based on selected role
  const filteredUsers = filteredRole === "All"
    ? updatedUsers
    : updatedUsers.filter(user => user.role.toLowerCase() === filteredRole.toLowerCase());

  if (!updatedUsers) {
    return <div>No user data available.</div>;
  }

  return (
    <div className="manage-users-container">
      <h2>Manage Users</h2>

      {/* Success message component */}
      {successMessage && <SuccessMessage message={successMessage} onClose={() => setSuccessMessage(null)} />}
      {error && <div className="error-message">{error}</div>} {/* Display error message if any */}

      {/* Button to navigate to Register Form */}
      <button
        className="add-user-button"
        onClick={() => navigate('/register')} // Navigate to register form
      >
        Add New User
      </button>

      {/* Role Filter */}
      <div className="filter-container">
        <label htmlFor="role-filter">Filter by Role:</label>
        <select
          id="role-filter"
          value={filteredRole}
          onChange={(e) => setFilteredRole(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Admin">Admin</option>
          <option value="User">User</option>
        </select>
      </div>

      <div className="users-grid">
        {filteredUsers.length === 0 ? (
          <div>No users available.</div>
        ) : (
          filteredUsers.map((user) => (
            <div className="user-card" key={user.id}>
              <div className="user-info">
                <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Current Role:</strong> {user.role}</p>

                {/* Show the 'New Role' select only if the user is not an admin */}
                {user.role !== 'admin' && (
                  <p><strong>New Role:</strong>
                    <select
                      value={user.newRole || ""}
                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    >
                      <option value="">Role</option>
                      <option value="Admin">Admin</option>
                      <option value="User">User</option>
                    </select>
                  </p>
                )}

                <button
                  className="delete-button"
                  onClick={() => handleDeleteUser(user.id)} // Trigger delete
                >
                  Delete User
                </button>

                {/* Show the Submit button only if changes were made for this specific user */}
                {user.isChanged && (
                  <button className="submit-button" onClick={() => handleSubmit(user.id)}>
                    Submit Changes
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
