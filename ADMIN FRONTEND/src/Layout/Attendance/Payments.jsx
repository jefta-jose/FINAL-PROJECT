import React, { useEffect } from "react"; // Import useEffect

import LayoutNav from "../../Components/LayoutNav";
import Navbar from "../../Components/Navbar";
import "./Payments.scss";
import { useGetAllPayrollRecordsQuery } from "../../Features/Payroll";

const Payments = () => {
  const { data: payrollData, isLoading, isError, refetch } = useGetAllPayrollRecordsQuery();

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div className="payments-container" >
      <Navbar />
      <div className="dash-nav">
        <LayoutNav />
      </div>
      <div className="payments-table">
        <table>
          <thead>
            <tr>
              <th>Emp. Details</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {payrollData && payrollData.map((employee) => (
              <tr key={employee.EmployeeID}>
                <td>
                  {employee.FirstName} {employee.LastName} :
                  <span className="employee-id">{employee.EmployeeID}</span>
                </td>
                <td>${employee.NetPay}</td>
                <td className="status">
                  <button>paid</button>
                  <button>pending</button>
                  <button>unpaid</button>
                  <button>late</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payments;
