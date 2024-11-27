import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // Import Framer Motion
import '../styles/SuccessMessage.css';

const SuccessMessage = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); // Close the message after 3 seconds
    }, 3000);

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, [onClose]);

  return (
    <motion.div
      className="success-message"
      initial={{ opacity: 0, y: -50 }}  // Start from above
      animate={{ opacity: 1, y: 0 }}    // Slide to the original position
      exit={{ opacity: 0, y: 50 }}      // Fade out and move down
      transition={{ duration: 0.5 }}    // Duration of the animation
    >
      <p>{message}</p>
    </motion.div>
  );
};

export default SuccessMessage;
