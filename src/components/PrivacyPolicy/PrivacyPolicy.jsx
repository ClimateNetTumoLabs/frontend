import React, { useEffect, useState } from "react";
import styles from './PrivacyPolicy.module.css';
import { useTranslation } from "react-i18next";
import Loader from "react-js-loader";
import "../../i18n";

const PrivacyPolicy = () => {
    const { i18n, t } = useTranslation(); // Get i18n instance for current language
    const [privacyPolicies, setPrivacyPolicies] = useState([]);

    useEffect(() => {
        fetch('/privacy/')
            .then(response => response.json())
            .then(data => {
                setPrivacyPolicies(data);
            })
            .catch(error => console.error('Error fetching privacy policies:', error));
    }, []);

    if (privacyPolicies.length === 0) {
        return (
        <>
            <div className={styles.privacy_policy_section}>
                <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Loader
                        type="spinner"
                        bgColor={"#FFFFFF"}
                        color={"#FFFFFF"}
                        size={60}
                    />
                </div> 
            </div>
        </>  
    )}

    return (
        <div className={styles.privacy_policy_section}>
            <div className="container">
                <h1 className={styles.title}>{t("privacyPolicy.title")}</h1>
                <div className={styles.policy_container}>
                    {privacyPolicies.map((policy, index) => (
                        <div className="mb-5 mt-2" key={index}>
                            <h2 className={styles.policy_title}>
                                {policy[i18n.language === 'hy' ? 'title_hy' : 'title_en']}
                            </h2>
                            <div
                                className={styles.policy_content}
                                dangerouslySetInnerHTML={{
                                    __html: policy[i18n.language === 'hy' ? 'content_hy' : 'content_en']
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
