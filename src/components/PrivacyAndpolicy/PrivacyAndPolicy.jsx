import React, { useEffect, useState } from "react";
import styles from './PrivacyAndPolicy.module.css';
import { useTranslation } from "react-i18next";
import "../../i18n";

const PrivacyPolicy = () => {
    const { i18n } = useTranslation(); // Access the current language
    const [privacyPolicy, setPrivacyPolicy] = useState(null);

    useEffect(() => {
        fetch('/api/privacy-policy/')
            .then(response => response.json())
            .then(data => setPrivacyPolicy(data))
            .catch(error => console.error('Error fetching privacy policy:', error));
    }, []);

    if (!privacyPolicy) {
        return <p>Loading...</p>;
    }

    const title = privacyPolicy[i18n.language === 'hy' ? 'title_hy' : 'title_en'];
    const content = privacyPolicy[i18n.language === 'hy' ? 'content_hy' : 'content_en'];

    return (
        <div className={styles.privacy_policy_section}>
            <div className={styles.policy_container}>
                <h1 className={styles.policy_title}>{title}</h1>
                <div
                    className={styles.policy_content}
                    dangerouslySetInnerHTML={{ __html: content }}
                />
            </div>
        </div>
    );
};

export default PrivacyPolicy;
