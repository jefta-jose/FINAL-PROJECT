import React from "react";
import "./LayoutNav.scss";
import { useNavigate, useLocation } from "react-router-dom";

const LayoutNav = () => {
  const navigate = useNavigate();
  const {pathname} = useLocation();

  const navigateToAttendance = () => {
    navigate("/attendace");
  };

  const navigateToPayroll = () => {
    navigate("/Payroll");
  };

  const navigateToPayments = () => {
    navigate("/payments");
  };

  return (
    <div className="layout-nav">
      <div className="nav-links">
        <button
          className={pathname === "/attendace" ? "active" : ""}
          onClick={navigateToAttendance}
        >
          Attendance
        </button>
        <button
          className={pathname === "/Payroll" ? "active" : ""}
          onClick={navigateToPayroll}
        >
          Payroll
        </button>
        <button
          className={pathname === "/payments" ? "active" : ""}
          onClick={navigateToPayments}
        >
          Payments
        </button>
      </div>
    </div>
  );
};

export default LayoutNav;
