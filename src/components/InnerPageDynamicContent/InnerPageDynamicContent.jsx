import React from "react";
import styles from './InnerPageDynamicContent.module.css'
import WeatherDataGraphs from "../WeatherDataGraphs/WeatherDataGraphs";

function InnerPageDynamicContent(props) {
    console.log(props.weather_data)
    return (
        <div className={`${styles.InnerPageDynamicContent}`}>
            {/*{props.changeable_date}*/}
            <WeatherDataGraphs/>
        </div>
    )
}
export default InnerPageDynamicContent;