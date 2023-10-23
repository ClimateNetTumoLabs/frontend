import React from "react";
import styles from './Contact.module.css'
const ContactForm = () => {
 

  const onSubmit = (e) => {
    e.preventDefault();

    const { name, surname, email, message } = e.target.elements;
    let conFom = {
      name: name.value,
      surname : surname.value,
      email: email.value,
      message: message.value,
    };

    console.log(conFom)
  };
  return (
    <div className="container mt-5 mb-5 col-md-6 col-8">
      <h2 className={`mb-3 ${styles.contact_us_title}`}> Contact Us</h2>
      <form onSubmit={onSubmit}>
        <div className={`d-flex flex-wrap`}>
          <div className={`col-12 mb-3 col-sm-6 ${styles.name_field} ${styles.contact_block}`}>
            <label className="form-label" htmlFor="name">
              Name
            </label>
            <input className={`form-control ${styles.input_block}`} type="text" id="name" required />
          </div>

          <div className={`col-12  mb-3 col-sm-6 ${styles.surname_field} ${styles.contact_block}`}>
            <label className="form-label" htmlFor="surname">
              Surname
            </label>
            <input className={`form-control ${styles.input_block}`} type="text" id="surname" required />
          </div>
        </div>
        <div className={`mb-3 ${styles.contact_block}`}>
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input className={`form-control ${styles.input_block}`} type="email" id="email" required />
        </div>
        <div className={`mb-3 ${styles.contact_block}`}>
          <label className="form-label" htmlFor="message">
            Message
          </label>
          <textarea className={`form-control ${styles.input_block}`} id="message" required />
        </div>
        <button className={`mt-3 btn  ${styles.contact_us_button}`} type="submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
