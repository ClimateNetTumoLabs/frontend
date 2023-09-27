// ButtonTextDisplay.js
import React, { useState } from "react";
import DataChart from "../test/ChartContainer";
import weatherData from "../../weather_data.json";
import styles from "./ButtonStyles.module.css";

const ButtonTextDisplay = () => {
  const [selectedChart, setSelectedChart] = useState(null);

  const handleChartClick = (chartNumber) => {
    setSelectedChart(chartNumber);
  };

  const yNameMappings = {
    1: ["Pm1", "Pm2_5", "Pm10"],
    2: ["temperature", "humidity"],
    3: ["co2", "pressure"]
  };

  const chartConfig = {
    autoSize: true,
    series: [
      {
        data: [], // Placeholder for data
        xKey: "time",
        yKey: "sensor",
        yName: "", // Will be dynamically set based on selectedChart
        stroke: "#03a9f4",
        marker: {
          fill: "#03a9f4",
          stroke: "#0276ab",
        },
      },
    ],
    axes: [
      {
        type: "time",
        position: "bottom",
      },
      {
        type: "number",
        position: "left",
        label: {
          format: "#{.1f}",
        },
      },
    ],
  };

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
          Co2 & Pressure
        </button>
      </div>
      {selectedChart !== null && (
        <DataChart
          chartType={selectedChart}
          data={weatherData}
          chartConfig={{
            ...chartConfig,
            series: [
              {
                ...chartConfig.series[0],
                yName: yNameMappings[selectedChart].join(", ")
              }
            ]
          }}
        />
      )}
    </div>
  );
};

export default ButtonTextDisplay;
