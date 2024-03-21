import React, { useState, useEffect } from "react";
import userImage from "../assets/Ellipse 14.png";
import ReactApexChart from "react-apexcharts";
import "./UserProfile.scss";
import bulb from "../assets/bulb-lighting-svgrepo-com.png";
import {
  useGetAllEmployeesQuery,
  useUploadMutation,
  useUpdateEmployeeMutation,
} from "../Features/employeeApi";
import useLocalStorage from "../hooks/useLocalStorage";
import { useForm } from "react-hook-form";
import { ErrorToast, SuccessToast, LoadingToast } from "../Toaster";
import uploadIcon from "../../src/assets/CLOCK.png";

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
  const [updateUser] = useUpdateEmployeeMutation();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      username: userDetails?.username || "",
      email: userDetails?.email || "",
    },
  });
  const validateImage = (file) => {
    if (file) {
      const validTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (validTypes.indexOf(file.type) === -1) {
        setFile(null);
        ErrorToast("File format is incorrect use .jpeg, .pnp or .jpg");
      } else if (file.size > 1024 * 1024 * 5) {
        setFile(null);
        ErrorToast("File size is too large");
      } else {
        return true;
      }
    }
  };
  useEffect(() => {
    validateImage(file);
  }, [file]);

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", file);

    return await upload(formData).unwrap();
  };

  const onSubmitProfile = async (data) => {
    LoadingToast(true);
    const { imageUrl } = await uploadImage();

    if (imageUrl) {
      data.img_url = imageUrl;
      data.id = userDetails.id;
      const res = await updateUser(data).unwrap();
      if (res.message) {
        updateUserDetails(data);
        LoadingToast(false);
        SuccessToast(res.message);
      }
    } else {
      LoadingToast(false);
      ErrorToast("Image upload failed");
    }
    LoadingToast(false);
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
    if (employeesData) {
      const employee = employeesData.find(
        (emp) => emp.EmployeeID === employeeId
      );
      setEmployee(employee || {});
    }
  }, [employeesData, employeeId]);

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
        <div className="view-profile-container">
          <h2>Profile</h2>
          <div className="profile">
            {userDetails && userDetails.img_url ? (
              <img src={userDetails.img_url} alt="profile" />
            ) : (
              <img src="https://via.placeholder.com/150" alt="profile" />
            )}
            <p className="username">
              Username : <span>{userDetails?.username || ""}</span>
            </p>
            <p className="email">
              Email: <span>{userDetails?.email || ""}</span>
            </p>
          </div>
        </div>
      ) : (
        <div className="left-container">
          <div className="left-prof-cont">
            <h1>Employee Dashboard</h1>

            <div className="left-profile">
              <div className="user-details-cont">
                <div className="user-image">
                  <img src={userImage} alt="" />
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

          <div className="updater">
            <div className="profile">
              <h2>Update Profile</h2>
              <div className="profilePic">
                {file ? (
                  <img src={URL.createObjectURL(file)} alt="profile" />
                ) : (
                  <img
                    src={
                      userDetails?.img_url || "https://via.placeholder.com/150"
                    }
                    alt="profile"
                  />
                )}
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
                  <label htmlFor="username">Username:</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    {...register("username")}
                  />
                  <label htmlFor="email">Email: </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    {...register("email")}
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
