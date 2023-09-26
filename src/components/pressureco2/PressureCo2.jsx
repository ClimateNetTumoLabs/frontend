import React, { useState, useEffect } from "react";
import { AgChartsReact } from "ag-charts-react";
import weatherdata from "../../weather_data.json";
import styles from "./PressureCo2.module.css";

const PressureCo2 = () => {
  const [options, setOptions] = useState({
    autoSize: true,
    series: [
      {
        data: [], // Placeholder for Co2 data
        xKey: "time",
        yKey: "sensor",
        yName: "Co2",
        stroke: "#03a9f4",
        marker: {
          fill: "#03a9f4",
          stroke: "#0276ab",
        },
      },
      {
        data: [], // Placeholder for Pressure data
        xKey: "time",
        yKey: "sensor",
        yName: "Pressure",
        stroke: "658d36",
        marker: {
          fill: " #660000",
          stroke: "#658d36",
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
  });

  useEffect(() => {
    if (weatherdata) {
      const loungeCo2Data = weatherdata.map((entry) => ({
        time: new Date(entry.time),
        sensor: entry.co2,
      }));

      const officePressureData = weatherdata.map((entry) => ({
        time: new Date(entry.time),
        sensor: entry.pressure,
      }));

      setOptions((prevOptions) => ({
        ...prevOptions,
        series: [
          { ...prevOptions.series[0], data: loungeCo2Data },
          { ...prevOptions.series[1], data: officePressureData },
        ],
      }));
    }
  }, []);

  return (
    <div className={styles.chart_div}>
      <AgChartsReact options={options} />;
    </div>
  );
};

export default PressureCo2;
