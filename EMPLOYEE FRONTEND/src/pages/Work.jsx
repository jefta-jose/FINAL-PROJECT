import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import "./Work.scss";
import {
  useGetTimeByIdQuery,
  useUpdateTimeMutation,
} from "../Features/employeeApi";
import { ErrorToast, SuccessToast, ToasterContainer } from "../Toaster";

const Work = () => {
  const [employee, setEmployee] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clockOutTime, setClockOutTime] = useState("");
  const employeeID = localStorage.getItem("EmployeeID") || "";
  const { data: timeData } = useGetTimeByIdQuery(employeeID);
  const [updateTime] = useUpdateTimeMutation();

  useEffect(() => {
    if (timeData && timeData.length > 0) {
      const employeeData = timeData[0];
      setEmployee(employeeData);
      setClockOutTime(employeeData.ClockOutTime);
    }
  }, [timeData]);

  const handleUpdateClockOut = async (newClockOutTime) => {
    try {
      if (!employee.RecordID) {
        // If RecordID is not available, show error toast
        ErrorToast("RecordID not found. Please try again.");
        return;
      }

      // Convert newClockOutTime to the required format (HH:mm)
      const formattedClockOutTime = newClockOutTime.substring(11, 16); // Assuming newClockOutTime is in ISO string format

      // Get ClockInTime from employee state
      const formattedClockInTime = employee.ClockInTime.substring(11, 16); // Assuming ClockInTime is in ISO string format

      const response = await updateTime({
        EmployeeID: employee.EmployeeID, // Use RecordID from employee state
        ClockInTime: formattedClockInTime, // Use the ClockInTime from employee state
        ClockOutTime: formattedClockOutTime,
      });

      console.log("Update time response:", response);

      // Update only ClockOutTime in the employee state
      setEmployee((prevEmployee) => ({
        ...prevEmployee,
        ClockOutTime: newClockOutTime,
      }));
      SuccessToast("Thank You For Services See You Tomorrow!");

      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to update time:", error);
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const formatTime = (timeString) => {
    if (!timeString) return ""; // Handle the case when timeString is empty or null

    const time = new Date(timeString);
    const hours = time.getHours().toString().padStart(2, "0"); // Get hours and pad with leading zero if necessary
    const minutes = time.getMinutes().toString().padStart(2, "0"); // Get minutes and pad with leading zero if necessary
    return `${hours}:${minutes}`;
  };

  const handleClockIn = () => {
    if (employee.ClockInTime) {
      // Employee has already clocked in today, show error toast
      ErrorToast("You have already clocked in today.");
    } else {
      // Perform clock in operation
      // Your clock in logic here
    }
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
    <div className="Work-Container">
      <ToasterContainer />
      <div className="clock-holder">
        <p>
          Name: {employee.FirstName} {employee.LastName}
        </p>
        <p>ID: {employee.EmployeeID}</p>
        <button onClick={handleClockIn}>Clock In</button>
        <div className="tasks">
          <div className="header">
            <h3>Today's Tasks</h3>
            <p className="date">3/5/2024</p>
          </div>
          <div className="task-one">
            <button>.</button>
            <h4>Task 1</h4>
            <p>08:30 AM</p>
          </div>
          <div className="task-one">
            <button>.</button>
            <h4>Task 2</h4>
            <p>09:30 AM</p>
          </div>
        </div>
        <button>Report An Issue</button>
        <button onClick={toggleModal}>Clock Out</button>
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={toggleModal}>
                &times;
              </span>
              <h2>Update Clock Out Time</h2>
              <label>
                Clock Out Time:
                <input
                  type="text"
                  value={clockOutTime}
                  onChange={(e) => setClockOutTime(e.target.value)}
                />
              </label>
              <button onClick={() => handleUpdateClockOut(clockOutTime)}>
                Update
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="display-work-done">
        <h1>Overtime</h1>
        <p>Today</p>
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
  );
};

export default Work;
