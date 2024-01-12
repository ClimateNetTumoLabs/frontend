import React from "react";
import styles from './InnerPageStaticContent.module.css'
import {ReactComponent as Device} from "../../assets/Images/device.svg";
import Weather from '../../assets/Weather/cloudy.png'
import {useLocation} from "react-router-dom";

const WeatherState = () => {
    return (
        <img src={Weather} alt={"image"} className={styles.weatherStatusImage}/>
    )
}

const WeatherInformation = (props) => {
    const temperature = props.temp
    const windSpeed = props.windspeed
    let feelsLikeTemperature = -8.78469475556 +
        1.61139411 * temperature +
        2.33854883889 * windSpeed +
        -0.14611605 * temperature * windSpeed +
        -0.012308094 * windSpeed ** 2 +
        -0.0164248277778 * temperature ** 2 +
        0.002211732 * temperature ** 2 * windSpeed +
        0.00072546 * temperature * windSpeed ** 2 +
        -0.000003582 * temperature ** 2 * windSpeed ** 2

    return (
        <div className={styles.weatherInformation}>
            <span className={styles.infoTemperature}>{props.temp}<sup>°C</sup></span>
            <p className={styles.feelslike}><span>FEELSLIKE </span>{Math.round(feelsLikeTemperature)}<sup>°C</sup></p>
            <span className={styles.recommendation}>Comment section, here can be some recommendations</span>
            <span className={styles.windTitle}>Wind</span>
            <span className={styles.windInfo}>{props.windDirection} {windSpeed} km/h</span>
        </div>
    )
}
function InnerPageStaticContent(props) {
    const data = props.data
    const location = useLocation();

    const queryString = location.search;
    const nameOfDevice = decodeURI(queryString.substring(1));
    return (
        <div className={`${styles.InnerPageStaticContent}`}>
            <div className={`${styles.nameAndDevice} d-flex`}>
                <h2>{nameOfDevice}</h2>
                {/*<Device/>*/}
            </div>

            <div className={styles.staticContent}>
                <WeatherState />
                <WeatherInformation temp={data["temperature"]} windspeed = {data["speed"]} windDirection = {data["direction"]}/>

            </div>

        </div>
    )
}
export default InnerPageStaticContent;