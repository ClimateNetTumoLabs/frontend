import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "react-js-loader";
import styles from "./InnerPage.module.css";
import InnerPageLeftNav from "../InnerPageLeftNav/InnerPageLeftNav";
import InnerPageContent from "../InnerPageContent/InnerPageContent";
import { PositionContext } from "../../context/PositionContext";

function InnerPage() {
  const params = useParams();
  const [isLoading, setLoading] = useState(true);
  const [weather_data, change_weather_data] = useState(null);
  const [filterState, filterStateChange] = useState('Hourly');
  const { permissionGranted, setPosition, setPermissionGranted } = useContext(PositionContext);
  const [startDateState, setStartDate] = useState(new Date());
  const [endDateState, setEndDate] = useState(new Date());
  const [error, setError] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [leftLoad, setLeftLoad] = useState(true);

  const handleCloseDatePicker = () => {
    setShowDatePicker(false);
  };

  useEffect(() => {
    if (!permissionGranted) {
      const askForPermissionAgain = () => {
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(function (position) {
            setPosition({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
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
    window.scrollTo(0, 0);
    if (filterState === 'Range' && startDateState && endDateState) {
      if (new Date(startDateState) > new Date(endDateState)) {
        setError("Start date should be earlier than end date.");
        return;
      }
      if (new Date(startDateState) > new Date()) {
        setError("Start date cannot be later than today.");
        return;
      }
    }
    const url = getDataUrl(filterState);
    axios
      .get(url, { withCredentials: true })
      .then((response) => {
        const normalizedData = response.data.filter(item => item !== null);
        setError("")
        change_weather_data(normalizedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
        setError("Error")
      });
  }, [params.id, filterState, startDateState, endDateState]);

  const getDataUrl = (filterState) => {
    let url = "";
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    switch (filterState) {
      case 'Daily':
        const lastWeekDate = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
        const formatEnd = formatDate(currentDate);
        const formatStart = formatDate(lastWeekDate);
        url = `/device/${params.id}?start_time_str=${formatStart}&end_time_str=${formatEnd}`;
        break;
      case 'Monthly':
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
        let lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
        if (lastDayOfMonth > currentDate) {
          lastDayOfMonth = currentDate;
        }
        const formatStartMonthly = formatDate(firstDayOfMonth);
        const formatEndMonthly = formatDate(lastDayOfMonth);
        url = `/device/${params.id}?start_time_str=${formatStartMonthly}&end_time_str=${formatEndMonthly}`;
        break;
      case 'Hourly':
        url = `/device/${params.id}`;
        break;
      case 'Range':
        const startDateStr = formatDate(startDateState);
        const endDateStr = formatDate(endDateState);
        url = `/device/${params.id}?start_time_str=${startDateStr}&end_time_str=${endDateStr}`;
        break;
      default:
        url = `/device/${params.id}?start_time_str=${formatStart}&end_time_str=${formatEnd}`;
        break;
    }
    return url;
  }
  const formatDate = (date) => {
    if (!(date instanceof Date) || isNaN(date)) {
      return "";
    }
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <Loader
          type="box-rectangular"
          bgColor={"#FFFFFF"}
          color={"#FFFFFF"}
          size={100}
        />
      </div>
    );
  }

  if (!weather_data || weather_data.length === 0) {
    return <div className={styles.not_data}>
      Data Not Found
    </div>;
  }

  return (
    <div className={styles.inner_page}>
      <InnerPageLeftNav filterState={filterState} filterChange={filterStateChange} selected_device_id={params.id}
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
        isLoading={isLoading}
        setLoading={setLoading}
        leftLoad={leftLoad}
        setLeftLoad={setLeftLoad}
      />
      <InnerPageContent content={filterState} weather_data={weather_data} error={error} />
      {/*<DeviceImage />*/}
      {/*/!* <DownloadButton/> *!/*/}
      {/*<HoverToDevice data={weather_data} />*/}
      {/*<WeatherDataGraphs data={weather_data} />*/}
    </div>
  );
}

export default InnerPage;
