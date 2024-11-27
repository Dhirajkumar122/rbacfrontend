import React from 'react';
import { motion } from 'framer-motion';
import '../styles/Home.css';  // Make sure to import your styles

function Home() {
  return (
    <motion.div
      className="Home"
      initial={{ opacity: 0, scale: 1.2 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 1.5,
        delay: 0.2,
        ease: 'easeInOut',
      }}
      style={{ perspective: '1000px' }} // Adds a 3D perspective to the whole page
    >
      <motion.h1
        initial={{ opacity: 0, y: -100, rotateX: 90 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="title"
        style={{
          transformStyle: 'preserve-3d',
          textShadow: '2px 2px 10px rgba(0,0,0,0.5)', // Adding shadow for a more 3D effect
        }}
      >
        Setting Up Your RBAC Project 🚀
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, x: -200, rotateY: -90 }}
        animate={{ opacity: 1, x: 0, rotateY: 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="intro-text"
        style={{ fontSize: '1.2rem', textShadow: '2px 2px 10px rgba(0,0,0,0.2)' }}
      >
        Follow the steps to set up both the Backend and Frontend for this Role-Based Authentication System (RBAC)! 💻
      </motion.p>

      <div className="card-container">
        {/* Backend Card */}
        <motion.div
          className="card"
          initial={{ opacity: 0, y: 100, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          <h2 className="card-title">Backend Setup 🖥️</h2>
          <p>
            1. Clone the repository: <code>git clone [repository-url]</code> 🚀
          </p>
          <p>
            2. Install dependencies: <code>npm install</code> 📦
          </p>
          <p>
            3. Set up your environment variables in <code>.env</code> 🔑
          </p>
          <p>
            4. Configure the database (MySQL/PostgreSQL) 🗄️
          </p>
          <p>
            5. Start the server: <code>npm start</code> ⚡
          </p>
        </motion.div>

        {/* Frontend Card */}
        <motion.div
          className="card"
          initial={{ opacity: 0, y: 100, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <h2 className="card-title">Frontend Setup 🌐</h2>
          <p>
            1. Clone the repository: <code>git clone [repository-url]</code> 🚀
          </p>
          <p>
            2. Install dependencies: <code>npm install</code> 📦
          </p>
          <p>
            3. Configure Axios for backend API requests 🌍
          </p>
          <p>
            4. Set up React Router for routing 🚦
          </p>
          <p>
            5. Start the React app: <code>npm start</code> ⚡
          </p>
        </motion.div>
      </div>

      {/* Additional Information */}
      <motion.div
        className="content-box"
        initial={{ opacity: 0, y: 100, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        style={{
          boxShadow: '0px 10px 40px rgba(0, 0, 0, 0.1)', // Soft shadow for depth
          borderRadius: '10px', // Rounded corners for a softer look
        }}
      >
        <h2 className="content-header">Role-Based Access Control (RBAC) 🛡️</h2>
        <p className="content-text">
          Role-Based Access Control (RBAC) is a security model that regulates access to resources based on the roles of users within an organization. 🚀
        </p>
        <p className="content-text">
          This project implements RBAC to ensure that users can only access features and data that are relevant to their role. For example:
        </p>
        <ul className="content-list">
          <li>👨‍💻 **Admin**: Full access to manage users, settings, and all data.</li>
          <li>👥 **User**: Limited access to personal data and actions.</li>
        </ul>
        <p className="content-text">
          RBAC enhances security by restricting access based on roles, ensuring users only have access to what they need. 🔒
        </p>
      </motion.div>

      {/* Get Started Button */}
      <motion.button
        className="btn"
        whileHover={{
          scale: 1.1,
          backgroundColor: '#ff4081',
          boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.2)',
          transition: { duration: 0.3 },
        }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 300 }}
        style={{
          borderRadius: '50px', // Rounded button for a modern look
          padding: '12px 24px',
          fontWeight: 'bold',
        }}
      >
        Let's Get Started 🌟
      </motion.button>
    </motion.div>
  );
}

export default Home;
