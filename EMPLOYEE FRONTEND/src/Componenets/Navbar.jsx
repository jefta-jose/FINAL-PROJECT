import React from "react";
import "./Navbar.scss";
import bulb from "../assets/bulb-lighting-svgrepo-com.png";
import mail from "../assets/Rectangle 151.png";
import user from "../assets/Ellipse 7.png";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {

  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    // Retrieve filename from local storage
    const filename = localStorage.getItem('filename');

    const fetchImage = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/get-picture/${filename}`);
        if (!response.ok) {
          throw new Error('Failed to fetch image');
        }
        const blob = await response.blob();
        setImageData(URL.createObjectURL(blob));
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    // Fetch image when component mounts
    if (filename) {
      fetchImage();
    }
  }, []);

  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const navigateToProfile = () => {
    navigate("/profile");
  };

  const navigateToWork = () => {
    navigate("/work");
  };

  const navigateToEmails = () => {
    navigate("/mails");
  };

  return (
    <div className={`navbar ${darkMode ? 'dark-mode' : ''}`}>
      <div className="top-nav">
        <button onClick={navigateToProfile}>Dashboard</button>
        <button onClick={navigateToWork}>Work</button>
        <button onClick={navigateToEmails}>Emails</button>
      </div>

      <div className="bulb">
        <img src={bulb} alt="" onClick={toggleDarkMode} />
      </div>
      <div className="user">
        <img src={imageData} alt="" />
      </div>
    </div>
  );
};

export default Navbar;
