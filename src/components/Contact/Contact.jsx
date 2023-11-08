import React from "react";
import axios from "axios";
import styles from "./Contact.module.css";

const ContactForm = () => {
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name: document.getElementById("name").value,
      surname: document.getElementById("surname").value,
      email: document.getElementById("email").value,
      message: document.getElementById("message").value,
    };

    axios
        .post("contact/", formData)
        .then((response) => {
          console.log("Form submitted successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error submitting form:", error);
        });
  };

  return (
      <div className="container mt-5 mb-5 col-md-6 col-12">
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
