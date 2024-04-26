import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
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
    const [selectedStartDate, setSelectedStartDate] = useState(props.startDate);
    const [selectedEndDate, setSelectedEndDate] = useState(props.endDate);
    const [loading, setLoading] = useState(false);
    const [filterPressed, setFilterPressed] = useState(false);

    useEffect(() => {
        props.filterChange("Hourly")
        setSelectedStartDate(today)
        setSelectedEndDate(today)
    }, [props.id])

    useEffect(() => {
        if (filterPressed) {
            props.setStartDate(selectedStartDate);
            props.setEndDate(selectedEndDate);
            setFilterPressed(false)
        }
    }, [filterPressed])

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
                                    handleFilterByRange();
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
                                    setLoading(true)
                                    props.filterChange("Monthly")
                                    const currentDate = new Date();
                                    const currentMonth = currentDate.getMonth();
                                    const currentYear = currentDate.getFullYear();
                                    setSelectedStartDate((new Date(currentYear, currentMonth, 1)));
                                    setSelectedEndDate((new Date(currentYear, currentMonth + 1, 0) > currentDate ? currentDate : new Date(currentYear, currentMonth + 1, 0)));
                                }
                            },
                            {
                                icon: '<div class="custom-icon" data-tooltip="7 Days">7D</div>',
                                index: -19,
                                title: 'Filter',
                                class: 'custom-icon-button',
                                click: (event) => {
                                    props.setLoading(true)
                                    setLoading(true)
                                    props.filterChange("Daily")
                                    setSelectedEndDate(today)
                                    setSelectedStartDate(new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000))
                                }
                            },
                            {
                                icon: `<div class="custom-icon" data-tooltip="Hourly" >1D</div>`,
                                index: -19,
                                title: 'Filter',
                                class: 'custom-icon-button',
                                click: (event) => {
                                    props.setLoading(true)
                                    setLoading(true)
                                    props.filterChange("Hourly");
                                    setSelectedEndDate(today)
                                    setSelectedStartDate(today)
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
                offsetX: -20,
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
            setLoading(true)
            try {
                await new Promise(resolve => setTimeout(resolve, 2000));
                const datetimeCategories = props.time.map(time => new Date(time).getTime());
                const numTimestamps = datetimeCategories.length;

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
            }
        };
        fetchData();
    }, [props.data, props.types, props.timeline, props.time]);

    const handleStartDateSelect = (date) => {
        setSelectedStartDate(date);
        setShowStartDatePicker(false)
    };

    const handleEndDateSelect = (date) => {
        setSelectedEndDate(date)
        setShowEndDatePicker(false)
    };

    const handleFilterByRange = () => {
        setFilterPressed(true);
        setLoading(true)
        props.filterChange("Range");
    };

    const handleDatePickerClick = (event) => {
        event.stopPropagation();
    };

    useEffect(() => {
        const chart = chartRef?.current?.chart;

        const handleChartUpdate = () => {
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        };
        chart?.addEventListener("updated", handleChartUpdate);

        return () => {
            chart?.removeEventListener("updated", handleChartUpdate);
        };
    }, [datetimeCategories, props.data]);


    return (
        <div className={styles.chart_section}>
            <div style={{ height: "100%" }}>
                <div className={styles.toolbarAndFilter}>
                    <div className={styles.FilterSection}>
                        {document.querySelector('.from') ? ReactDOM.createPortal(
                            <div>
                                {<div>{formatDate(selectedStartDate)}</div>}
                                {((showStartDatePicker)) && (
                                    <>
                                        <div className="pickerDropdown" onClick={handleDatePickerClick}>
                                            <DatePicker
                                                selected={selectedStartDate}
                                                onSelect={handleStartDateSelect}
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
                                    </>
                                )}
                            </div>,
                            document.querySelector('.from')
                        ) : null}

                        {document.querySelector('.to') ? ReactDOM.createPortal(
                            <div>
                                {<div>{formatDate(selectedEndDate)}</div>}
                                {(showEndDatePicker) && (
                                    <div className="pickerDropdown" onClick={handleDatePickerClick}>
                                        <DatePicker
                                            selected={selectedEndDate}
                                            onSelect={handleEndDateSelect}
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
                                            minDate={new Date(selectedStartDate.getTime() + 24 * 60 * 60 * 1000)}
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
                    {(props.leftLoad) ? (
                        <Loader type="spinner-circle"
                            bgColor={"#FFFFFF"}
                            color={"#FFFFFF"}
                            size={100} />
                    ) : (
                        <>
                            <div className={`${styles.chartContainer}`}>
                                {(loading || props.leftLoad) && <div className={styles.loadingOverlay}>Updating...</div>}
                                <div className={`${styles.chartWrapper} ${loading ? styles.blur : ''}`}>
                                    {<ReactApexChart ref={chartRef} options={chartState.options} series={chartState.series} type="line" height={500} />}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WeatherDataGraphs;