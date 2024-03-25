import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import "./UserProfile.scss";
import {
  useGetAllEmployeesQuery,
  useUploadMutation,
} from "../Features/employeeApi";
import useLocalStorage from "../hooks/useLocalStorage";
import { useForm } from "react-hook-form";
import { ErrorToast, SuccessToast, LoadingToast } from "../Toaster";
import uploadIcon from "../../src/assets/upload-svgrepo-com.png";
import { useGetTimeByIdQuery } from "../Features/employeeApi";
import { useGetHoursByIdQuery } from "../Features/employeeApi";
import { useGetEmailByIdQuery } from "../Features/employeeApi";
import box from "../assets/email-svgrepo-com.png";
import emailImage from "../assets/d5b5705b3e76653200c33cdda531017d.jpg";

const UserProfile = () => {
  const EmpeID = localStorage.getItem("EmployeeID");
  const { data: emaildata } = useGetEmailByIdQuery(EmpeID);
  useEffect(() => {
    // Refetch the data when the employeeID changes
  }, [EmpeID]);

  const [selectedEmail, setSelectedEmail] = useState(null);

  const handleEmailClick = (email) => {
    setSelectedEmail(email);
  };

  const handleGoBack = () => {
    setSelectedEmail(null);
  };

  const [progressPercentage] = useState(80);
  const [progressPercentage1] = useState(120);
  const [employee, setEmployee] = useState({}); // Declare employee state and its setter
  const { data: employeesData } = useGetAllEmployeesQuery();
  const employeeId = localStorage.getItem("EmployeeID");
  const [userDetails, updateUserDetails] = useLocalStorage("user", null);
  const [switchTab, setSwitchTab] = useState(false);
  const [file, setFile] = useState(null);
  const [upload] = useUploadMutation();
  const [updateUser] = useUploadMutation();

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

  const EMPID = localStorage.getItem("EmployeeID"); // Retrieve employee ID from local storage

  const { data: hoursForSpecificDayById } = useGetHoursByIdQuery(EMPID); // Pass the employee ID to the query hook

  useEffect(() => {
    if (hoursForSpecificDayById) {
      const categories = Object.keys(hoursForSpecificDayById.totalHours);
      const data = categories.map(
        (day) => hoursForSpecificDayById.totalHours[day]
      );

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
  }, [hoursForSpecificDayById]);

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const EmpID = localStorage.getItem("EmployeeID");
  const { data: timedata, refetch } = useGetTimeByIdQuery(EmpID);
  useEffect(() => {
    // Refetch the data when the employeeID changes
    refetch();
  }, [EmpID, refetch]);

  const formatTime = (timeString) => {
    const time = new Date(timeString);
    return time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    // Retrieve filename from local storage
    const filename = localStorage.getItem("filename");

    const fetchImage = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/get-picture/${filename}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch image");
        }
        const blob = await response.blob();
        setImageData(URL.createObjectURL(blob));
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    // Fetch image when component mounts
    if (filename) {
      fetchImage();
    }
  }, []);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      username: userDetails?.username || "",
      email: userDetails?.email || "",
    },
  });
  const validateImage = (file) => {
    if (file) {
      console.log("File name:", file.name); // Log the file name here
      localStorage.setItem("filename", file.name);
      const validTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (validTypes.indexOf(file.type) === -1) {
        setFile(null);
        ErrorToast("File format is incorrect. Please use .jpeg, .png, or .jpg");
      } else if (file.size > 1024 * 1024 * 5) {
        setFile(null);
        ErrorToast("File size is too large (maximum 5 MB)");
      } else {
        return true;
      }
    }
  };

  useEffect(() => {
    validateImage(file);
  }, [file]);

  const uploadImage = async (employeeId) => {
    console.log("Uploading image with employee ID:", employeeId);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("EmployeeID", employeeId); // Append the employee ID to the form data
    console.log("Form data:", formData);

    const response = await upload(formData).unwrap();
    console.log("Response from upload mutation:", response);
    return response;
  };

  const onSubmitProfile = async (data) => {
    LoadingToast(true);
    const { imageUrl } = await uploadImage(employeeId);

    console.log("Image URL:", imageUrl); // Log the image URL here

    if (imageUrl) {
      // Save the image URL to local storage
      localStorage.setItem("ProfileImageUrl", imageUrl);
      data.imageUrl = imageUrl;
      const employeeId = localStorage.getItem("EmployeeID");
      if (employeeId) {
        data.id = employeeId;
        const res = await updateUser(data).unwrap();
        if (res.message) {
          updateUserDetails(data);
          LoadingToast(false);
          SuccessToast(res.message);
        }
      } else {
        LoadingToast(false);
        ErrorToast("Employee ID not found in localStorage");
      }
    } else {
      LoadingToast(false);
      ErrorToast("Image upload failed");
    }
  };

  const onSubmitAuth = async (e) => {
    e.preventDefault();
    const password = e.target.password.value;
    const confirmpassword = e.target.confirmpassword.value;
    if (password !== confirmpassword) {
      ErrorToast("Passwords do not match");
      return;
    }
    const data = {
      password,
      id: userDetails?.id || "",
      username: userDetails?.username || "",
      email: userDetails?.email || "",
    };
    const res = await updateUser(data).unwrap();
    if (res.message) {
      SuccessToast(res.message);
    }
  };

  useEffect(() => {
    const employeeId = localStorage.getItem("EmployeeID");
    console.log("Employee ID from localStorage:", employeeId); // Log the employeeId
    if (employeesData && employeeId) {
      const employee = employeesData.find(
        (emp) => emp.EmployeeID === employeeId
      );
      setEmployee(employee || {});
    }
  }, [employeesData]);

  const statusText = employeeId ? "Status: Working" : "Status: Not Working";

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString([], {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="profile-container">
      <button
        className={
          switchTab === false ? "visit-profileBtn" : "update-profileBtn"
        }
        onClick={() => setSwitchTab(!switchTab)}
      >
        {switchTab === true ? "Visit Profile" : "Update Profile"}
      </button>
      {switchTab === false ? (
        <div className="left-container">
          <div className="left-prof-cont">
            <h1>Employee Dashboard</h1>
            <div className="left-profile">
              <div className="user-details-cont">
                <div>
                  {imageData && (
                    <img src={imageData} alt="Employee Image" /> // Render the image if image data is available
                  )}
                </div>
                <div className="user-identity">
                  <p>
                    Name: {employee?.FirstName || ""} {employee?.LastName || ""}
                  </p>
                  <p>ID: {employee?.EmployeeID || ""}</p>
                  <p>Role: {employee?.Role || ""}</p>
                  <p>Email: {employee?.Email || ""}</p>
                  <button>{statusText}</button>
                </div>
              </div>

              <div className="attendance-table">
                <table>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Clock In Time</th>
                      <th>Clock Out Time</th>
                      <th>Hours Worked</th>
                      <th>Overtime</th>
                    </tr>
                  </thead>
                  <tbody>
                    {timedata &&
                      timedata.map((employee) => (
                        <tr key={employee.RecordID}>
                          <td className="date">{formatDate(employee.Date)}</td>
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
              <h2>YOUR WEEKLY STATISTICS</h2>

              <div className="graph-view">
                <ReactApexChart
                  options={barChartData.options}
                  series={barChartData.series}
                  type="bar"
                  height={350}
                />
              </div>
            </div>
            <div className="upcoming-schedules">
              <h3 className="schedules-title">Upcoming Tasks</h3>
              <div className="task-container">
                <div className="inbox-display">
                  <div className="msg-one">
                    {selectedEmail ? (
                      <div className="selected-email">
                        <div className="email-details">
                          <button
                            onClick={handleGoBack}
                            className="go-back-btn"
                          >
                            Go Back
                          </button>
                          <h3 className="email-subject">
                            {selectedEmail.EmailSubject}
                          </h3>
                          <span className="email-body">
                            {selectedEmail.Emailbody}
                          </span>
                          <p className="email-date">
                            {formatDate(selectedEmail.Date)}
                          </p>
                          <button className="reply-btn">Reply</button>
                          <button className="forward-btn">Forward</button>
                        </div>
                        <div className="email-image-container">
                          <img
                            src={emailImage}
                            alt=""
                            className="email-image"
                          />
                        </div>
                      </div>
                    ) : (
                      <ul
                        className="inbox-list"
                        style={{ height: "5rem", overflowY: "auto" }}
                      >
                        {emaildata &&
                          emaildata.map((email) => (
                            <li
                              className="email-item"
                              key={email.RecordID}
                              onClick={() => handleEmailClick(email)}
                            >
                              <img src={box} alt="" className="email-icon" />
                              <p className="email-content">
                                {email.EmailContent}
                              </p>
                              <span className="email-date">
                                {formatDate(email.Date)}
                              </span>
                            </li>
                          ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="view-profile-container">
          <div className="updater">
            <div className="profile">
              <h2 className="head">Update Profile</h2>
              <div className="profilePic">
                <label htmlFor="fileInput">
                  <img className="upload-Icon" src={uploadIcon} alt="Upload" />
                  <input
                    type="file"
                    id="fileInput"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </label>
              </div>
              <div className="profile">
                <form onSubmit={handleSubmit(onSubmitProfile)}>
                  <label htmlFor="Address">Address:</label>
                  <input
                    type="text"
                    id="Address"
                    name="Address"
                    {...register("Address")}
                  />
                  <label htmlFor="ContactInfo">ContactInfo: </label>
                  <input
                    type="text"
                    id="ContactInfo"
                    name="ContactInfo"
                    {...register("ContactInfo")}
                  />
                  <input type="submit" value="Update Profile" />
                </form>
              </div>
            </div>
            <div className="auth">
              <h2>Update Auth</h2>
              <form onSubmit={onSubmitAuth}>
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter new Password"
                />
                <label htmlFor="confirmpassword">Confirm Password:</label>
                <input
                  type="password"
                  id="confirmpassword"
                  name="confirmpassword"
                  placeholder="Confirm Password"
                />
                <input type="submit" value="Update Password" />
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
