import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styles from "./API.module.css";
import "../../i18n";
import axios from "axios";
import { saveAs } from "file-saver";  // Import file-saver

const API = () => {
    const { t } = useTranslation();

    // States for testing the API
    const [deviceId, setDeviceId] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [devices, setDevices] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Number of devices per page

    useEffect(() => {
        // Fetch the list of devices
        axios
            .get(`/device_inner/list/`)
            .then((response) => {
                setDevices(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    const handleTestAPI = async () => {
        setError(null);
        setResponse(null);

        const endpoint = "https://emvnh9buoh.execute-api.us-east-1.amazonaws.com/getData";

        // Prepare parameters
        const params =
            startTime && endTime
                ? { device_id: deviceId, start_time: startTime, end_time: endTime }
                : { device_id: deviceId };

        try {
            // Send GET request
            const res = await axios.get(endpoint, { params });
            console.log(res.data);
            setResponse(res.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Response Data:", error.response?.data?.error); // Detailed server error message
            } else {
                console.error("Unexpected Error:", error);
            }
            setError(error.response?.data?.error);
        }
    };

    const handleDownload = () => {
        if (response ) {
            // Convert response data to a Blob and trigger a download
            const blob = new Blob([JSON.stringify(response, null, 2)], {
                type: "application/json",
            });
            saveAs(blob, "response.json");
        }
    };

    // Pagination calculations
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentDevices = devices.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(devices.length / itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className={`${styles.api_page} ${styles.darkTheme}`}>
            <h2 className={styles.title}>{t("about.titleWeather")}</h2>
            <p>{t("about.api_info")}</p>

            <div className={styles.tableContainer}>
                <h2 className={styles.measure_title}>Devices:</h2>
                {devices.length > 0 ? (
                    <>
                        <table className={styles.deviceTable}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Parent Name</th>
                                    <th>Select</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentDevices.map((device) => (
                                    <tr key={device.id}>
                                        <td>{device.id}</td>
                                        <td>{device.name_hy}</td>
                                        <td>{device.parent_name_hy}</td>
                                        <td>
                                            <button
                                                className={styles.selectButton}
                                                onClick={() => setDeviceId(device.id)}
                                            >
                                                Select
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className={styles.pagination}>
                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index}
                                    className={`${styles.pageButton} ${
                                        currentPage === index + 1 ? styles.activePage : ""
                                    }`}
                                    onClick={() => handlePageChange(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    </>
                ) : (
                    <p>Loading devices...</p>
                )}
            </div>

            <div className={styles.apiTester}>
                <h2 className={styles.measure_title}>Test the API:</h2>
                <label>
                    Selected Device ID:
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
                {response  && (
                    <button className={styles.downloadButton} onClick={handleDownload}>
                        Download Response
                    </button>
                )}
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
