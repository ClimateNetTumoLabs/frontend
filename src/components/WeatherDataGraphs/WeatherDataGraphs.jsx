import React, { useEffect, useRef, useState } from "react";
import ReactApexChart from 'react-apexcharts';
import styles from './WeatherDataGraphs.module.css'

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
    const [loading, setLoading] = useState(true);
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
                    tools: {
                        download: true,
                        selection: true,
                        zoom: false,
                        zoomin: true,
                        zoomout: true,
                        pan: false,
                        reset: true,
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
                align: 'left'
            },
            markers: {
                size: 1
            },
            xaxis: {
                categories: datetimeCategories,
                type: 'datetime',
                labels: {
                    format: 'MM-dd HH:mm', // Customize the label format as needed
                    show: true,
                    rotate: -50,
                    rotateAlways: true,
                    hideOverlappingLabels: true,
                    trim: false,
                    minHeight: 109,
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
                // title: {
                //     text: "Value"
                // },
                // min: 5,
                // max: 40
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
                    format: 'yyyy-MM-dd HH:mm', // Customize the tooltip date format
                },
            },
            chart: {
                redrawOnParentResize: true,
                offsetX: 0, // Add padding to the left
                offsetY: 40, // Add padding to the top
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
                        align: '',
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
                    // xaxis: {
                    //     categories: datetimeCategories,

                    // }
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
                        ...chartState.options,
                        title: {
                            text: `Data per ${props.timeline}`,
                            align: 'left'
                        },
                        xaxis: {
                            ...chartState.options.xaxis,
                            categories: datetimeCategories,
                        },
                    },
                }));
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [props.types, props.data, props.time, props.timeline]);

    useEffect(() => {
        if (!loading) {
            chartRef.current?.render();
        }
    }, [loading]);

    return (
        <div className={styles.chart_section}>
            <div style={{ height: "100%"}}>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <ReactApexChart ref={chartRef} options={chartState.options} series={chartState.series} type="line" height={500} />
                )}
            </div>
        </div>
    );
};

export default WeatherDataGraphs;