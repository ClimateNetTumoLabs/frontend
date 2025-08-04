import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ReactComponent as Clock } from '../../assets/FilterIcons/clock.svg'
import { ReactComponent as Calendar } from '../../assets/FilterIcons/calendar.svg'
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import styles from "./InnerPageFilter.module.css";

function InnerPageFilter(props) {
  const { t } = useTranslation();
  const today = new Date();
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [isRangeActive, setIsRangeActive] = useState(false);

  const isHourlyAvailable = true; // Always available
  const isDailyAvailable = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000) >= props.minDate;
  const isMonthlyAvailable = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000) >= props.minDate;

  const scrollToChart = () => {
    setTimeout(() => {
      const chartElement = document.getElementById("chart");
      if (chartElement) {
        chartElement.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
      }
    }, 100);
  };

  const dateValidation = () => {
    const currentDate = new Date();
    let start;
    let end = currentDate;
    switch (props.filterState) {
      case "Hourly":
        start = new Date(currentDate.getTime() - 24 * 60 * 60 * 1000);
        break;
      case "Daily":
        start = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case "Monthly":
        start = new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case "Range":
        return true;
    }

    const getDateOnly = (date) => {
      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, '0'); // Ensure 2-digit format
      const dd = String(date.getDate()).padStart(2, '0');
      return `${yyyy}-${mm}-${dd}`; // Format required for <input type="date">
    };

    if (getDateOnly(startDate) === getDateOnly(start) && getDateOnly(endDate) === getDateOnly(end)) {
      return false;
    }
    return true;
  };

  const handleApply = () => {
    if (props.startDate.getTime() == startDate.getTime() && props.endDate.getTime() == endDate.getTime()) {
      scrollToChart();
      props.setShowDatePicker(false);
      setIsRangeActive(false);
      return;
    }
    if (!dateValidation()) {
      scrollToChart();
      props.setShowDatePicker(false);
      setIsRangeActive(false);
      return;
    }
    props.setLeftLoad(true);
    props.filterChange("Range");
    props.setStartDate(startDate);
    props.setEndDate(endDate);
    props.setShowDatePicker(false);
    setIsRangeActive(false);
    scrollToChart();
  };

  const handleRangeClick = () => {
    setIsRangeActive(true);
    props.setShowDatePicker(true);
  };

  const closeDatePicker = () => {
    props.setShowDatePicker(false);
    setIsRangeActive(false);
  };

  return (
    <div className={styles.InnerPageFilterSection}>
      <div
        className={`option ${styles.filterItemBlock} ${
          props.filterState === "Hourly" && !isRangeActive ? styles.active : ""
        } ${!isHourlyAvailable ? styles.disabled : ""}`}
        onClick={() => {
          if (!isRangeActive && isHourlyAvailable) {
            props.filterChange("Hourly");
            scrollToChart();
          }
        }}
      >
        <Clock/>
        <span>{t("innerPageFilter.options.hourly")}</span>
      </div>
      <div
        className={`option ${styles.filterItemBlock} ${
          props.filterState === "Daily" && !isRangeActive ? styles.active : ""
        } ${!isDailyAvailable ? styles.disabled : ""}`}
        onClick={() => {
          if (!isRangeActive && isDailyAvailable) {
            props.filterChange("Daily");
            scrollToChart();
          }
        }}
      >
        <Calendar/>
        <span>{t("innerPageFilter.options.daily")}</span>
      </div>
      <div
        className={`option ${styles.filterItemBlock} ${
          props.filterState === "Monthly" && !isRangeActive ? styles.active : ""
        } ${!isMonthlyAvailable ? styles.disabled : ""}`}
        onClick={() => {
          if (!isRangeActive && isMonthlyAvailable) {
            props.filterChange("Monthly");
            scrollToChart();
          }
        }}
      >
        <Calendar/>
        <span>{t("innerPageFilter.options.monthly")}</span>
      </div>
      <div
        className={`option ${styles.filterItemBlock} ${
          isRangeActive ? styles.active : ""
        }`}
        onClick={handleRangeClick}
      >
        <Calendar/>
        <span>{t("innerPageFilter.options.range")}</span>
      </div>
      {props.showDatePicker && (
        <>
          <div className={styles.blurOverlay} onClick={closeDatePicker}></div>
          <div className={styles.pickerContainer}>
            <button className={styles.closeBtn} onClick={closeDatePicker}>
              <FontAwesomeIcon icon={faXmark} />
            </button>
            <p className={styles.mobile_range_text}>
              {t("innerPageFilter.mobile_text")}
            </p>
            <DatePicker
              selected={startDate}
              onChange={(date) => setDateRange(date)}
              startDate={startDate}
              endDate={endDate}
              selectsRange
              inline
              minDate={props.minDate}
              maxDate={today}
            />
            <button
              className={`${styles.filter_button} ${
                !startDate || !endDate ? styles.disabled : ""
              }`}
              onClick={handleApply}
              disabled={!startDate || !endDate}
            >
              {t("innerPageFilter.options.filter")}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default InnerPageFilter