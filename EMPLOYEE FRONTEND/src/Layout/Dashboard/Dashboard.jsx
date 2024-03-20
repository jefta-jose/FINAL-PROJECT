import React from "react";
import Navbar from "../../Componenets/Navbar";
import SideBar from "../../Componenets/SideBar";
import "./Dashboard.scss";
import { Routes, Route } from "react-router-dom";
import UserProfile from "../../pages/UserProfile";
import Work from "../../pages/Work";
import Emails from "../../pages/Emails";

const Dashboard = () => {

  return (
    <div className="dashboard">
      <div className="Side-bar">
        <SideBar />
      </div>
      <div className="main-content">
        <Navbar />
        <div className="dashboard-container">
          <Routes>
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/work" element={<Work />} />
            <Route path="/mails" element={<Emails />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
