import React, { useEffect, useRef, useState } from "react";
import ReactApexChart from 'react-apexcharts';
import styles from './WeatherDataGraphs.module.css'
import Loader from "react-js-loader";
import DatePicker from "react-datepicker";
import ReactDOM from 'react-dom';

const formatData = (names, dataArray) => {
    return names.map((name, index) => ({
        name: name,
        data: dataArray[index]
    }));
};

const formatDate = (date) => {
    if (!(date instanceof Date) || isNaN(date)) {
        return "";
    }
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const WeatherDataGraphs = (props) => {
    const seriesData = formatData(props.types, props.data);
    const datetimeCategories = props.time.map(time => new Date(time).getTime());
    const chartRef = useRef(null);
    const today = new Date();
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);

    useEffect(() => {
        props.setStartDate(props.selectedStartDate);
        props.setEndDate(props.selectedEndDate);
    }, [props.data]);

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
                                icon: '<div class="custom-icon filter_button">filter</div>',
                                index: -18,
                                title: 'Filter',
                                class: 'custom-icon-button',
                                click: () => {
                                    props.setLoading(true)
                                    props.filterChange("Range")
                                    setShowStartDatePicker(false);
                                    setShowEndDatePicker(false);
                                }
                            },
                            {
                                icon: `
                                    <div class="custom-icon to">to</div>
                                `,
                                index: -18,
                                title: 'Filter',
                                class: 'custom-icon-button',
                                click: () => {
                                    setShowEndDatePicker((prev) => !prev)
                                    setShowStartDatePicker(false);
                                }
                            },
                            {
                                icon: `<div class="custom-icon from">from</div>`,
                                index: -18,
                                title: 'Filter',
                                class: 'custom-icon-button',
                                click: () => {
                                    setShowStartDatePicker((prev) => !prev)
                                    setShowEndDatePicker(false)
                                }
                            },
                            {
                                icon: '<div class="custom-icon" data-tooltip="Current Month">1M</i>',
                                index: -19,
                                title: 'Filter',
                                class: 'custom-icon-button',
                                click: () => {
                                    props.setLoading(true)
                                    props.filterChange("Monthly")
                                }
                            },
                            {
                                icon: '<div class="custom-icon" data-tooltip="7 Days">7D</div>',
                                index: -19,
                                title: 'Filter',
                                class: 'custom-icon-button',
                                click: (event) => {
                                    props.setLoading(true)
                                    props.filterChange("Daily")
                                }
                            },
                            {
                                icon: `<div class="custom-icon" data-tooltip="Hourly" >1D</div>`,
                                index: -19,
                                title: 'Filter',
                                class: 'custom-icon-button',
                                click: (event) => {
                                    props.setLoading(true)
                                    props.filterChange("Hourly");
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
                offsetY: 60,
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
                    format: 'MM-dd HH',
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
                const numTimestamps = props.time.length;
    
                const startDate = datetimeCategories[0]; 
                const endDate = datetimeCategories[numTimestamps - 1]; 
    
                const interval = (endDate - startDate) / (numTimestamps - 1);
    
                const evenlySpacedTimestamps = [];
                for (let i = 0; i < numTimestamps; i++) {
                    evenlySpacedTimestamps.push(startDate + i * interval);
                }
    
                setChartState(prevState => ({ 
                    series: formatData(props.types, props.data),
                    options: {
                        ...prevState.options,
                        title: {
                            text: `Data per ${props.timeline}`,
                            align: 'left'
                        },
                        xaxis: {
                            ...prevState.options.xaxis,
                            categories: evenlySpacedTimestamps,
                        },
                        tickAmount: evenlySpacedTimestamps.length,
                    },
                }));
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                props.setLeftLoad(false)
                props.setLoading(false)
            }
        }; 
        fetchData();
    }, [props.data, props.types, props.timeline, props.setLeftLoad, props.time, props.id]);

    const handleStartDateSelect = (date) => {
        setShowStartDatePicker(false);
        props.setSelectedStartDate(date);
    };

    const handleEndDateSelect = (date) => {
        setShowEndDatePicker(false);
        props.setSelectedEndDate(date)
    };

    return (
        <div className={styles.chart_section}>
            <div style={{ height: "100%" }}>
                <div className={styles.toolbarAndFilter}>
                    <div className={styles.FilterSection}>
                        {document.querySelector('.from') ? ReactDOM.createPortal(
                            <div>
                                {<div>{formatDate(props.selectedStartDate)}</div>}
                                {((showStartDatePicker)) && (
                                    <>
                                        <div className="pickerDropdown" onClick={handleDatePickerClick}>
                                            <DatePicker
                                                selected={props.selectedStartDate}
                                                onSelect={handleStartDateSelect}
                                                onChange={date => props.setSelectedStartDate(date)}
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
                                    </>
                                )}
                            </div>,
                            document.querySelector('.from')
                        ) : null}

                        {document.querySelector('.to') ? ReactDOM.createPortal(
                            <div>
                                {<div>{formatDate(props.selectedEndDate)}</div>}
                                {(showEndDatePicker) && (
                                    <div className="pickerDropdown" onClick={handleDatePickerClick}>
                                        <DatePicker
                                            selected={props.selectedEndDate}
                                            onSelect={handleEndDateSelect}
                                            onChange={date => props.setSelectedEndDate(date)}
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
                                            minDate={new Date(props.selectedStartDate.getTime() + 24 * 60 * 60 * 1000)}
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
                    {(props.loading || props.leftLoad) ? (
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