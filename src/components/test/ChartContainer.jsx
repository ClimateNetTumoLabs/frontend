import React, { useState, useEffect } from "react";
import { AgChartsReact } from "ag-charts-react";
import styles from './Test.module.css';

const DataChart = ({ chartType, data, chartConfig }) => {
  const [options, setOptions] = useState(chartConfig);

  useEffect(() => {
    if (data) {
      let chartData = [];

      for (let i = 0; i < data.length; i++) {
        const entry = data[i];
        const time = new Date(entry.time);
        let sensor = {};

        switch (chartType) {
          case 1:
            sensor = {
              pm1: entry.pm1,
              pm2_5: entry.pm2_5,
              pm10: entry.pm10
            };
            break;
          case 2:
            sensor = {
              co2: entry.co2,
              pressure: entry.pressure
            };
            break;
          case 3:
            sensor = {
              temperature: entry.temperature,
              humidity: entry.humidity
            };
            break;
          default:
            sensor = {};
        }

        chartData.push({ time, sensor });
      }

      setOptions(prevOptions => ({
        ...prevOptions,
        series: [{ ...prevOptions.series[0], data: chartData }]
      }));
    }
  }, [chartType, data]);

  return (
    <div className={styles.chart_div}>
      <AgChartsReact options={options} />
    </div>
  );
};
 export default DataChart
