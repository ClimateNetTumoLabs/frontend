import React, { useState, useEffect } from "react";
import styles from "./CookiePreferencesModal.module.css";

const CookiePreferencesModal = ({ isOpen, onClose, onSave, preferences }) => {
    const [localPreferences, setLocalPreferences] = useState({
        personalData: false
    });

    useEffect(() => {
        if (preferences) {
            setLocalPreferences(prev => ({
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

                <div className={styles.dataCollection}>
                    <h3>What personal information do we collect?</h3>
                    <ul>
                        <li>Full Name</li>
                        <li>Email Address</li>
                        <li>Phone Number</li>
                        <li>Location Coordinates (Longitude/Latitude)</li>
                    </ul>

                    <h3>Why do we collect this data?</h3>
                    <p>To provide personalized customer service, contact you effectively, and improve our understanding of user demographics and preferences.</p>
                </div>

                <div className={styles.consentOptions}>
                    <h4>Consent Options:</h4>
                    <label className={styles.checkboxLabel}>
                        <input
                            type="checkbox"
                            name="personalData"
                            checked={localPreferences.personalData}
                            onChange={handleCheckboxChange}
                        />
                        I consent to the collection and processing of my personal data
                    </label>
                </div>

                <div className={styles.legalInfo}>
                    <p>
                        By providing consent, you agree that we may store and process
                        your personal information for the purposes described above.
                        You can withdraw your consent at any time.
                    </p>
                </div>

                <div className={styles.actions}>
                    <button
                        className={styles.saveButton}
                        onClick={handleSave}
                    >
                        Save Preferences
                    </button>
                    <button
                        className={styles.cancelButton}
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CookiePreferencesModal;