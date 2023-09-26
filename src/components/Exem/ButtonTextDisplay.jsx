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

  const chartConfig = {
    autoSize: true,
    series: [
      {
        data: [], 
        xKey: "time",
        yKey: "sensor",
        yName: "", 
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
          className={styles.button}
          onClick={() => handleChartClick(1)}
        >
          Pm1 Chart
        </button>
        <button
          className={styles.button}
          onClick={() => handleChartClick(2)}
        >
          CO2 Chart
        </button>
        <button
          className={styles.button}
          onClick={() => handleChartClick(3)}
        >
          Temperature Chart
        </button>
      </div>
      {selectedChart !== null && (
        <DataChart
          chartType={selectedChart}
          data={weatherData}
          chartConfig={chartConfig}
        />
      )}
    </div>
  );
};

export default ButtonTextDisplay;
