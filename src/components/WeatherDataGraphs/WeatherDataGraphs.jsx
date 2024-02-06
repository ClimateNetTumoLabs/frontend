import React, {useEffect, useRef, useState} from "react";
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
                    show: true
                }
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

    const chartRef = useRef(null);

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