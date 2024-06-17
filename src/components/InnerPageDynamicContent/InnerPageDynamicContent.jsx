import React, {useEffect, useRef, useState} from "react";
import styles from './InnerPageDynamicContent.module.css'
import WeatherDataGraphs from "../WeatherDataGraphs/WeatherDataGraphs";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import {ReactComponent as FullScreen} from "../../assets/Icons/full-screen.svg";
import {useTranslation} from "react-i18next";
import "../../i18n";

function InnerPageDynamicContent(props) {
    const {t} = useTranslation();
    const [selectedTab, setSelectedTab] = useState("tem_and_hum");
    const [temperature, setTemperature] = useState([]);
    const [humidity, setHumidity] = useState([]);
    const [pressure, setPressure] = useState([]);
    const [time, setTime] = useState([]);
    const [pm1, setPm1] = useState([])
    const [pm2_5, setPm2_5] = useState([])
    const [pm10, setPm10] = useState([])
    const [UV, setUV] = useState([])
    const [VisibleLight, setVisibleLight] = useState([])
    const [RainCount, setRainCount] = useState([])
    const [WindSpeed, setWindSpeed] = useState([])
    const [WindDirection, setWindDirection] = useState([])
    const ChartsRef = useRef(null)
    const toggleFullScreen = () => {
        const chartElement = ChartsRef.current

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
        let temperatureArray = [];
        let humidityArray = [];
        let pressureArray = [];
        let timeArray = [];
        let pm1Array = []
        let pm2_5Array = []
        let pm10Array = []
        let UVIndexArray = []
        let VisibleLightArray = []
        let IRArray = []
        let RainCountArray = []
        let WindSpeedArray = []
        let WindDirectionArray = []

        props.weather_data.forEach((element) => {
            temperatureArray.push(element["temperature"] || 0);
            humidityArray.push(element["humidity"] || 0);
            pressureArray.push(element["pressure"] || 0);
            pm1Array.push(element['pm1'] || 0)
            pm2_5Array.push(element['pm2_5'] || 0)
            pm10Array.push(element['pm10'] || 0)
            timeArray.push(element["hour"] || element["date"] || 0);
            UVIndexArray.push(element["light_uv"] || 0)
            VisibleLightArray.push(element["light_vis"] || 0)
            IRArray.push(element["light_ir"] || 0)
            RainCountArray.push(element["rain"] || 0)
            WindSpeedArray.push(element["speed"] || 0)
            WindDirectionArray.push(element["direction"] || 0)
        });

        setTemperature(temperatureArray);
        setHumidity(humidityArray);
        setPressure(pressureArray);
        setTime(timeArray);
        setPm1(pm1Array)
        setPm2_5(pm2_5Array)
        setPm10(pm10Array)
        setUV(UVIndexArray)
        setVisibleLight(VisibleLightArray)
        setRainCount(RainCountArray)
        setWindSpeed(WindSpeedArray)
        setWindDirection(WindDirectionArray)

    }, [props.weather_data]);


    return (
        <div ref={ChartsRef} className={`${styles.InnerPageDynamicContent}`}>
            <div onClick={toggleFullScreen} className={styles.FullScreenButtonSection}>
                <FullScreen className={`fas fa-expand ${styles.fullscreen_button}`}/>
            </div>
            <div className={styles.chart}>
                <div className={styles.tabContainer}>
                    <Tabs
                        defaultActiveKey={selectedTab}
                        className={styles.tabs_section}
                        onSelect={(tab) => setSelectedTab(tab)}
                    >
                        <Tab eventKey="tem_and_hum"
                             title={t('innerPageDynamicContent.tabTitles.temperatureAndHumidity')}>
                            {selectedTab === "tem_and_hum" &&
                                <WeatherDataGraphs
                                    startDate={props.startDate}
                                    endDate={props.endDate}
                                    setStartDate={props.setStartDate}
                                    setEndDate={props.setEndDate}
                                    className={styles.graph}
                                    types={[t('innerPageDynamicContent.temperature'), t('innerPageDynamicContent.humidity')]}
                                    data={[temperature, humidity]}
                                    time={time}
                                    colors={['#fffA75', '#77B6EA']}
                                    timeline={props.period}
                                    leftLoad={props.leftLoad}
                                    setLeftLoad={props.setLeftLoad}
                                    filterChange={props.filterChange}
                                    error={props.error}
                                    setError={props.setError}
                                    filterPressed={props.filterPressed}
                                    setFilterPressed={props.setFilterPressed}
                                    filterState={props.filterState}
                                    selected_device_id={props.selected_device_id}
                                />
                            }
                        </Tab>
                        <Tab eventKey="pm" title={t('innerPageDynamicContent.tabTitles.airQuality')}>
                            {selectedTab === "pm" &&
                                <WeatherDataGraphs
                                    startDate={props.startDate}
                                    endDate={props.endDate}
                                    setStartDate={props.setStartDate}
                                    setEndDate={props.setEndDate}
                                    className={styles.graph}
                                    leftLoad={props.leftLoad}
                                    setLeftLoad={props.setLeftLoad}
                                    timeline={props.period}
                                    types={["PM 1", "PM 2.5", "PM 10"]}
                                    data={[pm1, pm2_5, pm10]} time={time}
                                    colors={['#f80000', '#e1d816', '#49B618']}
                                    filterChange={props.filterChange}
                                    error={props.error}
                                    setError={props.setError}
                                    filterPressed={props.filterPressed}
                                    setFilterPressed={props.setFilterPressed}
                                    filterState={props.filterState}
                                    selected_device_id={props.selected_device_id}
                                />
                            }
                        </Tab>
                        <Tab eventKey="pressure" title={t('innerPageDynamicContent.tabTitles.pressure')}>
                            {selectedTab === "pressure" &&
                                <WeatherDataGraphs
                                    startDate={props.startDate}
                                    endDate={props.endDate}
                                    setStartDate={props.setStartDate}
                                    setEndDate={props.setEndDate}
                                    className={styles.graph}
                                    leftLoad={props.leftLoad}
                                    setLeftLoad={props.setLeftLoad}
                                    timeline={props.period}
                                    types={[t('innerPageDynamicContent.pressure')]}
                                    data={[pressure]}
                                    time={time}
                                    colors={["#FFFF00"]}
                                    filterChange={props.filterChange}
                                    error={props.error}
                                    setError={props.setError}
                                    filterPressed={props.filterPressed}
                                    setFilterPressed={props.setFilterPressed}
                                    filterState={props.filterState}
                                    selected_device_id={props.selected_device_id}
                                />
                            }
                        </Tab>
                        <Tab eventKey="rain_wind" title={t('innerPageDynamicContent.tabTitles.rainAndWind')}>
                            {selectedTab === "rain_wind" &&
                                <WeatherDataGraphs
                                    className={styles.graph}
                                    leftLoad={props.leftLoad}
                                    setLeftLoad={props.setLeftLoad}
                                    timeline={props.period}
                                    types={[t('innerPageDynamicContent.rain'), t('innerPageDynamicContent.windSpeed'), t('innerPageDynamicContent.windDirection')]}
                                    data={[RainCount, WindSpeed, WindDirection]}
                                    time={time}
                                    colors={["#6688aa", "#BA9593", "#EDAFFB"]}
                                    filterChange={props.filterChange}
                                    startDate={props.startDate}
                                    endDate={props.endDate}
                                    setStartDate={props.setStartDate}
                                    setEndDate={props.setEndDate}
                                    error={props.error}
                                    setError={props.setError}
                                    filterPressed={props.filterPressed}
                                    setFilterPressed={props.setFilterPressed}
                                    filterState={props.filterState}
                                    selected_device_id={props.selected_device_id}
                                />
                            }
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}

export default InnerPageDynamicContent;