import React, { useState } from "react";
import axios from "axios";
import styles from "./Contact.module.css";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    message: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .post("contact/", formData)
      .then((response) => {
        console.log("Form submitted successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
      });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  console.log(formData);
  return (
    <div className="container mt-5 mb-5 col-md-6 col-8">
      <h2 className={`mb-3 ${styles.contact_us_title}`}> Contact Us</h2>
      <form onSubmit={onSubmit}>
        <div className={`d-flex flex-wrap`}>
          <div
            className={`col-12 mb-3 col-sm-6 ${styles.name_field} ${styles.contact_block}`}
          >
            <label className="form-label" htmlFor="name">
              Name
            </label>
            <input
              className={`form-control ${styles.input_block}`}
              type="text"
              id="name"
              name="name"
              required
              onChange={handleChange}
            />
          </div>
          <div
            className={`col-12 mb-3 col-sm-6 ${styles.surname_field} ${styles.contact_block}`}
          >
            <label className="form-label" htmlFor="surname">
              Surname
            </label>
            <input
              className={`form-control ${styles.input_block}`}
              type="text"
              id="surname"
              name="surname"
              required
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={`mb-3 ${styles.contact_block}`}>
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input
            className={`form-control ${styles.input_block}`}
            type="email"
            id="email"
            name="email"
            required
            onChange={handleChange}
          />
        </div>
        <div className={`mb-3 ${styles.contact_block}`}>
          <label className="form-label" htmlFor="message">
            Message
          </label>
          <textarea
            className={`form-control ${styles.input_block}`}
            id="message"
            name="message"
            required
            onChange={handleChange}
          />
        </div>
        <button
          className={`mt-3 btn  ${styles.contact_us_button}`}
          type="submit"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
