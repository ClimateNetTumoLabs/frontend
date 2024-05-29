import React from "react";
import styles from './InnerPageStaticContent.module.css'
import Weather from '../../assets/Weather/cloudy.png'
import { useLocation } from "react-router-dom";
import LinerStatusBar from "../LinerStatusBar/LinerStatusBar";
import WindDirection from "../WindDirection/WindDirection";
import { Tooltip as ReactTooltip } from "react-tooltip";
import Loader from "react-js-loader";
import { useTranslation } from "react-i18next";
import  "../../i18n";

const WeatherState = () => {
    return (
        <img src={Weather} alt="Weather status" className={styles.weatherStatusImage} />
    )
}

const DataTable = (props) => {
    const { t } = useTranslation();
    return (
        <table className={styles.dataTable}>
            <tbody>
                <tr className={styles.tr}>
                    <td className={styles.td}>
                        <span className={styles.title}>{t('linerStatusBar.humidity')}</span><br />
                        <span className={styles.value}>{props.data.humidity} %</span>
                    </td>
                    <td className={styles.td}>
                        <span className={styles.title}>{t('linerStatusBar.barometricPressure')}</span><br />
                        <span className={styles.value}>{props.data.pressure} {t('linerStatusBar.hPa')}</span>
                    </td>
                    <td className={styles.td}>
                        <span className={styles.title}>{t('linerStatusBar.uv_index')}</span><br />
                        <span className={styles.value}>{props.data.uv}</span>
                    </td>
                </tr>
                <tr className={styles.tr}>
                    <td className={styles.td}>
                        <span className={styles.title}>{t('linerStatusBar.rain')}</span><br />
                        <span className={styles.value}>{props.data.rain} {t('linerStatusBar.mm')}</span>
                    </td>
                    <td className={styles.td}>
                        <span className={styles.title}>{t('linerStatusBar.pm1')}</span><br />
                        <div className={styles.value} data-tooltip-id="micro_meter">{props.data.pm1} {t('linerStatusBar.myum')}</div>
                    </td>
                    <td className={styles.td}>
                        <span className={styles.title}>{t('linerStatusBar.pm2_5')}</span><br />
                        <div className={styles.value} data-tooltip-id="micro_meter">{props.data.pm2_5} {t('linerStatusBar.myum')}
                        </div>
                        <ReactTooltip
                            id="micro_meter"
                            place="bottom"
                            content={<span dangerouslySetInnerHTML={{ __html: `${t("linerStatusBar.micro")} = 10<sup>-6</sup>` }} />}
                        />
                    </td>
                </tr>
            </tbody>
        </table>


    )
}

const WeatherInformation = (props) => {
    const { t } = useTranslation();
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
            <>
                <span className={styles.infoTemperature}>{props.temp}<sup>°C</sup></span>
                <p className={styles.feelslike}><span>{t('linerStatusBar.feelsLike')}</span>{Math.round(feelsLikeTemperature)}<sup>°C</sup></p>
                <span className={styles.recommendation}>{t('linerStatusBar.recommendation')}</span>
                <div className={styles.windWrapper}>
                    <span className={styles.windTitle}>{t('linerStatusBar.wind')}</span>
                    <span className={styles.windInfo}><WindDirection direction={props.windDirection} /> {windSpeed} {t('linerStatusBar.kmhour')}</span>
                </div>
            </>
        </div>
    )
}

function InnerPageStaticContent(props) {
    const data = props.data[0]
    const location = useLocation();
    const queryString = location.search;
    const nameOfDevice = decodeURI(queryString.substring(1));

    return (
        <div className={`${styles.InnerPageStaticContent}`}>
            {
                props.leftLoad ? (
                    <div className={styles.loader}>
                        <Loader type="spinner-circle"
                            bgColor={"#FFFFFF"}
                            color={"#FFFFFF"}
                            size={100} />
                    </div>
                ) : (
                    <>
                        <div className={`${styles.nameAndDevice} d-flex`}>
                            <h2>{nameOfDevice}</h2>
                        </div>
                        <div className={styles.staticContent}>
                            <div className={styles.waeterInfo}>
                                <WeatherState />
                                <WeatherInformation
                                    loading={props.loading}
                                    setLoading={props.setLoading}
                                    temp={data["temperature"]}
                                    windspeed={data["speed"]}
                                    windDirection={data["direction"]}
                                />
                            </div>
                            <div>
                                <div className={styles.otherInformation}>
                                    <LinerStatusBar air_quality={data.pm2_5} datetime={data} />
                                    <DataTable data={data} />
                                </div>
                            </div>

                        </div>
                    </>
                )
            }
        </div>
    )
}
export default InnerPageStaticContent;