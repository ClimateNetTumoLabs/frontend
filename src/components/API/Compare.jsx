import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "../../i18n";
import { Helmet } from "react-helmet";
import styles from "./Compare.module.css";
import WeatherDataGraphs from "./WeatherDataGraphs/WeatherDataGraphs";
import InnerPageFilter from "../InnerPageFilter/InnerPageFilter";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortDown, faSortUp, faSort } from "@fortawesome/free-solid-svg-icons";
import Loader from "react-js-loader";
import { Line } from "react-chartjs-2";
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

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const Compare = ({ initialDeviceIds = [] }) => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [devices, setDevices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const itemsPerPage = 5;
  const [chartData, setChartData] = useState(null);
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [selectedMetric, setSelectedMetric] = useState("temperature");
  const [showDeviceSelector, setShowDeviceSelector] = useState(false);
  const [tempSelectedDevices, setTempSelectedDevices] = useState([]);
    
  const today = new Date();
  const [startDate, setStartDate] = useState(new Date(today.getTime() - 24 * 60 * 60 * 1000));
  const [endDate, setEndDate] = useState(today);
  const [problemDevices, setProblemDevices] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [filterState, filterStateChange] = useState('Hourly');
  const [showWelcomeOverlay, setShowWelcomeOverlay] = useState(true);
  const [filterPressed, setFilterPressed] = useState(false);
  const [selected_device_id, setSelected_device_id] = useState([]);
  const [weatherDataByDevice, setWeatherDataByDevice] = useState({});


  const getCurrentDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

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

  const getTimeSeriesEndpoint = (devId) => {    
    const start = startDate.toISOString().split("T")[0];
    const end = endDate.toISOString().split("T")[0];
    return `/device_inner/graph/${devId}/period/?start_time_str=${start}&end_time_str=${end}`;
  };

  useEffect(() => {
    setLoading(true);
    if (selectedDevices.length === 0)
    {
      setLoading(false);
    }
  }, [selectedDevices]);

  useEffect(() => {
    if (initialDeviceIds.length > 0 && devices.length > 0) {
        const initialSelectedDevices = devices
            .filter(device => initialDeviceIds.includes(device.generated_id.toString()))
            .map(device => ({
                value: device.generated_id,
                label: device[i18n.language === "hy" ? "name_hy" : "name_en"] || device.generated_id
            }));
        
        setSelectedDevices(initialSelectedDevices);
        
        // Also set them in temp selection in case modal is opened
        setTempSelectedDevices(initialSelectedDevices);
    }
}, [initialDeviceIds, devices, i18n.language]);

  const handleTimeSeries = async () => {
    setError(null);
    setWeatherDataByDevice({});
    setProblemDevices([]); // Reset problem devices
    if (selectedDevices.length === 0) {
      setLoading(false);
      return;
    }
    // setLoading(true);
  
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

      // Filter devices to only include those without issues for the selected metric
      const filteredDevices = selectedDevices.filter((device) => {
        const deviceData = devices.find((d) => d.generated_id === device.value);
        if (!deviceData) return false;

        // Check for power/internet issues (always skip if present)
        const hasPowerIssue = deviceData.issues?.some((issue) => issue.id === 6);
        if (hasPowerIssue) {
          return false;
        }

        // Check if device has issues for the selected metric
        const relevantIssueIds = metricToIssueMap[selectedMetric] || [];
        const hasMetricIssue = deviceData.issues?.some((issue) =>
          relevantIssueIds.includes(issue.id)
        );
        return !hasMetricIssue;
      });

      // Track problematic devices
      const problematicDevices = selectedDevices.filter((device) => {
        const deviceData = devices.find((d) => d.generated_id === device.value);
        if (!deviceData) return false;

        // Check for power/internet issues
        const hasPowerIssue = deviceData.issues?.some((issue) => issue.id === 6);
        if (hasPowerIssue) return true;

        // Check if device has issues for the selected metric
        const relevantIssueIds = metricToIssueMap[selectedMetric] || [];
        return deviceData.issues?.some((issue) =>
          relevantIssueIds.includes(issue.id)
        );
      }).map((d) => d.label);

      // Show notification if there are problematic devices
      if (problematicDevices.length > 0) {
        setProblemDevices(problematicDevices);
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 5000);
      }

      // If no valid devices after filtering, return early
      if (filteredDevices.length === 0) {
        setWeatherDataByDevice({});
        return;
      }

      const deviceDataPromises = filteredDevices.map((device) =>
        axios.get(getTimeSeriesEndpoint(device.value))
      );

      const responses = await Promise.all(deviceDataPromises);

      const processedData = responses.map((res, index) => {
        if (
          !Array.isArray(res.data) ||
          res.data.length === 0 ||
          res.data[0][selectedMetric] === null
        ) {
          console.error(
            `Invalid response format for device ${filteredDevices[index].label}:`,
            res.data
          );
          return { data: [], label: filteredDevices[index].label };
        }
        return {
          data: res.data.map((d) => ({
            ...d,
            time_interval: new Date(d.time_interval).toISOString(),
          })),
          label: filteredDevices[index].label,
        };
      });

      const weatherData = processedData.reduce((acc, deviceData) => {
        acc[deviceData.label] = deviceData.data.map((d) => ({
          time_interval: d.time_interval,
          value: d[selectedMetric],
        }));
        return acc;
      }, {});

      setWeatherDataByDevice(weatherData);
    } catch (error) {
      setError(
        error.response?.data?.error || "Error fetching time series data."
      );
    } finally {
      setLoading(false);
    }
  };


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
    setTempSelectedDevices(prev => {
      const isSelected = prev.some(d => d.value === device.value);
      if (isSelected) {
        return prev.filter(d => d.value !== device.value);
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
          text: `${t(`compare.chart.${selectedMetric}`)} (${selectedMetric === "temperature" ? "°C" : selectedMetric === "pressure" ? "hPa" : selectedMetric === "humidity" ? "%" : selectedMetric === "uv" ? "index" : selectedMetric === "lux" ? "lux" : ""})`,
        },
      },
    },
  };

  const metricButtons = [
    "temperature",
    "uv",
    "lux",
    "pressure",
    "humidity",
    "pm1",
    "pm2_5",
    "pm10",
    "speed",
    "rain",
  ];

  const deviceOptions = devices.map((device) => ({
    value: device.generated_id,
    label: device[i18n.language === "hy" ? "name_hy" : "name_en"] || device.generated_id,
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

  return (
    <div className={`${styles.api_page} ${styles.darkTheme}`}>
      <div className={"container"}>
        <Helmet>
          <title>ClimateNet | {t("compare.title")}</title>
        </Helmet>
        <h2 className={styles.title}>{t("compare.title")}</h2>
        <p>{t("compare.info")}</p>

        <div className={styles.apiTester}>
          <button 
            className={styles.button}
            onClick={openDeviceSelector}
          >
            {selectedDevices.length > 0 
              ? `Viewing ${selectedDevices.length} device(s) (Click to change)`
              : "Select Devices to Compare"}
          </button>

          {showDeviceSelector && (
          <div className={styles.deviceSelectorModal}>
            <div className={styles.deviceSelectorContent}>
              <h3 className={styles.modalTitle}>Select Devices to Compare</h3>
              <div className={styles.deviceListContainer}>
              {devices.map(device => {
                  const deviceOption = {
                      value: device.generated_id,
                      label: device[i18n.language === "hy" ? "name_hy" : "name_en"] || device.generated_id,
                      parent: device[i18n.language === "hy" ? "parent_name_hy" : "parent_name_en"]
                  };
                  const isChecked = tempSelectedDevices.some(d => d.value === deviceOption.value);
                  const hasIssues = device.issues && device.issues.length > 0;
                  
                  return (
                    <div 
                      key={device.generated_id} 
                      className={styles.deviceListItem}
                      onClick={() => toggleDeviceSelection(deviceOption)}
                    >
                      <input
                        type="checkbox"
                        className={styles.deviceCheckbox}
                        checked={isChecked}
                        onChange={() => {}}
                        onClick={(e) => e.stopPropagation()}
                      />
                      <div className={styles.deviceLabel}>
                        {deviceOption.label}
                        <div className={styles.parentLocation}>{deviceOption.parent}</div>
                      </div>
                      
                      {hasIssues && (
                        <div className={styles.warningIcon}>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#ffcc00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2L2 19h20L12 2z"/>
                            <circle cx="12" cy="16" r="1"/>
                            <path d="M12 8v4"/>
                          </svg>
                          
                          <div className={styles.tooltip}>
                            <div className={styles.tooltipTitle}>
                              {t("compare.deviceIssues")}
                            </div>
                            {device.issues.map((issue, idx) => (
                              <div key={idx} className={styles.tooltipIssue}>
                                {issue[i18n.language === "hy" ? "name_hy" : "name_en"]}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className={styles.deviceSelectorButtons}>
                <button 
                  className={`${styles.modalButton} ${styles.removeAllButton}`}
                  onClick={() => setTempSelectedDevices([])}
                  disabled={tempSelectedDevices.length === 0}
                >
                  Remove All
                </button>
                <div className={styles.rightButtons}>
                  <button 
                    className={`${styles.modalButton} ${styles.cancelButton}`}
                    onClick={handleCancelSelection}
                  >
                    Cancel
                  </button>
                  <button 
                    className={`${styles.modalButton} ${styles.applyButton}`}
                    onClick={handleApplySelection}
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
          
          <div>
          <div className={styles.dataKeys}>
            <label>
              {t("compare.chart.dataKeys")}
            </label>
            <div className={styles.metricButtons}>
              {metricButtons.map((metric) => (
                <button
                  key={metric}
                  className={`${styles.button} ${selectedMetric === metric ? styles.activeButton : ""}`}
                  onClick={() => setSelectedMetric(metric)}
                >
                  {t(`compare.chart.${metric}`)}
                </button>
              ))}
            </div>
          </div>
          </div>
        </div>

        {selectedDevices.length === 0 && !loading && (
          <div className={styles.noDevicesMessage}>
            Please select at least one device to display the chart.
          </div>
        )}

        {weatherDataByDevice && !loading && selectedDevices.length > 0 && (
          <div className={styles.chartContainer}>
            <WeatherDataGraphs
              types={selectedMetric}
              time={Object.values(weatherDataByDevice)[0]?.map(
                (d) => d.time_interval
              )}
              data={
                Object.values(weatherDataByDevice).map(deviceData => 
                  deviceData?.map(d => d.value) || []
                )
              }
              // colors={["#FFFA75", "#77B6EA"]} // Example colors
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
            />
          </div>
        )}

        {loading && (
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
              <span>These devices have issues: {problemDevices.join(", ")}</span>
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
          <InnerPageFilter />
    </div>
  );
};

export default Compare;