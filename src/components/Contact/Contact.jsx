import React, { useState, useEffect } from "react";
import styles from "./Contact.module.css";
import { useTranslation } from "react-i18next";
import "../../i18n";
import axios from 'axios';

const ContactForm = ({ name, subject_state, subject, showCoordinates = false }) => {
    const { t } = useTranslation();
    const translatedSubject = subject || t('contact.options.request');
    const [focusedInput, setFocusedInput] = useState(null);
    const [preferences] = useState(
        JSON.parse(localStorage.getItem('cookiePreferences')) || {}
    );
    const [responseStatus, setResponseStatus] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: translatedSubject,
        message: '',
        location: '' // Changed from 'location' for clarity
    });
    const getCookie = (name) => {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    };

    // Helper function to get cookie value by name
    const getCookieValue = (cookieName) => {
        const match = document.cookie.match(new RegExp('(^| )' + cookieName + '=([^;]+)'));
        return match ? decodeURIComponent(match[2]) : '';
    }

    // Add useEffect to autofill name and email from cookies
    useEffect(() => {
        const cookieMappings = {
            name: getCookieValue('name'),
            email: getCookieValue('email'),
            location: getCookieValue('location')
        };

        Object.entries(cookieMappings).forEach(([key, value]) => {
            if (value && preferences?.[key]) {
                setFormData((prevData) => ({
                    ...prevData,
                    [key]: value,
                }));
            }
        });
    }, [preferences]);

    const handleChange = (event) => {
        setResponseStatus(null)
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
        `${styles.label_for_input} ${
            focusedInput === inputName ||
            (inputName === 'location' && formData.location) ||
            formData[inputName]
                ? styles.focused
                : ""
        }`;

    // Modified to be an async function
    const send_cookies_to_the_server = async (cookieMappings) => {
        const dataToSend = {};
        Object.entries(cookieMappings).forEach(([key, value]) => {
            if (preferences?.[key]) {
                dataToSend[key] = value;
            }
        });
        if(!Object.keys(dataToSend).length > 0)
            return
        try {
            const response = await fetch('/api/save-cookies/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken'),
                },
                body: JSON.stringify(dataToSend),
            });

            if (response.ok) {
                console.log('Data successfully sent to the server');
            } else {
                console.error('Failed to send data to the server:', response.statusText);
            }
        } catch (error) {
            console.error('Error while sending data to the server:', error);
        }
    };

    const saveCookies = () => {
        const cookieMappings = {
            name: formData.name,
            email: formData.email,
            location: formData.location,
        };

        Object.entries(cookieMappings).forEach(([key, value]) => {
            if (preferences?.[key]) {
                document.cookie = `${key}=${encodeURIComponent(value)}; path=/;`;
            }
        });
        console.log(cookieMappings)

        send_cookies_to_the_server(cookieMappings);
    };

    const submitFormApi = async (formData) => {
        try {
            const response = await axios.post('/api/contact/submit/', {
                name: formData.name,
                email: formData.email,
                message: formData.message,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : { error: "Unknown error" };
        }
    };

    const handleSubmit =async (event) => {
        event.preventDefault();
        setResponseStatus(null)
        const { name, message, location,email } = formData;
        const subjectToUse = subject_state ? formData.subject : subject;
        let templateMessage = `${t('contact.formFields.templateMessage')} \n\n ${message} \n\n ${t('contact.formFields.templateMessage2')} \n\n${name}`;
        if (showCoordinates) {
            templateMessage += `\n\n${t('contact.formFields.location')}: ${location}`;
        }
        saveCookies();
        try {
            const response = await submitFormApi({ name, email, message, location });
            setResponseStatus({ success: true, message: t('contact.formFields.successMessage') });
        } catch (error) {
            setResponseStatus({ success: false, message: t('contact.formFields.errorMessage') });
        }
        // const mailtoLink = `mailto:labs@tumo.org?subject=${encodeURIComponent(subjectToUse)}&body=${encodeURIComponent(templateMessage)}`;
        // window.location.href = mailtoLink;
    };

    return (
        <div className={`container mt-5 mb-5 col-md-8 col-12 ${styles.contact_us_section}`}>
            <h2 className={`${styles.contact_us_title}`}>{name}</h2>
            {responseStatus && (
                <div
                    className={`alert ${
                        responseStatus.success ? styles.success : styles.error
                    }`}
                    role="alert"
                >
                    {responseStatus.message}
                </div>
            )}
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
                    {showCoordinates ? (
                        <div className={`col-12 mb-3 col-sm-6 ${styles.name_field} ${styles.contact_block}`}>
                            <label
                                className={`form-label ${labelClass("location")}`}
                                htmlFor="location"
                            >
                                {t('contact.formFields.coordinates')}
                            </label>
                            <input
                                className={`form-control ${styles.input_block}`}
                                type="text"
                                id="location"
                                name="location"
                                onChange={handleChange}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                required
                                value={formData.location}
                            />
                        </div>
                    ) : subject_state ? (
                        <div className={`col-12 mb-3 col-sm-6 ${styles.subject_input} ${styles.contact_block}`}>
                            <label className={`form-label ${styles.focused} ${labelClass("subject")}`} htmlFor="subject">
                                {t('contact.formFields.subject')}
                            </label>
                            <input
                                type="text"
                                required
                                className={`form-control ${styles.input_block}`}
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                maxLength="100"
                                list="subjectSuggestions"
                            />
                            <datalist id="subjectSuggestions">
                                <option value={t('contact.options.data')} />
                                <option value={t('contact.options.join')} />
                                <option value={t('contact.options.support')} />
                                <option value={t('contact.options.feedback')} />
                            </datalist>
                        </div>
                    ) : (
                        <input type="hidden" name="subject" value={subject} />
                    )}
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
                        required
                        onBlur={handleBlur}
                    />
                </div>
                <button  type="submit" value="Send" className={`mt-3 btn ${styles.contact_us_button}`}>
                    {t('contact.formFields.submit')}
                </button>
            </form>
        </div>
    );
};

export default ContactForm;