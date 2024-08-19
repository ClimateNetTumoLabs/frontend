import React, { useEffect, useRef, useState } from "react";
import styles from './InnerPageGraphSection.module.css'
import WeatherDataGraphs from "../WeatherDataGraphs/WeatherDataGraphs";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { ReactComponent as FullScreen } from "../../assets/Icons/full-screen.svg";
import { useTranslation } from "react-i18next";
import "../../i18n";
import Loader from "react-js-loader";

function InnerPageGraphSection(props) {
    const { t } = useTranslation();
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
    const [isLoading, setIsLoading] = useState(true)

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
        setIsLoading(true);
        let temperatureArray = [];
        let humidityArray = [];
        let pressureArray = [];
        let timeArray = [];
        let pm1Array = []
        let pm2_5Array = []
        let pm10Array = []
        let UVIndexArray = []
        let VisibleLightArray = []
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
            UVIndexArray.push(element["uv"] || 0)
            VisibleLightArray.push(element["lux"] || 0)
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
        setIsLoading(false);
    }, [props.weather_data]);

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
                <FullScreen className={`fas fa-expand ${styles.fullscreen_button}`}/>
            </div>
            <div className={styles.chart}>
                <div className={styles.tabContainer}>
                    <Tabs defaultActiveKey="tem_and_hum" className={styles.tabs_section}>
                        <Tab eventKey="tem_and_hum" title="Temperature and Humidity">
                            <WeatherDataGraphs
                                timeline={props.period}
                                types={["Temperature", "Humidity"]}
                                data={[temperature, humidity]}
                                time={time}
                                colors={['#77B6EA', '#59a824']}
                            />
                        </Tab>
                        <Tab eventKey="pm" title="Air Quality">
                            <WeatherDataGraphs timeline={props.period} types={["PM 1", "PM 2.5", "PM 10"]} data={[pm1, pm2_5, pm10]} time={time} colors={['#f80000', '#e1d816', '#49B618']}/>
                        </Tab>
                        <Tab eventKey="Light" title="Uv And Light Intensity">
                            <WeatherDataGraphs timeline={props.period} types={["UV Index", "Light Intensity"]} data={[UV, VisibleLight]} time={time} colors={['#f80000', '#e1d816']}/>
                        </Tab>
                        <Tab eventKey="pressure" title="Pressure">
                            <WeatherDataGraphs timeline={props.period} types={["Pressure"]} data={[pressure]} time={time} colors={["#FFFF00"]}/>
                        </Tab>
                        <Tab eventKey="rain_wind" title="Rain and Wind">
                            <WeatherDataGraphs timeline={props.period} types={["Rain", "Wind Speed"]} data={[RainCount, WindSpeed]} time={time} colors={["#6688aa", "#BA9593"]}/>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}

export default InnerPageGraphSection