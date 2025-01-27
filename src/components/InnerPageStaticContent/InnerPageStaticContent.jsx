import React, {useEffect, useState} from "react";
import styles from './InnerPageStaticContent.module.css'
import { useLocation } from "react-router-dom";
import LinerStatusBar from "../LinerStatusBar/LinerStatusBar";
import WindDirection from "../WindDirection/WindDirection";
import { Tooltip as ReactTooltip } from "react-tooltip";
import Loader from "react-js-loader";
import { useTranslation } from "react-i18next";
import  "../../i18n";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const WeatherState = () => {
    return (
        <img 
            loading="eager"
            src={'https://images-in-website.s3.us-east-1.amazonaws.com/Weather/device.svg'}
            alt="Device" 
            className={styles.weatherStatusImage} 
        />
    )
}

const DataTable = (props) => {
    const { t } = useTranslation();
    const { i18n } = useTranslation();
    return (
        <table className={styles.dataTable}>
            <tbody>
                <tr className={styles.tr}>
                    <td className={styles.td}>
                        <span className={styles.titleWrapper}>
                            <span className={styles.title}>{t('linerStatusBar.humidity')}</span>
                            <Link to={`/${i18n.language}/about/#humidity`}><FontAwesomeIcon icon={faInfoCircle} className={styles.infoIcon} /></Link>
                        </span>
                        <span className={styles.value}>{props.data.humidity} %</span>
                    </td>
                    <td className={styles.td}>
                        <span className={styles.titleWrapper}>
                            <span className={styles.title}>{t('linerStatusBar.barometricPressure')}</span>
                            <Link to={`/${i18n.language}/about/#pressure`}><FontAwesomeIcon icon={faInfoCircle} className={styles.infoIcon} /></Link>
                        </span>
                        <span className={styles.value}>{props.data.pressure} {t('linerStatusBar.hPa')}</span>
                    </td>
                    <td className={styles.td}>
                        <span className={styles.titleWrapper}>
                            <span className={styles.title}>{t('linerStatusBar.uv_index')}</span>
                            <Link to={`/${i18n.language}/about/#uv`}><FontAwesomeIcon icon={faInfoCircle} className={styles.infoIcon} /></Link>
                        </span>
                        <span className={styles.value}>{props.data.uv}</span>
                    </td>
                </tr>
                <tr className={styles.tr}>
                    <td className={styles.td}>
                        <span className={styles.titleWrapper}>
                            <span className={styles.title}>{t('linerStatusBar.rain')}</span>
                            <Link to={`/${i18n.language}/about/#rain`}><FontAwesomeIcon icon={faInfoCircle} className={styles.infoIcon} /></Link>
                        </span>
                        <span className={styles.value}>{props.data.rain} {t('linerStatusBar.mm')}</span>
                    </td>
                    <td className={styles.td}>
                        <span className={styles.titleWrapper}>
                            <span className={styles.title}>{t('linerStatusBar.pm1')}</span>
                            <Link to={`/${i18n.language}/about/#pm1`}><FontAwesomeIcon icon={faInfoCircle} className={styles.infoIcon} /></Link>
                        </span>
                        <div className={styles.value} data-tooltip-id="micro_meter">{props.data.pm1} {t('linerStatusBar.myum')}</div>
                        <ReactTooltip
                            id="micro_meter"
                            place="bottom"
                            content={<span dangerouslySetInnerHTML={{ __html: `${t("linerStatusBar.micro")} = 10<sup>-6</sup>` }} />}
                        />
                    </td>
                        <td className={styles.td}>
                        <span className={styles.titleWrapper}>
                            <span className={styles.title}>{t('linerStatusBar.light')}</span>
                            <Link to={`/${i18n.language}/about/#lux`}><FontAwesomeIcon icon={faInfoCircle} className={styles.infoIcon} /></Link>
                        </span>
                        <span className={styles.value}>{props.data.lux} {t('linerStatusBar.lux')}</span>
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
            <div>
                <div>
                    <span className={styles.infoTemperature}>{Math.round(props.temp)}<sup>°C</sup></span>

                    <span className={styles.infoTemperature}>|| {Math.round(props.temp + 32)}<sup>°F</sup></span>
                </div>
                <p className={styles.feelslike}><span>{t('linerStatusBar.feelsLike')}</span>{Math.round(feelsLikeTemperature)}<sup>°C</sup> || {Math.round(feelsLikeTemperature + 32)}<sup>°F</sup></p>
                <div className={styles.windWrapper}>
                    <span className={styles.windTitle}>{t('linerStatusBar.wind')}</span>
                    <span className={styles.windInfo}><WindDirection direction={props.windDirection} /> {windSpeed} {t('linerStatusBar.kmhour')}</span>
                </div>
            </div>
        </div>
    )
}

function InnerPageStaticContent(props) {
    const { t } = useTranslation();
    const data = props.data[0]
    const location = useLocation();
    const queryString = location.search;
    const nameOfDevice = decodeURI(queryString.substring(1));
    const isProblematicDevice = props.problematicDeviceIds.includes(nameOfDevice);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 767);
        };

        // Initial check
        handleResize();

        // Add event listener
        window.addEventListener("resize", handleResize);

        // Cleanup event listener
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className={`${styles.InnerPageStaticContent}`}>
            {
                props.leftLoad ? (
                    <div className={styles.loader}>
                        <Loader
                            type="spinner"
                            bgColor={"#FFFFFF"}
                            color={"#FFFFFF"}
                            size={70}
                        />
                    </div>
                ) : (
                    <>
                        <div className={`${styles.nameAndDevice} d-flex`}>
                            <h2>{nameOfDevice}</h2>
                        </div>
                        {isMobile && isProblematicDevice && (
                            <h3 className={styles.errorMessage}>{t("innerPageStaticContent.issue")}</h3>
                        )}
                        <div className={styles.staticContent}>
                            <div className={styles.weatherInfo}>
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
                        {!isMobile && isProblematicDevice && (
                            <h3 className={styles.errorMessage}>{t("innerPageStaticContent.issue")}</h3>
                        )}
                    </>
                )
            }
        </div>
    );
}
export default InnerPageStaticContent;
