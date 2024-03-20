import React, { useEffect, useState } from "react";
import LayoutNav from "../../Components/LayoutNav";
import Navbar from "../../Components/Navbar";
import "./Payroll.scss";
import {
  useGetAllPayrollRecordsQuery,
  useGetPayrollRecordByIdQuery,
} from "../../Features/Payroll";

const Payroll = () => {
  const {
    data: payrollData,
    isLoading,
    isError,
    refetch,
  } = useGetAllPayrollRecordsQuery(); // removed employeeID
  const [selectedPayrollId, setSelectedPayrollId] = useState(null);
  const {
    data: selectedPayroll,
    error,
    isLoading: selectedPayrollLoading,
  } = useGetPayrollRecordByIdQuery(selectedPayrollId, {
    skip: !selectedPayrollId, // Skip the query if selectedPayrollId is null
  });

  useEffect(() => {
    refetch();
  }, [refetch]); // removed employeeID from the dependency array since it's not used here

  const handleDownload = async (payrollId) => {
    try {
      const response = await fetch(`/api/payroll/${payrollId}`);
      
      // Check if the response is successful
      if (!response.ok) {
        throw new Error(`Failed to fetch payroll details: ${response.statusText}`);
      }
  
      // Get the response data as text
      const payrollData = await response.text();
      
      // Check if the response data is empty
      if (!payrollData) {
        throw new Error("Empty response data received");
      }
  
      // Create a Blob with the response data
      const blob = new Blob([payrollData], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
  
      // Create a temporary <a> element to trigger the download
      const a = document.createElement("a");
      a.href = url;
      a.download = `payroll_${payrollId}.txt`; // Set filename
      
      // Provide feedback to the user that the download is in progress
      a.textContent = "Downloading..."; // Update button text
      a.style.display = "none"; // Hide the button
      document.body.appendChild(a);
      a.click();
  
      // Cleanup
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading payroll:", error);
      // Provide feedback to the user about the error
      alert(`Error downloading payroll: ${error.message}`);
    }
  };
  
  

  const resetSelectedPayroll = () => {
    setSelectedPayrollId(null);
  };

  return (
    <div>
      <Navbar />
      <div className="dash-nav">
        <LayoutNav />
      </div>

      <div className="payroll-table">
        {isLoading && <div>Loading...</div>}
        {isError && <div>Error fetching data</div>}
        {payrollData && (
          <table>
            <thead>
              <tr>
                <th>Emp. Details</th>
                <th>Gross Pay</th>
                <th>Overtime Bonus</th>
                <th>Deductions</th>
                <th>Advance</th>
                <th>Net Pay</th>
                <th>Download</th>
              </tr>
            </thead>
            <tbody>
              {payrollData.map((employee) => (
                <tr key={employee.PayrollID}>
                  <td>
                    {employee.FirstName} {employee.LastName}
                  </td>
                  <td>${employee.GrossPay}</td>
                  <td>${employee.OvertimeBonus}</td>
                  <td>
                    NHIF: ${employee.NHIFDeduction}, NSSF: $
                    {employee.NSSFDeduction}, HELB: ${employee.HELBDeduction}
                  </td>
                  <td>${employee.Advance}</td>
                  <td>${employee.NetPay}</td>
                  <td>
                    <button onClick={() => handleDownload(employee.PayrollID)}>
                      Download Invoice
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Render the selected payroll details */}
        {selectedPayrollLoading && <div>Loading payroll details...</div>}
        {selectedPayroll && (
          <div className="payroll-details">
            <h2>Payroll Details</h2>
            <p>
              Employee: {selectedPayroll.FirstName} {selectedPayroll.LastName}
            </p>
            {/* Render other payroll details here */}
            <button onClick={resetSelectedPayroll}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payroll;
