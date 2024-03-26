import React from "react";
import loginImage from "../../assets/c11223798ad4596b8d0826e22a09dee6.jpg";
import { useUserLoginValidator } from "./userValidator";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import {
  useLoginMutation,
  useGetAllEmployeesQuery,
} from "../../Features/Employee";
import { ErrorToast, SuccessToast, ToasterContainer } from "../../Toaster";

const Login = () => {
  const { register, handleSubmit, errors } = useUserLoginValidator();
  const [loginUser] = useLoginMutation();
  const {
    data: allEmployeesData,
    isLoading,
    isError,
  } = useGetAllEmployeesQuery();
  const navigate = useNavigate(); 

  const onSubmit = async (formData) => {
    try {
      if (isLoading || isError) {
        console.error("Error fetching employee data");
        return;
      }
  
      const user = allEmployeesData.find(
        (employee) => employee.Email === formData.Email
      );
  
      if (user && user.Role === "ADMIN") {
        const response = await loginUser(formData);
  
        // Check if token is received in the response
        if (response.data && response.data.token) {
          const token = response.data.token;
  
          // Store the token in local storage
          localStorage.setItem("token", token);
  
          console.log("Admin logged in successfully:", response.data);
          SuccessToast("Admin logged in successfully");
          navigate("/dashboard");
        } else {
          console.log("No token received in the response");
          ErrorToast("Login failed. Please try again.");
        }
      } else {
        console.log("Access denied. Only admins can log in.");
        ErrorToast("Access denied. Only admins can log in.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      ToasterContainer.hide();
    }
  };

  return (
    <div className="login-container">
      <ToasterContainer />
      <div className="dimm">
        <div className="left-login-container">
          <h1>Project X</h1>
          <h2>Welcome Back,</h2>
          <h3>Enter your ADMIN Details to access your account</h3>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="Email">Email</label>
              <input
                type="text"
                placeholder="Email..."
                {...register("Email")}
              />
              <p>{errors.Email?.message}</p>
              <label htmlFor="Password">Password</label>
              <input
                type="password"
                placeholder="Password..."
                {...register("Password")}
              />

              <p>{errors.Password?.message}</p>
              <div className="rmber-frgt">
                <div className="remember">
                  <input type="checkbox" id="remember" name="remember" />
                  <label htmlFor="remember">Remember me</label>
                </div>
                <button type="button" id="forgot-password">
                  Forgot Password ?
                </button>
              </div>
              <div className="btn">
                <button type="submit" id="login-as-admin">
                  Login as admin
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="right-login-container">
          <h1>
            Take a tour of our work management platform to see how you can do
            more of your best work.
          </h1>
          <p>The easiest way to manage your tasks</p>
          <div className="login-image">
            <img src={loginImage} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
