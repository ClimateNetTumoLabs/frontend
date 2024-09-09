import React, { useState } from "react";
import styles from "./Contact.module.css";
import { useTranslation } from "react-i18next";
import "../../i18n";

const ContactForm = ({ name, subject_state, subject = "Request for Necessary Credentials", showCoordinates = false }) => {
  const { t } = useTranslation();

  const [focusedInput, setFocusedInput] = useState(null);
  const [submitted, setSubmitted] = useState(false);  // Ensure submitted is false initially
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    subject: subject,
    message: '',
    coordinates: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFocus = (event) => {
    setFocusedInput(event.target.name);
  };

  const handleBlur = () => {
    setFocusedInput(null);
  };

  const labelClass = (inputName) =>
    `${styles.label_for_input} ${focusedInput === inputName || formData[inputName] ? styles.focused : ""}`;

  const handleSubmit = (event) => {
    event.preventDefault();
    const storedEmail = localStorage.getItem("submittedEmail");

    // Check if the email has already been submitted
    if (storedEmail === formData.email) {
      setError("This email has already submitted a response.");
      setSubmitted(false);  // Ensure the success message doesn't appear
      return;
    }

    // Save submission state and email to localStorage
    localStorage.setItem("formSubmitted", "true");
    localStorage.setItem("submittedEmail", formData.email); // Save the email

    setSubmitted(true);  // Show the success message only after validation passes
    setError("");  // Clear any previous errors

    const { name, surname, message, coordinates } = formData;
    const subjectToUse = subject_state ? formData.subject : subject;

    let templateMessage = `${t('contact.formFields.templateMessage')} \n\n ${message} \n\n ${t('contact.formFields.templateMessage2')} \n\n${name} ${surname}`;

    if (showCoordinates) {
      templateMessage += `\n\nCoordinates: ${coordinates}`;
    }

    const mailtoLink = `mailto:eutumocc@tumo.org?subject=${encodeURIComponent(subjectToUse)}&body=${encodeURIComponent(templateMessage)}`;

    window.location.href = mailtoLink;
  };

  return (
    <div className={`container mt-5 mb-5 col-md-8 col-12 ${styles.contact_us_section}`}>
      <h2 className={`${styles.contact_us_title}`}>{name}</h2>
      <form onSubmit={handleSubmit}>
        <div className={`d-flex flex-wrap`}>
          <div className={`col-12 mb-3 col-sm-6 ${styles.name_field} ${styles.contact_block}`}>
            <label
                className={`form-label ${labelClass("name")}`}
                htmlFor="name"
            >
              {t('contact.formFields.name')}
            </label>
            <input
                className={`form-control ${styles.input_block}`}
                type="text"
                id="name"
                name="name"
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                required
                value={formData.name}
            />
          </div>
          <div className={`col-12 mb-3 col-sm-6 ${styles.surname_field} ${styles.contact_block}`}>
            <label className={`form-label ${labelClass("surname")}`} htmlFor="surname">
              {t('contact.formFields.surname')}
            </label>
            <input
                className={`form-control ${styles.input_block}`}
                type="text"
                id="surname"
                name="surname"
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                required
                value={formData.surname}
            />
          </div>
        </div>
        <div className={`d-flex flex-wrap`}>
          <div className={`col-12 mb-3 col-sm-6 ${styles.email_section} ${styles.contact_block}`}>
            <label className={`form-label ${labelClass("email")}`} htmlFor="email">
              {t('contact.formFields.email')}
            </label>
            <input
                className={`form-control ${styles.input_block}`}
                type="email"
                id="email"
                name="email"
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                required
                value={formData.email}
            />
          </div>
          {showCoordinates ? (
            <div className={`col-12 mb-3 col-sm-6 ${styles.coordinates_section} ${styles.contact_block}`}>
              <label className={`form-label ${labelClass("coordinates")}`} htmlFor="coordinates">
                {t('contact.formFields.coordinates')}
              </label>
              <input
                className={`form-control ${styles.input_block}`}
                type="text"
                id="coordinates"
                name="coordinates"
                placeholder={focusedInput === "coordinates" ? "Latitude, Longitude (e.g., 40.7128, -74.0060)" : ""}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                required
                value={formData.coordinates}
              />
            </div>
          ) : subject_state ? (
            <div className={`col-12 mb-3 col-sm-6 ${styles.subject_input} ${styles.contact_block}`}>
              <label className={`form-label ${styles.focused} ${labelClass("subject")}`} htmlFor="subject">
                {t('contact.formFields.subject')}
              </label>
              <select
                  required
                  className={`form-control ${styles.input_block}`}
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  onChange={handleChange}
              >
                  <option value="Need Data">{t('contact.options.0')}</option>
                  <option value="Join To Project">{t('contact.options.1')}</option>
                  <option value="Technical Support">{t('contact.options.2')}</option>
                  <option value="Feedback">{t('contact.options.3')}</option>
              </select>
            </div>
          ) : (
            <input type="hidden" name="subject" value={subject} />
          )}
        </div>
        <div className={`mb-3 ${styles.contact_block}`}>
          <label className={`form-label ${labelClass("message")}`} htmlFor="message">
            {t('contact.formFields.message')}
          </label>
          <textarea
              className={`form-control ${styles.input_block}`}
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        {submitted && !error && <div className="alert alert-success">Your response has been submitted!</div>}
        <button type="submit" value="Send" className={`mt-3 btn ${styles.contact_us_button}`}>
          {t('contact.formFields.submit')}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
