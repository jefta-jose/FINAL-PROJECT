import React, { useState } from "react";
import Navbar from "../../Components/Navbar";
import "./Management.scss";
import {
  useAddEmployeeMutation,
  useGetAllEmployeesQuery,
  useFireEmployeeMutation,
} from "../../Features/Employee";
import { useCreateScheduleMutation } from "../../Features/Schedule";
import { useCreateAdvanceRecordMutation } from "../../Features/Advance";
import mdImage from "../../assets/b65fec58ef0c63c5a97ea25c50765aa2.jpg";

const Management = () => {
  const { data: employees, error, isLoading } = useGetAllEmployeesQuery();
  const [addEmployeeMutation] = useAddEmployeeMutation();
  const [fireEmployeeMutation] = useFireEmployeeMutation();
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Address: "",
    BirthDate: "",
    ContactInfo: "",
    Gender: "",
    Position: "",
    PhotoURL: "",
    Email: "",
    Password: "",
    HourlyRate: "",
    GrossPay: "",
    NHIFDeduction: "",
    NSSFDeduction: "",
    HELBDeduction: "",
    Role: "Employee",
  });
  const handleOpenModal = () => {
    setOpenModal(true);
    // Reset formData to initial empty values
    setFormData({
      FirstName: "",
      LastName: "",
      Address: "",
      BirthDate: "",
      ContactInfo: "",
      Gender: "",
      Position: "",
      PhotoURL: "",
      Email: "",
      Password: "",
      HourlyRate: "",
      GrossPay: "",
      NHIFDeduction: "",
      NSSFDeduction: "",
      HELBDeduction: "",
      Role: "Employee",
    });
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const formattedName = name.charAt(0).toUpperCase() + name.slice(1); // Convert first character to uppercase
    setFormData({
      ...formData,
      [formattedName]: value,
    });
  };
  const handleAddEmployee = async () => {
    try {
      await addEmployeeMutation(formData);
      handleCloseModal();
    } catch (error) {
      console.error("Failed to add employee:", error);
    }
  };
  const handleFireEmployee = async (employeeId) => {
    // Modify the function to accept employeeId
    try {
      await fireEmployeeMutation(employeeId); // Pass the employeeId directly
      console.log(`Employee with ID ${employeeId} fired successfully`);
    } catch (error) {
      console.error("Failed to fire employee:", error);
    }
  };
  ////////////////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////////////////
  const [addScheduleMutation] = useCreateScheduleMutation();
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [updateFormData, setUpdateFormData] = useState({
    EmployeeID: "",
    OnLeave: "",
    LeaveDays: "",
  });
  const handleOpenUpdateModal = () => {
    setOpenUpdateModal(true);
    // Reset formData to initial empty values
    setUpdateFormData({
      EmployeeID: "",
      OnLeave: "",
      LeaveDays: "",
    });
  };

  const handleCloseUpdateModal = () => {
    setOpenUpdateModal(false);
  };
  const handleUpdateInput = (e) => {
    const { name, value } = e.target;
    setUpdateFormData({
      ...updateFormData,
      [name]: value,
    });
  };
  const handleAddSchedule = async () => {
    try {
      await addScheduleMutation(updateFormData);
      handleCloseUpdateModal();
    } catch (error) {
      console.error("Failed to add schedule:", error);
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  const [addAdvanceRecordMutation] = useCreateAdvanceRecordMutation();
  const [openAdvanceModal, setOpenAdvanceModal] = useState(false);
  const [advanceFormData, setAdvanceFormData] = useState({
    EmployeeID: "",
    Amount: "",
  });
  const handleOpenAdvanceModal = () => {
    setOpenAdvanceModal(true);
    // Reset formData to initial empty values
    setAdvanceFormData({
      EmployeeID: "",
      Amount: "",
    });
  };
  const handleCloseAdvanceModal = () => {
    setOpenAdvanceModal(false);
  };
  const handleAdvanceInput = (e) => {
    const { name, value } = e.target;
    setAdvanceFormData({
      ...advanceFormData,
      [name]: value,
    });
  };
  const handleAddAdvance = async () => {
    try {
      await addAdvanceRecordMutation(advanceFormData);
      handleCloseAdvanceModal();
    } catch (error) {
      console.error("Failed to add advance record:", error);
    }
  };

  return (
    <div className="management-container">
      <Navbar />
      <div className="add-employee-section">
        <button onClick={handleOpenModal}>Add a New Employee</button>
        <input type="text" placeholder="Search employee" />
        <button onClick={handleOpenUpdateModal}>Give Leave</button>
        <button onClick={handleOpenAdvanceModal}>Give Advance</button>
      </div>
      <div className="management-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Position</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="4">Loading...</td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="4">Error: {error.message}</td>
              </tr>
            ) : (
              employees
                .filter((employee) => employee.Role !== "ADMIN") // Filter out employees with role "ADMIN"
                .map((employee) => (
                  <tr key={employee.id}>
                    <td>
                      {employee.FirstName} {employee.LastName}
                    </td>
                    <td>{employee.Email}</td>
                    <td>{employee.Position}</td>
                    <td>
                      <div className="actions">
                        <button
                          onClick={() =>
                            handleFireEmployee(employee.EmployeeID)
                          }
                        >
                          Fire
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>

      {/* Advance Modal */}
      {openAdvanceModal && (
        <div className="modal-containerE">
          <div className="modal-contentE">
            <span className="modal-closeE" onClick={handleCloseAdvanceModal}>
              &times;
            </span>
            <h2>Give Advance</h2>
            <form>
              {/* Your form inputs */}
              <div className="modal-form">
                <label>
                  EmployeeID:
                  <input
                    type="text"
                    name="EmployeeID"
                    value={advanceFormData.EmployeeID}
                    onChange={handleAdvanceInput}
                  />
                </label>

                <label>
                  Amount:
                  <input
                    type="text"
                    name="Amount"
                    value={advanceFormData.Amount}
                    onChange={handleAdvanceInput}
                  />
                </label>

                <button
                  type="button"
                  className="modal-submit"
                  onClick={handleAddAdvance}
                >
                  Give Advance
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* give leave Modal */}
      {openUpdateModal && (
        <div className="modal-container">
          <div className="modal-content">
            <span className="modal-close" onClick={handleCloseUpdateModal}>
              &times;
            </span>

            <div className="md-cont">
              <h2>Provide Leave Details</h2>
              <form>
                {/* Your form inputs */}
                <div className="modal-form">
                  <label>
                    EmployeeID:
                    <input
                      type="text"
                      name="EmployeeID"
                      value={updateFormData.EmployeeID}
                      onChange={handleUpdateInput}
                    />
                  </label>

                  <label>
                    OnLeave:
                    <input
                      type="text"
                      name="OnLeave"
                      value={updateFormData.OnLeave}
                      onChange={handleUpdateInput}
                    />
                  </label>

                  <label>
                    LeaveDays:
                    <input
                      type="text"
                      name="LeaveDays"
                      value={updateFormData.LeaveDays}
                      onChange={handleUpdateInput}
                    />
                  </label>

                  <button
                    type="button"
                    className="modal-submit"
                    onClick={handleAddSchedule}
                  >
                    Give Leave
                  </button>
                </div>
              </form>
            </div>
            <div className="img-md">
              <img src={mdImage} alt="" />
            </div>
          </div>
        </div>
      )}

      {/* Add Employee Modal */}
      {openModal && (
        <div className="modalT">
          <div className="modal-contentT">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <h2>Add New Employee</h2>
            <form>
              {/* Your form inputs */}
              <div className="left-labels">
                <label>
                  First Name:
                  <input
                    type="text"
                    name="FirstName"
                    value={formData.FirstName}
                    onChange={handleInputChange}
                  />
                </label>

                <label>
                  Last Name:
                  <input
                    type="text"
                    name="LastName"
                    value={formData.LastName}
                    onChange={handleInputChange}
                  />
                </label>

                <label>
                  Address:
                  <input
                    type="text"
                    name="Address"
                    value={formData.Address}
                    onChange={handleInputChange}
                  />
                </label>

                <label>
                  BirthDate:
                  <input
                    type="text"
                    name="BirthDate"
                    value={formData.BirthDate}
                    onChange={handleInputChange}
                  />
                </label>

                <label>
                  ContactInfo:
                  <input
                    type="text"
                    name="ContactInfo"
                    value={formData.ContactInfo}
                    onChange={handleInputChange}
                  />
                </label>

                <label>
                  Gender:
                  <input
                    type="text"
                    name="Gender"
                    value={formData.Gender}
                    onChange={handleInputChange}
                  />
                </label>

                <label>
                  Position:
                  <input
                    type="text"
                    name="Position"
                    value={formData.Position}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
              <div className="right-labels">
                <label>
                  PhotoURL:
                  <input
                    type="text"
                    name="PhotoURL"
                    value={formData.PhotoURL}
                    onChange={handleInputChange}
                  />
                </label>

                <label>
                  Email:
                  <input
                    type="text"
                    name="Email"
                    value={formData.Email}
                    onChange={handleInputChange}
                  />
                </label>

                <label>
                  Password:
                  <input
                    type="text"
                    name="Password"
                    value={formData.Password}
                    onChange={handleInputChange}
                  />
                </label>

                <label>
                  GrossPay:
                  <input
                    type="text"
                    name="GrossPay"
                    value={formData.GrossPay}
                    onChange={handleInputChange}
                  />
                </label>

                <label>
                  HourlyRate:
                  <input
                    type="text"
                    name="HourlyRate"
                    value={formData.HourlyRate}
                    onChange={handleInputChange}
                  />
                </label>

                <label>
                  NHIFDeduction:
                  <input
                    type="text"
                    name="NHIFDeduction"
                    value={formData.NHIFDeduction}
                    onChange={handleInputChange}
                  />
                </label>

                <label>
                  NSSFDeduction:
                  <input
                    type="text"
                    name="NSSFDeduction"
                    value={formData.NSSFDeduction}
                    onChange={handleInputChange}
                  />
                </label>

                <label>
                  HELBDeduction:
                  <input
                    type="text"
                    name="HELBDeduction"
                    value={formData.HELBDeduction}
                    onChange={handleInputChange}
                  />
                </label>

                <label>
                  Role:
                  <input
                    type="text"
                    name="Role"
                    value={formData.Role}
                    onChange={handleInputChange}
                  />
                </label>

                <button type="button" onClick={handleAddEmployee}>
                  Add Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Management;
