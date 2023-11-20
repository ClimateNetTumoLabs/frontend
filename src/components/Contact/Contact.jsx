import React, { useState } from "react";
import axios from "axios";
import styles from "./Contact.module.css";

const ContactForm = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleSurnameChange = (event) => {
    setSurname(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Build the mailto link with template message
    const templateMessage = `Hello TUMO Labs Team, \n\n ${message} \n\n Regards, \n\n${name} ${surname}`;
    const mailtoLink = `mailto:erik.saryan@tumo.org?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(templateMessage)}`;

    // Open the mail client
    window.location.href = mailtoLink;
  };

  return (
      <div className={`container mt-5 mb-5 col-md-6 col-12 ${styles.contact_us_section}`}>
        <h2 className={`${styles.contact_us_title}`}> Contact Us</h2>
        <form onSubmit={handleSubmit}>
          <div className={`d-flex flex-wrap`}>
            <div className={`col-12 mb-3 col-sm-6 ${styles.name_field} ${styles.contact_block}`}>
              <label className="form-label" htmlFor="name">
                Name
              </label>
              <input
                  className={`form-control ${styles.input_block}`}
                  type="text"
                  id="name"
                  name="name"
                  onChange={handleNameChange}
                  required
              />
            </div>
            <div className={`col-12 mb-3 col-sm-6 ${styles.surname_field} ${styles.contact_block}`}>
              <label className="form-label" htmlFor="surname">
                Surname
              </label>
              <input
                  className={`form-control ${styles.input_block}`}
                  type="text"
                  id="surname"
                  name="surname"
                  onChange={handleSurnameChange}
                  required
              />
            </div>
          </div>
          <div className={`d-flex flex-wrap mb-3`}>
            <div className={`col-12 mb-3 col-sm-6 ${styles.subject_input} ${styles.contact_block}`}>
              <label className="form-label" htmlFor="subject">
                Subject
              </label>
              <select
                  className={`form-control ${styles.input_block}`}
                  id="subject" name="subject" value={subject} onChange={handleSubjectChange} required
              >
                <option value="" selected>Need Data</option>
                <option value="Join To Project">Join To Project</option>
                <option value="Technical Support">Technical Support</option>
                <option value="Feedback">Feedback</option>
              </select>
            </div>

            <div className={`col-12 mb-3 col-sm-6 ${styles.email_section} ${styles.contact_block}`}>
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                  className={`form-control ${styles.input_block}`}
                  type="email"
                  id="email"
                  name="email"
                  onChange={handleEmailChange}
                  required
              />
            </div>
          </div>
          <div className={`mb-3 ${styles.contact_block}`}>
            <label className="form-label" htmlFor="message">
              Message
            </label>
            <textarea
                className={`form-control ${styles.input_block}`}
                id="message" name="message" value={message} onChange={handleMessageChange} required
            />
          </div>
          <button type="submit" value="Send" className={`mt-3 btn  ${styles.contact_us_button}`}>
            Send
          </button>
        </form>
      </div>
  );
};

export default ContactForm;
