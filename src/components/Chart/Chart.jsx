import React, { useState } from 'react';
import { AgChartsReact } from 'ag-charts-react';
import styles from './chart.module.css'



const ChartExample = (props) => {

    const [options, setOptions] = useState({
        autoSize: true,
        title: {
            text: props.text,
        },
        subtitle: {
            text: props.subtitle,

        },
        data: props.information.data,

        series: props.information.name
    });

    return<div className={styles.chart_section}><AgChartsReact options={options} /></div>;
};

export default ChartExample