import React, { useState, useEffect } from "react";
import userImage from "../assets/Ellipse 14.png";
import ReactApexChart from "react-apexcharts";
import "./UserProfile.scss";
import bulb from "../assets/bulb-lighting-svgrepo-com.png";
import { useGetAllEmployeesQuery } from "../Features/employeeApi";

const UserProfile = () => {
  const [progressPercentage] = useState(80);
  const [progressPercentage1] = useState(120);
  const [employee, setEmployee] = useState({}); // Declare employee state and its setter
  const { data: employeesData,} = useGetAllEmployeesQuery();
  const employeeId = localStorage.getItem("EmployeeID");

  useEffect(() => {
    if (employeesData) {
      const employee = employeesData.find(emp => emp.EmployeeID === employeeId);
      setEmployee(employee || {});
    }
  }, [employeesData, employeeId]);

  const statusText = employeeId ? "Status: Working" : "Status: Not Working";

  const formatTime = (timeString) => {
    const time = new Date(timeString);
    return time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const pieChartData = {
    series: [300, 50, 100],
    options: {
      labels: ["Completed", "In Progress", "Not Started"],
      colors: ["#FF6384", "#36A2EB", "#FFCE56"],
      legend: {
        show: false,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };

  return (
    <div className="profile-container">
      <div className="left-container">
        <div className="left-prof-cont">
          <h1>Employee Dashboard</h1>

          <div className="left-profile">
            <div className="user-details-cont">
              <div className="user-image">
                <img src={userImage} alt="" />
              </div>
              <div className="user-identity">
                <p>Name: {employee.FirstName} {employee.LastName}</p>
                <p>ID: {employee.EmployeeID}</p>
                <p>Role: {employee.Role}</p>
                <p>Email: {employee.Email}</p>
                <button>{statusText}</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="right-profile">
        <button>27th - Jan - 2024</button>
        <h2>Work Productivity</h2>
        <p>Lets Check Your Progress</p>
        <div className="productivity-cont">
          <div className="yesterday">
            <p>Yesterday</p>
            <div className="percent">
              <progress value={progressPercentage} max="100"></progress>
              80%
            </div>
          </div>
          <div className="yesterday">
            <p>Today</p>
            <div className="percent">
              <progress value={progressPercentage1} max="100"></progress>
              120%
            </div>
          </div>
        </div>

        <div className="monthly-statistics">
          <h2>MONTHLY STATISTICS</h2>

          <div className="chart-content">
            <div className="tasks-hours-container">
              <div className="tasks-container">
                <p>TASKS</p>
                <progress value={progressPercentage} max="100"></progress>
              </div>

              <div className="hours-container">
                <p>HOURS</p>
                <progress value={progressPercentage1} max="100"></progress>
              </div>
            </div>

            <div className="chart">
              <ReactApexChart
                type="pie"
                options={pieChartData.options}
                series={pieChartData.series}
                width="380"
              />
            </div>
          </div>
        </div>

        <div className="upcoming-schedules">
          <h3>Upcoming Tasks</h3>
          <div className="task">
            <div className="day">
              <p>Monday</p>
            </div>
            <div className="task-title">
              <p>Design a new website</p>
            </div>
            <div className="time">
              <p>10:00am - 11:00am</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
