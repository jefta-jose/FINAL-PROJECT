import React, { useState } from "react";
import Navbar from "../../Components/Navbar";
import ReactApexChart from "react-apexcharts";
import user from "../../assets/Ellipse 7.png";
import "./Home.scss";
import { useGetNumberOfEmployeesQuery } from "../../Features/Employee";
import { useGetTimeQuery } from "../../Features/Time";

const Home = () => {
  const normalWorkingHours = 8; // Define the normal working hours

  const actualHours = [28, 13, 18, 9, 10]; // Replace this with your actual hours data

  const overtimeHours = actualHours.map((hours) =>
    Math.max(hours - normalWorkingHours, 0)
  );

  const barChartData = {
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      },
    },
    series: [
      {
        name: "Overtime (hours)",
        data: overtimeHours,
      },
    ],
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

  const { data: employees } = useGetNumberOfEmployeesQuery();
  console.log("employees", employees);

  return (
    <div className="home-container">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="home-display">
        <div className="left-home-display">
          <div className="status-view">
            <div className="employees">
              <h3>Number Of Employees:</h3>
              <p>{employees}</p>
            </div>
          </div>

          <div className="graph-view">
            <ReactApexChart
              options={barChartData.options}
              series={barChartData.series}
              type="bar"
              height={350}
            />
          </div>
        </div>
        <div className="right-home-display">
          <div className="top-performer">
            <h2>Top Performer</h2>
            <div className="image">
              <img src={user} alt="" />
              <p>sk@gmail.com</p>
            </div>
          </div>
          <div className="new-employees">
            <h2>New Employees</h2>
            <div className="numbers">
              <p>50</p>
              <p className="green">+4.5%</p>
            </div>
          </div>

          <div className="activities">
            <h2>Activities</h2>
            <div className="chart">
              <ReactApexChart
                type="pie"
                options={pieChartData.options}
                series={pieChartData.series}
                width="380"
              />
            </div>
            <div className="activity-text">
              <button className="completed">Completed</button>
              <button className="in-progress">In Progress</button>
              <button className="overdue">Overdue</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
