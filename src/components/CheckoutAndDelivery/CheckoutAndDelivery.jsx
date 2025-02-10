import React, { useState, useEffect } from 'react';
import PhoneInput from 'react-phone-input-2';
import "../../i18n";
import {useTranslation} from "react-i18next";
import 'react-phone-input-2/lib/style.css';
import styles from './CheckoutAndDelivery.module.css';

const CheckoutAndDelivery = () => {
    const {t} = useTranslation()
    const [focusedInput, setFocusedInput] = useState(null);
    const [responseStatus, setResponseStatus] = useState(null);
    const [formData, setFormData] = useState({
        fullName: '',
        address: '',
        city: '',
        postalCode: '',
        country: '',
        phoneNumber: '',
        email: '',
        county: '',
        paymentMethod: 'creditCard',
    });
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [regions, setRegions] = useState([]);
    const [isFlipped, setIsFlipped] = useState(false);


    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all')
            .then((response) => response.json())
            .then((data) => {
                setCountries(
                    data.map((country) => ({
                        name: country.name.common,
                        code: country.cca2,
                        regions: country.subdivisions || [], // Modify this if subdivisions aren't available
                    }))
                );
            });
    }, []);

    const handleCountryChange = (e) => {
        const selectedCountryCode = e.target.value;
        const selectedCountry = countries.find(
            (country) => country.code === selectedCountryCode
        );

        setFormData({ ...formData, country: selectedCountryCode, region: '' });
        setRegions(selectedCountry ? selectedCountry.regions : []);
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleChange = (event) => {
        setResponseStatus(null)
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handlePhoneChange = (value) => {
        setFormData({ ...formData, phoneNumber: value });
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

    const handleSubmit = (event) => {
        console.log('Erik')
    };

    return (
        <section className={styles.contact_us_section}>
            <div>
                <form className={styles.payment_delivery_form} onSubmit={handleSubmit}>
                    <div className={`d-flex flex-wrap`}>
                        <div className={`col-12 mb-3 col-sm-6 ${styles.name_field}`}>
                            <label
                                className={`form-label ${labelClass("name")}`}
                                htmlFor="name"
                            >
                                {t("checkoutAndDelivery.form.name")}
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
                        <div className={`col-12 mb-3 col-sm-6 ${styles.name_field} `}>
                            <label
                                className={`form-label ${labelClass("surname")}`}
                                htmlFor="surname"
                            >
                                {t("checkoutAndDelivery.form.surname")}
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
                        <div className={`col-12 mb-3 col-sm-6 ${styles.name_field} ${styles.country_wrapper}`}>
                            <label className={`form-label ${styles.label_for_input}`} htmlFor="country">
                            </label>
                            <select
                                className={`form-control ${styles.input_block}`}
                                id="country"
                                name="country"
                                onChange={handleCountryChange}
                                value={formData.country}
                            >
                                <option value="" disabled>{t("checkoutAndDelivery.form.country")}</option>
                                {countries.map((country) => (
                                    <option key={country.code} value={country.code}>
                                        {country.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className={`col-12 mb-3 col-sm-6 ${styles.name_field}`}>
                            <label
                                className={`form-label ${labelClass("city")}`}
                                htmlFor="city"
                            >
                                {t("checkoutAndDelivery.form.city")}
                            </label>
                            <input
                                className={`form-control ${styles.input_block}`}
                                type="text"
                                id="city"
                                name="city"
                                onChange={handleChange}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                required
                                value={formData.city}
                            />
                        </div>
                    </div>
                    <div className={`d-flex flex-wrap`}>
                        <div className={`col-12 mb-3 col-sm-6 ${styles.name_field} `}>
                            <label
                                className={`form-label ${labelClass("address")}`}
                                htmlFor="address"
                            >
                                {t("checkoutAndDelivery.form.street")}
                            </label>
                            <input
                                className={`form-control ${styles.input_block}`}
                                type="text"
                                id="address"
                                name="address"
                                onChange={handleChange}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                required
                                value={formData.address}
                            />
                        </div>
                        <div className={`col-12 mb-3 col-sm-6 ${styles.name_field} `}>
                            <label
                                className={`form-label ${labelClass("postalCode")}`}
                                htmlFor="postalCode"
                            >
                                {t("checkoutAndDelivery.form.postalCode")}
                            </label>
                            <input
                                className={`form-control ${styles.input_block}`}
                                type="text"
                                id="postalCode"
                                name="postalCode"
                                onChange={handleChange}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                required
                                value={formData.postalCode}
                            />
                        </div>

                    </div>
                    <div className={`d-flex flex-wrap`}>
                        <div className={`col-12 mb-3 col-sm-6 ${styles.name_field} ${styles.phone_input_wrapper} `}>
                            <label className={`form-label ${styles.label_for_input}`} htmlFor="phone">
                            </label>
                            <PhoneInput
                                country="us"
                                value={formData.phoneNumber}
                                onChange={handlePhoneChange}
                                inputClass={`${styles.input_block} ${styles.phone_input}`}
                            />
                        </div>
                        <div className={`col-12 mb-3 col-sm-6 ${styles.name_field}`}>
                            <label
                                className={`form-label ${labelClass("email")}`}
                                htmlFor="email"
                            >
                                {t("checkoutAndDelivery.form.email")}
                            </label>
                            <input
                                className={`form-control ${styles.input_block}`}
                                type="text"
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
                </form>
            </div>
        </section>
    );
};

export default CheckoutAndDelivery;