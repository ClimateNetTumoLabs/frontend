import React, { useState, useEffect } from "react";
import { AgChartsReact } from "ag-charts-react";
import weatherdata from "../../weather_data.json";
import styles from './WeatherChart.module.css'

const WeatherChart = () => {
  const [options, setOptions] = useState({
    autoSize: true,
    series: [
      {
        data: [], // Placeholder for Lounge Temperature data
        xKey: "time",
        yKey: "sensor",
        yName: "Temperature (°C)",
        stroke: "#03a9f4",
        marker: {
          fill: "#03a9f4",
          stroke: "#0276ab",
        },
      },
      {
        data: [], // Placeholder for Office Humidity data
        xKey: "time",
        yKey: "sensor",
        yName: "Humidity (%)",
        stroke: "rgb(202, 122, 122)",
        marker: {
          fill: " #660000",
          stroke: "#658d36",
        },
      },
      {
        data: [], // Placeholder for Office Pressure data
        xKey: "time",
        yKey: "sensor",
        yName: "Pressure",
        stroke: "rgb(202, 122, 122)",
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
          format: "#{.1f} °C",
        },
      },
    ],
  });

  useEffect(() => {
    if (weatherdata) {
      const loungeTemperatureData = weatherdata.map(entry => ({
        time: new Date(entry.time),
        sensor: entry.temperature
      }));

      const officeHumidityData = weatherdata.map(entry => ({
        time: new Date(entry.time),
        sensor: entry.humidity
      }));

      // const officePressureyData = weatherdata.map(entry => ({
      //   time: new Date(entry.time),
      //   sensor: entry.pressure
      // }));

      setOptions(prevOptions => ({
        ...prevOptions,
        series: [
          { ...prevOptions.series[0], data: loungeTemperatureData },
          { ...prevOptions.series[1], data: officeHumidityData },
          // { ...prevOptions.series[2], data: officePressureyData },

        ]
      }));
    }
  }, []);

  return (
    <div className={styles.chart_div}> 
      <AgChartsReact options={options} />;
    </div>
  )
};
export default WeatherChart