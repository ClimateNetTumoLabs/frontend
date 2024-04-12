import React, { useEffect, useRef, useState } from "react";
import ReactApexChart from 'react-apexcharts';
import styles from './WeatherDataGraphs.module.css'
import Loader from "react-js-loader";
import DatePicker from "react-datepicker";
import styled from 'styled-components';
import ReactDOM from 'react-dom';

const formatData = (names, dataArray) => {
    return names.map((name, index) => ({
        name: name,
        data: dataArray[index]
    }));
};

const StyledDatePickerContainer = styled(DatePicker)`
    width: 300px;
    align-self: center;
`;


const WeatherDataGraphs = (props) => {
    const seriesData = formatData(props.types, props.data);
    const datetimeCategories = props.time.map(time => new Date(time).getTime());
    const chartRef = useRef(null);
    const today = new Date();
    const [selectedStartDate, setSelectedStartDate] = useState(props.startDate);
    const [selectedEndDate, setSelectedEndDate] = useState(props.endDate);
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                showStartDatePicker &&
                !event.target.closest('.from') &&
                !event.target.closest('.react-datepicker')
            ) {
                setShowStartDatePicker(false);
            }

            if (
                showEndDatePicker &&
                !event.target.closest('.to') &&
                !event.target.closest('.react-datepicker')
            ) {
                setShowEndDatePicker(false);
            }
        };

        document.body.addEventListener('click', handleClickOutside);

        return () => {
            document.body.removeEventListener('click', handleClickOutside);
        };
    }, [showStartDatePicker, showEndDatePicker]);

    const handleDatePickerClick = (event) => {
        event.stopPropagation();
    }
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
                                icon: `
                                    <div class="custom-icon to">to</div>
                                `,
                                index: -19,
                                title: 'Filter',
                                class: 'custom-icon-button',
                                click: () => {
                                    setShowEndDatePicker((prev) => !prev)
                                    setShowStartDatePicker(false);
                                }
                            },
                            {
                                icon: '<div class="custom-icon from" >from</div>',
                                index: -19,
                                title: 'Filter',
                                class: 'custom-icon-button',
                                click: () => {
                                    setShowStartDatePicker((prev) => !prev)
                                    setShowEndDatePicker(false)
                                }
                            },
                            {
                                icon: '<div class="custom-icon" data-tooltip="Current Month">1M</i>',
                                index: -9,
                                title: 'Filter',
                                class: 'custom-icon-button',
                                click: () => {
                                    props.setLeftLoad(true)
                                    props.filterChange("Monthly")
                                }
                            },
                            {
                                icon: '<div class="custom-icon" data-tooltip="7 Days">7D</div>',
                                index: -9,
                                title: 'Filter',
                                class: 'custom-icon-button',
                                click: (event) => {
                                    props.setLeftLoad(true)
                                    props.filterChange("Daily")
                                }
                            },
                            {
                                icon: `<div class="custom-icon" data-tooltip="Hourly" >1D</div>`,
                                index: -9,
                                title: 'Filter',
                                class: 'custom-icon-button',
                                click: (event) => {
                                    props.setLeftLoad(true)
                                    props.filterChange("Hourly");
                                }
                            },
                            {
                                icon: '<div class="custom-icon">filter</div>',
                                index: -9,
                                title: 'Filter',
                                class: 'custom-icon-button',
                                click: () => {
                                    props.setLeftLoad(true);
                                    props.filterChange("Range")
                                    props.setStartDate(selectedStartDate);
                                    props.setEndDate(selectedEndDate);
                                    setShowStartDatePicker(false);
                                    setShowEndDatePicker(false);
                                }
                            },

                        ],
                        download: true,
                        selection: true,
                        zoomin: true,
                        zoomout: true,
                        zoom: true,
                        pan: true,
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
            } finally {
                props.setLeftLoad(false)
            }
        };

        fetchData();
    }, [props.types, props.data, props.time, props.timeline]);

    return (
        <div className={styles.chart_section}>
            <div style={{ height: "100%" }}>
                <div className={styles.toolbarAndFilter}>
                    <div className={styles.FilterSection}>
                        {document.querySelector('.from') ? ReactDOM.createPortal(
                            <div>
                                {(showStartDatePicker || showEndDatePicker) && (
                                    <div className="pickerDropdown" onClick={handleDatePickerClick}>
                                        <StyledDatePickerContainer
                                            selected={selectedStartDate}
                                            onChange={date => setSelectedStartDate(date)}
                                            popperClassName="propper"
                                            popperPlacement="bottom"
                                            popperModifiers={[
                                                {
                                                    name: "offset",
                                                    options: {
                                                        offset: [0, 0],
                                                    },
                                                },
                                                {
                                                    name: "preventOverflow",
                                                    options: {
                                                        rootBoundary: "viewport",
                                                        tether: false,
                                                        altAxis: true,
                                                    },
                                                },
                                            ]}
                                            maxDate={today}
                                            open={true}
                                            inline
                                        />
                                    </div>
                                )}
                            </div>,
                            document.querySelector('.from')
                        ) : null}

                        {document.querySelector('.to') ? ReactDOM.createPortal(
                            <div>
                                {(showStartDatePicker || showEndDatePicker) && (
                                    <div className="pickerDropdown" onClick={handleDatePickerClick}>
                                        <StyledDatePickerContainer
                                        selected={selectedEndDate}
                                        onChange={date => setSelectedEndDate(date)}
                                        popperClassName="propper"
                                        popperPlacement="bottom"
                                        popperModifiers={[
                                            {
                                                name: "offset",
                                                options: {
                                                    offset: [0, 0],
                                                },
                                            },
                                            {
                                                name: "preventOverflow",
                                                options: {
                                                    rootBoundary: "viewport",
                                                    tether: false,
                                                    altAxis: true,
                                                },
                                            },
                                        ]}
                                        minDate={selectedStartDate}
                                        maxDate={today}
                                        open={true}
                                        inline
                                    />
                                    </div>
                                )}
                            </div>,
                            document.querySelector('.to')
                        ) : null}
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
        </div>
    );
};

export default WeatherDataGraphs;