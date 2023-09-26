import React, { useState, useEffect } from "react";
import { AgChartsReact } from "ag-charts-react";
import styles from './Test.module.css';

const DataChart = ({ chartType, data, chartConfig }) => {
  const [options, setOptions] = useState(chartConfig);

  useEffect(() => {
    if (data) {
      let chartData = [];

      switch (chartType) {
        case 1:
          chartData = data.map(entry => ({
            time: new Date(entry.time),
            sensor: entry.pm1,
          }));
          console.log(chartData);
          break;
        case 2:
          chartData = data.map(entry => ({
            time: new Date(entry.time),
            sensor: entry.pressure,
          }));
          break;
        case 3:
          chartData = data.map(entry => ({
            time: new Date(entry.time),
            sensor: entry.humidity,
          }));
          break;
        default:
          chartData = [];
      }

      setOptions(prevOptions => ({
        ...prevOptions,
        series: [
          { ...prevOptions.series[0], data: chartData }
        ]
      }));
    }
  }, [chartType, data]);

  return (
    <div className={styles.chart_div}>
      <AgChartsReact options={options} />
    </div>
  );
};

export default DataChart;
