import React, {useEffect, useState} from "react";
import styles from './InnerPageDynamicContent.module.css'
import WeatherDataGraphs from "../WeatherDataGraphs/WeatherDataGraphs";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';



function InnerPageDynamicContent(props) {
    // States to store arrays for temperature, humidity, and time
    const [temperature, setTemperature] = useState([]);
    const [humidity, setHumidity] = useState([]);
    const [time, setTime] = useState([]);
    const [pm1, setPm1] = useState([])
    const [pm2_5, setPm2_5] = useState([])
    const [pm10, setPm10] = useState([])

    useEffect(() => {
        // Extract values from props and update states
        let temperatureArray = [];
        let humidityArray = [];
        let timeArray = [];
        let pm1Array = []
        let pm2_5Array = []
        let pm10Array = []

        props.weather_data.forEach((element) => {
            temperatureArray.push(element["temperature"]);
            humidityArray.push(element["humidity"]);
            pm1Array.push(element['pm1'])
            pm2_5Array.push(element['pm2_5'])
            pm10Array.push(element['pm10'])
            timeArray.push(element["time"]);
        });

        setTemperature(temperatureArray);
        setHumidity(humidityArray);
        setTime(timeArray);
        setPm1(pm1Array)
        setPm2_5(pm2_5Array)
        setPm10(pm10Array)
        console.log(pm1)
    }, [props.weather_data]);


    return (
        <div className={`${styles.InnerPageDynamicContent}`}>
            <Tabs
                defaultActiveKey="tem_and_hum"
                id="uncontrolled-tab-example"
                className="mb-3"
            >

                <Tab eventKey="tem_and_hum" title="Temperature and Humidity">
                    <WeatherDataGraphs timeline = {props.changeable_date} types = {["Temperature", "Humidity"]} data = {[temperature, humidity]} time={time} colors = {['#77B6EA', '#59a824']}/>
                </Tab>
                <Tab eventKey="pm" title="Air Qulaity">
                    <WeatherDataGraphs timeline = {props.changeable_date} types = {["PM 1", "PM 2.5", "PM 10"]} data = {[pm1, pm2_5, pm10]} time={time} colors = {['#f80000', '#e1d816', '#49B618']}/>
                </Tab>
            </Tabs>
        </div>
    )
}
export default InnerPageDynamicContent;