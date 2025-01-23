import React from 'react';
import styles from './UserCookieForm.module.css';

const UserCookieForm = ({ onAccept, onPreferences }) => {
    return (
        <div className={styles.cookies}>
            <div className={'d-flex align-items-center'}>
                <img className={styles.cookies_image} src={"https://images-in-website.s3.us-east-1.amazonaws.com/Cookies/cookies.png"} alt="Cookies image" />
                <h2 className={styles.title}>Cookies</h2>

            </div>
            <p className={styles.description}>
                We collect cookies and personal data (name, email, phone location and address) to improve your experience.
                You can accept all or manage your preferences.
            </p>
            <div className={styles.actions}>
                <button className={styles.accept} onClick={onAccept}>Accept</button>
                <button className={styles.preferences} onClick={onPreferences}>Preferences</button>
            </div>
        </div>
    );
};

export default UserCookieForm;
