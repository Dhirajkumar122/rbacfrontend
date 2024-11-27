import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import '../styles/Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // For managing editable state
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('authToken');
       
        const response = await fetch('http://localhost:8080/api/user/data', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUser(data);
        setFirstName(data.firstName); // Initialize state with user data
        setLastName(data.lastName); // Initialize state with user data
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveChanges = async () => {
    try {
      // Get the token from localStorage
      const token = localStorage.getItem('authToken');

  
      // Ensure that the token exists before making the request
      if (!token) {
        throw new Error('Authorization token is missing');
      }
  
      // Send the updated profile data (firstName, lastName) to the backend
      const response = await fetch('http://localhost:8080/api/user/update', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,  // Include firstName
          lastName,   // Include lastName
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update user data');
      }
  
      // Update the user state after successful edit
      const updatedUser = await response.json();
      setUser(updatedUser.user);  // Assuming the backend returns the updated user object
      setIsEditing(false);  // Turn off editing mode
    } catch (error) {
      setError(error.message);
    }
  };
  
  const handleCancelChanges = () => {
    // Reset to the original user data if the user cancels the edit
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setIsEditing(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>No user data available</div>;
  }

  return (
    <div className="profile-container">
      <motion.h2
        className="profile-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Profile
      </motion.h2>

      <div className="profile-card">
        <motion.p
          className="profile-details"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          First Name: 
          {isEditing ? (
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="edit-input"
            />
          ) : (
            user.firstName
          )}
        </motion.p>

        <motion.p
          className="profile-details"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Last Name: 
          {isEditing ? (
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="edit-input"
            />
          ) : (
            user.lastName
          )}
        </motion.p>

        <motion.p
          className="profile-details"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Email: {user.email}
        </motion.p>

        <motion.p
          className="profile-details"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          Role: {user.role}
        </motion.p>

        {/* Show edit/save buttons only if not loading */}
        {!loading && (
          <div className="edit-buttons">
            {isEditing ? (
              <>
                <button onClick={handleSaveChanges}>Save Changes</button>
                <button onClick={handleCancelChanges}>Cancel</button>
              </>
            ) : (
              <button onClick={handleEditToggle}>Edit</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
