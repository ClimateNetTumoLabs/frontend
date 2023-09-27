import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AgChartsReact } from 'ag-charts-react';



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

    return <AgChartsReact options={options} />;
};

export default ChartExample