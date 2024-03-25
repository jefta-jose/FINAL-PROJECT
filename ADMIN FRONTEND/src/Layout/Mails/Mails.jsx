import React, { useState } from "react";
import "./Mails.scss";
import box from "../../assets/email-svgrepo-com.png";
import emailImage from "../../assets/d5b5705b3e76653200c33cdda531017d.jpg";
import Modal from "react-modal"; // Import Modal component
import {
  useGetEmailQuery,
  useCreateEmailMutation,
} from "../../Features/Emails";
import pen from "../../assets/pen-square-svgrepo-com.png";
import inbox from "../../assets/inbox-star-svgrepo-com.png";
import starred from "../../assets/starred-svgrepo-com.png";
import snoozed from "../../assets/snooze-svgrepo-com.png";
import sent from "../../assets/sent-mail-svgrepo-com.png";
import draft from "../../assets/draft-svgrepo-com.png";

const Emails = () => {
  const { data: emaildata } = useGetEmailQuery();

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
  const [isOpen, setIsOpen] = useState(false); // State for modal visibility

  const handleEmailClick = (email) => {
    setSelectedEmail(email);
  };

  const handleGoBack = () => {
    setSelectedEmail(null);
  };

  const [EmployeeID, setEmployeeID] = useState("");
  const [EmailSubject, setEmailSubject] = useState("");
  const [EmailContent, setEmailContent] = useState("");
  const [Emailbody, setEmailBody] = useState("");

  const [createEmail, { isLoading }] = useCreateEmailMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createEmail({ EmployeeID, EmailSubject, EmailContent, Emailbody });
      // Optionally, you can handle success or close the modal here
      setIsOpen(false); // Close the modal after email creation
    } catch (error) {
      // Handle error if necessary
      console.error("Error creating email:", error);
    }
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="email-container">
      <div className="create-emails">
        <div className="email-icons">
          <img src={pen} className="pen" onClick={() => setIsOpen(true)} />
          <div className="useless-icons">
            <img src={inbox} alt="" />
            <img src={starred} alt="" />
            <img src={snoozed} alt="" />
            <img src={sent} alt="" />
            <img src={draft} alt="" />
          </div>
        </div>
        <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>
          <h2>Create Email</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="employeeID">Employee ID:</label>
              <input
                id="employeeID"
                type="text"
                value={EmployeeID}
                onChange={(e) => setEmployeeID(e.target.value)}
                placeholder="Employee ID"
              />
            </div>
            <div className="subject" >
              <label htmlFor="emailSubject">Subject:</label>
              <input
              className="subject"
                id="emailSubject"
                type="text"
                value={EmailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                placeholder="Subject"
              />
            </div>
            <div>
              <label htmlFor="emailContent">Content:</label>
              <input
                id="emailContent"
                type="text"
                value={EmailContent}
                onChange={(e) => setEmailContent(e.target.value)}
                placeholder="Content"
              />
            </div>
            <div>
              <label htmlFor="emailBody">Body:</label>
              <input
                id="emailBody"
                type="text"
                value={Emailbody}
                onChange={(e) => setEmailBody(e.target.value)}
                placeholder="Body"
              />
            </div>
            <button type="submit" disabled={isLoading}>
              Create
            </button>
          </form>
          <button className="close-modal" onClick={() => setIsOpen(false)}>
            Close
          </button>
        </Modal>
      </div>

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
                    <img style={{ marginRight: "50px" }} src={box} alt="" />
                    <p style={{ marginRight: "50px" }}>{email.EmailContent}</p>
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
