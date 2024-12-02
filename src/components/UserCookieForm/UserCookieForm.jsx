import React from 'react';
import CookiePreferencesModal from '../../components/CookiePreferencesModal/CookiePreferencesModal';
import styles from './UserCookieForm.module.css';

const UserCookieForm = ({ onAccept, onPreferences }) => {
    return (
        <div className={styles.container}>
            <div className={styles.banner}>
                <h2 className={styles.title}>Cookies</h2>
                <p className={styles.description}>
                    We use cookies to improve your experience. You can accept all cookies or manage your preferences.
                </p>
                <div className={styles.actions}>
                    <button className={styles.accept} onClick={onAccept}>Accept</button>
                    <button className={styles.preferences} onClick={onPreferences}>Preferences</button>
                </div>
            </div>
        </div>
    );
};

export default UserCookieForm;