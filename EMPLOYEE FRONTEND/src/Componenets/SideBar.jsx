import React, { useState } from "react";
import logo from "../assets/logo-xing-svgrepo-com.svg";
import home from "../assets/Rectangle 150.png";
import clock from "../assets/clock-lines-svgrepo-com.png";
import mails from "../assets/Rectangle 151.png";
import settings from "../assets/Ellipse 21.png";
import "./SideBar.scss";
import { useNavigate } from "react-router-dom";
import bulb from "../assets/bulb-lighting-svgrepo-com.png";

const SideBar = () => {
  const [darkMode, setDarkMode] = useState(false); // State variable for dark mode
  const navigate = useNavigate();

  const navigateToProfile = () => {
    navigate("/profile");
  };

  const navigateToWork = () => {
    navigate("/work");
  };

  const navigateToEmails = () => {
    navigate("/mails");
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode); // Toggle dark mode state
    // You can add logic here to apply dark mode styles or update your application theme
  };

  return (
    <div className={`side-bar ${darkMode ? 'dark-mode' : ''}`}>
      <div className="logo">
        <img src={logo} alt="" />
        <p>Project X</p>
      </div>
      <div className="menu-items">
        <div className="menu-images">
          <div className="home">
            <img src={home} alt="" onClick={navigateToProfile} />
            <p>Home</p>
          </div>

          <div className="home">
            <img src={clock} alt="" onClick={navigateToWork} />
            <p>Work</p>
          </div>

          <div className="home">
            <img src={mails} alt="" onClick={navigateToEmails} />
            <p>Mails</p>
          </div>

          <div className="home" onClick={toggleDarkMode}>
            <img className="bulb" src={bulb} alt="" />
            <p>Dark Mode</p>
          </div>
        </div>
      </div>
      <div className="settings">
        <div className="sett-cont">
          <img src={settings} alt="" />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
