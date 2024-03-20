import React, { useState } from "react";
import logo from "../../assets/Ellipse 2.png";
import imageOne from "../../assets/3e0439ce0738fddc78a9e313ffd44978.jpg";
import imageTwo from "../../assets/366d457355f93c8bc9c30fa76f65e1d1.jpg";
import "./Welcome.scss";
import { Link } from "react-router-dom";
import { useCreateTimeMutation } from "../../Features/employeeApi";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const [createTime] = useCreateTimeMutation();
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    EmployeeID: localStorage.getItem("EmployeeID") || "",
    ClockInTime: "",
    ClockOutTime: "17:00",
  });

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddTime = async () => {
    try {
      const response = await createTime(formData);
      console.log("Add time response:", response);
      const { ClockInTime, ClockOutTime } = formData;
      localStorage.setItem("clockInTime", ClockInTime);
      localStorage.setItem("clockOutTime", ClockOutTime);
      handleCloseModal();
      navigate("/profile");
    } catch (error) {
      console.error("Failed to add time:", error);
    }
  };

  return (
    <div className="welcome-container">
      <div className="left-welcome">
        <img src={logo} alt="" />
        <h1>Welcome to project x</h1>
        <p>
          where innovation meets excellence! As a trailblazing company committed
          to pushing the boundaries of what's possible, we invite you to embark
          on a journey of unparalleled growth and success with us. At Project X,
          we foster a dynamic and collaborative environment where your skills
          and aspirations converge to create groundbreaking solutions.
        </p>
        <div className="goals">
          <div className="one">
            <button>1</button>
            <p>Here you will be able to track your work </p>
          </div>
          <div className="one">
            <button>2</button>
            <p>
              Make sure to clock in when you report to work and clock out when
              you leave
            </p>
          </div>
          <div className="one">
            <button>3</button>
            <p>All the best.</p>
          </div>
        </div>

        <button onClick={handleOpenModal}>Check In</button>
      </div>
      <div className="right-welcome">
        <img src={imageOne} alt="" />
        <img src={imageTwo} alt="" />
        <img src={imageOne} alt="" />
      </div>

      {openModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <h2>Sign In</h2>

            <form>
              <div className="labels">
                <label>
                  ClockInTime:
                  <input
                    type="text"
                    name="ClockInTime"
                    value={formData.ClockInTime}
                    onChange={handleInputChange}
                  />
                </label>

                <label>
                  ClockOutTime:
                  <input
                    type="text"
                    name="ClockOutTime"
                    value={formData.ClockOutTime}
                    onChange={handleInputChange}
                    disabled
                  />
                </label>

                <button type="button" onClick={handleAddTime}>
                  Check In
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Welcome;
