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
  const [parentLocations, setParentLocations] = useState([]);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState(null);
  const [activeFilters, setActiveFilters] = useState({
    hasIssues: null, // null = no filter, true = only with issues, false = only without
    parentLocations: [], // Array of selected parent locations
  });
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const filterDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Handle device selector modal
      if (showDeviceSelector && modalRef.current && !modalRef.current.contains(event.target)) {
        handleCancelSelection();
      }
      
      // Handle filter dropdown
      if (showFilterDropdown && filterDropdownRef.current && !filterDropdownRef.current.contains(event.target)) {
        // Check if click was on the filter button
        const filterButton = document.querySelector(`.${styles.filterButton}`);
        if (!filterButton?.contains(event.target)) {
          setShowFilterDropdown(false);
        }
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDeviceSelector, showFilterDropdown]); 

  const toggleFilterDropdown = () => {
    setShowFilterDropdown(prev => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowFilterDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  const handleGetLocation = () => {
    setLocationLoading(true);
    setLocationError(null);
    
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      setLocationLoading(false);
      return;
    }
  
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude: userLat, longitude: userLng } = position.coords;
        
        // Sort devices by distance from user's location
        const sortedDevices = [...devices].sort((a, b) => {
          const distanceA = calculateDistance(
            userLat,
            userLng,
            parseFloat(a.latitude),
            parseFloat(a.longitude)
          );
          const distanceB = calculateDistance(
            userLat,
            userLng,
            parseFloat(b.latitude),
            parseFloat(b.longitude)
          );
          return distanceA - distanceB;
        });
        
        setDevices(sortedDevices);
        setLocationLoading(false);
      },
      (error) => {
        setLocationLoading(false);
        console.error("Geolocation error:", error);
        setLocationError("Unable to retrieve your location, try again later!");
        if (error.message === "User denied Geolocation") {
          setLocationError("Turn on the location access and try again!");
        }
      }
    );
  };

  const sortDevicesWithSelectedFirst = (devices, selectedDevices) => {
    const selectedIds = selectedDevices.map(d => d.value);
    return [...devices].sort((a, b) => {
      const aIsSelected = selectedIds.includes(a.generated_id);
      const bIsSelected = selectedIds.includes(b.generated_id);
      
      if (aIsSelected && !bIsSelected) return -1;
      if (!aIsSelected && bIsSelected) return 1;
      return 0; // keep original order for both selected or both unselected
    });
  };

  const toggleIssueFilter = () => {
    setActiveFilters(prev => ({
      ...prev,
      hasIssues: prev.hasIssues === null ? true : prev.hasIssues === true ? false : null
    }));
  };
  
  const filterByParentLocation = (location) => {
    setActiveFilters(prev => ({
      ...prev,
      parentLocation: prev.parentLocation === location ? null : location
    }));
  };

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

  const filteredDevices = searchTerm.trim()
  ? fuse.search(searchTerm.trim()).map(result => result.item)
  : sortDevicesWithSelectedFirst(devices, tempSelectedDevices)
    .filter(device => {
      // Filter by issues
      if (activeFilters.hasIssues !== null) {
        const hasIssues = device.issues && device.issues.length > 0;
        if (activeFilters.hasIssues !== hasIssues) return false;
      }
      
      // Filter by parent locations (works for both languages)
      if (activeFilters.parentLocations.length > 0) {
        const parentFieldEn = 'parent_name_en';
        const parentFieldHy = 'parent_name_hy';
        const currentLanguageField = i18n.language === 'hy' ? parentFieldHy : parentFieldEn;
        
        // Check if either English or Armenian name matches any selected location
        const matchesLocation = activeFilters.parentLocations.some(location => 
          device[parentFieldEn] === location || device[parentFieldHy] === location
        );
        
        if (!matchesLocation) return false;
      }
      return true;
    });

    useEffect(() => {
      axios
        .get(`/device_inner/list/`)
        .then((response) => {
          const fetchedDevices = response.data;
          setDevices(fetchedDevices);
    
          // Get unique parent locations from both English and Armenian names
          const uniqueParents = [...new Set(
            fetchedDevices.flatMap(device => [
              device.parent_name_en, 
              device.parent_name_hy
            ])
          )].filter(Boolean).sort();
          
          setParentLocations(uniqueParents);
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

  const generateCompleteTimestamps = (startDate, endDate) => {
    const timestamps = [];
    const current = new Date(startDate);
    const end = new Date(endDate);
    
    while (current <= end) {
      timestamps.push(new Date(current).toISOString());
      current.setMinutes(current.getMinutes() + 15);
    }
    
    return timestamps;
  };

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
  
        //TODO: Delete the 6 or 7 for the power Internet Issues
        const hasPowerIssue = deviceData.issues?.some((issue) => (issue.id === 6 || issue.id === 7));
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
  
      // Process responses and handle missing data points
      const apiResponseMap = new Map();
      responses.forEach((res, index) => {
        const device = devicesForApiCall[index];
        if (!Array.isArray(res.data) || res.data.length === 0) {
          console.error(`Invalid response format for device ${device.label}:`, res.data);
          apiResponseMap.set(device.value, { data: [], label: device.label });
          return;
        }

        // Get the first and last timestamps from the response
        const firstTimestamp = new Date(res.data[0].time_interval);
        const lastTimestamp = new Date(res.data[res.data.length - 1].time_interval);
        
        // Generate complete timestamps at 15-minute intervals
        const completeTimestamps = generateCompleteTimestamps(firstTimestamp, lastTimestamp);

        // Create a map of existing data points for quick lookup
        const dataMap = new Map();
        res.data.forEach((d) => {
          dataMap.set(new Date(d.time_interval).toISOString(), {
            ...d,
            time_interval: new Date(d.time_interval).toISOString(),
          });
        });

        // Create complete data array with null for missing points
        const completeData = completeTimestamps.map(timestamp => {
          return dataMap.has(timestamp) ? dataMap.get(timestamp) : {"humidity": null, "lux": null, "pm1": null, "pm10": null, "pm2_5": null, "pressure": null, "rain": null, "speed": null, "temperature": null, "time_interval": timestamp, "uv": null};
        });

        apiResponseMap.set(device.value, {
          data: completeData,
          label: device.label,
        });
      });
  
      // Create processedData maintaining the original selectedDevices order
      const processedData = selectedDevices.map((device) => {
        if (deviceIssuesMap.get(device.value)) {
          return { data: [], label: device.label };
        } else {
          return apiResponseMap.get(device.value) || { data: [], label: device.label };
        }
      });
  
      // Prepare data for the chart
      const weatherData = processedData.reduce((acc, deviceData) => {
        if (!deviceData.data || deviceData.data.length === 0) {
          return acc;
        }    

        acc[deviceData.label] = deviceData.data.map((d) => ({
          time_interval: d?.time_interval || null,
          value: d ? d[selectedMetric] : null,
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
                <div className={styles.filterDropdownContainer} ref={filterDropdownRef}>
                  <button 
                    className={`${styles.filterButton} ${
                      (activeFilters.hasIssues !== null || activeFilters.parentLocations.length > 0) 
                        ? styles.activeFilter 
                        : ''
                    }`}
                    onClick={toggleFilterDropdown}
                    title={t("compare.filterDevices")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={(activeFilters.hasIssues !== null || activeFilters.parentLocations.length > 0) ? "#e07789" : "#9a9a9a"}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"></path>
                      {(activeFilters.hasIssues !== null || activeFilters.parentLocations.length > 0) && (
                        <circle cx="12" cy="9" r="3" fill="#e07789" />
                      )}
                    </svg>
                    {(activeFilters.hasIssues !== null || activeFilters.parentLocations.length > 0) && (
                      <span className={styles.filterIndicator}></span>
                    )}
                  </button>

                  {showFilterDropdown && (
                    <div className={styles.filterDropdown}>
                      <div className={styles.filterSection}>
                        <h4 className={styles.filterSectionTitle}>{t("compare.issueStatus")}</h4>
                        <label className={styles.filterCheckbox}>
                          <input
                            type="checkbox"
                            checked={activeFilters.hasIssues === true}
                            onChange={() => setActiveFilters(prev => ({
                              ...prev,
                              hasIssues: prev.hasIssues === true ? null : true
                            }))}
                          />
                          <span className={styles.checkmark}></span>
                          <span className={styles.filterLabelText}>{t("compare.withIssues")}</span>
                        </label>
                        <label className={styles.filterCheckbox}>
                          <input
                            type="checkbox"
                            checked={activeFilters.hasIssues === false}
                            onChange={() => setActiveFilters(prev => ({
                              ...prev,
                              hasIssues: prev.hasIssues === false ? null : false
                            }))}
                          />
                          <span className={styles.checkmark}></span>
                          <span className={styles.filterLabelText}>{t("compare.withoutIssues")}</span>
                        </label>
                      </div>

                      <div className={styles.filterSection}>
                        <h4 className={styles.filterSectionTitle}>{t("compare.location")}</h4>
                        {parentLocations
                          .filter(location => {
                            // Only show locations that exist in the current language
                            const field = i18n.language === 'hy' ? 'parent_name_hy' : 'parent_name_en';
                            return devices.some(device => device[field] === location);
                          })
                          .map(location => (
                            <label key={location} className={styles.filterCheckbox}>
                              <input
                                type="checkbox"
                                checked={activeFilters.parentLocations.includes(location)}
                                onChange={() => {
                                  setActiveFilters(prev => {
                                    const newLocations = prev.parentLocations.includes(location)
                                      ? prev.parentLocations.filter(l => l !== location)
                                      : [...prev.parentLocations, location];
                                    return {
                                      ...prev,
                                      parentLocations: newLocations
                                    };
                                  });
                                }}
                              />
                              <span className={styles.checkmark}></span>
                              <span className={styles.filterLabelText}>{location}</span>
                            </label>
                          ))}
                      </div>

                      <div className={styles.filterActions}>
                        <button
                          className={styles.clearAllButton}
                          onClick={() => setActiveFilters({
                            hasIssues: null,
                            parentLocations: []
                          })}
                        >
                          {t("compare.clearAll")}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <button 
                    className={styles.locationButton}
                    onClick={handleGetLocation}
                    disabled={locationLoading}
                    title={t("compare.getMyLocation")}
                  >
                    {locationLoading ? (
                      <div className={styles.locationLoader}>
                        {/* <Loader type="spinner" size={20} color={"#9a9a9a"} /> */}
                        <div className={styles.customSpinner}></div>
                      </div>
                    ) : (
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
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                    )}
                  </button>
                </div>
                {locationError && <p className={styles.locationError}>{locationError}</p>}
              <div className={styles.deviceListContainer}>
              {filteredDevices.length > 0 ? (
                filteredDevices.map((device, index) => {
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
                        // className={styles.deviceListItem}
                        className={`${styles.deviceListItem} ${index <= 2 ? styles.firstItem : ''}`}
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
                            {device[
                              i18n.language === "hy" ? "parent_name_hy" : "parent_name_en"
                            ]}
                          </div>
                        </div>

                        {hasIssues && (
                          <div className={`${styles.warningIcon} ${index <= 2 ? styles.firstItemIcon : ''}`}>
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

          {!allDevicesHaveIssues && weatherDataByDevice && !loading && selectedDevices.length > 0 && (
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
                  selected_device_id={selectedDevices
                    .filter(device => !problemDevices.includes(device.label))
                    .map(device => device.value)}
                  showWelcomeOverlay={showWelcomeOverlay}
                  setShowWelcomeOverlay={setShowWelcomeOverlay}
                  filterState={filterState}
                  deviceLabel={Object.keys(weatherDataByDevice)}
                  rawData={rawData}
                  minDate={getMinCreatedDate(selectedDevices, devices)}
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
                  minDate={getMinCreatedDate(selectedDevices, devices)}
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
