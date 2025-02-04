import React, {useState, useEffect} from "react";
import {useTranslation} from "react-i18next";
import styles from "./API.module.css";
import "../../i18n";
import axios from "axios";
import {saveAs} from "file-saver";  // Import file-saver
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSortDown, faSortUp, faSort} from '@fortawesome/free-solid-svg-icons';

const API = () => {
    const {t} = useTranslation();
    const {i18n} = useTranslation();
    // States for testing the API
    const [deviceId, setDeviceId] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [devices, setDevices] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortConfig, setSortConfig] = useState({key: null, direction: "asc"});
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
                ? {device_id: deviceId, start_time: startTime, end_time: endTime}
                : {device_id: deviceId};

        try {
            // Send GET request
            const res = await axios.get(endpoint, {params});
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
        if (response) {
            // Convert response data to a Blob and trigger a download
            const blob = new Blob([JSON.stringify(response, null, 2)], {
                type: "application/json",
            });
            saveAs(blob, "response.json");
        }
    };

    const handleSort = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({key, direction});

        const sortedDevices = [...devices].sort((a, b) => {
            const aValue = a[key];
            const bValue = b[key];

            if (!isNaN(aValue) && !isNaN(bValue)) {
                // Numeric sorting
                return direction === "asc" ? aValue - bValue : bValue - aValue;
            } else {
                // String sorting (case-insensitive)
                return direction === "asc"
                    ? aValue.localeCompare(bValue, undefined, {numeric: true})
                    : bValue.localeCompare(aValue, undefined, {numeric: true});
            }
        });

        setDevices(sortedDevices);
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
            <div className={'container'}>
                <h2 className={styles.title}>{t("about.titleWeather")}</h2>
                <p>{t("api.info")}</p>
                <h2 class={styles.measure_title}>{t('api.info_param')}</h2>
                <ul>
                    <li><strong>device_id</strong>{t('api.info_deviceId')}</li>
                    <li><strong>start_time</strong>{t('api.info_startTime')} ({t('api.info_format')}
                        <code>YYYY-MM-DD</code>).
                    </li>
                    <li><strong>end_time</strong>{t('api.info_endTime')} ({t('api.info_format')}
                        <code>YYYY-MM-DD</code>).
                    </li>
                </ul>
                <h2 class={styles.measure_title}>{t('api.info_example')}</h2>
                <div class={styles.examples}>
                    <p>{t('api.info_24_request')} <code>start_time</code> {t('about.and')}
                        <code> end_time</code>, {t('api.info_24_request2')}</p>
                    <h3 class={styles.sub_title_3}>{t('api.info_response')}</h3>
                    <p>{t('api.info_json')}</p>

                </div>

                <div className={styles.tableContainer}>
                    <h2 className={styles.measure_title}>{t("api.device_table.devices")}</h2>
                    {devices.length > 0 ? (
                        <>
                            <table className={styles.deviceTable}>
                                <thead>
                                <tr>
                                    <th onClick={() => handleSort("generated_id")}>
                                        ID
                                        <FontAwesomeIcon
                                            icon={sortConfig.key === "generated_id" ? (sortConfig.direction === "asc" ? faSortDown : faSortUp) : faSort}/>
                                    </th>
                                    <th onClick={() => handleSort(i18n.language === 'hy' ? 'name_hy' : 'name_en')}>
                                        {t("api.device_table.name")}
                                        <FontAwesomeIcon className={styles.sort}
                                            icon={sortConfig.key === (i18n.language === 'hy' ? 'name_hy' : 'name_en') ? (sortConfig.direction === "asc" ? faSortDown : faSortUp) : faSort}/>
                                    </th>
                                    <th onClick={() => handleSort(i18n.language === 'hy' ? 'parent_name_hy' : 'parent_name_en')}>
                                        {t("api.device_table.parent_name")}
                                        <FontAwesomeIcon
                                            icon={sortConfig.key === (i18n.language === 'hy' ? 'parent_name_hy' : 'parent_name_en') ? (sortConfig.direction === "asc" ? faSortDown : faSortUp) : faSort}/>
                                    </th>
                                    <th>{t("api.device_table.select")}</th>
                                </tr>
                                </thead>
                                <tbody>
                                {currentDevices.map((device) => (
                                    <tr key={device.generated_id}>
                                        <td>{device.generated_id}</td>
                                        <td>{device[i18n.language === 'hy' ? 'name_hy' : 'name_en']}</td>
                                        <td>{device[i18n.language === 'hy' ? 'parent_name_hy' : 'parent_name_en']}</td>
                                        <td>
                                            <button
                                                className={styles.selectButton}
                                                onClick={() => setDeviceId(device.generated_id)}
                                            >
                                                {t("api.device_table.select")}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            <div>
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
                    <div className={styles.selectedId}>
                        <label>
                            {t("api.execution.device_id")}
                            <input
                                className={styles.starLabel}
                                type="text"
                                value={deviceId}
                                onChange={(e) => setDeviceId(e.target.value)}
                                placeholder="e.g., 8"
                                required
                            />
                        </label>
                    </div>
                    <div className={styles.calendar}>
                        <label>
                            {t("api.execution.start")}
                            <input
                                type="date"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                            />
                        </label>
                        <label>
                            {t("api.execution.end")}
                            <input
                                type="date"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                            />
                        </label>
                    </div>
                    <button className={styles.button} onClick={handleTestAPI}>{t("api.execution.execute")}</button>
                    {response && (
                        <button className={styles.button} onClick={handleDownload}>
                            {t("api.execution.download")}
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
                    {t("api.info_note3")}{" "}
                    <a className={styles.link} href="mailto:labs@tumo.org">
                        labs@tumo.org
                    </a>
                    .
                </p>
                <h2 class={styles.measure_title}>{t('api.info_note4')}
                    <br/><code>&lt;source&gt;{t('api.info_note5')}</code></h2>
                <p class={styles.done}>{t('api.info_done')}</p>
            </div>
        </div>
    );
};

export default API;
