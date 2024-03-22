import React, { useEffect, useState } from "react";
import user from "../assets/Ellipse 14.png";
import "./Emails.scss";
import { useGetEmailByIdQuery } from "../Features/employeeApi";
import box from "../assets/email-svgrepo-com.png";
import emailImage from "../assets/d5b5705b3e76653200c33cdda531017d.jpg";

const Emails = () => {
  const EmpID = localStorage.getItem("EmployeeID");
  const { data: emaildata, refetch } = useGetEmailByIdQuery(EmpID);
  useEffect(() => {
    // Refetch the data when the employeeID changes
    refetch();
  }, [EmpID, refetch]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString([], {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const [selectedEmail, setSelectedEmail] = useState(null);

  const handleEmailClick = (email) => {
    setSelectedEmail(email);
  };

  const handleGoBack = () => {
    setSelectedEmail(null);
  };

  return (
    <div className="email-container">
      <div className="display-inbox">
        <div className="msg-one">
          {selectedEmail ? (
            <div className="selected-email">
              <div className="email-cont">
                <button onClick={handleGoBack}>Go Back</button>
                <h3>{selectedEmail.EmailSubject}</h3>
                <span className="email-body">{selectedEmail.Emailbody}</span>
                <p>{formatDate(selectedEmail.Date)}</p>
                <button>reply</button>
                <button>forward</button>
              </div>
              <div className="imager">
                <img src={emailImage} alt="" />
              </div>
            </div>
          ) : (
            <ul className="inbox">
              {emaildata &&
                emaildata.map((email) => (
                  <li
                    className="email-item"
                    key={email.RecordID}
                    onClick={() => handleEmailClick(email)}
                  >
                    <img style={{ marginRight : "50px"}} src={box} alt="" />
                    <p style={{marginRight : "50px"}} >{email.EmailContent}</p>
                    <span className="date">{formatDate(email.Date)}</span>
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Emails;
