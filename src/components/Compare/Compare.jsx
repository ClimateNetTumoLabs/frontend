import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import "../../i18n";
import { Helmet } from "react-helmet";
import styles from "./Compare.module.css";
import CompareChart from "../CompareChart/CompareChart";
import InnerPageFilter from "../InnerPageFilter/InnerPageFilter";
import axios from "axios";
import Fuse from "fuse.js"
import Loader from "react-js-loader";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const Compare = ({ initialDeviceIds = [] }) => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [devices, setDevices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const itemsPerPage = 5;
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [selectedMetric, setSelectedMetric] = useState("temperature");
  const [showDeviceSelector, setShowDeviceSelector] = useState(false);
  const [tempSelectedDevices, setTempSelectedDevices] = useState([]);

  const today = new Date();
  const [startDate, setStartDate] = useState(
    new Date(today.getTime() - 24 * 60 * 60 * 1000)
  );
  const [endDate, setEndDate] = useState(today);
  const [problemDevices, setProblemDevices] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [filterState, filterStateChange] = useState("Hourly");
  const [showWelcomeOverlay, setShowWelcomeOverlay] = useState(true);
  const [filterPressed, setFilterPressed] = useState(false);
  const [weatherDataByDevice, setWeatherDataByDevice] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [allDevicesHaveIssues, setAllDevicesHaveIssues] = useState(false);
  const [rawData, setRawData] = useState([]);
  const modalRef = useRef(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const handleCloseDatePicker = () => {
    setShowDatePicker(false);
  };
  const [leftLoad, setLeftLoad] = useState(true);

  const fuse = new Fuse(devices, {
    keys: [
      'generated_id',

      'name_en',
      'parent_name_en',
      
      'name_hy',
      'parent_name_hy',
    ],
    threshold: 0.5, // Sensitivity: 0.0 = exact match, 1.0 = very loose
    ignoreLocation: true, // Match anywhere in the string
    includeScore: true, // Include score for potential sorting
  });

  // Update filteredDevices using fuse.js
  const filteredDevices = searchTerm.trim()
    ? fuse.search(searchTerm.trim()).map(result => result.item)
    : devices;

  useEffect(() => {
    axios
      .get(`/device_inner/list/`)
      .then((response) => {
        const fetchedDevices = response.data;
        setDevices(fetchedDevices);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [i18n.language]);

  const getDateOnly = (date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0'); // Ensure 2-digit format
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`; // Format required for <input type="date">
  };

  const getMinCreatedDate = (selectedDevices, allDevices) => {
    if (!selectedDevices.length || !allDevices.length) return new Date();
    
    const selectedDeviceData = selectedDevices.map(device => 
      allDevices.find(d => d.generated_id === device.value)
    ).filter(Boolean);
    
    if (!selectedDeviceData.length) return new Date();
    
    const createdDates = selectedDeviceData.map(device => 
      new Date(device.created_at)
    );
    
    return new Date(Math.max(...createdDates));
  };

  const getTimeSeriesEndpoint = (devId) => {
    const start = getDateOnly(startDate);
    const end = getDateOnly(endDate);
    return `/device_inner/graph/${devId}/period/?start_time_str=${start}&end_time_str=${end}`;
  };

  useEffect(() => {
    setLoading(true);
    if (selectedDevices.length === 0) {
      setLoading(false);
    }
  }, [selectedDevices]);

  useEffect(() => {
    if (initialDeviceIds.length > 0 && devices.length > 0) {
      const initialSelectedDevices = devices
        .filter((device) =>
          initialDeviceIds.includes(device.generated_id.toString())
        )
        .map((device) => ({
          value: device.generated_id,
          label:
            device[i18n.language === "hy" ? "name_hy" : "name_en"] ||
            device.generated_id,
        }));

      setSelectedDevices(initialSelectedDevices);

      // Also set them in temp selection in case modal is opened
      setTempSelectedDevices(initialSelectedDevices);
    }
  }, [initialDeviceIds, devices, i18n.language]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showDeviceSelector && modalRef.current && !modalRef.current.contains(event.target)) {
        handleCancelSelection();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDeviceSelector]);

  const handleTimeSeries = async () => {
    setError(null);
    setWeatherDataByDevice({});
    setProblemDevices([]);
    setAllDevicesHaveIssues(false);
  
    if (selectedDevices.length === 0) {
      setLoading(false);
      return;
    }
  
    try {
      const datasets = [];
  
      // Map metric to issue IDs
      const metricToIssueMap = {
        temperature: [1], // Temperature, Humidity, Pressure
        humidity: [1], // Temperature, Humidity, Pressure
        pressure: [1], // Temperature, Humidity, Pressure
        uv: [2], // UV Index and Light Intensity
        lux: [2], // UV Index and Light Intensity
        pm1: [3], // Air Pollution
        pm2_5: [3], // Air Pollution
        pm10: [3], // Air Pollution
        wind_speed: [4], // Wind Speed and Direction
        rain: [5], // Rainfall Quantity
        // Power/Internet (6) affects all metrics
      };
  
      // Create a map to track which devices have issues
      const deviceIssuesMap = new Map();
      const problematicDevices = [];
      
      selectedDevices.forEach((device) => {
        const deviceData = devices.find((d) => d.generated_id === device.value);
        if (!deviceData) {
          deviceIssuesMap.set(device.value, true);
          return;
        }
  
        // Check for power/internet issues (always skip if present)
        const hasPowerIssue = deviceData.issues?.some((issue) => issue.id === 6);
        
        // Check if device has issues for the selected metric
        const relevantIssueIds = metricToIssueMap[selectedMetric] || [];
        const hasMetricIssue = deviceData.issues?.some((issue) =>
          relevantIssueIds.includes(issue.id)
        );
        
        const hasIssues = hasPowerIssue || hasMetricIssue;
        deviceIssuesMap.set(device.value, hasIssues);
        
        if (hasIssues) {
          problematicDevices.push(device.label);
        }
      });
  
      // Show notification if there are problematic devices
      if (problematicDevices.length > 0) {
        setProblemDevices(problematicDevices);
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 5000);
      }
  
      // Filter devices for API calls (only devices without issues)
      const devicesForApiCall = selectedDevices.filter(
        (device) => !deviceIssuesMap.get(device.value)
      );
  
      // If no valid devices after filtering, return early
      if (devicesForApiCall.length === 0) {
        setWeatherDataByDevice({});
        setAllDevicesHaveIssues(true);
        // Still set rawData with empty arrays for all selected devices
        const emptyProcessedData = selectedDevices.map((device) => ({
          data: [],
          label: device.label,
        }));
        setRawData(emptyProcessedData);
        return;
      }
  
      // Make API calls only for devices without issues
      const deviceDataPromises = devicesForApiCall.map((device) =>
        axios.get(getTimeSeriesEndpoint(device.value))
      );
  
      const responses = await Promise.all(deviceDataPromises);
  
      // Process responses for devices without issues
      const apiResponseMap = new Map();
      responses.forEach((res, index) => {
        const device = devicesForApiCall[index];
        if (
          !Array.isArray(res.data) ||
          res.data.length === 0 ||
          res.data[0][selectedMetric] === null
        ) {
          console.error(`Invalid response format for device ${device.label}:`, res.data);
          apiResponseMap.set(device.value, { data: [], label: device.label });
        } else {
          apiResponseMap.set(device.value, {
            data: res.data.map((d) => ({
              ...d,
              time_interval: new Date(d.time_interval).toISOString(),
            })),
            label: device.label,
          });
        }
      });
  
      // Create processedData maintaining the original selectedDevices order
      const processedData = selectedDevices.map((device) => {
        if (deviceIssuesMap.get(device.value)) {
          // Device has issues, return empty data
          return { data: [], label: device.label };
        } else {
          // Device doesn't have issues, get its data from API responses
          return apiResponseMap.get(device.value) || { data: [], label: device.label };
        }
      });
  
      const weatherData = processedData.reduce((acc, deviceData) => {
        acc[deviceData.label] = deviceData.data.map((d) => ({
          time_interval: d.time_interval,
          value: d[selectedMetric],
        }));
        return acc;
      }, {});
  
      setWeatherDataByDevice(weatherData);
      setRawData(processedData);
    } catch (error) {
      setError(
        error.response?.data?.error || "Error fetching time series data."
      );
    } finally {
      setLoading(false);
    }
  };

  // TODO: Add null values between the time intervals where device didn't work
  // useEffect(() => {
  //   console.log(rawData);
  // }, [rawData]);

  useEffect(() => {
    if (selectedDevices.length > 0) {
      handleTimeSeries();
    }
  }, [selectedDevices, selectedMetric, startDate, endDate]);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sortedDevices = [...devices].sort((a, b) => {
      const aValue = a[key];
      const bValue = b[key];
      if (!isNaN(aValue) && !isNaN(bValue)) {
        return direction === "asc" ? aValue - bValue : bValue - aValue;
      } else {
        return direction === "asc"
          ? aValue.localeCompare(bValue, undefined, { numeric: true })
          : bValue.localeCompare(aValue, undefined, { numeric: true });
      }
    });
    setDevices(sortedDevices);
  };

  const toggleDeviceSelection = (device) => {
    setTempSelectedDevices((prev) => {
      const isSelected = prev.some((d) => d.value === device.value);
      if (isSelected) {
        return prev.filter((d) => d.value !== device.value);
      } else {
        return [...prev, device];
      }
    });
  };

  const handleApplySelection = () => {
    setSelectedDevices(tempSelectedDevices);
    setShowDeviceSelector(false);
  };

  const handleCancelSelection = () => {
    setTempSelectedDevices(selectedDevices);
    setShowDeviceSelector(false);
  };

  const openDeviceSelector = () => {
    setTempSelectedDevices(selectedDevices);
    setShowDeviceSelector(true);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDevices = devices.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(devices.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: t("compare.chart.title") },
    },
    scales: {
      x: { title: { display: true, text: t("compare.chart.xAxis") } },
      y: {
        title: {
          display: true,
          text: `${t(`compare.chart.${selectedMetric}`)} (${
            selectedMetric === "temperature"
              ? "°C"
              : selectedMetric === "pressure"
              ? "hPa"
              : selectedMetric === "humidity"
              ? "%"
              : selectedMetric === "uv"
              ? "index"
              : selectedMetric === "lux"
              ? "lux"
              : ""
          })`,
        },
      },
    },
  };

  const metricButtons = [
    "temperature",
    "humidity",
    "pressure",
    "pm1",
    "pm2_5",
    "pm10",
    "uv",
    "lux",
    "rain",
    "speed",
  ];

  const deviceOptions = devices.map((device) => ({
    value: device.generated_id,
    label:
      device[i18n.language === "hy" ? "name_hy" : "name_en"] ||
      device.generated_id,
  }));

  useEffect(() => {
    if (selectedDevices.length > 0) {
      setLoading(true);
    }
  }, [selectedMetric]);

  const scrollToChart = () => {
    setTimeout(() => {
      const chartElement = document.getElementById("chart");
      if (chartElement) {
        chartElement.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
      }
    }, 100);
  };

  useEffect(() => {
    if (!loading) {
      scrollToChart();
    }
  }, [loading]);

  useEffect(() => {
    const currentDate = new Date();
    let start;
    let end = currentDate;
    switch (filterState) {
      case "Hourly":
        start = new Date(currentDate.getTime() - 24 * 60 * 60 * 1000);
        break;
      case "Daily":
        start = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case "Monthly":
        start = new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case "Range":
        start = startDate;
        end = endDate;
        break;
    }
    setStartDate(start);
    setEndDate(end);

  }, [filterState]);

  return (
    <div className={`${styles.api_page} ${styles.darkTheme}`}>
      <div className={`${styles.container}`}>
        <Helmet>
          <title>ClimateNet | {t("compare.title")}</title>
        </Helmet>
        <h2 className={styles.title}>{t("compare.title")}</h2>
        <p>{t("compare.info")}</p>

        <div className={styles.apiTester}>
          <button className={styles.button} onClick={openDeviceSelector}>
            {selectedDevices.length > 0
              ? `${t("compare.conditionalCheckboxButton1")} ${
                  selectedDevices.length
                } ${t("compare.conditionalCheckboxButton2")}`
              : t("compare.checkboxButton")}
          </button>

          {showDeviceSelector && (
            <div
              className={styles.deviceSelectorModal}
              onClick={handleCancelSelection}
              ref={modalRef}  
            >
              <div 
                className={styles.deviceSelectorContent}
                onClick={(e) => e.stopPropagation()}
              >
              <h3 className={styles.modalTitle}>{t("compare.selectDevices")}</h3>
              
              <div className={styles.searchContainer}>
                  <div className={styles.searchIcon}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#9a9a9a"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </div>

                <input
                  type="text"
                  placeholder={t("compare.searchPlaceholder")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value.trim())}
                  className={styles.searchInput}
                />
              </div>
        
              <div className={styles.deviceListContainer}>
              {filteredDevices.length > 0 ? (
                filteredDevices.map((device) => {
                    const deviceOption = {
                      value: device.generated_id,
                      label:
                        device[
                          i18n.language === "hy" ? "name_hy" : "name_en"
                        ] || device.generated_id,
                      parent:
                        device[
                          i18n.language === "hy"
                            ? "parent_name_hy"
                            : "parent_name_en"
                        ],
                    };
                    const isChecked = tempSelectedDevices.some(
                      (d) => d.value === deviceOption.value
                    );
                    const hasIssues = device.issues && device.issues.length > 0;

                    return (
                      <div
                        key={device.generated_id}
                        className={styles.deviceListItem}
                        onClick={() => toggleDeviceSelection(deviceOption)}
                      >
                        <div className={styles.checkboxContainer}>
                          <input
                            type="checkbox"
                            className={styles.deviceCheckbox}
                            checked={isChecked}
                            onChange={() => {}}
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleDeviceSelection(deviceOption);
                            }}
                          />
                        </div>
                        <div className={styles.deviceLabel}>
                          {deviceOption.label}
                          <div className={styles.parentLocation}>
                            {deviceOption.parent}
                          </div>
                        </div>

                        {hasIssues && (
                          <div className={styles.warningIcon}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#ffcc00"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M12 2L2 19h20L12 2z" />
                              <circle cx="12" cy="16" r="1" />
                              <path d="M12 8v4" />
                            </svg>

                            <div className={styles.tooltip}>
                              <div className={styles.tooltipTitle}>
                                {t("compare.deviceIssues")}
                              </div>
                              {device.issues.map((issue, idx) => (
                                <div key={idx} className={styles.tooltipIssue}>
                                  {
                                    issue[
                                      i18n.language === "hy"
                                        ? "name_hy"
                                        : "name_en"
                                    ]
                                  }
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })
                  ) : (
                    <div className={styles.noResults}>
                      {t("compare.noResultsFound")}
                    </div>
                  )}
                </div>
                <div className={styles.deviceSelectorButtons}>
                  <button
                    className={`${styles.modalButton} ${styles.removeAllButton}`}
                    onClick={() => setTempSelectedDevices([])}
                    disabled={tempSelectedDevices.length === 0}
                  >
                    {t("compare.removeAll")}
                  </button>
                  <div className={styles.rightButtons}>
                    <button
                      className={`${styles.modalButton} ${styles.cancelButton}`}
                      onClick={handleCancelSelection}
                    >
                      {t("compare.cancel")}
                    </button>
                    <button
                      className={`${styles.modalButton} ${styles.applyButton}`}
                      onClick={handleApplySelection}
                    >
                      {t("compare.apply")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className={styles.chartSection}>
            <div className={styles.dataKeys}>
              <label>{t("compare.chart.dataKeys")}</label>
              <div className={styles.metricButtons}>
                {metricButtons.map((metric) => (
                  <button
                    key={metric}
                    className={`${styles.button} ${
                      selectedMetric === metric ? styles.activeButton : ""
                    }`}
                    onClick={() => setSelectedMetric(metric)}
                  >
                    {t(`compare.chart.${metric}`)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {selectedDevices.length === 0 && !loading && (
            <div className={styles.noDevicesMessage}>
              {t("compare.noDevicesMessage")}
            </div>
          )}

          {allDevicesHaveIssues && (
            <div className={styles.noDevicesMessage}>
              {t("compare.noValidDataMessage")}
            </div>
          )}

          {weatherDataByDevice && !loading && selectedDevices.length > 0 && (
            <>
              <div className={styles.chartContainer}>
                <CompareChart
                  types={selectedMetric}
                  time={
                    Object.values(weatherDataByDevice)[0]?.map(
                      (d) => d.time_interval
                    ) || []
                  }
                  data={Object.values(weatherDataByDevice).map(
                    (deviceData) => deviceData?.map((d) => d.value) || []
                  )}
                  timeline={filterState}
                  startDate={startDate}
                  endDate={endDate}
                  setStartDate={setStartDate}
                  setEndDate={setEndDate}
                  filterChange={filterStateChange}
                  filterPressed={filterPressed}
                  setFilterPressed={setFilterPressed}
                  selected_device_id={selectedDevices.map((d) => d.value)}
                  showWelcomeOverlay={showWelcomeOverlay}
                  setShowWelcomeOverlay={setShowWelcomeOverlay}
                  filterState={filterState}
                  deviceLabel={selectedDevices.map((d) => d.label)}
                  rawData={rawData}
                  minDate={getMinCreatedDate(selectedDevices, devices)}
                  // leftLoad={leftLoad}
                  // setLeftLoad={setLeftLoad}
                />
              </div>
              <div className={styles.filterButtons}>
                <InnerPageFilter
                  filterState={filterState}
                  filterChange={filterStateChange}
                  startDate={startDate}
                  setStartDate={setStartDate}
                  endDate={endDate}
                  setEndDate={setEndDate}
                  error={error}
                  setError={setError}
                  showDatePicker={showDatePicker}
                  setShowDatePicker={setShowDatePicker}
                  handleCloseDatePicker={handleCloseDatePicker}
                  leftLoad={leftLoad}
                  setLeftLoad={setLeftLoad}
                />
              </div>
            </>
          )}
        </div>

        {loading && !allDevicesHaveIssues && (
          <Loader
            type="spinner"
            bgColor={"#FFFFFF"}
            color={"#FFFFFF"}
            size={60}
          />
        )}

        {error && <p className={styles.error}>Error: {error}</p>}
        {showNotification && (
          <div className={styles.notification}>
            <div className={styles.notificationContent}>
              <span>
                {t("compare.devicesWithIssues")} {problemDevices.join(", ")}
              </span>
              <button
                className={styles.notificationClose}
                onClick={() => setShowNotification(false)}
              >
                ×
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Compare;
