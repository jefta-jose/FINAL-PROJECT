import React, { useEffect } from "react";
import LayoutNav from "../../Components/LayoutNav";
import Navbar from "../../Components/Navbar";
import "./Attendance.scss";
import { useGetTimeQuery } from "../../Features/Time";

const Attendance = () => {
  const employeeID = "";

  const { data: employeesData, error, isLoading, refetch } = useGetTimeQuery(employeeID);

  useEffect(() => {
    // Refetch the data when the employeeID changes
    refetch();
  }, [employeeID, refetch]);

  // Function to format time to HH:MM format
  const formatTime = (timeString) => {
    const time = new Date(timeString);
    return time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Handle loading state
  if (isLoading) return <div>Loading...</div>;

  // Handle error state
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="attendance-container">
      <Navbar />
      <div className="dash-nav">
        <LayoutNav />
      </div>
      <div className="attendance-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>ID</th>
              <th>Clock In Time</th>
              <th>Clock Out Time</th>
              <th>Hours Worked</th>
              <th>Overtime</th>
            </tr>
          </thead>
          <tbody>
            {employeesData.map((employee) => (
              <tr key={employee.RecordID}>
                <td>
                  {employee.FirstName} {employee.LastName}
                </td>
                <td>
                  {" "}
                  <span className="employee-id">{employee.EmployeeID}</span>
                </td>
                <td>{formatTime(employee.ClockInTime)}</td>
                <td>{formatTime(employee.ClockOutTime)}</td>
                <td>{employee.HoursWorked} hours</td>
                <td>{employee.Overtime} hours</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;
