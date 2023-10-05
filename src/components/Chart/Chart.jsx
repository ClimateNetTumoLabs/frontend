import React, { useState, useEffect } from "react";
import { AgChartsReact } from "ag-charts-react";
import styles from "./Chart.module.css";

const Chart = ({ information }) => {
  const [options, setOptions] = useState({
    autoSize: true,
    title: {
      text: information.text,
    },
    subtitle: {
      text: information.subtitle,
    },
    data: information.data,
    series: information.name,
  });

  useEffect(() => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      data: information.data,
      series: information.name,
    }));
  }, [information]);

  return (
    <div className={styles.chart_div}>
      <AgChartsReact options={options} />
    </div>
  );
};

export default Chart;
