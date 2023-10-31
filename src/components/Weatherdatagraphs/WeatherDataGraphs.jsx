import React, { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ChartExample from "../Chart/Chart";
import styles from "./WeatherDataGraphs.module.css";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import DownloadButton from "../DownloadButton/DownloadButton";


function ConvertDate(inputDate) {
  const year = inputDate.getFullYear();
  const month = String(inputDate.getMonth() + 1).padStart(2, "0");
  const day = String(inputDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}T00:00:00`;
}

const show_data_function = (some_array, need_data) => {
  let local_array = [];
  let axis = [];
  some_array.map((item) => {
    let a = {};
    need_data.map((value) => {
      const date = new Date(item[value]);
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      a[value] = `${hours}:${minutes}`;
      a[value] = item[value];
    });
    local_array.push(a);
  });
  need_data.splice(-1);
  need_data.map((item) => {
    axis.push({
      xKey: "time",
      yKey: item,
    });
  });
  return { data: local_array, name: axis };
};

const InnerTabs = (props) => {
  const [weather_data, ChangeWeatherState] = useState(props.data);
  const today = new Date();
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  const [showDownloadButton, setShowDownloadButton] = useState(false);


  const handleStartDateChange = (date) => {
    setStartDate(date);
    if (endDate && date > endDate) {
      setEndDate(date);
    }
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    if (date < startDate) {
      setStartDate(date);
    }
  };

  const formatDate = (date) => {
    return format(date, "EEEE, MMMM d, y");
  };

  const handleFilterClick = () => {
    if (startDate && endDate) {
      const path = window.location.pathname;
      const endOfLocation = path.substring(path.lastIndexOf("/") + 1);

      console.log(
        `http://localhost:8000/device/${endOfLocation}?start_time_str${ConvertDate(
          startDate
        )}&end_time_str${ConvertDate(endDate)}`
      );
      axios
        .get(
          `http://localhost:8000/device/${endOfLocation}?start_time_str=${ConvertDate(
            startDate
          )}&end_time_str=${ConvertDate(endDate)}`
        )
        .then((response) => {
          ChangeWeatherState(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } else {
      alert("Please input Start and End dates");
    }
  };

  return (
    <div>
      <div className={styles.filter_section}>
        <div className={`${styles.date_format}`}>
          <label className={styles.filter_label}>Start Date:</label>
          <DatePicker
            selected={startDate}
            onChange={handleStartDateChange}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            maxDate={new Date()}
          />
        </div>
        <div className={`${styles.date_format}`}>
          <label className={styles.filter_label}>End Date:</label>
          <DatePicker
            selected={endDate}
            onChange={handleEndDateChange}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            maxDate={new Date()}
          />
        </div>
        <button className={styles.filter_button} onClick={handleFilterClick}>
          Filter
        </button>
        {showDownloadButton && (
         <DownloadButton startDate={startDate} endDate={endDate} />
         )}
      </div>
      <Tabs
        defaultActiveKey="hum_temp"
        id="uncontrolled-tab-example"
        className={styles.tabs_section}
      >
        <Tab
          className={styles.tab}
          eventKey="hum_temp"
          title="Temperature & Humidity"
        >
          <ChartExample
            text="Temperature & Humidity Info"
            subtitle="We show default 24 pints, if you want you can change it from filter"
            information={show_data_function(weather_data, [
              "humidity",
              "temperature",
              "time",
            ])}
          />
        </Tab>
        <Tab eventKey="air_quality" title="Air Quality">
          <ChartExample
            text="Air Quality Info"
            subtitle="We show default 24 pints, if you want you can change it from filter"
            information={show_data_function(weather_data, [
              "pm1",
              "pm2_5",
              "pm10",
              "time",
            ])}
          />
        </Tab>
        <Tab eventKey="wind_and_rain" title="Wind & Rain">
          <ChartExample
            text="Wind & Rain Info"
            subtitle="We show default 24 pints, if you want you can change it from filter"
            information={show_data_function(weather_data, [
              "direction",
              "speed",
              "rain",
              "time",
            ])}
          />
        </Tab>
      </Tabs>
    </div>
  );
};

export default InnerTabs;
