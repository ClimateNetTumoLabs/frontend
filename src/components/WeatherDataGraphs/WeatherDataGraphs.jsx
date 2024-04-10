import React, { useEffect, useRef, useState } from "react";
import ReactApexChart from 'react-apexcharts';
import styles from './WeatherDataGraphs.module.css'
import Loader from "react-js-loader";
import InnerPageFilter from "../InnerPageFilter/InnerPageFilter";

const formatData = (names, dataArray) => {
    return names.map((name, index) => ({
        name: name,
        data: dataArray[index]
    }));
};

const WeatherDataGraphs = (props) => {
    const seriesData = formatData(props.types, props.data);
    const datetimeCategories = props.time.map(time => new Date(time).getTime());
    const chartRef = useRef(null);
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
                    opacity: 0.2,
                    horizontalAlign: 'center',
                },
                toolbar: {
                    show: true,
                    align: 'start',
                    tools: {
                        customIcons: [
                            {
                                icon: `<div class="custom-icon-last" data-tooltip="1D" >1D</div>`,
                                index: -8,
                                title: 'Filter8',
                                class: 'custom-icon',
                                click: () => {
                                    props.setLeftLoad(true)
                                    props.filterChange("Hourly");
                                }
                            },
                            {
                                icon: '<div class="custom-icon" data-tooltip="7D">7D</i>',
                                index: -8,
                                title: 'Filter',
                                class: 'custom-icon-last',
                                click: () => {
                                    props.setLeftLoad(true)
                                    props.filterChange("Daily")
                                }
                            },
                            {
                                icon: '<div class="custom-icon" data-tooltip="1M">1M</i>',
                                index: -8,
                                title: 'Filter',
                                class: 'custom-icon',
                                click: () => {
                                    props.setLeftLoad(true)
                                    props.filterChange("Monthly")
                                }
                            }
                        ],
                        download: true,
                        selection: true,
                        zoomin: {
                            enabled: true,
                            index: 0 // adjust this index value accordingly
                        },
                        zoomout: true,
                        zoom: true,
                        pan: true,
                        spacer: {
                        class: 'custom-spacer'
                    }
                    },
                },
                
                redrawOnParentResize: true,
                offsetX: 0,
                offsetY: 40,
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
                align: 'left'
            },
            markers: {
                size: 1
            },
            xaxis: {
                categories: datetimeCategories,
                type: 'datetime',
                labels: {
                    format: 'MM-dd HH:mm',
                    show: true,
                    rotate: -50,
                    rotateAlways: true,
                    hideOverlappingLabels: true,
                    trim: false,
                    minHeight: 190,
                    formatter: function (value) {
                        var date = new Date(value);
                        var formattedDate = ('0' + (date.getMonth() + 1)).slice(-2) + '-' +
                            ('0' + date.getDate()).slice(-2) + ' ' +
                            ('0' + date.getHours()).slice(-2) + ':' +
                            ('0' + date.getMinutes()).slice(-2);
                        return formattedDate;
                    }
                },
                tickAmount: datetimeCategories.length
            },
            yaxis: {
                formatter: function (value) {
                    var date = new Date(value);
                    var formattedDate = ('0' + (date.getMonth() + 1)).slice(-2) + '-' +
                        ('0' + date.getDate()).slice(-2) + ' ' +
                        ('0' + date.getHours()).slice(-2) + ':' +
                        ('0' + date.getMinutes()).slice(-2);
                    return formattedDate;
                }
            },
            legend: {
                position: 'top',
                horizontalAlign: 'center',
                floating: true,
                offsetY: -25,
            },
            tooltip: {
                x: {
                    format: 'yyyy-MM-dd HH:mm',
                },
            },
            responsive: [{
                breakpoint: 768,
                options: {
                    legend: {
                        position: 'top',
                        align: 'start',
                        offsetY: 0,
                        offsetX: 0,
                        floating: false,
                        fontSize: '12px',
                        itemMargin: {
                            horizontal: 10,
                            vertical: 5
                        }
                    },
                    title: {
                        align: 'center',
                        offsetY: 5,
                        style: {
                            fontSize: '14px',
                        },
                    },
                    tooltip: {
                        enabled: true,
                        align: 'center',
                        x: {
                            show: false,
                            format: 'yyyy-MM-dd HH:mm',
                        }
                    },
                }
            }]
        },
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 2000));
                const datetimeCategories = props.time.map(time => new Date(time).getTime());
                setChartState(prevState => ({
                    ...prevState,
                    series: formatData(props.types, props.data),
                    options: {
                        ...prevState.options,
                        title: {
                            text: `Data per ${props.timeline}`,
                            align: 'left'
                        },
                        xaxis: {
                            ...prevState.options.xaxis,
                            categories: datetimeCategories,
                        },
                    },
                }));
            } catch (error) {
                console.error("Error fetching data:", error);
            }
            props.setLeftLoad(false)
        };

        fetchData();
    }, [props.types, props.data, props.time, props.timeline, props.leftLoad]);

    return (
        <div className={styles.chart_section}>
            <div style={{ height: "100%" }}>
            <div className={styles.FilterSection}>
                <InnerPageFilter
                    filterState={props.filterState}
                    filterChange={props.filterChange}
                    startDate={props.startDate}
                    setStartDate={props.setStartDate}
                    endDate={props.endDate}
                    setEndDate={props.setEndDate}
                    error={props.error}
                    showDatePicker={props.showDatePicker}
                    setShowDatePicker={props.setShowDatePicker}
                    handleCloseDatePicker={props.handleCloseDatePicker}
                    setError={props.setError}
                    leftLoad={props.leftLoad}
                    setLeftLoad={props.setLeftLoad}
                />
            </div>
            
                {props.leftLoad ? (
                    <Loader type="spinner-circle"
                        bgColor={"#FFFFFF"}
                        color={"#FFFFFF"}
                        size={100} />
                ) : (
                    <>
                        <ReactApexChart ref={chartRef} options={chartState.options} series={chartState.series} type="line" height={500} />
                    </>
                )}
            </div>
        </div>
    );
};

export default WeatherDataGraphs;