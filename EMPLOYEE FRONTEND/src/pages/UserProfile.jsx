import React, { useState, useEffect } from "react";
import userImage from "../assets/Ellipse 14.png";
import ReactApexChart from "react-apexcharts";
import "./UserProfile.scss";
import bulb from "../assets/bulb-lighting-svgrepo-com.png";
import {
  useGetAllEmployeesQuery,
  useUploadMutation,
} from "../Features/employeeApi";
import useLocalStorage from "../hooks/useLocalStorage";
import { useForm } from "react-hook-form";
import { ErrorToast, SuccessToast, LoadingToast } from "../Toaster";
import uploadIcon from "../../src/assets/upload-svgrepo-com.png";
import { useGetImageQuery } from "../Features/employeeApi";

const UserProfile = () => {
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


  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    // Retrieve filename from local storage
    const filename = localStorage.getItem('filename');

    const fetchImage = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/get-picture/${filename}`);
        if (!response.ok) {
          throw new Error('Failed to fetch image');
        }
        const blob = await response.blob();
        setImageData(URL.createObjectURL(blob));
      } catch (error) {
        console.error('Error fetching image:', error);
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
