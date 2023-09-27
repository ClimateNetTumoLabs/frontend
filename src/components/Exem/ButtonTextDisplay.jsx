// ButtonTextDisplay.js
import React, { useState } from "react";
import DataChart from "../test/ChartContainer";
import weatherData from "../../weather_data.json";
import styles from "./ButtonStyles.module.css";

const show_data_function = (some_array, need_data) => {
  let local_array = [];
  let axis = [];

  some_array.forEach((item) => {
    let a = {};
    need_data.forEach((value) => {
      if (value === "time" && item[value]) {
        const date = new Date(item[value]);
        a[value] = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
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
  const [selectedChart, setSelectedChart] = useState(null);

  const handleChartClick = (chartNumber) => {
    setSelectedChart(chartNumber);
  };

  const chartData1 = show_data_function(weatherData, ["humidity", "temperature", "time"]);
  const chartData2 = show_data_function(weatherData, ["pm1", "pm2_5", "pm10", "time"]);
  const chartData3 = show_data_function(weatherData, ["pressure", "co2", "time"]);

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

      {selectedChart === 1 && <DataChart information={chartData1} />}
      {selectedChart === 2 && <DataChart information={chartData2} />}
      {selectedChart === 3 && <DataChart information={chartData3} />}
    </div>
  );
};

export default ButtonTextDisplay;


