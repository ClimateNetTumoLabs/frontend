import React from "react";
import styles from './InnerPageStaticContent.module.css'
import Weather from '../../assets/Weather/cloudy.png'
import { useLocation } from "react-router-dom";
import LinerStatusBar from "../LinerStatusBar/LinerStatusBar";
import WindDirection from "../WindDirection/WindDirection";
import { Tooltip as ReactTooltip } from "react-tooltip";


const WeatherState = () => {
    return (
        <img src={Weather} alt="Weather status" className={styles.weatherStatusImage} />
    )
}

const DataTable = (props) => {
    return (
        <table className={styles.dataTable}>
            <tbody>
                <tr className={styles.tr}>
                    <td className={styles.td}>
                        <span className={styles.title}>Humidity</span><br />
                        <span className={styles.value}>{props.data.humidity} %</span>
                    </td>
                    <td className={styles.td}>
                        <span className={styles.title}>Barometric P.</span><br />
                        <span className={styles.value}>{props.data.pressure} hPa</span>
                    </td>
                    <td className={styles.td}>
                        <span className={styles.title}>Light</span><br />
                        <span className={styles.value}>{props.data.light_uv} Lux</span>
                    </td>
                </tr>
                <tr className={styles.tr}>
                    <td className={styles.td}>
                        <span className={styles.title}>Rain</span><br />
                        <span className={styles.value}>{props.data.rain} mm</span>
                    </td>
                    <td className={styles.td}>
                        <span className={styles.title}>PM 1</span><br />
                        <div className={styles.value} data-tooltip-id="micro_meter">{props.data.pm1} μm</div>
                    </td>
                    <td className={styles.td}>
                        <span className={styles.title}>PM 10</span><br />
                        <div className={styles.value} data-tooltip-id="micro_meter">{props.data.pm10} μm
                        </div>
                        <ReactTooltip
                            id="micro_meter"
                            place="bottom"
                            content={<span dangerouslySetInnerHTML={{ __html: 'micro = 10<sup>-6</sup>' }} />}
                        />
                    </td>
                </tr>
            </tbody>
        </table>


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
            <p className={styles.feelslike}><span>FEELS LIKE </span>{Math.round(feelsLikeTemperature)}<sup>°C</sup></p>
            <span className={styles.recommendation}>Comment section, here can be some recommendations</span>
            <span className={styles.windTitle}>Wind</span>
            <span className={styles.windInfo}><WindDirection direction={props.windDirection} /> {windSpeed} km/h</span>
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
                {/* <Device/> */}
            </div>
                <div className={styles.staticContent}>
                    <WeatherState />
                    <WeatherInformation temp={data["temperature"]} windspeed={data["speed"]} windDirection={data["direction"]} />
                    <div className={styles.otherInformation}>
                        <LinerStatusBar air_quality={props.data.pm2_5} datetime={props.data} />
                        <DataTable data={props.data} />
                    </div>

                </div>
        </div>
    )
}
export default InnerPageStaticContent;