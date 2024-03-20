import React from "react";
import SideNav from "../../Components/SideNav";
import "./Dashboard.scss";
import Home from "../Home/Home";
import { Routes, Route } from "react-router-dom";
import Attendance from "../Attendance/Attendance";
import Payroll from "../Attendance/Payroll";
import Payments from "../Attendance/Payments";
import Mails from "../Mails/Mails";
import Management from "../Management/Management";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="sidenav">
        <SideNav />
      </div>
      <div className="routes-container">
        <Routes>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/attendace" element={<Attendance />} />
          <Route path="/Payroll" element={<Payroll />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/mails" element={<Mails />} />
          <Route path="/management" element={<Management />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
