import React from "react";

const ContactMe = (props) => {
  return (
    <div className="contactme">
      <h1>Contact Me</h1>
      <div className="flex flex-col">
        <h2>
          Mail: <span>jenarosalvadorlopez@gmail.com</span>
        </h2>
        <div className="flex flex-row">
          <h2>Socials:</h2>
          <h2>
            <a href="https://facebook.com/jenaroslopez">facebook.com/jenaroslopez</a> <br /> <br /> <a href="https://instagram.com/jenarolopez10">instagram.com/jenarolopez10</a>
          </h2>
        </div>
        <h2>
          Github: <a href="https://github.com/jenarolopez">github.com/jenarolopez</a>
        </h2>
      </div>
    </div>
  );
};

export default ContactMe;
