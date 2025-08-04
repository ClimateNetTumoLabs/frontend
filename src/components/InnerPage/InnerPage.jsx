import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./InnerPage.module.css";
import InnerPageLeftNav from "../InnerPageLeftNav/InnerPageLeftNav";
import InnerPageContent from "../InnerPageContent/InnerPageContent";
import { PositionContext } from "../../context/PositionContext";
import { useTranslation } from "react-i18next";
import "../../i18n";
import { Helmet } from "react-helmet";
import InnerPageFilter from "../InnerPageFilter/InnerPageFilter";

function InnerPage({  deviceId  }) {
  const {  t, i18n  } = useTranslation();
  const params = useParams();
  const [weather_data, change_weather_data] = useState([]);
  const [filterState, filterStateChange] = useState("Hourly");
  const {  permissionGranted, setPosition, setPermissionGranted  } =
    useContext(PositionContext);
  const today = new Date();
  const [startDateState, setStartDate] = useState(
    new Date(today.getTime() - 24 * 60 * 60 * 1000)
  );
  const [endDateState, setEndDate] = useState(new Date());
  const [error, setError] = useState(null);
  const [leftLoad, setLeftLoad] = useState(true);
  const [lastData, setLastData] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [filterPressed, setFilterPressed] = useState(false);
    const [statsData, setStatsData] = useState({});
  const prevUrlRef = useRef(null);
  const [preferences] = useState(
    JSON.parse(localStorage.getItem("cookiePreferences")) || {}
  );
  const handleCloseDatePicker = () => {
    setShowDatePicker(false);
  };
  const [minDate, setMinDate] = useState(new Date());
  const [isNavOpen, setIsNavOpen] = useState(true);
  const [hasPowerInternetIssue, setHasPowerInternetIssue] = useState(false);

  const saveCookies = (longitude, latitude) => {
    if (preferences?.location) {
      document.cookie = `location=${longitude} ${latitude} ; path=/;`;
    }
  };

  const scrollToTop = () => {
    setTimeout(() => {
      const chartElement = document.getElementById("innerPageStaticContent");
      if (chartElement) {
        chartElement.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
      }
    }, 100);
  };    

  useEffect(() => {
      
      const fetchData = async () => {
          try {
              axios.get(`/device_inner/${params.id}/latest/`).then((res) => {
                  setLastData(res.data);
                });
            } catch (error) {
                console.error("Error fetching devices:", error);
            }
        };
        
        fetchData();
        scrollToTop();
        // filterStateChange("Hourly");
  }, [params.id]);

  const [device, setDevice] = useState({});

  useEffect(() => {
    axios
      .get(`/device_inner/${params.id}/`)
      .then((response) => {
        setDevice(response.data);
        setMinDate(new Date(response.data.created_at));
        
        // Check if device has power/internet issues
        const hasIssue = response.data.issues?.some(
          issue => issue.name === "Power/Internet" || 
                  issue.name_en === "Power/Internet" || 
                  issue.name_hy === "Հոսանք/Համացանց"
        );
        setHasPowerInternetIssue(hasIssue);
        
        if (hasIssue) {
          // setLeftLoad(false);
          setError("Power/Internet issue detected");
        }
      })
      .catch((error) => console.error("Error fetching device details:", error));
  }, [params.id]);

  useEffect(() => {
    if (!permissionGranted) {
      const askForPermissionAgain = () => {
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(function (position) {
            setPosition({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
            saveCookies(position.coords.longitude, position.coords.latitude);
            setPermissionGranted(true);
          });
        } else {
          console.log("Geolocation is not available in your browser.");
        }
      };

      askForPermissionAgain();
    }
  }, [permissionGranted, setPosition, setPermissionGranted]);

    useEffect(() => {
        const getDataUrl = (filterState, param) => {
            const currentDate = new Date();
            let start, end;

            switch (filterState) {
                case 'Daily':
                    end = formatDate(currentDate);
                    start = formatDate(new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000));
                    break;
                case 'Monthly':
                    end = formatDate(currentDate);
                    start = formatDate(new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000));
                    break;
                case 'Hourly':
                    return `/device_inner/${param}/${params.id}/24hours/`;
                case 'Range':
                    start = formatDate(startDateState);
                    end = formatDate(endDateState);
                    break;
                default:
                    start = end = formatDate(currentDate);
                    break;
            }

            return `/device_inner/${param}/${params.id}/period/?start_time_str=${start}&end_time_str=${end}`;
        };

        const urlGraph = getDataUrl(filterState, 'graph');
        const urlStats = getDataUrl(filterState, 'stats');

        if (prevUrlRef.current === urlGraph && prevUrlRef.currentStats === urlStats) {
            return;
        }

        prevUrlRef.current = urlGraph;
        prevUrlRef.currentStats = urlStats;


        axios
            .get(urlGraph, { withCredentials: true })
            .then((response) => {
                const normalizedData = response.data.filter(item => item !== null);
                setError("");
                change_weather_data(normalizedData);
                setLeftLoad(false)
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setLeftLoad(false)
                setError("Error")
            });

        axios
            .get(urlStats, { withCredentials: true })
            .then((response => {
                setStatsData(response.data);
            }))
            .catch((error) => {
                setError(`Error: ${error}`)
            })
    }, [params.id, filterState, startDateState, endDateState]);

  const formatDate = (date) => {
    if (!(date instanceof Date) || isNaN(date)) {
      return "";
    }
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  if (!weather_data || weather_data.length === 0) {
    if (leftLoad === false) {
      return <div className={styles.not_data}>{t("innerPage.data")}</div>;
    }
  }

  return (
    <>
      <div className={styles.inner_page}>
        <Helmet>
          <title>
            {device ? device[i18n.language === "hy" ? "name_hy" : "name_en"] : ''}
          </title>
        </Helmet>
        <button
          className={`${styles.navToggle} ${
            !isNavOpen ? styles.collapsed : ""
          }`}
          onClick={() => setIsNavOpen(!isNavOpen)}
        />
        <div
          className={`${styles.navContainer} ${
            !isNavOpen ? styles.collapsed : ""
          }`}
        >
          <InnerPageLeftNav
            filterState={filterState}
            filterChange={filterStateChange}
            selected_device_id={params.id}
            startDate={startDateState}
            setStartDate={setStartDate}
            endDate={endDateState}
            setEndDate={setEndDate}
            error={error}
            showDatePicker={showDatePicker}
            setShowDatePicker={setShowDatePicker}
            handleCloseDatePicker={handleCloseDatePicker}
            setError={setError}
            weather_data={weather_data}
            leftLoad={leftLoad}
            setLeftLoad={setLeftLoad}
            device={device}
          />
        </div>
        <div
          className={`${styles.inner_page_content} ${
            !isNavOpen ? styles.expanded : ""
          }`}
        >
          <InnerPageContent
            content={filterState}
            weather_data={weather_data}
            error={error}
            leftLoad={leftLoad}
            setLeftLoad={setLeftLoad}
            filterChange={filterStateChange}
            startDate={startDateState}
            setStartDate={setStartDate}
            endDate={endDateState}
            setEndDate={setEndDate}
            setError={setError}
            data={lastData}
            filterState={filterState}
            selected_device_id={params.id}
            filterPressed={filterPressed}
            setFilterPressed={setFilterPressed}
            device={device}
            minDate={minDate}
            stats={statsData}
            hasPowerInternetIssue={hasPowerInternetIssue}
          />
        </div>
        <InnerPageFilter
          filterState={filterState}
          filterChange={filterStateChange}
          startDate={startDateState}
          setStartDate={setStartDate}
          endDate={endDateState}
          setEndDate={setEndDate}
          error={error}
          showDatePicker={showDatePicker}
          setShowDatePicker={setShowDatePicker}
          handleCloseDatePicker={handleCloseDatePicker}
          setError={setError}
          leftLoad={leftLoad}
          setLeftLoad={setLeftLoad}
          stats={statsData}
          minDate={minDate}
        />
      </div>
    </>
  );
}

export default InnerPage;
