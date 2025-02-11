import React, {useState, useEffect} from "react";
import {useTranslation} from "react-i18next";
import "../../i18n";
import styles from "./CookiePreferencesModal.module.css";

const CookiePreferencesModal = ({isOpen, onClose, onSave, preferences}) => {
    const {t} = useTranslation()
    const [localPreferences, setLocalPreferences] = useState({
        name: false,
        email: false,
        phone: false,
        location: false,
        address: false
    });
    useEffect(() => {
        if (isOpen) {
            document.body.classList.add("no-scroll");
        } else {
            document.body.classList.remove("no-scroll");
        }
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
        const {name, checked} = e.target;
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
                <h2 className={styles.title}>{t("cookiePreferencesModal.title")}</h2>
                <p className={styles.legalInfo}>{t("cookiePreferencesModal.legalInfo")}</p>
                <div className={styles.consentOptions}>
                    <label className={styles.checkboxLabel}>
                        <input
                            type="checkbox"
                            name="name"
                            checked={localPreferences.name}
                            onChange={handleCheckboxChange}
                        />
                        {t("cookiePreferencesModal.preferences.name")}
                    </label>
                    <label className={styles.checkboxLabel}>
                        <input
                            type="checkbox"
                            name="email"
                            checked={localPreferences.email}
                            onChange={handleCheckboxChange}
                        />
                        {t("cookiePreferencesModal.preferences.email")}
                    </label>
                    <label className={styles.checkboxLabel}>
                        <input
                            type="checkbox"
                            name="phone"
                            checked={localPreferences.phone}
                            onChange={handleCheckboxChange}
                        />
                        {t("cookiePreferencesModal.preferences.phone")}
                    </label>
                    <label className={styles.checkboxLabel}>
                        <input
                            type="checkbox"
                            name="location"
                            checked={localPreferences.location}
                            onChange={handleCheckboxChange}
                        />
                        {t("cookiePreferencesModal.preferences.location")}
                    </label>
                    <label className={styles.checkboxLabel}>
                        <input
                            type="checkbox"
                            name="address"
                            checked={localPreferences.address}
                            onChange={handleCheckboxChange}
                        />
                        {t("cookiePreferencesModal.preferences.address")}
                    </label>
                </div>

                <div className={styles.actions}>
                    <button className={styles.saveButton} onClick={handleSave}>
                        {t("cookiePreferencesModal.save")}
                    </button>
                    <button className={styles.cancelButton} onClick={onClose}>
                        {t("cookiePreferencesModal.cancel")}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CookiePreferencesModal;