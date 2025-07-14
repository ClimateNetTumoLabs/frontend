import React, { useEffect, useState } from "react";
import styles from './PrivacyAndPolicy.module.css';
import { useTranslation } from "react-i18next";
import "../../i18n";

const PrivacyPolicy = () => {
    const { i18n } = useTranslation(); // Get i18n instance for current language
    const [privacyPolicy, setPrivacyPolicy] = useState(null);

    useEffect(() => {
        fetch('/privacy/')
            .then(response => response.json())
            .then(data => {
                console.log('Privacy API Response:', data); // Debug log
                setPrivacyPolicy(data);
            })
            .catch(error => console.error('Error fetching privacy policies:', error));
    }, []);

    if (!privacyPolicy) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.privacy_policy_section}>
            <div className="container">
                <div className={styles.policy_container}>
                    <div className={styles.policy_item}>
                        <h1 className={styles.policy_title}>
                            {privacyPolicy[i18n.language === 'hy' ? 'title_hy' : 'title_en']}
                        </h1>
                        <div
                            className={styles.policy_content}
                            dangerouslySetInnerHTML={{
                                __html: privacyPolicy[i18n.language === 'hy' ? 'content_hy' : 'content_en']
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;