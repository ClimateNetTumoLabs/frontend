import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./API.module.css";
import "../../i18n";

const API = () => {
    const { t } = useTranslation();

    return (
        <div className={styles.api_page}>
            <h2 className={styles.title}>{t('about.titleWeather')}</h2>
            <p>{t('about.api_info')}</p>

            <h2 className={styles.measure_title}>API Endpoint:</h2>
            <pre>https://emvnh9buoh.execute-api.us-east-1.amazonaws.com/getData</pre>

            <h2 className={styles.measure_title}>{t('about.api_info_param')}</h2>
            <ul>
                <li><strong>device_id:</strong> {t('about.api_info_deviceId')}</li>
                <li>
                    <strong>start_time:</strong> {t('about.api_info_startTime')} ({t('about.api_info_format')} <code>YYYY-MM-DD</code>).
                </li>
                <li>
                    <strong>end_time:</strong> {t('about.api_info_endTime')} ({t('about.api_info_format')} <code>YYYY-MM-DD</code>).
                </li>
            </ul>

            <h2 className={styles.measure_title}>{t('about.api_info_example')}</h2>
            <div className={styles.examples}>
                <pre>
                    GET{" "}
                    <a
                        className={styles.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://emvnh9buoh.execute-api.us-east-1.amazonaws.com/getData?device_id=8&start_time=2023-11-10&end_time=2024-1-8"
                    >
                        https://emvnh9buoh.execute-api.us-east-1.amazonaws.com/getData?device_id=8&start_time=2023-11-10&end_time=2024-1-8
                    </a>
                </pre>

                <h3 className={styles.sub_title_3}>{t('about.api_info_24')}</h3>
                <p>
                    {t('about.api_info_24_request')} <code>start_time</code> {t('about.and')} <code>end_time</code>,{" "}
                    {t('about.api_info_24_request2')}
                </p>
                <pre>
                    <a
                        className={styles.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://emvnh9buoh.execute-api.us-east-1.amazonaws.com/getData?device_id=1"
                    >
                        https://emvnh9buoh.execute-api.us-east-1.amazonaws.com/getData?device_id=1
                    </a>
                </pre>

                <h3 className={styles.sub_title_3}>{t('about.api_info_response')}</h3>
                <p>{t('about.api_info_json')}</p>
            </div>

            <h2 className={styles.measure_title}>{t('about.api_info_usage')}</h2>
            <ul>
                <li>
                    {t('about.api_info_usage2')} (
                    <code>https://emvnh9buoh.execute-api.us-east-1.amazonaws.com/getData</code>
                    ) {t('about.api_info_usage3')} (<code>device_id</code>, <code>start_time</code>, <code>end_time</code>).
                </li>
                <li>{t('about.api_info_usage4')}</li>
                <li>{t('about.api_info_usage5')}</li>
            </ul>

            <p>
                <strong>{t('about.api_info_note')}</strong> {t('about.api_info_note2')}
            </p>

            <p>
                {t('about.api_info_note3')}{" "}
                <a className={styles.link} href="mailto:labs@tumo.org">
                    labs@tumo.org
                </a>
                .
            </p>

            <h2 className={styles.measure_title}>
                {t('about.api_info_note4')}{" "}
                <code>
                    &lt;source&gt;{t('about.api_info_note5')}&lt;/source&gt;
                </code>
            </h2>
            <p>{t('about.api_info_done')}</p>
        </div>
    );
};

export default API;
