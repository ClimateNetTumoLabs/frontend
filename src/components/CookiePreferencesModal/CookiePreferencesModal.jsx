import React, { useState, useEffect } from "react";
import styles from "./CookiePreferencesModal.module.css";

const CookiePreferencesModal = ({ isOpen, onClose, onSave, preferences }) => {
    const [localPreferences, setLocalPreferences] = useState({
        name: false,
        email: false,
        phone: false,
        location: false,
        address: false
    });
    useEffect(() => {
        if (isOpen) {
            // Add no-scroll class to body
            document.body.classList.add("no-scroll");
        } else {
            // Remove no-scroll class from body
            document.body.classList.remove("no-scroll");
        }

        // Cleanup on component unmount
        return () => {
            document.body.classList.remove("no-scroll");
        };
    }, [isOpen]);

    useEffect(() => {
        if (preferences) {
            setLocalPreferences((prev) => ({
                ...prev,
                ...preferences
            }));
        }
    }, [preferences]);

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setLocalPreferences((prev) => ({
            ...prev,
            [name]: checked
        }));
    };

    const handleSave = () => {
        onSave(localPreferences);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <h2 className={styles.title}>Data Collection Preferences</h2>
                <p className={styles.legalInfo}>
                    Manage your consent for data collection below. You can
                    select specific options based on your preferences.
                </p>

                <div className={styles.consentOptions}>
                    <label className={styles.checkboxLabel}>
                        <input
                            type="checkbox"
                            name="name"
                            checked={localPreferences.name}
                            onChange={handleCheckboxChange}
                        />
                        Collect my Name
                    </label>
                    <label className={styles.checkboxLabel}>
                        <input
                            type="checkbox"
                            name="email"
                            checked={localPreferences.email}
                            onChange={handleCheckboxChange}
                        />
                        Collect my Email
                    </label>
                    <label className={styles.checkboxLabel}>
                        <input
                            type="checkbox"
                            name="phone"
                            checked={localPreferences.phone}
                            onChange={handleCheckboxChange}
                        />
                        Collect my Phone Number
                    </label>
                    <label className={styles.checkboxLabel}>
                        <input
                            type="checkbox"
                            name="location"
                            checked={localPreferences.location}
                            onChange={handleCheckboxChange}
                        />
                        Collect my Location (Latitude/Longitude)
                    </label>
                    <label className={styles.checkboxLabel}>
                        <input
                            type="checkbox"
                            name="address"
                            checked={localPreferences.address}
                            onChange={handleCheckboxChange}
                        />
                        Collect my Address
                    </label>
                </div>

                <div className={styles.actions}>
                    <button className={styles.saveButton} onClick={handleSave}>
                        Save Preferences
                    </button>
                    <button className={styles.cancelButton} onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CookiePreferencesModal;