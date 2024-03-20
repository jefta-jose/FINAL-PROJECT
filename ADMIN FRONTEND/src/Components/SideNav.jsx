import React from "react";
import logo from "../assets/logo-xing-svgrepo-com.svg";
import home from "../assets/Rectangle 150.png";
import Attendance from "../assets/attendance-svgrepo-com.png";
import mails from "../assets/Rectangle 151.png";
import management from "../assets/management-group-svgrepo-com.png";
import settings from "../assets/Ellipse 21.png";
import "./SideNav.scss";
import { useNavigate } from "react-router-dom";
import bulb from "../assets/bulb-lighting-svgrepo-com.png";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const SideNav = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  const navigateToHome = () => {
    navigate("/dashboard");
  };

  const navigateToAttendance = () => {
    navigate("/attendace");
  };

  const navigateToEmails = () => {
    navigate("/mails");
  };

  const navigateToManagement = () => {
    navigate("/management");
  };

  const handleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`side-nav ${darkMode ? "dark-mode" : ""}`}>
      <div className="left-side-nav">
        <div className="side-nav-cont">
          <div className="logo">
            <img src={logo} alt="" />
            <h2>Project x</h2>
          </div>
          <div className="menu-items">
            <div className="menu-images">
              <div className="home-one">
                <img src={home} alt="" onClick={navigateToHome} />
                <p onClick={navigateToHome}>Home</p>
              </div>

              <div className="home">
                <img src={Attendance} alt="" onClick={navigateToAttendance} />
                <p onClick={navigateToAttendance}>Attendance</p>
              </div>

              <div className="home">
                <img src={mails} alt="" onClick={navigateToEmails} />
                <p onClick={navigateToEmails}>Mails</p>
              </div>

              <div className="home">
                <img src={management} alt="" onClick={navigateToManagement} />
                <p onClick={navigateToManagement}>Manage</p>
              </div>

              <div className="home">
                <img src={bulb} alt="" onClick={handleDarkMode} />
                <p onClick={handleDarkMode} >Dark Mode</p>
              </div>
            </div>
          </div>

          <div className="settings-container">
            <img src={settings} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNav;


