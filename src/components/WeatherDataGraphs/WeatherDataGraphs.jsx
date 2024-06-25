import React, {useEffect, useRef, useState} from "react";
import ReactApexChart from 'react-apexcharts';
import styles from './WeatherDataGraphs.module.css'
import {useTranslation} from "react-i18next";
import "../../i18n";


const formatData = (names, dataArray) => {
    return names.map((name, index) => ({
        name: name,
        data: dataArray[index]
    }));
};

const WeatherDataGraphs = (props) => {
    const {t} = useTranslation();
    const seriesData = formatData(props.types, props.data);
    const datetimeCategories = props.time.map(time => new Date(time).getTime());
    const chartRef = useRef(null);
    console.log(props.state)
    const [chartState, setChartState] = useState({
        series: seriesData,
        options: {
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
                    show: true,
                    tools: {
                        customIcons: [
                            {
                                icon: `<div class="custom-icon  filter_button">${t("filterTooltips.filter")}</div>`,
                                index: -18,
                                title: 'Filter',
                                class: 'custom-icon-button',
                                click: () => {
                                    props.setFilterPressed(true);
                                }
                            },
                            {
                                icon: `<div class="custom-icon to"></div>`,
                                index: -18,
                                title: 'Filter',
                                class: 'custom-icon-button',
                                click: () => {
                                    // setShowEndDatePicker((prev) => !prev);
                                    // setShowStartDatePicker(false);
                                }
                            },
                            {
                                icon: `<div class="custom-icon from"></div>`,
                                index: -18,
                                title: 'Filter',
                                class: 'custom-icon-button',
                                click: () => {
                                    // setShowStartDatePicker((prev) => !prev)
                                    // setShowEndDatePicker(false)
                                }
                            },
                            {
                                icon: `<div class="custom-icon">${t("filterTooltips.oneM")}</div>`,
                                index: -19,
                                title: 'Filter',
                                class: 'custom-icon-button',
                                click: () => {
                                    const currentDate = new Date();
                                    // const currentMonth = currentDate.getMonth();
                                    // const currentYear = currentDate.getFullYear();
                                    //const start = (new Date(currentYear, currentMonth, 1));
                                    //const end = (new Date(currentYear, currentMonth + 1, 0) > currentDate ? currentDate : new Date(currentYear, currentMonth + 1, 0));
                                    // setSelectedEndDate(end)
                                    // setSelectedStartDate(start)
                                    props.filterChange("Monthly")
                                }
                            },
                            {
                                icon: `<div class="custom-icon">${t("filterTooltips.sevenD")}</div>`,
                                index: -19,
                                title: 'Filter',
                                class: 'custom-icon-button',
                                click: (event) => {
                                    const currentDate = new Date();
                                    //const end = (currentDate);
                                    //const start = (new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000))
                                    // setSelectedEndDate(end)
                                    // setSelectedStartDate(start)
                                    props.filterChange("Daily")
                                }
                            },
                            {
                                icon: `<div class="custom-icon">${t("filterTooltips.oneD")}</div>`,
                                index: -19,
                                title: 'Filter',
                                class: 'custom-icon-button',
                                click: () => {
                                    //let start, end;
                                    //const currentDate = new Date();
                                    // start = new Date(currentDate.getTime() - 24 * 60 * 60 * 1000);
                                    // end = currentDate;
                                    // setSelectedEndDate(end);
                                    // setSelectedStartDate(start);
                                    props.filterChange("Hourly");
                                }
                            },
                        ],
                        download: true,
                        selection: false,
                        zoomin: false,
                        zoomout: false,
                        zoom: false,
                        pan: false,
                    },
                },
            },
            colors: props.colors,
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: 'smooth'
            },
            title: {
                text: `Data per ${props.timeline}`,
                align: 'left',
                offsetX: 8,
                offsetY: 3,
            },
            markers: {
                size: 1
            },
            xaxis: {
                categories: datetimeCategories,
                type: 'datetime',
                labels: {
                    format: 'MM-dd HH:mm', // Customize the label format as needed
                },
            },
            legend: {
                position: 'top',
                horizontalAlign: 'center',
                floating: true,
                offsetY: -25,
            },
            tooltip: {
                x: {
                    format: 'yyyy-MM-dd HH:mm', // Customize the tooltip date format
                },
            },
        },
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                // await new Promise(resolve => setTimeout(resolve, 500));
                const datetimeCategories = props.time.map(time => new Date(time).getTime());
                setChartState({
                    series: formatData(props.types, props.data),
                    options: {
                        ...chartState.options,
                        xaxis: {
                            ...chartState.options.xaxis,
                            categories: datetimeCategories,
                        },
                    },
                });
                chartRef.current?.render();
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();


    }, [props.types, props.data, props.time]);
    return (
        <div className={styles.chart_section}>
            <div>
                <ReactApexChart ref = {chartRef} options={chartState.options} series={chartState.series} type="line" height={500} />
            </div>
        </div>
    );
};

export default WeatherDataGraphs;