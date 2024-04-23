import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from './InnerPageDynamicContent.module.css'
import WeatherDataGraphs from "../WeatherDataGraphs/WeatherDataGraphs";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { ReactComponent as FullScreen } from "../../assets/Icons/full-screen.svg";

function InnerPageDynamicContent(props) {
    // States to store arrays for temperature, humidity, and time
    const today = new Date();
    const [weatherData, setWeatherData] = useState([]);
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
    const [IRLight, setIRLight] = useState([])
    const [RainCount, setRainCount] = useState([])
    const [WindSpeed, setWindSpeed] = useState([])
    const [WindDirection, setWindDirection] = useState([])
    const [loading, setLoading] = useState(false);
    const ChartsRef = useRef(null)
    const [selectedStartDate, setSelectedStartDate] = useState(today);
    const [selectedEndDate, setSelectedEndDate] = useState(today);
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
        setSelectedStartDate(today)
        setSelectedEndDate(today)
    }, [props.id])

    useLayoutEffect(() => {
        setLoading(true)
        setWeatherData(props.weather_data);
    }, [props.weather_data, props.filterState]);

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
        setIRLight(IRArray)
        setRainCount(RainCountArray)
        setWindSpeed(WindSpeedArray)
        setWindDirection(WindDirectionArray)

    }, [props.weather_data]);



    return (
        <div ref={ChartsRef} className={`${styles.InnerPageDynamicContent}`}>
            <div onClick={toggleFullScreen} className={styles.FullScreenButtonSection}>
                <FullScreen className={`fas fa-expand ${styles.fullscreen_button}`} />
            </div>
            <div className={styles.chart}>
                <div className={styles.tabContainer}>
                    <Tabs
                        defaultActiveKey={selectedTab}
                        className={styles.tabs_section}
                        onSelect={(tab) => setSelectedTab(tab)}
                    >
                        <Tab eventKey="tem_and_hum" title="Temperature and Humidity">
                            {selectedTab === "tem_and_hum" &&
                                <WeatherDataGraphs
                                    timeline={props.period}
                                    types={["Temperature", "Humidity"]}
                                    data={[weatherData.map(data => data.temperature), weatherData.map(data => data.humidity)]}
                                    time={weatherData.map(data => data.hour || data.date)}
                                    colors={['#77B6EA', '#59a824']}
                                    {...props}
                                    lastData={props.lastData}
                                    id={props.id}
                                    loading = {loading}
                                    setLoading={setLoading}
                                    filterState={props.filterState}
                                    filterChange={props.filterChange} 
                                    selectedStartDate={selectedStartDate}
                                    setSelectedStartDate ={setSelectedStartDate}
                                    selectedEndDate={selectedEndDate}
                                    setSelectedEndDate={setSelectedEndDate}
                                />
                            }
                        </Tab>
                        <Tab eventKey="pm" title="Air Quality">
                            {selectedTab === "pm" &&
                                <WeatherDataGraphs
                                    timeline={props.period}
                                    types={["PM 1", "PM 2.5", "PM 10"]}
                                    data={[weatherData.map(data => data.pm1), weatherData.map(data => data.pm2_5), weatherData.map(data => data.pm10)]}
                                    time={weatherData.map(data => data.hour || data.date)}
                                    colors={['#f80000', '#e1d816', '#49B618']}
                                    {...props}
                                    lastData={props.lastData}
                                    id={props.id}
                                    loading = {loading}
                                    setLoading={setLoading}
                                    filterState={props.filterState}
                                    filterChange={props.filterChange} 
                                    selectedStartDate={selectedStartDate}
                                    setSelectedStartDate ={setSelectedStartDate}
                                    selectedEndDate={selectedEndDate}
                                    setSelectedEndDate={setSelectedEndDate}
                                />
                            }
                        </Tab>
                        {/*<Tab eventKey="light"  title="Light">*/}
                        {/*    <WeatherDataGraphs timeline = {props.period} types = {["UV Index", "Infrared", "Visible Light"]} data = {[UV, VisibleLight, IRLight]} time={time} colors = {["#F7CAC9", "#9CCC65", "#00BFFF"]}/>*/}
                        {/*</Tab>*/}
                        <Tab eventKey="pressure" title="Pressure">
                            {selectedTab === "pressure" &&
                                <WeatherDataGraphs
                                    timeline={props.period}
                                    types={["Pressure"]}
                                    data={[weatherData.map(data => data.pressure)]}
                                    time={weatherData.map(data => data.hour || data.date)}
                                    colors={['#FFFF00']}
                                    {...props}
                                    lastData={props.lastData}
                                    id={props.id}
                                    loading = {loading}
                                    setLoading={setLoading}
                                    filterState={props.filterState}
                                    filterChange={props.filterChange}
                                    selectedStartDate={selectedStartDate}
                                    setSelectedStartDate ={setSelectedStartDate}
                                    selectedEndDate={selectedEndDate}
                                    setSelectedEndDate={setSelectedEndDate}
                                />
                            }
                        </Tab>
                        <Tab eventKey="rain_wind" title="Rain and Wind">
                            {selectedTab === "rain_wind" &&
                                <WeatherDataGraphs
                                    timeline={props.period}
                                    types={["Rain", "Wind Speed", "Wind Direction"]}
                                    data={[weatherData.map(data => data.rain), weatherData.map(data => data.speed), weatherData.map(data => data.direction)]}
                                    time={weatherData.map(data => data.hour || data.date)}
                                    colors={['#6688aa', '#BA9593', '#EDAFFB']}
                                    {...props}
                                    lastData={props.lastData}
                                    id={props.id}
                                    loading = {loading}
                                    setLoading={setLoading}
                                    filterState={props.filterState}
                                    filterChange={props.filterChange}
                                    selectedStartDate={selectedStartDate}
                                    setSelectedStartDate ={setSelectedStartDate}
                                    selectedEndDate={selectedEndDate}
                                    setSelectedEndDate={setSelectedEndDate}
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