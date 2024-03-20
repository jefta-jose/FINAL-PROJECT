import React from "react";
import user from "../assets/Ellipse 14.png";
import "./Emails.scss"

const Emails = () => {
  return (
    <div className="email-container" >
      <div className="display-inbox">
        <div className="msg-one">
        <div className="user-name">
          <h2>Simon Kamau</h2>
          <h2>1:24 PM</h2>
        </div>
        <h3>Scheduled Meeting</h3>
        <p>
          Hae Simon Kmau I just Scheduled a meeting with the team to go over
          some designs ...............
        </p>
        </div>
      </div>

      <div className="read-msgs">
        <div className="user-details">
          <img src={user} alt="" />
          <h2>Simon Kamau</h2>
        </div>

        <div className="email-msg">
          <h3>Scheduled Meeting</h3>
          <p>
            Hi Simon Kamau, Hope this message finds you well. I wanted to inform
            you that I've successfully scheduled a meeting with the team to
            delve into some exciting design discussions. Your insights and
            expertise will be invaluable as we collaboratively navigate through
            the creative process. The meeting is set for [date and time], and
            I'm looking forward to your valuable contributions. Feel free to
            prepare any materials or thoughts you'd like to share during our
            session. Your input is crucial, and I believe this collaborative
            effort will lead us to innovative and impactful design solutions.
            Looking forward to our productive session! Best regards, Jeff
            Ndegwa.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Emails;
