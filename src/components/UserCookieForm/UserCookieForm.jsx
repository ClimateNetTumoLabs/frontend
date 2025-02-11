import React from 'react';
import styles from './UserCookieForm.module.css';
import {useTranslation} from "react-i18next";
import "../../i18n";

const UserCookieForm = ({onAccept, onPreferences}) => {
    const {t} = useTranslation()
    return (
        <div className={styles.cookies}>
            <div className={'d-flex align-items-center'}>
                <img className={styles.cookies_image}
                     src={"https://images-in-website.s3.us-east-1.amazonaws.com/Cookies/cookies.png"}
                     alt="Cookie"/>
                <h2 className={styles.title}>{t("userCookieForm.title")}</h2>

            </div>
            <p className={styles.description}>
                {t("userCookieForm.description")}
            </p>
            <div className={styles.actions}>
                <button className={styles.accept} onClick={onAccept}>{t("userCookieForm.accept")}</button>
                <button className={styles.preferences} onClick={onPreferences}>{t("userCookieForm.preferences")}</button>
            </div>
        </div>
    );
};

export default UserCookieForm;
