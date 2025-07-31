import React, {useState, useEffect, useRef} from "react";
import { useSearchParams } from 'react-router-dom';
import {useTranslation} from "react-i18next";
import "../../i18n";
import { Helmet } from 'react-helmet';
import styles from "./API.module.css";
import axios from "axios";
import {saveAs} from "file-saver";
import screenfull from "screenfull";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSortDown, faSortUp, faSort, faExpand, faCompress} from '@fortawesome/free-solid-svg-icons';
import Loader from "react-js-loader";
import Compare from "../Compare/Compare";

const API = () => {
    const {t} = useTranslation();
    const {i18n} = useTranslation();
    const [isFullscreen, setIsFullscreen] = useState(false);
    const ref = useRef(null);
    const [loading, setLoading] = useState(false);
    const [searchParams] = useSearchParams();
    const [activeTab, setActiveTab] = useState(() => {
        return searchParams.get('tab') || sessionStorage.getItem('activeTab') || 'api';
    });

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        sessionStorage.setItem('activeTab', tab);
    };

    const toggleFullscreen = () => {
        if (screenfull.isEnabled) {
            screenfull.toggle(ref.current);
            setIsFullscreen(!isFullscreen);
        }
    };
    // States for testing the API
    const [deviceId, setDeviceId] = useState("");
    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();
    const [response, setResponse] = useState(null);
    const [endpoint, setEndpoint] = useState("");
    const [error, setError] = useState(null);
    const [devices, setDevices] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortConfig, setSortConfig] = useState({key: null, direction: "asc"});
    const itemsPerPage = 5; // Number of devices per page
    const getCurrentDate = () => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // Ensure 2-digit format
        const dd = String(today.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`; // Format required for <input type="date">
    };

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

    useEffect(() => {
        // Check URL for tab parameter
        const urlParams = new URLSearchParams(window.location.search);
        const tabParam = urlParams.get('tab');
        
        if (tabParam === 'compare') {
            setActiveTab('compare');
            sessionStorage.setItem('activeTab', 'compare');
        }
    }, []);

    const getEndpoint = () => {
        const baseUrl = "https://emvnh9buoh.execute-api.us-east-1.amazonaws.com/getData";
        const params = new URLSearchParams({ device_id: deviceId });

        if (startTime && endTime) {
            params.append("start_time", startTime);
            params.append("end_time", endTime);
        }

        return `${baseUrl}?${params.toString()}`;
    };

    const handleTestAPI = async () => {
        setError(null);
        setResponse(null);
        setLoading(true);

        if ((!startTime && endTime) || (startTime && !endTime)) {
            setError("Choose both start date and end date.");
            setLoading(false);
            return;
        }

        if (startTime && endTime && new Date(startTime) > new Date(endTime)) {
            setError("Start date must be before end date.");
            setLoading(false);
            return;
        }

        const constructedEndpoint = getEndpoint(); // Construct the request URL
        setEndpoint(constructedEndpoint); // Update endpoint state immediately

        try {
            // Send GET request
            const res = await axios.get(constructedEndpoint);
            setResponse(res.data);
            return res.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Response Data:", error.response?.data?.error);
            } else {
                console.error("Unexpected Error:", error);
            }
            setError(error.response?.data?.error);
        } finally {
            setLoading(false);
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
                <Helmet>
                    <title>ClimateNet | OpenAPI Documentation</title>
                </Helmet>
                
                {/* Tab Navigation */}
                <div className={styles.tabContainer}>
                <button
                    className={`${styles.tabButton} ${activeTab === 'api' ? styles.activeTab : ''}`}
                    onClick={() => handleTabChange('api')}
                >
                    {t("api.tab.api")}
                </button>
                <button 
                    className={`${styles.tabButton} ${activeTab === 'compare' ? styles.activeTab : ''}`}
                    onClick={() => handleTabChange('compare')}
                >
                    {t("api.tab.compare")}
                </button>
                </div>

                <div className={`${styles.tabContent} ${activeTab === 'api' ? styles.active : styles.hidden}`}>
                    <>
                        <h2 className={styles.title}>{t("about.titleWeather")}</h2>
                        <p>{t("api.info")}</p>
                        <h2 className={styles.measure_title}>{t('api.info_param')}</h2>
                        <ul>
                            <li><strong>device_id</strong>{t('api.info_deviceId')}</li>
                            <li><strong>start_time</strong>{t('api.info_startTime')} ({t('api.info_format')}
                                <code>YYYY-MM-DD</code>).
                            </li>
                            <li><strong>end_time</strong>{t('api.info_endTime')} ({t('api.info_format')}
                                <code>YYYY-MM-DD</code>).
                            </li>
                        </ul>
                        <h2 className={styles.measure_title}>{t('api.info_example')}</h2>
                        <div className={styles.examples}>
                            <p>{t('api.info_24_request')} <code>start_time</code> {t('api.and')}
                            <code> end_time</code>, {t('api.info_24_request2')}</p>
                            <h3 className={styles.sub_title_3}>{t('api.info_response')}</h3>
                            <p>{t('api.info_json')}</p>
                        </div>

                        <div className={styles.tableContainer}>
                            <h2 className={styles.measure_title}>{t("api.device_table.devices")}</h2>
                            {devices.length > 0 ? (
                                <>
                                    <table className={styles.deviceTable}>
                                        <thead>
                                        <tr>
                                            <th className={"col-2"} style={{width: 13 + "%"}}
                                                onClick={() => handleSort("generated_id")}>
                                                {t("api.device_table.id")}
                                                <FontAwesomeIcon
                                                    icon={sortConfig.key === "generated_id" ? (sortConfig.direction === "asc" ? faSortDown : faSortUp) : faSort}/>
                                            </th>
                                            <th className={"col-3"} style={{width: 20 + "%"}}
                                                onClick={() => handleSort(i18n.language === 'hy' ? 'name_hy' : 'name_en')}>
                                                {t("api.device_table.name")}
                                                <FontAwesomeIcon
                                                    icon={sortConfig.key === (i18n.language === 'hy' ? 'name_hy' : 'name_en') ?
                                                        (sortConfig.direction === "asc" ? faSortDown : faSortUp) : faSort}/>
                                            </th>
                                            <th className={"col-3"} style={{width: 20 + "%"}}
                                                onClick={() => handleSort(i18n.language === 'hy' ? 'parent_name_hy' : 'parent_name_en')}>
                                                {t("api.device_table.parent_name")}
                                                <FontAwesomeIcon
                                                    icon={sortConfig.key === (i18n.language === 'hy' ? 'parent_name_hy' : 'parent_name_en') ?
                                                        (sortConfig.direction === "asc" ? faSortDown : faSortUp) : faSort}/>
                                            </th>
                                            <th className={"col-1"} style={{width: 5 + "%"}}>
                                                {t("api.device_table.select")}
                                            </th>
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
                                                        onClick={() => {
                                                            setDeviceId(device.generated_id);
                                                            const element = document.getElementById('execution');
                                                            if (element) {
                                                                element.scrollIntoView({ behavior: 'smooth' });
                                                            }
                                                        }}
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

                        <div id="execution" className={styles.apiTester}>
                            <div className={styles.selectedId}>
                                <label>
                                    {t("api.execution.device_id")}
                                    <input
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
                                        style={{ WebkitAppearance: 'none', appearance: 'none' }}
                                        type="date"
                                        max={getCurrentDate()}
                                        value={startTime}
                                        onChange={(e) => setStartTime(e.target.value)}
                                    />
                                </label>
                                <label>
                                    {t("api.execution.end")}
                                    <input
                                        style={{ WebkitAppearance: 'none', appearance: 'none' }}
                                        type="date"
                                        max={getCurrentDate()}
                                        value={endTime}
                                        onChange={(e) => setEndTime(e.target.value)}
                                    />
                                </label>
                            </div>
                            <button
                                className={styles.button}
                                onClick={async () => {
                                    await handleTestAPI();
                                    setTimeout(() => {
                                        const element = document.getElementById('execution');
                                        if (element) {
                                            element.scrollIntoView({ behavior: 'smooth' });
                                        }
                                    }, 100);
                                }}
                            >
                                {t("api.execution.execute")}
                            </button>
                            {response && !loading && (
                                <button className={styles.button} onClick={handleDownload}>
                                    {t("api.execution.download")}
                                </button>
                            )}
                        </div>
                        {loading &&
                            <Loader
                                type="spinner"
                                bgColor={"#FFFFFF"}
                                color={"#FFFFFF"}
                                size={60}
                            />
                        }
                        {response && !loading &&(
                            <>
                            <div className={styles.endpointDisplay}>
                                <p>
                                    {t("api.execution.endpoint")}
                                    <a
                                        href={endpoint}
                                        target="_blank"
                                        rel="noreferrer"
                                        className={styles.link}
                                    >
                                        {endpoint}
                                    </a>
                                </p>
                            </div>
                            <div id="response" className={styles.apiResponse} ref={ref}>
                                <div className="d-flex justify-content-between text-align-center">
                                <h3>Response:</h3>
                                <button onClick={toggleFullscreen}>
                                    <FontAwesomeIcon icon={isFullscreen ? faCompress : faExpand} size="lg" />
                                </button>
                                </div>
                                    <pre>{JSON.stringify(response, null, 2)}</pre>
                            </div>
                            </>
                        )}

                {error && <p className={styles.error}>Error: {error}</p>}
                <p>
                    {t("api.info_note3")}{" "}
                    <a className={styles.link} href="mailto:labs@tumo.org">
                        labs@tumo.org
                    </a>
                    .
                </p>
                <div className={styles.tag}>
                    <p className={styles.title}>{t('api.info_note4')}</p>
                    <p>{t('api.license')}</p>
                    <li>
                        {t('api.license2')}
                    </li>
                    <li>
                        {t('api.license3')}
                    </li>

                    <br/><code>&lt;p&gt;{t('api.info_note5')}&lt;/p&gt;</code>
                    <p className="mb-5 mt-2">
                        {t('api.license4')}
                        <br/>
                        {t('api.license5')}
                        <br/>
                        {t('api.info_done')} <a className={styles.link} href="https://creativecommons.org/licenses/by/4.0/">Creative Commons</a>.

                    </p>
                    </div>
                        {error && <p className={styles.error}>Error: {error}</p>}
                        <p>
                            {t("api.info_note3")}{" "}
                            <a className={styles.link} href="mailto:labs@tumo.org">
                                labs@tumo.org
                            </a>
                            .
                        </p>
                        <h2 className={styles.tag}>{t('api.info_note4')}
                            <br/><code>&lt;p&gt;{t('api.info_note5')}&lt;/p&gt;</code></h2>
                        <p className={styles.done}>{t('api.info_done')}</p>
                    </>
                    </div>
                    <div className={`${styles.tabContent} ${activeTab === 'compare' ? styles.active : styles.hidden}`}>
                        <Compare initialDeviceIds={new URLSearchParams(window.location.search).get('devices')?.split(',') || []} />
                    </div>
            </div>
        </div>
    );
};

export default API;