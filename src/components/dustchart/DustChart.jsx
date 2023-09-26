import React, { useState, useEffect } from "react";
import { AgChartsReact } from "ag-charts-react";
import weatherdata from "../../weather_data.json";
import styles from './DustChart.module.css'

const DustChart = () => {
  const [options, setOptions] = useState({
    autoSize: true,
    series: [
      {
        data: [], // Placeholder for Pm1 data
        xKey: "time",
        yKey: "sensor",
        yName: "Pm1",
        stroke: "#03a9f4",
        marker: {
          fill: "#03a9f4",
          stroke: "#0276ab",
        },
      },
      {
        data: [], // Placeholder for Pm2_5 data
        xKey: "time",
        yKey: "sensor",
        yName: "Pm2_5",
        stroke: "658d36",
        marker: {
          fill: " #660000",
          stroke: "#658d36",
        },
      },
      {
        data: [], // Placeholder for Pm10 data
        xKey: "time",
        yKey: "sensor",
        yName: "Pm10",
        stroke: "#ff0000",
        marker: {
          fill: " #ff0000",
          stroke: "#6a5acd",
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
      const loungePm10Data = weatherdata.map(entry => ({
        time: new Date(entry.time),
        sensor: entry.pm1
      }));

      const officePm2_5Data = weatherdata.map(entry => ({
        time: new Date(entry.time),
        sensor: entry.pm2_5
      }));

      const officePm10Data = weatherdata.map(entry => ({
        time: new Date(entry.time),
        sensor: entry.pm10
      }));

      setOptions(prevOptions => ({
        ...prevOptions,
        series: [
          { ...prevOptions.series[0], data: loungePm10Data },
          { ...prevOptions.series[1], data: officePm2_5Data },
          { ...prevOptions.series[2], data: officePm10Data },

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

export default DustChart;
