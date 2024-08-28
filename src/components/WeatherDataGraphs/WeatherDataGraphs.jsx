import React, { useEffect, useState } from "react";
import ReactApexChart from 'react-apexcharts';
import styles from './WeatherDataGraphs.module.css';
import { useTranslation } from "react-i18next";
const formatData = (names, dataArray) => {
    return names.map((name, index) => ({
        name: name,
        data: dataArray[index]
    }));
};

const WeatherDataGraphs = ({ graphProps, setCustomStartDate, customStartDate, setCustomEndDate, customEndDate, setTimeFilter }) => {
    const { t } = useTranslation()
    const { types, data, time, timeline, colors } = graphProps;
    const [filteredData, setFilteredData] = useState({ series: [], categories: [] });

    useEffect(() => {
        const seriesData = formatData(types, data);
        const categories = time.map(t => new Date(t).getTime());
        setFilteredData({ series: seriesData, categories });
    }, [types, data, time]);
    const formatDate = (date) => {
        if (!(date instanceof Date) || isNaN(date)) {
            return "";
        }
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const handleRangeSelect = (days, filterState) => {
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(endDate.getDate() - days);
        setCustomStartDate(formatDate(startDate))
        setCustomEndDate(formatDate(endDate))
        setTimeFilter(filterState);
    };

    const handleCustomRange = (filterState) => {
        if (customStartDate && customEndDate) {
            const startDate = new Date(customStartDate);
            const endDate = new Date(customEndDate);
            setCustomStartDate(formatDate(startDate))
            setCustomEndDate(formatDate(endDate))
            setTimeFilter(filterState)
        }
    };

    const chartOptions = {
        chart: {
            height: 350,
            type: 'line',
            dropShadow: {
                enabled: true,
                color: '#000',
                top: 18,
                left: 7,
                blur: 10,
                opacity: 0.2
            },
            toolbar: {
                show: true
            },
            background: 'transparent',
        },
        colors: colors,
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: 'smooth'
        },
        title: {
            text: `Data per ${timeline}`,
            align: 'left',
            style: {
                color: '#fff'
            }
        },
        markers: {
            size: 1
        },
        xaxis: {
            categories: filteredData.categories,
            type: 'datetime',
            labels: {
                format: 'MM-dd HH:mm',
                style: {
                    colors: '#fff'
                }
            },
        },
        yaxis: {
            labels: {
                style: {
                    colors: '#fff'
                }
            }
        },
        legend: {
            position: 'top',
            horizontalAlign: 'center',
            floating: true,
            offsetY: -25,
            labels: {
                colors: '#fff'
            }
        },
        tooltip: {
            theme: 'light', // Set the theme to light
            style: {
                fontSize: '12px',
                fontFamily: undefined,
                backgroundColor: '#fff', // Set the background color to white
                color: '#333' // Set the text color to dark
            },
            x: {
                format: 'yyyy-MM-dd HH:mm',
            },
        },
    };

    return (
        <div className={styles.chart_section}>
            <div className={styles.filter_section}>
                <div className={styles.buttonContainer}>
                    <button className={`${styles.button} ${styles.filter_button}`} onClick={() => handleRangeSelect(1, "Hourly")}>{t('filterTooltips.oneD')}</button>
                    <button className={`${styles.button} ${styles.filter_button}`} onClick={() => handleRangeSelect(7, "Daily")}>{t('filterTooltips.oneW')}</button>
                    <button className={`${styles.button} ${styles.filter_button}`} onClick={() => handleRangeSelect(30, "Monthly")}>{t('filterTooltips.oneM')}</button>
                </div>
                <div className={styles.date_format}>
                    <label className={styles.filter_label}>{t('filterTooltips.start')}</label>
                    <input
                        className={styles.date_input}
                        type="date"
                        value={customStartDate}
                        onChange={(e) => setCustomStartDate(e.target.value)}
                    />
                </div>
                <div className={styles.date_format}>
                    <label className={styles.filter_label}>{t('filterTooltips.end')}</label>
                    <input
                        className={styles.date_input}
                        type="date"
                        value={customEndDate}
                        onChange={(e) => setCustomEndDate(e.target.value)}
                    />
                </div>
                <button className={`${styles.button} ${styles.filter_button}`} onClick={()=> handleCustomRange ("Range")}>{t('filterTooltips.filter')}</button>
            </div>
            <div className={styles.chart_div}>
                <ReactApexChart
                    options={chartOptions}
                    series={filteredData.series}
                    type="line"
                    height="100%"
                />
            </div>
        </div>
    );
};

export default WeatherDataGraphs;
