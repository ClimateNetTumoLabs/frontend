// ButtonTextDisplay.js
import React, { useState,useEffect } from "react";
import DataChart from "../test/ChartContainer";
// import weatherData from "../../weather_data.json";
import axios from "axios";
import styles from "./ButtonStyles.module.css";

const show_data_function = (some_array, need_data) => {
  let local_array = [];
  let axis = [];

  some_array.forEach((item) => {
    let a = {};
    need_data.forEach((value) => {
      if (value === "time" && item[value]) {
        const date = new Date(item[value]);
        const hours = date.getHours().toString().padStart(2, '0'); // Use padStart to ensure 2 digits
        const minutes = date.getMinutes().toString().padStart(2, '0');
        a[value] = `${hours}:${minutes}`;
      } else {
        a[value] = item[value];
      }
    });
    local_array.push(a);
  });

  need_data.slice(0, -1).forEach((item) => {
    axis.push({
      xKey: "time",
      yKey: item,
    });
  });

  const returned_value = { data: local_array, name: axis };
  return returned_value;
};






const ButtonTextDisplay = () => {
  const [selectedChart, setSelectedChart] = useState(1);

  const handleChartClick = (chartNumber) => {
    setSelectedChart(chartNumber);
  };


  /////////////////////////
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/device/1  /');
        console.log(response.data); // Add this line to check the response data
        setDevices(response.data);
      } catch (error) {
        console.error('Error fetching device data:', error);
      }
    };
  
    fetchData();
  }, []);


  //////////////////

  const chartData1 = show_data_function(devices, ["humidity", "temperature", "time"]);
  const chartData2 = show_data_function(devices, ["pm1", "pm2_5", "pm10", "time"]);
  const chartData3 = show_data_function(devices, ["pressure", "co2", "time"]);

  return (
    <div>
      <div className={styles.buttonContainer}>
        <button
          className={`${styles.button} ${styles.button1}`}
          onClick={() => handleChartClick(1)}
        >
          Dust Chart
        </button>
        <button
          className={`${styles.button} ${styles.button2}`}
          onClick={() => handleChartClick(2)}
        >
          Weather Chart
        </button>
        <button
          className={`${styles.button} ${styles.button3}`}
          onClick={() => handleChartClick(3)}
        >
          Pressure & CO2 Chart
        </button>
      </div>

       {/* <DataChart information={chartData1} /> */}
       {selectedChart === 1 && <DataChart information={chartData1} />}
      {selectedChart === 2 && <DataChart information={chartData2} />}
      {selectedChart === 3 && <DataChart information={chartData3} />}
    </div>
  );
};

export default ButtonTextDisplay;


