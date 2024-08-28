import React, { useEffect, useRef, useState } from "react";
import styles from './InnerPageGraphSection.module.css';
import WeatherDataGraphs from "../WeatherDataGraphs/WeatherDataGraphs";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { ReactComponent as FullScreen } from "../../assets/Icons/full-screen.svg";
import { useTranslation } from "react-i18next";
import "../../i18n";
import Loader from "react-js-loader";

function InnerPageGraphSection({weather_data, setCustomStartDate, customStartDate, setCustomEndDate, customEndDate, setTimeFilter}) {
    const { t } = useTranslation();
    const [weatherArrays, setWeatherArrays] = useState({
        temperature: [],
        humidity: [],
        pressure: [],
        time: [],
        pm1: [],
        pm2_5: [],
        pm10: [],
        UV: [],
        VisibleLight: [],
        RainCount: [],
        WindSpeed: [],
        WindDirection: []
    });
    const ChartsRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);

    const toggleFullScreen = () => {
        const chartElement = ChartsRef.current;
        if (chartElement) {
            if (!document.fullscreenElement) {
                chartElement.requestFullscreen().catch(err => {
                    console.error('Failed to enter fullscreen mode:', err);
                });
            } else {
                document.exitFullscreen();
            }
        }
    };

    useEffect(() => {
        setIsLoading(true);
        const newWeatherArrays = {
            temperature: [],
            humidity: [],
            pressure: [],
            time: [],
            pm1: [],
            pm2_5: [],
            pm10: [],
            UV: [],
            VisibleLight: [],
            RainCount: [],
            WindSpeed: [],
            WindDirection: []
        };

        weather_data.forEach((element) => {
            newWeatherArrays.temperature.push(element["temperature"] || 0);
            newWeatherArrays.humidity.push(element["humidity"] || 0);
            newWeatherArrays.pressure.push(element["pressure"] || 0);
            newWeatherArrays.pm1.push(element['pm1'] || 0);
            newWeatherArrays.pm2_5.push(element['pm2_5'] || 0);
            newWeatherArrays.pm10.push(element['pm10'] || 0);
            newWeatherArrays.time.push(element["hour"] || element["date"] || 0);
            newWeatherArrays.UV.push(element["uv"] || 0);
            newWeatherArrays.VisibleLight.push(element["lux"] || 0);
            newWeatherArrays.RainCount.push(element["rain"] || 0);
            newWeatherArrays.WindSpeed.push(element["speed"] || 0);
            newWeatherArrays.WindDirection.push(element["direction"] || 0);
        });

        setWeatherArrays(newWeatherArrays);
        setIsLoading(false);
    }, [weather_data]);
    if (isLoading) {
        return (
            <div className={styles.loader}>
                <Loader type="spinner-circle"
                        bgColor={"#FFFFFF"}
                        color={"#FFFFFF"}
                        size={100} />
            </div>
        );
    }

    return (
        <div ref={ChartsRef} className={`${styles.InnerPageGraphSection}`}>
            <div onClick={toggleFullScreen} className={styles.FullScreenButtonSection}>
                <FullScreen className={`fas fa-expand ${styles.fullscreen_button}`} />
            </div>
            <div className={styles.chart}>
                <div className={styles.tabContainer}>
                    <Tabs defaultActiveKey="tem_and_hum" className={styles.tabs_section}>
                        <Tab eventKey="tem_and_hum" title={t('innerPageGraphSection.tabTitles.temAndHum')}>
                            <WeatherDataGraphs
                                graphProps={{
                                    types: [t('innerPageGraphSection.tem'), t('innerPageGraphSection.hum')],
                                    data: [weatherArrays.temperature, weatherArrays.humidity],
                                    time: weatherArrays.time,
                                    colors: ['#77B6EA', '#59a824']
                                }}
                                {...{ setCustomStartDate, customStartDate, setCustomEndDate, customEndDate, setTimeFilter }}
                            />
                        </Tab>
                        <Tab eventKey="pm" title={t('innerPageGraphSection.tabTitles.pm')}>
                            <WeatherDataGraphs
                                graphProps={{
                                    types: ["PM1", "PM2.5", "PM10"], // Consider specifying the `types` for consistency
                                    data: [weatherArrays.pm1, weatherArrays.pm2_5, weatherArrays.pm10],
                                    time: weatherArrays.time,
                                    colors: ['#f80000', '#e1d816', '#49B618']
                                }}
                                {...{ setCustomStartDate, customStartDate, setCustomEndDate, customEndDate, setTimeFilter }}
                            />
                        </Tab>
                        <Tab eventKey="Light" title={t('innerPageGraphSection.tabTitles.light')}>
                            <WeatherDataGraphs
                                graphProps={{
                                    types: [t('innerPageGraphSection.uv'), t('innerPageGraphSection.intensity')],
                                    data: [weatherArrays.UV, weatherArrays.VisibleLight],
                                    time: weatherArrays.time,
                                    colors: ['#f80000', '#e1d816']
                                }}
                                {...{ setCustomStartDate, customStartDate, setCustomEndDate, customEndDate, setTimeFilter }}
                            />
                        </Tab>
                        <Tab eventKey="pressure" title={t('innerPageGraphSection.tabTitles.pressure')}>
                            <WeatherDataGraphs
                                graphProps={{
                                    types: [t('innerPageGraphSection.press')],
                                    data: [weatherArrays.pressure],
                                    time: weatherArrays.time,
                                    colors: ["#FFFF00"]
                                }}
                                {...{ setCustomStartDate, customStartDate, setCustomEndDate, customEndDate, setTimeFilter }}
                            />
                        </Tab>
                        <Tab eventKey="rain_wind" title={t('innerPageGraphSection.tabTitles.rainAndWind')}>
                            <WeatherDataGraphs
                                graphProps={{
                                    types: [t('innerPageGraphSection.rain'), t('innerPageGraphSection.windSpeed')],
                                    data: [weatherArrays.RainCount, weatherArrays.WindSpeed],
                                    time: weatherArrays.time,
                                    colors: ["#6688aa", "#BA9593"]
                                }}
                                {...{ setCustomStartDate, customStartDate, setCustomEndDate, customEndDate, setTimeFilter }}
                            />
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}

export default InnerPageGraphSection;
