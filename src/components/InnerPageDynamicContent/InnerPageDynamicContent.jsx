import React, {useEffect, useRef, useState} from "react";
import styles from './InnerPageDynamicContent.module.css'
import WeatherDataGraphs from "../WeatherDataGraphs/WeatherDataGraphs";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import {ReactComponent as FullScreen} from "../../assets/Icons/full-screen.svg";


function InnerPageDynamicContent(props) {
    // States to store arrays for temperature, humidity, and time
    const [temperature, setTemperature] = useState([]);
    const [humidity, setHumidity] = useState([]);
    const [pressure, setPressure] = useState([]);
    const [time, setTime] = useState([]);
    const [pm1, setPm1] = useState([])
    const [pm2_5, setPm2_5] = useState([])
    const [pm10, setPm10] = useState([])
    const [UV, setUV] = useState([])
    const [VisibleLight, setVisibleLight] = useState([])
    const [IRLight, setIRLight] = useState([])
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
        // Extract values from props and update states
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
            timeArray.push(element["time"] || 0);
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
        setIRLight(IRArray)
        setRainCount(RainCountArray)
        setWindSpeed(WindSpeedArray)
        setWindDirection(WindDirectionArray)
    }, [props.weather_data]);

    return (
        <div ref = {ChartsRef} className={`${styles.InnerPageDynamicContent}`}>
            <div className={styles.FullScreenButtonSection}>
                <FullScreen className={`fas fa-expand ${styles.fullscreen_button}`} />
            </div>
            <div className={styles.chart}>
                <Tabs  defaultActiveKey="tem_and_hum" className="mb-3">
                    <Tab eventKey="tem_and_hum" title="Temperature and Humidity">
                        <WeatherDataGraphs timeline = {props.period} types = {["Temperature", "Humidity"]} data = {[temperature, humidity]} time={time} colors = {['#77B6EA', '#59a824']}/>
                    </Tab>
                    <Tab eventKey="pm" title="Air Qulaity">
                        <WeatherDataGraphs timeline = {props.period} types = {["PM 1", "PM 2.5", "PM 10"]} data = {[pm1, pm2_5, pm10]} time={time} colors = {['#f80000', '#e1d816', '#49B618']}/>
                    </Tab>
                    <Tab eventKey="light"  title="Light">
                        <WeatherDataGraphs timeline = {props.period} types = {["UV Index", "Infrared", "Visible Light"]} data = {[UV, VisibleLight, IRLight]} time={time} colors = {["#F7CAC9", "#9CCC65", "#00BFFF"]}/>
                    </Tab>
                    <Tab eventKey="pressure"  title="Pressure">
                        <WeatherDataGraphs timeline = {props.period} types = {["Pressure"]} data = {[pressure]} time={time} colors = {["#FFFF00"]}/>
                    </Tab>
                    <Tab eventKey="rain_wind"  title="Rain and Wind">
                        <WeatherDataGraphs timeline = {props.period} types = {["Rain", "Wind Speed", "Wind Direction"]} data = {[RainCount, WindSpeed, WindDirection]} time={time} colors = {["#6688aa", "#BA9593", "#EDAFFB"]}/>
                    </Tab>
                </Tabs>
            </div>
        </div>
    )
}
export default InnerPageDynamicContent;