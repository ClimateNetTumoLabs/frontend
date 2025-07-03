import React, { useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import styles from "./WeatherDataGraphs.module.css";
import Loader from "react-js-loader";
import DatePicker from "react-datepicker";
import { useTranslation } from "react-i18next";
import { saveAs } from 'file-saver'; 
import "../../i18n";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Utility function to format a single ISO timestamp
const formatTimestamp = (isoString) => {
  if (!isoString) return "Invalid Timestamp";
  const date = new Date(isoString);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${month}-${day} ${hours}:${minutes}`;
};

// Function to format an array of timestamps
const formatTimestamps = (timestamps) => {
  if (!Array.isArray(timestamps)) return [];
  return timestamps.map((timestamp) => formatTimestamp(timestamp));
};

// Function to format data for the chart
const formatData = (types, timestamps, dataArray, colors) => {
  // Validate inputs
  if (
    !Array.isArray(types) ||
    !Array.isArray(timestamps) ||
    !Array.isArray(dataArray)
  ) {
    console.error(
      "Invalid input: types, timestamps, and dataArray must be arrays",
      {
        types,
        timestamps,
        dataArray,
      }
    );
    return {
      labels: [],
      datasets: [],
    };
  }

  // Default colors if props.colors is not provided or insufficient
  const defaultColors = [
    {
      borderColor: "rgb(255, 206, 86)",
      backgroundColor: "rgba(255, 206, 86, 0.2)",
    }, // Yellow
    {
      borderColor: "rgb(54, 162, 235)",
      backgroundColor: "rgba(54, 162, 235, 0.2)",
    }, // Blue
    {
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.2)",
    }, // Red
    {
      borderColor: "rgb(75, 192, 192)",
      backgroundColor: "rgba(75, 192, 192, 0.2)",
    }, // Cyan
  ];

  // Create datasets dynamically based on types
  const datasets = types.map((type, index) => {
    const color =
      colors && colors[index]
        ? {
            borderColor: colors[index].borderColor || colors[index],
            backgroundColor:
              colors[index].backgroundColor || `${colors[index]}`, // Add transparency if not specified
          }
        : defaultColors[index % defaultColors.length]; // Fallback to default colors

    return {
      label: type,
      data: Array.isArray(dataArray[index]) ? dataArray[index] : [], // Ensure data is an array
      borderColor: color.borderColor,
      backgroundColor: color.backgroundColor,
      fill: false,
      tension: 0.4, // Smooth lines
      pointStyle: "circle",
      pointRadius: 3,
      pointHoverRadius: 10,
      pointHoverBackgroundColor: "#FFFFFF",
      pointHoverBorderColor: "#FFFFFF",
      pointBackgroundColor: "#FFFFFF",
      pointBorderColor: "#FFFFFF",
    };
  });

  return {
    labels: formatTimestamps(timestamps),
    datasets,
  };
};

// Plugin to draw a vertical hover line
const verticalLinePlugin = {
  id: "verticalLinePlugin",
  afterDatasetsDraw(chart) {
    const {
      ctx,
      tooltip,
      chartArea: { left, right, top, bottom },
      scales: { x },
    } = chart;

    if (tooltip?._active?.length) {
      const activePoint = tooltip._active[0];
      const xCoor = x.getPixelForValue(activePoint.index);

      // Save the current context state
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(xCoor, top);
      ctx.lineTo(xCoor, bottom);
      ctx.lineWidth = 2;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.5)"; // Customize color and opacity
      ctx.stroke();
      ctx.restore();
    }
  },
};

// Register the plugin
ChartJS.register(verticalLinePlugin);

const WeatherDataGraphs = (props) => {
  const { t } = useTranslation();
  const chartRef = useRef(null);
  const today = new Date();
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("Range");
  const [selectedFilterButton, setSelectedFilterButton] = useState(
    props.timeline === "Hourly"
      ? "oneD"
      : props.timeline === "Daily"
      ? "oneW"
      : props.timeline === "Monthly"
      ? "oneM"
      : "Range"
  );
  const [dataSize, setDataSize] = useState(0);
  const [selectedStartDate, setSelectedStartDate] = useState(
    props.startDate || today
  );
  const [selectedEndDate, setSelectedEndDate] = useState(
    props.endDate || today
  );

  // Effect to notify parent when dates change
  // useEffect(() => {
  //   if (props.onDateChange) {
  //     props.onDateChange({
  //       startDate: selectedStartDate,
  //       endDate: selectedEndDate,
  //       filter: selectedFilter
  //     });
  //   }
  // }, [selectedStartDate, selectedEndDate, selectedFilter]);

  // Format data for the chart
  const data = formatData(props.types, props.time, props.data, props.colors);

  const title_map = {
    Monthly: t("chartTitles.monthly"),
    Daily: t("chartTitles.daily"),
    Hourly: t("chartTitles.hourly"),
    Range: t("chartTitles.range"),
  };

  // Chart.js options
  const options = {
    animation: {
      onComplete: (e) => {
        // console.log(e.chart.config._config.data.labels.length);
        if (e.chart.config._config.data.labels.length != dataSize) {
          setDataSize(e.chart.config._config.data.labels.length);
          setLoading(false);
        }
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    scales: {
      x: {
        ticks: {
          maxTicksLimit: 6,
          color: "#FFFFFF", // White tick labels for x-axis
        },
        grid: {
          // color: '#FFFFFF', // White grid lines for x-axis
          // borderColor: '#FFFFFF', // White axis line
        },
      },
      y: {
        ticks: {
          color: "#FFFFFF", // White tick labels for y-axis
        },
        grid: {
          color: "#FFFFFF", // White grid lines for y-axis
          borderColor: "#FFFFFF", // White axis line
        },
      },
    },
    plugins: {
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)', // Dark tooltip background
        titleColor: '#FFFFFF', // White title text
        bodyColor: '#FFFFFF', // White body text
        enabled: true, // Ensure tooltips are enabled for the hover effect
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || '';
            const value = context.parsed.y;
            const lowerLabel = label.toLowerCase();
            // Append units based on dataset label
            if (lowerLabel.includes('humidity')) {
              return `${label}: ${value}%`;
            } else if (lowerLabel.includes('temperature')) {
              return `${label}: ${value}°C`;
            } else if (
              lowerLabel.includes('pms') ||
              lowerLabel.includes('pm')
            ) {
              return `${label}: ${value} µg/m³`;
            } else if (lowerLabel.includes('pressure')) {
              return `${label}: ${value} hPa`;
            } else if (lowerLabel.includes('uv')) {
              return `${label}: ${value}`; // UV index, no unit
            } else if (lowerLabel.includes('light intensity')) {
              return `${label}: ${value} lx`;
            } else if (lowerLabel.includes('rainfall')) {
              return `${label}: ${value} mm`;
            } else if (lowerLabel.includes('wind')) {
              return `${label}: ${value} m/s`;
            }
            return `${label}: ${value}`; // Default for other datasets
          },
          // Ensure tooltip icon matches line color (borderColor)
          labelColor: function (context) {
            return {
              borderColor: context.dataset.borderColor, // Match line color
              backgroundColor: context.dataset.borderColor, // Match line color
            };
          },
        },
      },
      legend: {
        position: "top",
        align: "center",
        labels: {
          // Ensure legend labels use dataset's borderColor or a custom color
          color: '#FFFFFF', // Black for legend text
          usePointStyle: true, // Use point style for legend
          // Optional: Customize legend point style
          generateLabels: (chart) => {
            const original = ChartJS.defaults.plugins.legend.labels.generateLabels(chart);
            original.forEach((label, index) => {
              label.fillStyle = chart.data.datasets[index].borderColor; // Use line color for legend
              label.strokeStyle = chart.data.datasets[index].borderColor;
            });
            return original;
          },
          usePointStyle: true,
          boxWidth: 40,
          padding: 10,
        },
        padding: 20,
        floating: true,
        offsetY: -25, // Approximated with padding
      },
      title: {
        display: true,
        text: `\t${t("chartTitles.dataPer")}${title_map[props.timeline]}`,
        align: "start",
        color: "#FFFFFF",
        font: {
          family: "Arial, sans-serif", // Explicit font family
          size: 16, // Increased size for visibility
        },
        padding: {
          top: 20, // Increased margin above title
          // bottom: 30, // Increased margin below title
          left: 10, // Positive left margin
          right: 20, // Margin to the right
        },
      },
    },
  };

  const filterButtons = [
    {
      key: "oneD",
      label: t("filterTooltips.oneD"),
      filter: "Hourly",
      action: () => {
        if (selectedFilterButton === "oneD") return;
        setSelectedFilterButton("oneD");
        const currentDate = new Date();
        const start = new Date(currentDate.getTime() - 24 * 60 * 60 * 1000);
        const end = currentDate;
        setSelectedStartDate(start);
        setSelectedEndDate(end);
        setSelectedFilter("Hourly");
        props.filterChange("Hourly");
        setLoading(true);
      },
    },
    {
      key: "oneW",
      label: t("filterTooltips.oneW"),
      filter: "Daily",
      action: () => {
        if (selectedFilterButton === "oneW") return;
        setSelectedFilterButton("oneW");
        const currentDate = new Date();
        const start = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
        const end = currentDate;
        setSelectedStartDate(start);
        setSelectedEndDate(end);
        setSelectedFilter("Daily");
        props.filterChange("Daily");
        setLoading(true);
      },
    },
    {
      key: "oneM",
      label: t("filterTooltips.oneM"),
      filter: "Monthly",
      action: () => {
        if (selectedFilterButton === "oneM") return;
        setSelectedFilterButton("oneM");
        const currentDate = new Date();
        const start = new Date(
          currentDate.getTime() - 30 * 24 * 60 * 60 * 1000
        );
        const end = currentDate;
        setSelectedStartDate(start);
        setSelectedEndDate(end);
        setSelectedFilter("Monthly");
        props.filterChange("Monthly");
        setLoading(true);
      },
    },
  ];

  // useEffect(() => {
  //   props.filterChange("Hourly");
  //   console.log(props.data)
  // }, [selectedFilterButton])

  const handleStartDateSelect = (date) => {
    setSelectedStartDate(date);
    setShowStartDatePicker(false);
  };

  const handleEndDateSelect = (date) => {
    setSelectedEndDate(date);
    setShowEndDatePicker(false);
  };

  return (
    <div id="chart" className={styles.chart_section}>
      <div style={{ height: "100%" }}>
        <div className={styles.toolbarAndFilter}>
          <div className={styles.FilterSection}>
            <div className={styles.filterButtons}>
              {filterButtons.map(({ key, label, action }) => (
                <button
                  key={key}
                  className={`${styles.filterButton} ${
                    selectedFilterButton === key ? styles.activeFilter : ""
                  }`}
                  onClick={action}
                  disabled={selectedFilterButton === key}
                >
                  {label}
                </button>
              ))}
              <DatePicker
                className={`${styles.pickerDropdown}`}
                value={selectedStartDate}
                onChange={(date) => setSelectedStartDate(date)}
                selected={selectedStartDate}
                onSelect={handleStartDateSelect}
                maxDate={today}
                dateFormat="dd/MM/yyyy"
              />
              <DatePicker
                className={`${styles.pickerDropdown}`}
                value={selectedEndDate}
                onChange={(date) => setSelectedEndDate(date)}
                selected={selectedEndDate}
                onSelect={handleEndDateSelect}
                minDate={
                  new Date(selectedStartDate.getTime() + 24 * 60 * 60 * 1000)
                }
                maxDate={today}
                dateFormat="dd/MM/yyyy"
              />
              <button
                className={`${styles.filterButton} ${
                  selectedFilterButton === "filter" ? styles.activeFilter : ""
                }`}
                onClick={() => {
                  setSelectedFilterButton(null);
                  props.setFilterPressed(true);
                }}
                disabled={selectedFilterButton === "filter"}
              >
                {"Filter"}
              </button>
              <button
                className={`${styles.filterButton}`}
                onClick={() => {
                  //save to png
                  const canvasSave = document.getElementById('lineChart');
                  canvasSave.toBlob(function (blob) {
                      saveAs(blob, "weather_data.png")
                  })
                }}
              >
                Download
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles.chartContainer}`}>
        {(loading || props.leftLoad) && (
          <div className={styles.loadingOverlay}>{t("chartTitles.update")}</div>
        )}
        <div
          className={`${styles.chartWrapper} ${
            loading || props.leftLoad ? styles.blur : ""
          }`}
        >
          {(loading || props.leftLoad) && (
            <div className={styles.loadingOverlay}>
              {t("chartTitles.update")}
            </div>
          )}
          <div className={`${styles.chart_div}`}>
            <Line id='lineChart' options={options} data={data} ref={chartRef} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDataGraphs;
