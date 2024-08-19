import React, { useEffect, useState } from "react";
import ReactApexChart from 'react-apexcharts';
import styles from './WeatherDataGraphs.module.css';

const formatData = (names, dataArray) => {
    return names.map((name, index) => ({
        name: name,
        data: dataArray[index]
    }));
};

const WeatherDataGraphs = ({ types, data, time, timeline, colors }) => {
    const [originalData, setOriginalData] = useState({ series: [], categories: [] });
    const [filteredData, setFilteredData] = useState({ series: [], categories: [] });
    const [customStartDate, setCustomStartDate] = useState('');
    const [customEndDate, setCustomEndDate] = useState('');

    useEffect(() => {
        const seriesData = formatData(types, data);
        const categories = time.map(t => new Date(t).getTime());
        setOriginalData({ series: seriesData, categories });
        setFilteredData({ series: seriesData, categories });
    }, [types, data, time]);

    const filterData = (startDate, endDate) => {
        const startTime = startDate.getTime();
        const endTime = endDate.getTime();

        const filteredCategories = originalData.categories.filter(t => t >= startTime && t <= endTime);
        const filteredSeries = originalData.series.map(series => ({
            ...series,
            data: series.data.filter((_, index) => originalData.categories[index] >= startTime && originalData.categories[index] <= endTime)
        }));

        setFilteredData({ series: filteredSeries, categories: filteredCategories });
    };

    const handleRangeSelect = (days) => {
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(endDate.getDate() - days);
        filterData(startDate, endDate);
    };

    const handleCustomRange = () => {
        if (customStartDate && customEndDate) {
            const startDate = new Date(customStartDate);
            const endDate = new Date(customEndDate);
            filterData(startDate, endDate);
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
            theme: 'dark',
            x: {
                format: 'yyyy-MM-dd HH:mm',
            },
        },
    };

    return (
        <div className={styles.chart_section}>
            <div className={styles.filter_section}>
                <div className={styles.buttonContainer}>
                    <button className={`${styles.button} ${styles.filter_button}`} onClick={() => handleRangeSelect(1)}>1 Day</button>
                    <button className={`${styles.button} ${styles.filter_button}`} onClick={() => handleRangeSelect(7)}>1 Week</button>
                    <button className={`${styles.button} ${styles.filter_button}`} onClick={() => handleRangeSelect(30)}>1 Month</button>
                </div>
                <div className={styles.date_format}>
                    <label className={styles.filter_label}>Start:</label>
                    <input
                        className={styles.date_input}
                        type="date"
                        value={customStartDate}
                        onChange={(e) => setCustomStartDate(e.target.value)}
                    />
                </div>
                <div className={styles.date_format}>
                    <label className={styles.filter_label}>End:</label>
                    <input
                        className={styles.date_input}
                        type="date"
                        value={customEndDate}
                        onChange={(e) => setCustomEndDate(e.target.value)}
                    />
                </div>
                <button className={`${styles.button} ${styles.filter_button}`} onClick={handleCustomRange}>Apply Custom Range</button>
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