import React, { useState, useEffect } from "react";
import { AgChartsReact } from "ag-charts-react";
import styles from "./Chart.module.css";

const Chart = ({ text, subtitle, information }) => {
  console.log(information.text, information.subtitle);
  const [options, setOptions] = useState({
    autoSize: true,
    title: {
      text: text,
    },
    subtitle: {
      text: subtitle,
    },
    data: information.data,
    series: information.name,
  });

  console.log(information);
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
