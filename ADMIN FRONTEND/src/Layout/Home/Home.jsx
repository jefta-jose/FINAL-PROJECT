import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar";
import ReactApexChart from "react-apexcharts";
import user from "../../assets/Ellipse 7.png";
import "./Home.scss";
import { useGetNumberOfEmployeesQuery } from "../../Features/Employee";
import {
  useGetBestEmployeeQuery,
  useGetHoursWorkedQuery,
  useGetHoursForSpecificDayQuery,
} from "../../Features/Time";

const Home = () => {

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

  const [barChartData, setBarChartData] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [],
      },
    },
    series: [
      {
        name: "Hours Worked",
        data: [],
      },
    ],
  });

  const { data: hoursForSpecificDay } = useGetHoursForSpecificDayQuery();

  useEffect(() => {
    if (hoursForSpecificDay) {
      const categories = Object.keys(hoursForSpecificDay.totalHours);
      const data = categories.map((day) => hoursForSpecificDay.totalHours[day]);
      
      setBarChartData({
        ...barChartData,
        options: {
          ...barChartData.options,
          xaxis: {
            categories: categories,
          },
        },
        series: [
          {
            name: "Hours Worked",
            data: data,
          },
        ],
      });
    }
  }, [hoursForSpecificDay]);

  const { data: employees } = useGetNumberOfEmployeesQuery();
  console.log("employees", employees);
  const { data: bestEmployee } = useGetBestEmployeeQuery();
  const { data: hours } = useGetHoursWorkedQuery();

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

            <div className="time">
              <h3>Hours Worked</h3>
              <p>{hours}</p>
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
            <h3 className="section-title">Best Employee</h3>
            {bestEmployee &&
              bestEmployee.map((employee) => (
                <div className="employee-details" key={employee.id}>
                  <p className="name">
                    {employee.FirstName} {employee.LastName}
                  </p>
                  <p className="email">{employee.Email}</p>
                  <p> Hours Worked {employee.HoursWorked}</p>
                </div>
              ))}
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
