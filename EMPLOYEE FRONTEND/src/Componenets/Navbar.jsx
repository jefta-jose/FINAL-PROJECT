import React from "react";
import "./Navbar.scss";
import bulb from "../assets/bulb-lighting-svgrepo-com.png";
import mail from "../assets/Rectangle 151.png";
import user from "../assets/Ellipse 7.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
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
        <img src={user} alt="" />
      </div>
    </div>
  );
};

export default Navbar;
