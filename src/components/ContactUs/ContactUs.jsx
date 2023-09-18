import React, { useState } from 'react';
import styles from './Contactus.module.css'

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your form submission logic here
    }

    return (
        <div className= {`${styles.contactus} "container mt-5"`}>
            <h2>Contact Us</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="message" className="form-label">Message:</label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className="form-control"
                        rows="4"
                    />
                </div>
                <button type="submit" className={`${styles.submit} "btn"`}>Submit</button>
            </form>
        </div>
    );
}

export default ContactUs;
