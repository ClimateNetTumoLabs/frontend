import React, { useState, useEffect } from "react";
import { AgChartsReact } from "ag-charts-react";
import styles from "./Chart.module.css";

const Chart = ({ text, subtitle, information }) => {
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

  useEffect(() => {
    const formattedData = information.data.map((item) => {
      let formattedTime = item.time;

      if (formattedTime.includes("T")) {
        const date = new Date(formattedTime);
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        formattedTime = `${hours}:${minutes}`;
      } else {
        formattedTime = formattedTime.substring(0, 10);
      }

      return {
        ...item,
        time: formattedTime,
      };
    });

    setOptions((prevOptions) => ({
      ...prevOptions,
      data: formattedData,
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
