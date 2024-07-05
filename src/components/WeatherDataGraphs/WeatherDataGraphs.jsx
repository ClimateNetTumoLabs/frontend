import React, {useEffect, useRef, useState} from "react";
import ReactApexChart from 'react-apexcharts';
import styles from './WeatherDataGraphs.module.css'
import {ReactComponent as FullScreen } from '../../assets/Icons/full-screen.svg'

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
                    opacity: 0.2
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
                        // customIcons: [{
                        //     // icon : `<i ></i>`,
                        //     icon : `<svg  class="fas fa-expand ${styles.fullscreen_button}" viewBox="0 0 15 15" fill="#6e8192" xmlns="http://www.w3.org/2000/svg">
                        //         <path
                        //             fill-rule="evenodd"
                        //             clip-rule="evenodd"
                        //             d="M2 2.5C2 2.22386 2.22386 2 2.5 2H5.5C5.77614 2 6 2.22386 6 2.5C6 2.77614 5.77614 3 5.5 3H3V5.5C3 5.77614 2.77614 6 2.5 6C2.22386 6 2 5.77614 2 5.5V2.5ZM9 2.5C9 2.22386 9.22386 2 9.5 2H12.5C12.7761 2 13 2.22386 13 2.5V5.5C13 5.77614 12.7761 6 12.5 6C12.2239 6 12 5.77614 12 5.5V3H9.5C9.22386 3 9 2.77614 9 2.5ZM2.5 9C2.77614 9 3 9.22386 3 9.5V12H5.5C5.77614 12 6 12.2239 6 12.5C6 12.7761 5.77614 13 5.5 13H2.5C2.22386 13 2 12.7761 2 12.5V9.5C2 9.22386 2.22386 9 2.5 9ZM12.5 9C12.7761 9 13 9.22386 13 9.5V12.5C13 12.7761 12.7761 13 12.5 13H9.5C9.22386 13 9 12.7761 9 12.5C9 12.2239 9.22386 12 9.5 12H12V9.5C12 9.22386 12.2239 9 12.5 9Z"
                        //             fill="#6e8192"
                        //         />
                        //     </svg>`,
                        //     index: 0,
                        //     title: 'Toggle Fullscreen',
                        //     class: 'custom-fullscreen',
                        //     click: function () {
                        //         toggleFullScreen();
                        //     }
                        // }]
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
                },
            },
            yaxis: {
                // title: {
                //     text: "Value"
                // },
                // min: 5,
                // max: 40
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
                await new Promise(resolve => setTimeout(resolve, 2000));
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