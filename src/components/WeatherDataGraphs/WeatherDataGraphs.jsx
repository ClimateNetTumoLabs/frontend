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
import DatePicker from "react-datepicker";
import { useTranslation } from "react-i18next";
import { saveAs } from "file-saver";
import "../../i18n";
import zoomPlugin from "chartjs-plugin-zoom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin
);

// Utility function to format a single ISO timestamp
const formatTimestamp = (isoString) => {
  if (!isoString) return "Invalid Timestamp";
  const date = new Date(isoString);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${day}-${month} ${hours}:${minutes}`;
};

// Function to format an array of timestamps
const formatTimestamps = (timestamps) => {
  if (!Array.isArray(timestamps)) return [];
  return timestamps.map((timestamp) => formatTimestamp(timestamp));
};

// Function to convert chart data to CSV
const convertToCSV = (t, labels, datasets) => {
  const headers = [`${t("chartTitles.timestamp")}`, ...datasets.map((dataset) => dataset.label)];
  const rows = labels.map((label, index) => {
    const rowData = datasets.map((dataset) => dataset.data[index] || "0");
    return [label, ...rowData];
  });

  const csvContent = [headers, ...rows]
    .map((row) => row.map((cell) => `"${cell}"`).join(","))
    .join("\n");

  return csvContent;
};

// Function to download data as CSV
const downloadCSV = (t, labels, datasets, filename) => {
  const csv = convertToCSV(t, labels, datasets);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  saveAs(blob, filename);
};

// Function to format data for the chart
const formatData = (isMobile, types, timestamps, dataArray, colors) => {
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

  const datasets = types.map((type, index) => {
    const color =
      colors && colors[index]
        ? {
            borderColor: colors[index].borderColor || colors[index],
            backgroundColor:
              colors[index].backgroundColor || `${colors[index]}`,
          }
        : defaultColors[index % defaultColors.length];

    return {
      label: type,
      data: Array.isArray(dataArray[index]) ? dataArray[index] : [],
      borderColor: color.borderColor,
      backgroundColor: color.backgroundColor,
      fill: false,
      tension: 0.4,
      pointStyle: "circle",
      pointRadius: !isMobile ? 2 : 1,
      pointHoverRadius: !isMobile ? 7 : 3,
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

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(xCoor, top);
      ctx.lineTo(xCoor, bottom);
      ctx.lineWidth = 2;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
      ctx.stroke();
      ctx.restore();
    }
  },
};

const noDataPlugin = (noDataText) => ({
  id: "noDataPlugin",
  afterDraw(chart) {
    const totalDatasets = chart.data.datasets.length;
    const hiddenDatasets = chart.data.datasets.reduce((count, _, index) => {
      return count + (chart.getDatasetMeta(index).hidden ? 1 : 0);
    }, 0);
    if (totalDatasets > 0 && hiddenDatasets === totalDatasets) {
      const { ctx, width, height } = chart;
      ctx.save();

      const text = noDataText;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = "20px 'Ping', sans-serif";
      ctx.fillStyle = "#ffffff";

      const textMetrics = ctx.measureText(text);
      const textWidth = textMetrics.width;
      const textHeight = 24;
      const paddingX = 20;
      const paddingY = 10;
      const boxWidth = textWidth + 2 * paddingX;
      const boxHeight = textHeight + 2 * paddingY;
      const borderRadius = 5;

      const x = width / 2 - boxWidth / 2;
      const y = height / 2 - boxHeight / 2;

      ctx.globalAlpha = 0.7;
      ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
      ctx.beginPath();
      ctx.moveTo(x + borderRadius, y);
      ctx.lineTo(x + boxWidth - borderRadius, y);
      ctx.quadraticCurveTo(x + boxWidth, y, x + boxWidth, y + borderRadius);
      ctx.lineTo(x + boxWidth, y + boxHeight - borderRadius);
      ctx.quadraticCurveTo(
        x + boxWidth,
        y + boxHeight,
        x + boxWidth - borderRadius,
        y + boxHeight
      );
      ctx.lineTo(x + borderRadius, y + boxHeight);
      ctx.quadraticCurveTo(x, y + boxHeight, x, y + boxHeight - borderRadius);
      ctx.lineTo(x, y + borderRadius);
      ctx.quadraticCurveTo(x, y, x + borderRadius, y);
      ctx.closePath();
      ctx.fill();

      ctx.globalAlpha = 1.0;
      ctx.fillText(text, width / 2, height / 2);
      ctx.restore();
    }
  },
});

const downloadButtonPlugin = (isMobile, toggleDropdown) => ({
  id: "downloadButtonPlugin",
  afterDraw(chart) {
    if (!isMobile) return;

    const { ctx, width } = chart;
    const buttonWidth = 30;
    const buttonHeight = 30;
    const buttonX = width - buttonWidth;
    const buttonY = 10;

    ctx.save();
    ctx.fillStyle = "#333232";
    ctx.fillRect(buttonX, buttonY, buttonWidth, buttonHeight);
    ctx.strokeStyle = "#333232";
    ctx.strokeRect(buttonX, buttonY, buttonWidth, buttonHeight);

    ctx.beginPath();
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;

    ctx.moveTo(buttonX + 15, buttonY + 8);
    ctx.lineTo(buttonX + 15, buttonY + 18);

    ctx.moveTo(buttonX + 11, buttonY + 14);
    ctx.lineTo(buttonX + 15, buttonY + 18);
    ctx.lineTo(buttonX + 19, buttonY + 14);

    ctx.moveTo(buttonX + 10, buttonY + 22);
    ctx.lineTo(buttonX + 20, buttonY + 22);

    ctx.stroke();
    ctx.restore();

    chart.downloadButton = {
      x: buttonX,
      y: buttonY,
      width: buttonWidth,
      height: buttonHeight,
    };
  },
  afterEvent(chart, args) {
    if (!isMobile) return;

    const { event } = args;
    if (event.type === "click" && chart.downloadButton) {
      const { x, y, width, height } = chart.downloadButton;
      if (
        event.x >= x &&
        event.x <= x + width &&
        event.y >= y &&
        event.y <= y + height
      ) {
        toggleDropdown();
      }
    }
  },
});

ChartJS.register(verticalLinePlugin);

const WeatherDataGraphs = (props) => {
  const { t } = useTranslation();
  const chartRef = useRef(null);
  const today = new Date();
  const [loading, setLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("Range");
  const dropdownRef = useRef(null);
  const [selectedFilterButton, setSelectedFilterButton] = useState(
    props.timeline === "Hourly"
      ? "oneD"
      : props.timeline === "Daily"
      ? "oneW"
      : props.timeline === "Monthly"
      ? "oneM"
      : "Range"
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dataSize, setDataSize] = useState(0);
  const [prevData, setPrevData] = useState([]);
  const [selectedStartDate, setSelectedStartDate] = useState(
    props.startDate || today
  );
  const [selectedEndDate, setSelectedEndDate] = useState(
    props.endDate || today
  );
  const [appliedStartDate, setAppliedStartDate] = useState(props.startDate);
  const [appliedEndDate, setAppliedEndDate] = useState(props.endDate);

  const [dateChanged, setDateChanged] = useState(false);
  const [isMobile, setIsMobile] = useState(
    window.matchMedia("(max-width: 767px)").matches
  );
  const [isFilterClickable, setIsFilterClickable] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  const data = formatData(isMobile, props.types, props.time, props.data, props.colors);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };
    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  // Handle clicks outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !event.target.closest(`.${styles.downloadIconButton}`)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    const canvas = chartRef.current?.canvas;
    if (!canvas) return;
  
    let clickTimeout = null;
  
    const handleClick = (event) => {
      if (isMobile && chartRef.current?.downloadButton) {
        const { x, y, width, height } = chartRef.current.downloadButton;
        const rect = canvas.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const clickY = event.clientY - rect.top;
        
        if (
          clickX >= x &&
          clickX <= x + width &&
          clickY >= y &&
          clickY <= y + height
        ) {
          // This is a download button click - ignore it
          if (clickTimeout) {
            clearTimeout(clickTimeout);
            clickTimeout = null;
          }
          return;
        }
      }
      
      if (chartRef.current) {
          const rect = canvas.getBoundingClientRect();
          const clickX = event.clientX - rect.left;
          const clickY = event.clientY - rect.top;

          if (
            clickX >= 0 &&
            clickX <= 1500 &&
            clickY >= 0 &&
            clickY <= 70
          ) {
            if (clickTimeout) {
              clearTimeout(clickTimeout);
              clickTimeout = null;
            }
            return;
          }
        }

      if (clickTimeout) {
        clearTimeout(clickTimeout);
        clickTimeout = null;
      }
  
      clickTimeout = setTimeout(() => {
        const chart = chartRef.current;
        if (!chart) return;
  
        // Get mouse position relative to canvas
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        
        // Get the value at the clicked position
        const xAxis = chart.scales.x;
        const value = xAxis.getValueForPixel(x);
        
        // Calculate zoom window
        const totalPoints = chart.data.labels.length;
        const zoomWindow = Math.max(1, Math.floor(totalPoints * 0.1));
        const min = Math.max(0, value - zoomWindow / 2);
        const max = Math.min(totalPoints - 1, value + zoomWindow / 2);
        
        // Apply zoom
        chart.zoomScale('x', { min, max }, 'default');
        chart.tooltip.setActiveElements([], { x: 0, y: 0 });
        chart.setActiveElements([]);
        chart.update();
      }, 200);
    };
  
    const handleDoubleClick = () => {
      if (clickTimeout) {
        clearTimeout(clickTimeout);
        clickTimeout = null;
      }
  
      const chart = chartRef.current;
      if (chart) {
        chart.resetZoom();
        chart.tooltip.setActiveElements([], { x: 0, y: 0 });
        chart.setActiveElements([]);
        chart.update();
      }
    };
  
    canvas.addEventListener("click", handleClick);
    canvas.addEventListener("dblclick", handleDoubleClick);
    
    return () => {
      if (clickTimeout) clearTimeout(clickTimeout);
      canvas.removeEventListener("click", handleClick);
      canvas.removeEventListener("dblclick", handleDoubleClick);
    };
  }, [chartRef, isMobile]);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.resetZoom();
    }
  }, [selectedFilter, selectedStartDate, selectedEndDate]);

  useEffect(() => {
    const canvas = chartRef.current?.canvas;
    if (!canvas) return;

    const handleWheel = (event) => {
      // Detect if the user is on macOS
      const isMac = /Mac|iPod|iPhone|iPad/.test(navigator.platform);
      
      // Check for the appropriate modifier key based on platform
      const modifierPressed = isMac ? event.metaKey : event.ctrlKey;
      if (modifierPressed) {
        event.preventDefault();

        const timeRanges = [
          { key: "oneD", filter: "Hourly", label: t("filterTooltips.oneD") },
          { key: "oneW", filter: "Daily", label: t("filterTooltips.oneW") },
          { key: "oneM", filter: "Monthly", label: t("filterTooltips.oneM") },
        ];

        const currentIndex = timeRanges.findIndex(
          (range) => range.key === selectedFilterButton
        );

        let nextIndex;
        if (event.deltaY < 0) {
          if (currentIndex <= 0) {
            setShowPopup(true);
            setTimeout(() => {
              setShowPopup(false);
            }, 2000);
            return;
          }
          nextIndex = currentIndex - 1;
          setShowPopup(false);
        } else {
          if (currentIndex >= timeRanges.length - 1) {
            setShowPopup(true);
            setTimeout(() => {
              setShowPopup(false);
            }, 2000);
            return;
          }
          nextIndex = currentIndex + 1;
          setShowPopup(false);
        }

        const nextRange = timeRanges[nextIndex];

        setSelectedFilterButton(nextRange.key);
        setSelectedFilter(nextRange.filter);

        const currentDate = new Date();
        let start;
        if (nextRange.filter === "Hourly") {
          start = new Date(currentDate.getTime() - 24 * 60 * 60 * 1000); // 1 day
        } else if (nextRange.filter === "Daily") {
          start = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000); // 7 days
        } else if (nextRange.filter === "Monthly") {
          start = new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000); // 30 days
        }

        setSelectedStartDate(start);
        setSelectedEndDate(currentDate);
        setDateChanged(false);
        setLoading(true);
        props.setShowWelcomeOverlay(false);
        props.filterChange(nextRange.filter);
      }
    };

    canvas.addEventListener("wheel", handleWheel);

    return () => {
      canvas.removeEventListener("wheel", handleWheel);
    };
  }, [chartRef, selectedFilterButton, props, t]);

  // Prevent page scrolling during Option/Alt + scroll
  useEffect(() => {
    const canvas = chartRef.current?.canvas;
    if (!canvas) return;

    const handleWheel = (event) => {
      if (event.altKey || event.metaKey) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    canvas.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      canvas.removeEventListener("wheel", handleWheel);
    };
  }, [chartRef]);

  useEffect(() => {
    ChartJS.register(
      noDataPlugin(`${t("chartTitles.noSelectedData")}`),
      downloadButtonPlugin(isMobile, () => setIsDropdownOpen(!isDropdownOpen))
    );
    return () => {
      ChartJS.unregister(
        noDataPlugin(`${t("chartTitles.noSelectedData")}`),
        downloadButtonPlugin(isMobile, () => setIsDropdownOpen(!isDropdownOpen))
      );
    };
  }, [isMobile]);

  useEffect(() => {
    if (isMobile){
      setLoading(true);
    }
  }, [props.filterState]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOverlayClick = () => {
    props.setShowWelcomeOverlay(false);
  };

  const handleDownloadOption = (format) => {
    if (format === "Current Measurments") {
      const data = formatData(isMobile, props.types, props.time, props.data, props.colors);
      downloadCSV(t, data.labels, data.datasets, `Climate Data ${getDateOnly(appliedStartDate)} - ${getDateOnly(appliedEndDate)}.csv`);
    } else if (format === "All Measurments") {
      const timestamps = props.weather_data.map((entry) => entry.time_interval);
      
      const allMetrics = [
        { key: "temperature", label: `${t("innerPageDynamicContent.temperature")} (°C)` },
        { key: "humidity", label: `${t("innerPageDynamicContent.humidity")} (%)` },
        { key: "pressure", label: `${t("innerPageDynamicContent.pressure")} (${t("linerStatusBar.hPa")})` },
        { key: "uv", label: "UV" },
        { key: "lux", label: `${t("innerPageDynamicContent.light_intensity")} (${t("linerStatusBar.lux")})` },
        { key: "pm1", label: `PM1 ${t("about.pmMu")}` },
        { key: "pm2_5", label: `PM2.5 ${t("about.pmMu")}` },
        { key: "pm10", label: `PM10 ${t("about.pmMu")}` },
        { key: "speed", label: `${t("innerPageDynamicContent.windSpeed")} (${t("linerStatusBar.kmhour")})` },
        { key: "rain", label: `${t("innerPageDynamicContent.rain")} (${t("linerStatusBar.mm")})` },
      ];
  
      const dataArrays = allMetrics.map((metric) =>
        props.weather_data.map((entry) => entry[metric.key] || "0")
      );

      const allData = formatData(
        isMobile,
        allMetrics.map((metric) => metric.label),
        timestamps,
        dataArrays,
        props.colors
      );
  
      downloadCSV(t, allData.labels, allData.datasets, `All Climate Data ${getDateOnly(appliedStartDate)} - ${getDateOnly(appliedEndDate)}.csv`);
    }
  
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const preventZoom = (e) => {
      if (e.touches.length > 1) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
  
    document.addEventListener('touchmove', preventZoom, { passive: false });
    return () => document.removeEventListener('touchmove', preventZoom);
  }, []);

  const title_map = {
    Monthly: t("chartTitles.monthly"),
    Daily: t("chartTitles.daily"),
    Hourly: t("chartTitles.hourly"),
    Range: t("chartTitles.range"),
  };

  // Calculate zoom limits based on data range
  const timestamps = props.time || [];
  const minTimestamp = timestamps.length
    ? Math.min(...timestamps.map((t) => new Date(t).getTime()))
    : today.getTime();
  const maxTimestamp = timestamps.length
    ? Math.max(...timestamps.map((t) => new Date(t).getTime()))
    : today.getTime();
  const oneDay = 24 * 60 * 60 * 1000;
  const oneWeek = 7 * oneDay;
  const oneMonth = 30 * oneDay;

  const compareTimestampArrays = (arr1, arr2) => {
    return arr1.every((item, index) => item === arr2[index]);
  };

  const legendMargin = {
    id: 'legendMargin',
    afterInit(chart, args, plugins) {
      const originalFit = chart.legend.fit;
      const margin = plugins.margin || 0;
      chart.legend.fit = function fit () {
        if (originalFit) {
          originalFit.call(this)
        }
        return this.height += margin
      }
    }
  }

  // Chart.js options
  const options = {
    animation: {
      onComplete: (e) => {
        if (!compareTimestampArrays(e.chart.config._config.data.labels, prevData)) {
          setPrevData(e.chart.config._config.data.labels);
          setLoading(false);
        }
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
          maxTicksLimit: 7,
          color: "#FFFFFF",
          maxRotation: isMobile ? 75 : 0,
          minRotation: isMobile ? 75 : 0,
        },
        grid: {
          color: '#999',
          borderColor: 'transparent',
        },
      },
      y: {
        ticks: {
          color: "#FFFFFF",
        },
        grid: {
          color: "#999",
          borderColor: "#FFFFFF",
        },
        border: {
          display: false,
        },
      },
    },
    plugins: {
      legendMargin: {
        margin: isMobile ? 30 : 15,
      },
      downloadButtonPlugin: {
        enabled: isMobile,
      },
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
            modifierKey: "alt",
            speed: 0.05,
          },
          pinch: {
            enabled: false,
          },
          pan: {
            enabled: false,
          },
          mode: "x",
        },
        limits: {
          x: {
            min: 0,
            max: data.labels.length - 1,
            minRange: Math.max(
              1,
              Math.floor(
                data.labels.length * (oneDay / (maxTimestamp - minTimestamp))
              )
            ),
            maxRange: Math.min(
              data.labels.length - 1,
              Math.floor(
                data.labels.length * (oneMonth / (maxTimestamp - minTimestamp))
              )
            ),
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#FFFFFF",
        bodyColor: "#FFFFFF",
        enabled: true,
        bodySpacing: 10,
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || "";
            const value = context.parsed.y;
            const lowerLabel = label.toLowerCase();
            if (
              lowerLabel.includes(
                `${t("innerPageDynamicContent.humidity")}`.toLocaleLowerCase()
              )
            ) {
              return ` ${label}: ${value}%`;
            } else if (
              lowerLabel.includes(
                `${t(
                  "innerPageDynamicContent.temperature"
                )}`.toLocaleLowerCase()
              )
            ) {
              return ` ${label}: ${value}°C`;
            } else if (
              lowerLabel.includes("pms") ||
              lowerLabel.includes("pm")
            ) {
              return ` ${label}: ${value} ${t("about.pmMu")}`;
            } else if (
              lowerLabel.includes(
                `${t("innerPageDynamicContent.pressure")}`.toLocaleLowerCase()
              )
            ) {
              return ` ${label}: ${value} ${t("linerStatusBar.hPa")}`;
            } else if (lowerLabel.includes("uv")) {
              return ` ${label}: ${value}`;
            } else if (
              lowerLabel.includes(
                `${t(
                  "innerPageDynamicContent.light_intensity"
                )}`.toLocaleLowerCase()
              )
            ) {
              return ` ${label}: ${value} ${t("linerStatusBar.lux")}`;
            } else if (
              lowerLabel.includes(
                `${t("innerPageDynamicContent.rain")}`.toLocaleLowerCase()
              )
            ) {
              return ` ${label}: ${value} ${t("linerStatusBar.mm")}`;
            } else if (
              lowerLabel.includes(
                `${t("innerPageDynamicContent.windSpeed")}`.toLocaleLowerCase()
              )
            ) {
              return ` ${label}: ${value} ${t("linerStatusBar.kmhour")}`;
            }
            return ` ${label}: ${value}`;
          },
          labelColor: function (context) {
            return {
              borderColor: context.dataset.borderColor,
              backgroundColor: context.dataset.borderColor,
            };
          },
        },
      },
      legend: {
        position: "top",
        align: "center",
        labels: {
          color: "#FFFFFF",
          usePointStyle: true,
          generateLabels: (chart) => {
            const original = ChartJS.defaults.plugins.legend.labels.generateLabels(chart);
            original.forEach((label, index) => {
              // Use original borderColor to ensure legend points are unaffected by hover transparency
              label.fillStyle = chart.data.datasets[index].originalBorderColor || chart.data.datasets[index].borderColor;
              label.strokeStyle = chart.data.datasets[index].originalBorderColor || chart.data.datasets[index].borderColor;
              label.boxWidth = 20; // Legend box width
              label.boxHeight = 20; // Legend box height
              label.padding = 10;
            });
            return original;
          },
          boxWidth: 40,
          padding: 10,
        },
        padding: 20,
        floating: true,
        offsetY: -25,
        // Handle hover to make non-hovered datasets and points transparent, keep hovered dataset and points unchanged, hide tooltip, vertical line, and unhighlight points
        onHover: (event, legendItem, legend) => {
          const chart = legend.chart;
          const index = legendItem.datasetIndex;
          const meta = chart.getDatasetMeta(index);

          // Only trigger hover behavior if the dataset is not hidden
          if (!meta.hidden) {
            chart.data.datasets.forEach((dataset, i) => {
              // Store original colors if not already stored
              if (!dataset.originalBorderColor) {
                dataset.originalBorderColor = dataset.borderColor;
                dataset.originalBackgroundColor = dataset.backgroundColor;
                dataset.originalPointBackgroundColor = dataset.pointBackgroundColor;
                dataset.originalPointBorderColor = dataset.pointBorderColor;
              }

              if (i === index) {
                // Restore original colors for the hovered dataset and its points
                dataset.borderColor = dataset.originalBorderColor;
                dataset.backgroundColor = dataset.originalBackgroundColor;
                dataset.pointBackgroundColor = dataset.originalPointBackgroundColor;
                dataset.pointBorderColor = dataset.originalPointBorderColor;
              } else {
                // Make non-hovered datasets and points nearly transparent

                function hexToRGBA(hex, alpha = 0.5) {
                  hex = hex.replace('#', '');
                  if (hex.length === 3) {
                    hex = hex
                      .split('')
                      .map(char => char + char)
                      .join('');
                  }
                  const r = parseInt(hex.slice(0, 2), 16);
                  const g = parseInt(hex.slice(2, 4), 16);
                  const b = parseInt(hex.slice(4, 6), 16);
                  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
                }
                
                dataset.borderColor = hexToRGBA(dataset.originalBorderColor, 0.2);
                dataset.backgroundColor = hexToRGBA(dataset.originalBackgroundColor, 0.2);
                dataset.pointBackgroundColor = hexToRGBA(dataset.originalPointBackgroundColor, 0.2);
                dataset.pointBorderColor = hexToRGBA(dataset.originalPointBorderColor, 0.2);
              }
              // Ensure dataset is not hidden
              // chart.getDatasetMeta(i).hidden = false;
            });

            chart.tooltip.setActiveElements([], { x: 0, y: 0 });
            chart.setActiveElements([]);
            chart.update();
          }
        },
        // Restore dataset visibility and colors for lines and points, ensure tooltip, vertical line, and points remain unhighlighted
        onLeave: (event, legendItem, legend) => {
          const chart = legend.chart;
          chart.data.datasets.forEach((dataset, index) => {
            // Restore original colors for lines and points
            dataset.borderColor = dataset.originalBorderColor || dataset.borderColor;
            dataset.backgroundColor = dataset.originalBackgroundColor || dataset.backgroundColor;
            dataset.pointBackgroundColor = dataset.originalPointBackgroundColor || dataset.pointBackgroundColor;
            dataset.pointBorderColor = dataset.originalPointBorderColor || dataset.pointBorderColor;
            // Ensure dataset visibility respects toggled state
            const meta = chart.getDatasetMeta(index);
            meta.hidden = dataset.hidden || null;
          });

          chart.tooltip.setActiveElements([], { x: 0, y: 0 });
          chart.setActiveElements([]);
          chart.update();
        },
        // Handle click to toggle dataset visibility
        onClick: (event, legendItem, legend) => {
          const chart = legend.chart;
          const index = legendItem.datasetIndex;
          const meta = chart.getDatasetMeta(index);
          // Toggle the hidden state of the clicked dataset
          meta.hidden = !meta.hidden;
          // Persist the toggled state in the dataset
          chart.data.datasets[index].hidden = meta.hidden;
          chart.data.datasets.forEach((dataset, index) => {
            const meta = chart.getDatasetMeta(index);
            // Restore visibility based on the dataset's toggled state
            meta.hidden = dataset.hidden || null;
            // Restore original colors for visible datasets
            if (!meta.hidden) {
              dataset.borderColor = dataset.originalBorderColor || dataset.borderColor;
              dataset.backgroundColor = dataset.originalBackgroundColor || dataset.backgroundColor;
              dataset.pointBackgroundColor = dataset.originalPointBackgroundColor || dataset.pointBackgroundColor;
              dataset.pointBorderColor = dataset.originalPointBorderColor || dataset.pointBorderColor;
            }
          });
          props.setShowWelcomeOverlay(false);
          chart.update();
        },
      },
      title: {
        display: true,
        text: `${t("chartTitles.dataPer")}${title_map[props.timeline]}`,
        align: isMobile ? "center" : "start",
        color: "#FFFFFF",
        font: {
          family: "Arial, sans-serif",
          size: 16,
        },
        padding: {
          top: isMobile ? 15 : 0,
          // bottom: 30,
          left: 20,
          right: 20,
        },
      },
    },
  };

  const getDropdownPosition = () => {
    if (chartRef.current && chartRef.current.downloadButton) {
      const canvas = chartRef.current.canvas;
      const rect = canvas.getBoundingClientRect();
      const { x, width } = chartRef.current.downloadButton;
      return {
        top: `${40}px`,
        left: `${x - 110}px`,
      };
    }
  };

  const scrollToChart = () => {
    setTimeout(() => {
      const chartElement = document.getElementById("chart");
      if (chartElement) {
        chartElement.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
      }
    }, 100);
  };

  const resetDatasetVisibility = () => {
    const chart = chartRef.current;
    if (chart) {
      const allHidden = chart.data.datasets.every(
        (_, index) => chart.getDatasetMeta(index).hidden
      );
      if (allHidden) {
        chart.data.datasets.forEach((dataset, index) => {
          const meta = chart.getDatasetMeta(index);
          meta.hidden = false;
          dataset.hidden = false;
        });
        chart.update();
      }
    }
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
        props.setShowWelcomeOverlay(false);
        setDateChanged(false);
        setLoading(true);
        scrollToChart();
        resetDatasetVisibility();
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
        props.setShowWelcomeOverlay(false);
        setDateChanged(false);
        setLoading(true);
        scrollToChart();
        resetDatasetVisibility();
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
        props.setShowWelcomeOverlay(false);
        setDateChanged(false);
        setLoading(true);
        scrollToChart();
        resetDatasetVisibility();
      },
    },
  ];

  const handleStartDateSelect = (date) => {
    props.setShowWelcomeOverlay(false);
    setSelectedStartDate(date);
  };

  const handleEndDateSelect = (date) => {
    props.setShowWelcomeOverlay(false);
    setSelectedEndDate(date);
  };

  const getDateOnly = (dateTimeString) => {
    if (!dateTimeString) return "";
    const date = new Date(dateTimeString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div id="chart" className={styles.chart_section} onClick={handleOverlayClick}>
      <div style={{ height: "100%" }}>
        <div className={styles.toolbarAndFilter}>
          <div className={styles.FilterSection}>
            <div
              className={`${styles.filterButtons} ${
                !isMobile &&
                (loading || props.leftLoad || props.showWelcomeOverlay)
                  ? styles.blur
                  : ""
              }`}
            >
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
                onChange={(date) => {
                  if (getDateOnly(appliedStartDate) == getDateOnly(date) && getDateOnly(appliedEndDate) == getDateOnly(selectedEndDate)) {
                    setIsFilterClickable(false);
                    return;
                  }
                  setIsFilterClickable(true);
                  setSelectedStartDate(date);
                  setDateChanged(true);
                  if (date > selectedEndDate.getTime()){
                    setSelectedEndDate(date);
                  }
                }}
                selected={selectedStartDate}
                onSelect={handleStartDateSelect}
                maxDate={today}
                dateFormat="dd/MM/yyyy"
              />
              <DatePicker
                className={`${styles.pickerDropdown}`}
                value={selectedEndDate}
                onChange={(date) => {
                  if (getDateOnly(appliedEndDate) == getDateOnly(date) && getDateOnly(appliedStartDate) == getDateOnly(selectedStartDate)) {
                    setIsFilterClickable(false);
                    return;
                  }
                  setIsFilterClickable(true);
                  setSelectedEndDate(date);
                  setDateChanged(true);
                }}
                selected={selectedEndDate}
                onSelect={handleEndDateSelect}
                minDate={new Date(selectedStartDate.getTime())}
                maxDate={today}
                dateFormat="dd/MM/yyyy"
              />
              <button
                className={`${styles.filterButton} ${
                  selectedFilterButton === "filter" ? styles.activeFilter : ""
                }`}
                onClick={() => {
                  if (isFilterClickable == false) {
                    return;
                  }
                  setIsFilterClickable(false)
                  if (
                    props.startDate === selectedStartDate &&
                    props.endDate === selectedEndDate
                  ) {
                    return;
                  }
                  if (!dateChanged) {
                    return;
                  }
                  setSelectedFilterButton("Range");
                  props.setStartDate(selectedStartDate);
                  props.setEndDate(selectedEndDate);
                  setAppliedStartDate(selectedStartDate);
                  setAppliedEndDate(selectedEndDate);
                  setSelectedFilter("Range");
                  props.filterChange("Range");
                  props.setShowWelcomeOverlay(false);
                  setLoading(true);
                  scrollToChart();
                  resetDatasetVisibility();
                }}
                disabled={selectedFilterButton === "filter"}
              >
                {`${t("filterTooltips.filter")}`}
              </button>

              <div ref={dropdownRef} className={styles.dropdownContainer}>
                <button
                  className={styles.downloadIconButton}
                  onClick={toggleDropdown}
                  title="Download as..."
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                </button>
                {isDropdownOpen && (
                  <ul className={styles.dropdownMenu}
                    style={{fontSize: 14}}
                  >
                    <li
                      className={styles.dropdownItem}
                      onClick={() => handleDownloadOption("Current Measurments")}
                    >
                      {t("chartTitles.currentMeasur")}
                    </li>
                    <li
                      className={styles.dropdownItem}
                      onClick={() => handleDownloadOption("All Measurments")}
                    >
                      {t("chartTitles.allMeasur")}
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles.chartContainer}`}>
        {(loading || props.leftLoad) && (
          <div className={styles.loadingOverlay}>{t("chartTitles.update")}</div>
        )}
        {!isMobile && props.showWelcomeOverlay && !loading && !props.leftLoad && (
          <div className={styles.fullScreenPopup}>
            <div className={styles.popupContent}>
              <span>
            {t("chartTitles.zoomMessage.1")}
            <br></br>
            {t("chartTitles.zoomMessage.2")}
            <br></br>
            {t("chartTitles.zoomMessage.3")}
            </span>
            </div>
          </div>
        )}
        {showPopup && (
          <div
            className={styles.zoomLimitPopup}
          >
            {t("chartTitles.zoomLimit")}
          </div>
        )}
        <div
          className={`${styles.chartWrapper} ${
            loading || props.leftLoad || (!isMobile && props.showWelcomeOverlay)
              ? styles.blur
              : ""
          }`}
        >
          {(loading || props.leftLoad) && (
            <div className={styles.loadingOverlay}>
              {t("chartTitles.update")}
            </div>
          )}
          <div className={`${styles.chart_div}`}>
            <Line id="lineChart" options={options} data={data} plugins={[legendMargin]} ref={chartRef} />
            {isMobile && isDropdownOpen && (
              <div
                ref={dropdownRef}
                className={styles.dropdownMenu}
                style={{
                  position: "absolute",
                  zIndex: 1000,
                  ...getDropdownPosition(),
                }}
              >
                <ul style={{ margin: 0, padding: 0, listStyle: "none", fontSize: 14}}>
                  <li
                    className={styles.dropdownItem}
                    onClick={() => handleDownloadOption("Current Measurments")}
                  >
                    {t("chartTitles.currentMeasur")}
                  </li>
                  <li
                    className={styles.dropdownItem}
                    onClick={() => handleDownloadOption("All Measurments")}
                  >
                    {t("chartTitles.allMeasur")}
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDataGraphs;
