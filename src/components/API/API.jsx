import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./API.module.css";
import "../../i18n";
import axios from "axios";
import { useEffect } from "react";

const API = () => {
    const { t } = useTranslation();

    // States for testing the API
    const [deviceId, setDeviceId] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    useEffect(()=>{},[deviceId,startTime,endTime])

const handleTestAPI = async () => {
        setError(null);
        setResponse(null);
      
        const endpoint = "https://emvnh9buoh.execute-api.us-east-1.amazonaws.com/getData";
      
        // Prepare parameters
        const params = startTime && endTime 
          ? { device_id: deviceId, start_time: startTime, end_time: endTime } 
          : { device_id: deviceId };
      
        try {
          // Send GET request
          const res = await axios.get(endpoint, { params });
          console.log(res.data);
          setResponse(res.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Response Data:', error.response?.data?.error); // Detailed server error message
              } else {
                console.error('Unexpected Error:', error);
              }
          setError(error.response?.data?.error);
        }
      };

    return (
        <div className={styles.api_page}>
            <h2 className={styles.title}>{t("about.titleWeather")}</h2>
            <p>{t("about.api_info")}</p>

            <h2 className={styles.measure_title}>API Endpoint:</h2>
            <pre>https://emvnh9buoh.execute-api.us-east-1.amazonaws.com/getData</pre>

            <h2 className={styles.measure_title}>{t("about.api_info_param")}</h2>
            <ul>
                <li>
                    <strong>device_id:</strong> {t("about.api_info_deviceId")}
                </li>
                <li>
                    <strong>start_time:</strong> {t("about.api_info_startTime")} (
                    {t("about.api_info_format")} <code>YYYY-MM-DD</code>).
                </li>
                <li>
                    <strong>end_time:</strong> {t("about.api_info_endTime")} (
                    {t("about.api_info_format")} <code>YYYY-MM-DD</code>).
                </li>
            </ul>

            <h2 className={styles.measure_title}>Test the API:</h2>
            <div className={styles.apiTester}>
                <label>
                    Device ID:
                    <input
                        type="text"
                        value={deviceId}
                        onChange={(e) => setDeviceId(e.target.value)}
                        placeholder="e.g., 8"
                    />
                </label>
                <label>
                    Start Time:
                    <input
                        type="date"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                    />
                </label>
                <label>
                    End Time:
                    <input
                        type="date"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                    />
                </label>
                <button onClick={handleTestAPI}>Test API</button>
            </div>

            {response && (
                <div className={styles.apiResponse}>
                    <h3>Response:</h3>
                    <pre>{JSON.stringify(response, null, 2)}</pre>
                </div>
            )}
            {error && <p className={styles.error}>Error: {error}</p>}

            <p>
                {t("about.api_info_note3")}{" "}
                <a className={styles.link} href="mailto:labs@tumo.org">
                    labs@tumo.org
                </a>
                .
            </p>
        </div>
    );
};

export default API;
